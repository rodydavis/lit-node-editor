import { ColorMixin, Rect } from "./utils";

interface RectOptions extends Rect, ColorMixin {}

/**
 * Draw a rectangle on the canvas
 *
 * @param ctx Canvas context
 * @param options Options for the rectangle
 */
export function drawRect(ctx: CanvasRenderingContext2D, options: RectOptions) {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fillColor,
    strokeColor,
  } = options;
  ctx.rect(x, y, width, height);

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
  }

  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(x, y, width, height);
  }
}
