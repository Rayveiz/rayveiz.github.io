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

    for (let i = 0; i < 80; i++) {
      const baseOpacity = Math.random() * 0.25 + 0.08;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 4 + 1.5,
        opacity: baseOpacity,
        baseOpacity,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.0003;

      // Large floating gradient orbs
      const orbs = [
        { cx: 0.25, cy: 0.3, sx: 1, sy: 0.7, radius: 400, color: "170, 75%, 26%", alpha: 0.07 },
        { cx: 0.75, cy: 0.6, sx: 0.8, sy: 0.5, radius: 350, color: "199, 70%, 50%", alpha: 0.06 },
        { cx: 0.5, cy: 0.8, sx: 0.6, sy: 0.9, radius: 300, color: "170, 60%, 35%", alpha: 0.05 },
      ];

      orbs.forEach((orb) => {
        const x = canvas.width * orb.cx + Math.sin(time * orb.sx) * 150;
        const y = canvas.height * orb.cy + Math.cos(time * orb.sy) * 120;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.radius);
        grad.addColorStop(0, `hsla(${orb.color}, ${orb.alpha})`);
        grad.addColorStop(0.6, `hsla(${orb.color}, ${orb.alpha * 0.4})`);
        grad.addColorStop(1, `hsla(${orb.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          p.opacity = p.baseOpacity + (0.5 * (1 - dist / 250));
          // Push particles away from cursor slightly
          p.x += dx * 0.008;
          p.y += dy * 0.008;
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.03;
        }

        // Glow effect
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        glow.addColorStop(0, `hsla(170, 75%, 36%, ${p.opacity * 0.6})`);
        glow.addColorStop(1, `hsla(170, 75%, 36%, 0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(p.x - p.r * 3, p.y - p.r * 3, p.r * 6, p.r * 6);

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(170, 75%, 40%, ${p.opacity})`;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = 0.15 * (1 - dist / 160);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(170, 75%, 36%, ${alpha})`;
            ctx.lineWidth = 0.8;
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
