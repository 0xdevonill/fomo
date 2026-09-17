"use client";

import { useEffect, useRef } from "react";

export function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const dots: { x: number; y: number; s: number; p: number }[] = [];

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots.length = 0;
      const cols = Math.ceil(window.innerWidth / 28);
      const rows = Math.ceil(window.innerHeight / 28);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if ((x + y) % 3 !== 0) continue;
          dots.push({
            x: x * 28 + 8,
            y: y * 28 + 8,
            s: 1.2 + ((x * 7 + y * 13) % 3) * 0.4,
            p: (x * 0.17 + y * 0.11) % 1,
          });
        }
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const theme = document.documentElement.dataset.theme;
      const light = theme === "light";
      for (const d of dots) {
        const pulse = 0.18 + 0.22 * (0.5 + 0.5 * Math.sin(t * 0.0007 + d.p * 12));
        ctx.fillStyle = light
          ? `rgba(35, 122, 82, ${pulse * 0.35})`
          : `rgba(200, 207, 209, ${pulse * 0.22})`;
        ctx.fillRect(d.x, d.y, d.s, d.s);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} className="bg-field" aria-hidden />
      <div className="bg-wash" aria-hidden />
    </>
  );
}
