import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: -1000, y: -1000 };

    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; opacity: number; baseOpacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    for (let i = 0; i < 60; i++) {
      const baseOpacity = Math.random() * 0.12 + 0.03;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2.5 + 0.8,
        opacity: baseOpacity,
        baseOpacity,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle gradient orbs
      const time = Date.now() * 0.0003;
      ctx.globalCompositeOperation = "source-over";
      
      const orb1X = canvas.width * 0.3 + Math.sin(time) * 100;
      const orb1Y = canvas.height * 0.4 + Math.cos(time * 0.7) * 80;
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 300);
      grad1.addColorStop(0, "hsla(170, 75%, 26%, 0.03)");
      grad1.addColorStop(1, "hsla(170, 75%, 26%, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const orb2X = canvas.width * 0.7 + Math.cos(time * 0.8) * 120;
      const orb2Y = canvas.height * 0.6 + Math.sin(time * 0.5) * 100;
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 250);
      grad2.addColorStop(0, "hsla(199, 70%, 50%, 0.025)");
      grad2.addColorStop(1, "hsla(199, 70%, 50%, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // React to mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.opacity = p.baseOpacity + (0.25 * (1 - dist / 200));
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(170, 75%, 26%, ${p.opacity})`;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = 0.06 * (1 - dist / 130);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(170, 75%, 26%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};

export default AnimatedBackground;
