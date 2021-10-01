import { ColorMixin, Offset } from "./utils";

interface LineOptions extends ColorMixin {
  start: Offset;
  end: Offset;
}

/**
 * Render a line between two points
 *
 * @param ctx Canvas context
 * @param options Line options
 */
export function drawLine(ctx: CanvasRenderingContext2D, options: LineOptions) {
  const { start, end, fillColor, strokeColor } = options;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Check if a point is inside a line
 *
 * @param start Start point
 * @param end End point
 * @param target Offset to check
 * @param tolerance Tolerance
 */
export function isPointOnLine(
  start: Offset,
  end: Offset,
  target: Offset,
  tolerance = 1
): boolean {
  // if line is vertical
  if (start.x === end.x) {
    return Math.abs(target.x - start.x) <= tolerance;
  }

  // if line is horizontal
  if (start.y === end.y) {
    return Math.abs(target.y - start.y) <= tolerance;
  }

  // if line is diagonal
  const slope = (end.y - start.y) / (end.x - start.x);
  const intercept = start.y - slope * start.x;
  const y = slope * target.x + intercept;
  return Math.abs(y - target.y) <= tolerance;
}

/**
 * Calculate the midpoint of a line
 *
 * @param start Start point
 * @param end End point
 * @returns Midpoint
 */
export function getMidPoint(start: Offset, end: Offset): Offset {
  return {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };
}
