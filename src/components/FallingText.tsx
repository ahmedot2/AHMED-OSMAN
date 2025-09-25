'use client';
import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

type FallingTextProps = {
  className?: string;
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
};

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
}: FallingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [effectStarted, setEffectStarted] = useState(trigger === 'auto');

  useEffect(() => {
    if (trigger === 'auto') return;
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
    if (!effectStarted || !containerRef.current || !textRef.current || !canvasRef.current) return;

    // Hide original text
    textRef.current.style.opacity = '0';
    
    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Composite } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    
    if (width <= 0 || height <= 0) {
        return;
    }

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
    };

    const wallThickness = 50;
    const floor = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, boundaryOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, boundaryOptions);

    const originalSpans = textRef.current.querySelectorAll('.word');
    const wordBodies: { elem: HTMLSpanElement; body: Matter.Body }[] = [];

    originalSpans.forEach(span => {
      const elem = span.cloneNode(true) as HTMLSpanElement;
      document.body.appendChild(elem);
      const rect = elem.getBoundingClientRect();
      document.body.removeChild(elem);

      if (rect.width === 0 || rect.height === 0) return;
      
      const newElem = span.cloneNode(true) as HTMLSpanElement;
      newElem.style.position = 'absolute';
      newElem.style.left = '-9999px'; // Position off-screen initially
      canvasRef.current!.appendChild(newElem);
      
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.6,
        friction: 0.1,
        frictionAir: 0.01,
        density: 0.001,
      });

      wordBodies.push({ elem: newElem, body });
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, ...wordBodies.map(wb => wb.body)]);
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

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
      if (render.canvas && canvasRef.current) {
         if(canvasRef.current.contains(render.canvas)) {
            canvasRef.current.removeChild(render.canvas);
         }
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
      if(canvasRef.current) {
        while (canvasRef.current.firstChild) {
            canvasRef.current.removeChild(canvasRef.current.firstChild);
        }
      }
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness, text, highlightWords, highlightClass, className]);

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
        style={{ visibility: effectStarted ? 'hidden' : 'visible' }}
      />
      <div ref={canvasRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
