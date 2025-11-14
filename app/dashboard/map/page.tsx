"use client";
import { useEffect, useMemo } from "react";

const rows = 50;
const cols = 50;

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

    const rootStyles = getComputedStyle(document.documentElement);

    const mapColors = {
      danger: rootStyles.getPropertyValue("--map-danger"),
      warning: rootStyles.getPropertyValue("--map-warning"),
      normal: rootStyles.getPropertyValue("--map-normal"),
    };

    console.log("Map Colors:", mapColors);

    function getTileColor(health: number) {
      if (health > 0.7) return mapColors.danger;
      if (health > 0.4) return mapColors.warning;
      return mapColors.normal;
    }

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      for (let j = 0; j < row.length; j++) {
        const unit = row[j];
        const x = j * 11 + 25;
        const y = i * 11 + 25;
        ctx.fillStyle = getTileColor(unit.health);
        ctx.beginPath();
        ctx.rect(x, y, 10, 10);
        ctx.fill();
      }
    }
  }, []);

  return (
    <canvas id="canvas" width="500" height="500" className="tw-bg-red"></canvas>
  );
}
