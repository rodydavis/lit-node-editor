/**
 * X and y
 */
export interface Offset {
  x: number;
  y: number;
}

/**
 * Width and height
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * Rect with offset and size
 */
export type Rect = Offset & Size;

/**
 * Color for outline and fill
 */
export interface ColorMixin {
  fillColor?: string;
  strokeColor?: string;
}
