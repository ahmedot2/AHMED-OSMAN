'use client';
import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

const FallingText = ({
  className = '',
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(' ');
    const newHTML = words
      .map(word => {
        const isHighlighted = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${word}</span>`;
      })
      .join(' ');
    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted || !containerRef.current || !textRef.current || !canvasContainerRef.current) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) {
      return;
    }

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    textRef.current.style.visibility = 'hidden';

    const wordSpans = textRef.current.querySelectorAll('.word');
    
    // Create new spans inside the canvas container to actually render and move
    const movingWordElements = Array.from(wordSpans).map(span => {
      const elem = span as HTMLElement;
      const movingElem = document.createElement('span');
      movingElem.textContent = elem.textContent;
      movingElem.className = `${elem.className} ${className}`; // Apply all classes
      movingElem.style.position = 'absolute';
      movingElem.style.whiteSpace = 'nowrap';
      canvasContainerRef.current!.appendChild(movingElem);
      return movingElem;
    });

    const wordBodies = Array.from(wordSpans).map((elem, i) => {
        const rect = elem.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
            restitution: 0.8,
            frictionAir: 0.01,
            friction: 0.2
        });
        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
        return { elem: movingWordElements[i], body };
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let animationFrame: number;
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      animationFrame = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      cancelAnimationFrame(animationFrame);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current?.contains(render.canvas)) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
      if(canvasContainerRef.current) {
        while (canvasContainerRef.current.firstChild) {
            canvasContainerRef.current.removeChild(canvasContainerRef.current.firstChild);
        }
      }
      if(textRef.current) {
        textRef.current.style.visibility = 'visible';
      }
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness, className, text]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="falling-text-target"
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
