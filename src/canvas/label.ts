import { ColorMixin, Offset, Size } from "./utils";

interface LabelOptions extends Offset, ColorMixin {
  text: string;
  maxWidth?: number;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: "normal" | "italic" | "oblique" | "initial" | "inherit";
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;
  textBaseline?:
    | "top"
    | "hanging"
    | "middle"
    | "alphabetic"
    | "ideographic"
    | "bottom";
}

const DEFAULT_TEXT_HEIGHT = 8;

export function drawLabel(
  ctx: CanvasRenderingContext2D,
  options: LabelOptions
): Size {
  const {
    x = 0,
    y = 0,
    maxWidth,
    fontFamily = "Roboto",
    fontSize = DEFAULT_TEXT_HEIGHT,
    fontStyle = "normal",
    fontWeight = "normal",
    textAlign = "left",
    textBaseline = "alphabetic",
    lineHeight = 1.2,
    text,
    fillColor,
    strokeColor,
  } = options;
  ctx.save();
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${lineHeight}em ${fontFamily}`;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillText(text, x, y, maxWidth);
  }

  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.strokeText(text, x, y, maxWidth);
  }

  ctx.restore();

  // Measure the text
  const metrics = ctx.measureText(options.text);
  const height = fontSize * lineHeight;
  return { height, width: metrics.width };
}
