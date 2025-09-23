'use client';
import React, { useRef, useEffect, useState } from 'react';
import Matter from 'matter-js';

type FallingTextProps = {
  text: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: 'hover' | 'load';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  fontSize?: string;
  mouseConstraintStiffness?: number;
};

const FallingText: React.FC<FallingTextProps> = ({
  text,
  highlightWords = [],
  highlightClass = '',
  trigger = 'load',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  fontSize = '2rem',
  mouseConstraintStiffness = 0.1,
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef(Matter.Runner.create());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let primaryColorHsl: string;

    const handleResize = () => {
      if (renderRef.current && sceneRef.current) {
        renderRef.current.canvas.width = sceneRef.current.clientWidth;
        renderRef.current.canvas.height = sceneRef.current.clientHeight;
        Matter.Render.setPixelRatio(renderRef.current, window.devicePixelRatio);
      }
    };

    const init = () => {
      const scene = sceneRef.current;
      if (!scene) return;

      // Get computed color once
      const primaryColorVar = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      primaryColorHsl = `hsl(${primaryColorVar})`;

      const engine = engineRef.current;
      engine.world.gravity.y = gravity;

      const render = Matter.Render.create({
        element: scene,
        engine: engine,
        options: {
          width: scene.clientWidth,
          height: scene.clientHeight,
          wireframes: wireframes,
          background: backgroundColor,
          pixelRatio: window.devicePixelRatio,
        },
      });
      renderRef.current = render;

      const ground = Matter.Bodies.rectangle(scene.clientWidth / 2, scene.clientHeight + 25, scene.clientWidth, 50, { isStatic: true });
      const leftWall = Matter.Bodies.rectangle(-25, scene.clientHeight / 2, 50, scene.clientHeight, { isStatic: true });
      const rightWall = Matter.Bodies.rectangle(scene.clientWidth + 25, scene.clientHeight / 2, 50, scene.clientHeight, { isStatic: true });
      const roof = Matter.Bodies.rectangle(scene.clientWidth / 2, -25, scene.clientWidth, 50, { isStatic: true });

      Matter.World.add(engine.world, [ground, leftWall, rightWall, roof]);

      const words = text.split(' ');
      const wordBodies = words.map((word, i) => {
        const element = document.createElement('div');
        element.style.fontSize = fontSize;
        element.style.fontFamily = getComputedStyle(document.documentElement).getPropertyValue('--font-headline').trim();
        element.style.display = 'inline-block';
        element.innerText = word;
        document.body.appendChild(element);
        const { width, height } = element.getBoundingClientRect();
        document.body.removeChild(element);

        const body = Matter.Bodies.rectangle(
          scene.clientWidth / 2 + (Math.random() - 0.5) * 200,
          -50 - i * 50,
          width,
          height,
          {
            restitution: 0.6,
            friction: 0.1,
            render: {
              sprite: {
                texture: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', // transparent gif
                xScale: 1,
                yScale: 1,
              },
            },
          }
        );
        (body as any).word = word;
        (body as any).isHighlighted = highlightWords.includes(word);
        return body;
      });

      Matter.World.add(engine.world, wordBodies);

      const mouse = Matter.Mouse.create(render.canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: {
            visible: false,
          },
        },
      });

      Matter.World.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      Matter.Runner.run(runnerRef.current, engine);
      Matter.Render.run(render);

      const context = render.context;
      const originalRender = Matter.Render.world;
      const headlineFontFamily = getComputedStyle(document.documentElement).getPropertyValue('--font-headline').trim();

      (Matter.Render as any).world = function (render: Matter.Render) {
        originalRender(render);
        
        context.font = `${fontSize} ${headlineFontFamily}`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        for (const body of Matter.Composite.allBodies(engine.world)) {
            if ((body as any).word) {
                const { x, y } = body.position;
                const angle = body.angle;
                context.save();
                context.translate(x, y);
                context.rotate(angle);
                context.fillStyle = (body as any).isHighlighted ? primaryColorHsl : 'white';
                context.fillText((body as any).word, 0, 0);
                context.restore();
            }
        }
      };


      window.addEventListener('resize', handleResize);
      handleResize();
    };

    const cleanup = () => {
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        if (renderRef.current.canvas) {
            renderRef.current.canvas.remove();
        }
        (renderRef.current as any).textures = {};
      }
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };

    const handleInteraction = () => {
        if (!isReady) {
            setIsReady(true);
            init();
        }
    };

    if (trigger === 'load') {
      handleInteraction();
    } else {
      const scene = sceneRef.current;
      if (scene) {
        scene.addEventListener('mouseenter', handleInteraction, { once: true });
        return () => scene.removeEventListener('mouseenter', handleInteraction);
      }
    }

    return cleanup;
  }, [isReady, trigger, text, gravity, fontSize, highlightWords, highlightClass, backgroundColor, wireframes, mouseConstraintStiffness]);

  return <div ref={sceneRef} style={{ width: '100%', height: '150px', cursor: 'grab' }} />;
};

export default FallingText;
