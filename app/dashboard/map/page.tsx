"use client";
import { useEffect, useMemo } from "react";

const rows = 10;
const cols = 10;

const data = Array.from({ length: rows }, (_, y) =>
  Array.from({ length: cols }, (_, x) => ({
    health: Number(Math.random().toFixed(2)),
    name: `Unit ${y * cols + x + 1}`,
  }))
);

export default function Map() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      for (let j = 0; j < row.length; j++) {
        const unit = row[j];
        const x = j * 50 + 25;
        const y = i * 50 + 25;
        ctx.fillStyle = `rgba(0, 255, 0, ${unit.health})`;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, []);

  return (
    <canvas id="canvas" width="500" height="500" className="tw-bg-red"></canvas>
  );
}
