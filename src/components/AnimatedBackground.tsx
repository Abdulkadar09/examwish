import React, { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Stars
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      speed: Math.random() * 0.02 + 0.01,
      dir: Math.random() > 0.5 ? 1 : -1
    }));

    // Circles
    const circles = Array.from({ length: 4 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 200 + 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    // Floating Plus
    const crosses = Array.from({ length: 15 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 5,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.1 + 0.05
    }));

    let animationFrameId: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw large circles
      circles.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;
        
        if (c.x < -c.r) c.x = width + c.r;
        if (c.x > width + c.r) c.x = -c.r;
        if (c.y < -c.r) c.y = height + c.r;
        if (c.y > height + c.r) c.y = -c.r;

        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
        grad.addColorStop(0, 'rgba(22, 197, 197, 0.04)');
        grad.addColorStop(1, 'rgba(22, 197, 197, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw stars
      ctx.fillStyle = '#ffffff';
      stars.forEach(s => {
        s.opacity += s.speed * s.dir;
        if (s.opacity > 1) { s.opacity = 1; s.dir = -1; }
        if (s.opacity < 0.2) { s.opacity = 0.2; s.dir = 1; }
        
        ctx.globalAlpha = s.opacity;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw crosses
      ctx.strokeStyle = '#16c5c5';
      ctx.lineWidth = 1.5;
      crosses.forEach(c => {
        c.y -= c.speed;
        if (c.y < -20) {
          c.y = height + 20;
          c.x = Math.random() * width;
        }
        
        ctx.globalAlpha = c.opacity;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y - c.size / 2);
        ctx.lineTo(c.x, c.y + c.size / 2);
        ctx.moveTo(c.x - c.size / 2, c.y);
        ctx.lineTo(c.x + c.size / 2, c.y);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0" 
      />
      {/* ECG Line Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.03]">
        <svg viewBox="0 0 1000 200" className="w-[150vw] h-[30vh]" preserveAspectRatio="none">
          <path 
            d="M 0 100 L 400 100 L 420 50 L 440 150 L 460 30 L 480 180 L 500 100 L 1000 100" 
            fill="none" 
            stroke="#16c5c5" 
            strokeWidth="4" 
            strokeDasharray="1000"
            className="animate-[dash_3s_linear_infinite]"
          />
        </svg>
      </div>
      <style>{`
        @keyframes dash {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: -1000; }
        }
      `}</style>
    </>
  );
}
