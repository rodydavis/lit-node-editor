import { Offset } from "./utils";

/**
 * Matrix
 */
export type Matrix = number[];

const DEFAULT_MATRIX: Matrix = [1, 0, 0, 1, 0, 0];
const DEFAULT_INVERSE_MATRIX: Matrix = [1, 0, 0, 1];

/**
 * Matrix context
 */
export interface MatrixContext {
  matrix: Matrix;
  inverseMatrix: Matrix;
}

/**
 * Default matrix context
 */
export const defaultMatrix = createMatrix({ x: 0, y: 0 }, 1, 0);

/**
 * Create a matrix and inverse matrix
 *
 * @param offset - offset
 * @param scale - scale factor
 * @param rotation - in radians
 *
 * @link https://stackoverflow.com/a/34598847/7303311
 */
export function createMatrix(
  offset: Offset,
  scale: number,
  rotation: number
): MatrixContext {
  const m = [...DEFAULT_MATRIX];
  const im = [...DEFAULT_INVERSE_MATRIX];
  m[3] = m[0] = Math.cos(rotation) * scale;
  m[2] = -(m[1] = Math.sin(rotation) * scale);
  m[4] = offset.x;
  m[5] = offset.y;
  const cross = m[0] * m[3] - m[1] * m[2];
  im[0] = m[3] / cross;
  im[1] = -m[1] / cross;
  im[2] = -m[2] / cross;
  im[3] = m[0] / cross;
  return {
    matrix: m,
    inverseMatrix: im,
  };
}

/**
 * Create a local offset from a global offset
 *
 * @param matrix - matrix
 * @param inverseMatrix - inverse matrix
 * @param offset - offset
 *
 * @link https://stackoverflow.com/a/34598847/7303311
 */
export function toWorld(context: MatrixContext, offset: Offset): Offset {
  let xx, yy, m;
  m = context.inverseMatrix;
  xx = offset.x - context.matrix[4];
  yy = offset.y - context.matrix[5];
  const localX = xx * m[0] + yy * m[2];
  const localY = xx * m[1] + yy * m[3];
  return {
    x: localX,
    y: localY,
  };
}

/**
 * Matrix info
 *
 * @param matrix - matrix
 * @returns scale, offset, rotation
 */
export function matrixInfo(context: MatrixContext) {
  const rotation = rotationFromMatrix(context);
  const { scale } = scaleFromMatrix(context);
  const offset = offsetFromMatrix(context);
  return {
    rotation,
    scale,
    offset,
  };
}

/**
 * Get rotation from matrix
 *
 * @param matrix - matrix
 * @returns rotation in radians
 */
export function rotationFromMatrix(context: MatrixContext) {
  const matrix = context.matrix;
  const rad = Math.atan2(matrix[1], matrix[0]);
  return rad;
}

/**
 * Get scale factor from matrix
 *
 * @param matrix - matrix
 * @returns scale factor
 */
export function scaleFromMatrix(context: MatrixContext): {
  scaleX: number;
  scaleY: number;
  scale: number;
} {
  const matrix = context.matrix;
  const scaleX = Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
  const scaleY = Math.sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]);
  return {
    scaleX,
    scaleY,
    scale: Math.max(scaleX, scaleY),
  };
}

/**
 * Get offset from matrix
 *
 * @param matrix - matrix
 * @returns offset
 */
export function offsetFromMatrix(context: MatrixContext) {
  const matrix = context.matrix;
  return {
    x: matrix[4],
    y: matrix[5],
  };
}

/**
 * Apply matrix to canvas
 *
 * @param ctx - canvas context
 * @param matrix - matrix
 */
export function applyMatrix(
  ctx: CanvasRenderingContext2D,
  context: MatrixContext
) {
  const m = context.matrix;
  ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
}

/**
 * Apply default matrix to canvas
 *
 * @param ctx - canvas context
 */
export function applyDefaultMatrix(ctx: CanvasRenderingContext2D) {
  const m = DEFAULT_MATRIX;
  ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
}

/**
 * Get matrix from canvas
 *
 * @param ctx - canvas context
 * @returns Matrix context
 */
export function getMatrixFromCanvas(
  ctx: CanvasRenderingContext2D
): MatrixContext {
  const transform = ctx.getTransform();
  const m = [...DEFAULT_MATRIX];
  const im = [...DEFAULT_INVERSE_MATRIX];
  m[0] = transform.a;
  m[1] = transform.b;
  m[2] = transform.c;
  m[3] = transform.d;
  m[4] = transform.e;
  m[5] = transform.f;
  const cross = m[0] * m[3] - m[1] * m[2];
  im[0] = m[3] / cross;
  im[1] = -m[1] / cross;
  im[2] = -m[2] / cross;
  im[3] = m[0] / cross;
  return {
    matrix: m,
    inverseMatrix: im,
  };
}
