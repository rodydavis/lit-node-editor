import { Store, BaseNode, NodeEdge, ID } from "./store";

/**
 * Editor Canvas
 */
export class Canvas {
  constructor(props?: { canvas?: HTMLCanvasElement; size?: Size }) {
    this.canvas = props?.canvas ?? document.createElement("canvas");
    this.resize(props?.size);
    this.init();
  }
  canvas: HTMLCanvasElement;
  store = new Store<CanvasNode>();
  offset: Offset = { x: 0, y: 0 };
  rotation = 0;
  scale = 1;
  action: Action = Action.NONE;
  start?: Offset;
  end?: Offset;
  selection = new Array<ID>();
  matrix = [1, 0, 0, 1, 0, 0];
  invMatrix = [1, 0, 0, 1];
  pointers: Map<number, Offset> = new Map();
  mouse: Offset = { x: 0, y: 0 };
  minScale = 0.1;
  maxScale = 4.0;
  gestureEvents = false;
  lastScale = -1;
  lastRotation = -1;
  lastOffset: Offset = { x: 0, y: 0 };
  rotationEnabled = true;
  zoomEnabled = true;
  panEnabled = true;
  movingNodeId?: string;
  onUpdate = () => {};

  get ctx(): CanvasRenderingContext2D {
    const ctx = this.canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = true;
    return ctx;
  }

  get size(): Size {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }

  init() {
    this.render();
    // Mouse Events
    this.canvas.addEventListener(
      "contextmenu",
      (e) => e.preventDefault(),
      false
    );
    this.canvas.addEventListener("wheel", (e) => this.onWheel(e), false);

    // Pointer Events
    this.canvas.addEventListener(
      "pointerdown",
      (e) => this.onPointerDown(e),
      false
    );
    this.canvas.addEventListener(
      "pointerover",
      (e) => this.onPointerMove(e),
      false
    );
    this.canvas.addEventListener(
      "pointermove",
      (e) => this.onPointerMove(e),
      false
    );
    this.canvas.addEventListener(
      "pointerup",
      (e) => this.onPointerUp(e),
      false
    );
    this.canvas.addEventListener(
      "pointerleave",
      (e) => this.onPointerUp(e),
      false
    );
    this.canvas.addEventListener(
      "pointercancel",
      (e) => this.onPointerUp(e),
      false
    );
    this.canvas.addEventListener(
      "mousemove",
      (e) => this.onMouseMove(e),
      false
    );
    this.canvas.addEventListener(
      "mousedown",
      (e) => this.onMouseDown(e),
      false
    );
    this.canvas.addEventListener("mouseup", (e) => this.onMouseUp(e), false);

    // Gesture Events
    this.canvas.addEventListener(
      "gesturestart",
      (e) => this.onGestureStart(e as GestureEvent),
      false
    );
    this.canvas.addEventListener(
      "gesturechange",
      (e) => this.onGestureChange(e as GestureEvent),
      false
    );
    this.canvas.addEventListener(
      "gestureend",
      (e) => this.onGestureEnd(e as GestureEvent),
      false
    );

    // Keyboard Events
    window.addEventListener("keydown", (e) => this.onKeyDown(e));
    window.addEventListener("mousewheel", (e) => {
      // e.preventDefault();
    });
    window.addEventListener("DOMMouseScroll", (e) => {
      e.preventDefault();
    });
  }

  onWheel(e: WheelEvent) {
    e.preventDefault();
    if (this.gestureEvents) return;
    if (e.ctrlKey) {
      this.action = Action.ZOOM;
      const scale = -e.deltaY * 0.01;
      this.zoom(scale);
    } else {
      this.action = Action.PAN;
      const offset = { x: -e.deltaX * 2, y: -e.deltaY * 2 };
      this.pan(offset);
    }
    this.onUpdate();
    this.action = Action.NONE;
  }

  onGestureStart(e: GestureEvent) {
    e.preventDefault();
    this.gestureEvents = true;
    this.lastScale = e.scale;
    this.lastRotation = e.rotation;
    this.lastOffset = { x: e.clientX, y: e.clientY };
  }

  onGestureChange(e: GestureEvent) {
    e.preventDefault();
    this.gestureEvents = true;

    const rotationDelta = (this.lastRotation - e.rotation) * 0.01;
    this.rotation -= rotationDelta;
    this.lastRotation = e.rotation;

    const scaleDelta = (this.lastScale - e.scale) * 1;
    this.scale -= scaleDelta;
    this.lastScale = e.scale;

    const offsetDelta = {
      x: (this.lastOffset.x - e.clientX) * 0.01,
      y: (this.lastOffset.y - e.clientY) * 0.01,
    };
    this.offset.x -= offsetDelta.x * this.scale;
    this.offset.y -= offsetDelta.y * this.scale;
    this.lastOffset = { x: e.clientX, y: e.clientY };

    this.onUpdate();
    this.applyMatrix();
  }

  onGestureEnd(e: GestureEvent) {
    e.preventDefault();
    this.gestureEvents = false;
  }

  onMouseUp(e: MouseEvent) {
    this.mouse = { x: e.offsetX, y: e.offsetY };
  }

  onMouseDown(e: MouseEvent) {
    this.mouse = { x: e.offsetX, y: e.offsetY };
  }

  onMouseMove(e: MouseEvent) {
    this.mouse = { x: e.offsetX, y: e.offsetY };
  }

  onPointerDown(e: PointerEvent) {
    const point = { x: e.offsetX, y: e.offsetY };
    this.pointers.set(e.pointerId, point);
    this.canvas.setPointerCapture(e.pointerId);
    this.start = point;
    this.end = point;
    const mouseOffset = this.toWorld(point.x, point.y);
    const nodes = this.selectOffset(mouseOffset, this.selection, e.shiftKey);
    if (nodes.length === 0) {
      this.selection = [];
      this.onUpdate();
    }
    this.action =
      nodes.length > 0
        ? e.shiftKey
          ? Action.LINK
          : Action.MOVE
        : Action.MARQUEE;
    if (nodes.length > 0) {
      const nodeId = nodes[nodes.length - 1];
      if (this.action === Action.MOVE) {
        this.movingNodeId = nodeId;
      }
    }
  }

  onPointerMove(e: PointerEvent) {
    const point = { x: e.offsetX, y: e.offsetY };
    const pointerId = e.pointerId;
    const pointer = this.pointers.get(pointerId);
    if (pointer) {
      const delta = {
        x: point.x - pointer.x,
        y: point.y - pointer.y,
      };
      this.end = point;
      if (this.action === Action.MOVE) {
        const node = this.store.retrieveNode(this.movingNodeId!);
        if (node) {
          this.moveNode(node, delta);
        }
      }
      this.pointers.set(pointerId, point);
    }
  }

  onPointerUp(e: PointerEvent) {
    this.canvas.releasePointerCapture(e.pointerId);
    this.pointers.delete(e.pointerId);
    if (this.start && this.end) {
      const start = this.toWorld(this.start.x, this.start.y);
      const end = this.toWorld(this.end.x, this.end.y);
      const topLeft = {
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
      };
      const bottomRight = {
        x: Math.max(start.x, end.x),
        y: Math.max(start.y, end.y),
      };
      if (this.action === Action.LINK) {
        const multi = e.shiftKey;
        const startType = this.checkOffsetType(start, multi);
        const endType = this.checkOffsetType(end, multi);
        console.log(Action[this.action], multi, startType, endType);
        if (startType === "node" && endType === "node") {
          const startNode = this.getOffset(start, multi) as CanvasNode;
          const endNode = this.getOffset(end, multi) as CanvasNode;
          this.store.linkNodes(startNode, endNode, "simple");
        }
      } else if (this.action === Action.MARQUEE) {
        if (e.shiftKey) {
          this.selection = [];
        }
        const overlappingRect: Rect = {
          x: topLeft.x,
          y: topLeft.y,
          width: bottomRight.x - topLeft.x,
          height: bottomRight.y - topLeft.y,
        };
        // Check if any nodes are selected by overlapping rect
        const nodes = this.store.nodes;
        const selectedNodes: CanvasNode[] = [];
        for (const node of nodes) {
          // Check if node overlaps rect
          const nodeRect = {
            x: node.x,
            y: node.y,
            width: node.width,
            height: node.height,
          };
          if (
            nodeRect.x < overlappingRect.x + overlappingRect.width &&
            nodeRect.x + nodeRect.width > overlappingRect.x &&
            nodeRect.y < overlappingRect.y + overlappingRect.height &&
            nodeRect.y + nodeRect.height > overlappingRect.y
          ) {
            selectedNodes.push(node);
          }
        }
        for (const node of selectedNodes) {
          this.selection.push(node.id);
        }
      } else {
        this.selection = this.selectOffset(end, this.selection, e.shiftKey);
        this.onUpdate();
      }
    }
    this.start = undefined;
    this.end = undefined;
    this.movingNodeId = undefined;
    this.action = Action.NONE;
    this.onUpdate();
  }

  getOffset(offset: Offset, multi: boolean): CanvasNode | undefined {
    const selection = this.selectOffset(offset, this.selection, multi);
    if (selection.length > 1) {
      const node = this.store.retrieveNode(selection[selection.length - 1]);
      if (node) return node;
    }
    return undefined;
  }

  checkOffsetType(offset: Offset, multi: boolean): "none" | "node" | "link" {
    const node = this.getOffset(offset, multi);
    if (node) return node.type;
    return "none";
  }

  onKeyDown(e: KeyboardEvent) {
    // Delete current selection
    if (e.key === "Backspace" || e.key === "Delete") {
      this.deleteSelection();
    }
    // Zoom canvas
    const zoomStep = 0.1;
    if (e.key === "+" || e.key === "=") {
      this.zoom(zoomStep);
    }
    if (e.key === "-") {
      this.zoom(-zoomStep);
    }

    // Move with arrow keys
    const moveStep = 10;
    if (e.key === "ArrowUp") {
      this.pan({ x: 0, y: -moveStep });
    }
    if (e.key === "ArrowDown") {
      this.pan({ x: 0, y: moveStep });
    }
    if (e.key === "ArrowLeft") {
      this.pan({ x: -moveStep, y: 0 });
    }
    if (e.key === "ArrowRight") {
      this.pan({ x: moveStep, y: 0 });
    }
  }

  zoom(amount: number) {
    this.scale += amount;
    if (this.scale <= this.minScale) {
      this.scale = this.minScale;
      return;
    }
    if (this.scale >= this.maxScale) {
      this.scale = this.maxScale;
      return;
    }
  }

  pan(delta: Offset) {
    this.offset.x += delta.x / this.scale;
    this.offset.y += delta.y / this.scale;
  }

  import(value: string) {
    this.store = Store.fromJson<CanvasNode>(value);
  }

  deleteNode(node: CanvasNode) {
    this.store.deleteNode(node.id);
    this.clear();
    this.onUpdate();
  }

  deleteEdge(edge: NodeEdge) {
    this.store.deleteEdge(edge.id);
    this.clear();
    this.onUpdate();
  }

  resize(size?: Size) {
    const width = size?.width ?? window.innerWidth;
    const height = size?.height ?? window.innerHeight;
    this.canvas.setAttribute("width", `${width}px`);
    this.canvas.setAttribute("height", `${height}px`);
    this.canvas.width = width;
    this.canvas.height = height;
  }

  deleteSelection() {
    console.log("delete selection", this.selection);
    for (const id of this.selection) {
      const node = this.store.retrieveNode(id);
      if (node) this.store.deleteNode(node.id);
      const edge = this.store.retrieveEdge(id);
      if (edge) this.store.deleteEdge(edge.id);
    }
    this.selection = [];
    this.onUpdate();
  }

  selectOffset(offset: Offset, nodes: string[], multi: boolean) {
    let selection = [...nodes];
    // Clear selection
    if (!multi) selection = [];

    // Check current offset for selection
    const overlappedNodes = this.store.nodes.filter((node) => {
      const overlaps =
        offset.x >= node.x &&
        offset.x <= node.x + node.width &&
        offset.y >= node.y &&
        offset.y <= node.y + node.height;
      return overlaps;
    });
    const overlappedEdges = this.store.edges.filter((edge) => {
      const { start, end } = this.getEdgePoints(edge);
      const overlaps = isPointOnLine(this.ctx, start, end, offset);
      return overlaps;
    });

    // Select nodes
    if (overlappedNodes.length > 0) {
      const topNode = overlappedNodes[overlappedNodes.length - 1];
      selection.push(topNode.id);
    }

    // If shift is not selected return early
    if (!multi && selection.length > 0) {
      return selection;
    }

    // Select edges
    if (overlappedEdges.length > 0) {
      const topEdge = overlappedEdges[overlappedEdges.length - 1];
      selection.push(topEdge.id);
    }
    // Return selection
    return selection;
  }

  moveNode(node: CanvasNode, delta: Offset) {
    node.x += delta.x / this.scale;
    node.y += delta.y / this.scale;
    this.store.updateNode(node);
  }

  clear() {
    this.selection.splice(0, this.selection.length);
    this.onUpdate();
  }

  render() {
    this.paint();
    requestAnimationFrame(() => this.render());
  }

  paint() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    renderBackground(this.ctx, this.canvas.width, this.canvas.height);
    this.applyMatrix();
    this.renderEdges();
    this.renderNodes();

    if (this.start && this.end) {
      const localStart = this.toWorld(this.start!.x, this.start!.y);
      const localEnd = this.toWorld(this.end!.x, this.end!.y);

      if (this.action == Action.LINK) {
        // Render line to link
        drawLine(this.ctx, localStart, localEnd, "red");
      }
      if (this.action == Action.MARQUEE) {
        // Render marquee
        drawMarquee(this.ctx, localStart, localEnd);
      }
    }
  }

  setMatrix(offset: Offset, scale: number, rotation: number) {
    this.offset = offset;
    this.scale = scale;
    this.rotation = rotation;
    this.applyMatrix();
  }

  applyMatrix() {
    const offset = this.panEnabled ? this.offset : { x: 0, y: 0 };
    const scale = this.zoomEnabled ? this.scale : 1;
    const rotation = this.rotationEnabled ? this.rotation : 0;
    const { matrix: m } = this.createMatrix(
      offset.x,
      offset.y,
      scale,
      rotation
    );
    this.ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
  }

  // Pulled from here: https://stackoverflow.com/a/34598847/7303311
  createMatrix(x: number, y: number, scale: number, rotate: number) {
    const m = this.matrix;
    const im = this.invMatrix;
    m[3] = m[0] = Math.cos(rotate) * scale;
    m[2] = -(m[1] = Math.sin(rotate) * scale);
    m[4] = x;
    m[5] = y;
    const cross = m[0] * m[3] - m[1] * m[2];
    im[0] = m[3] / cross;
    im[1] = -m[1] / cross;
    im[2] = -m[2] / cross;
    im[3] = m[0] / cross;
    return {
      matrix: this.matrix,
      invMatrix: this.invMatrix,
    };
  }

  // Pulled from here: https://stackoverflow.com/a/34598847/7303311
  toWorld(x: number, y: number) {
    let xx, yy, m;
    m = this.invMatrix;
    xx = x - this.matrix[4];
    yy = y - this.matrix[5];
    return {
      x: xx * m[0] + yy * m[2],
      y: xx * m[1] + yy * m[3],
    };
  }

  private renderNodes() {
    const mouse = this.mouse;
    const mouseOffset = this.toWorld(mouse.x, mouse.y);
    const hoveredNodes = this.store.nodes.filter((node) => {
      const overlaps =
        mouseOffset.x >= node.x &&
        mouseOffset.x <= node.x + node.width &&
        mouseOffset.y >= node.y &&
        mouseOffset.y <= node.y + node.height;
      return overlaps;
    });

    for (const node of this.store.nodes) {
      const isSelected = this.selection.includes(node.id);
      const isHovered = [...hoveredNodes].pop()?.id === node.id ?? false;

      renderCanvasNode(this.ctx, node, {
        isSelected,
        isHovered,
      });
    }
  }

  private renderEdges() {
    const mouse = this.mouse;
    const mouseOffset = this.toWorld(mouse.x, mouse.y);
    const hoveredEdges = this.store.edges.filter((edge) => {
      const { start, end } = this.getEdgePoints(edge);
      const overlaps = isPointOnLine(this.ctx, start, end, mouseOffset);
      return overlaps;
    });

    for (const edge of this.store.edges) {
      const isSelected = this.selection.includes(edge.id);
      const { start, end, mid } = this.getEdgePoints(edge);
      const isHovered = [...hoveredEdges].pop()?.id === edge.id ?? false;

      // Draw line
      drawLine(
        this.ctx,
        start,
        end,
        isSelected ? "red" : isHovered ? "blue" : "black"
      );

      // Draw label
      drawLabel(this.ctx, edge.name, { textAlign: "center", offset: mid });
    }
  }

  private getEdgePoints(edge: NodeEdge) {
    const startNode = this.store.retrieveNode(edge.startNode)!;
    const endNode = this.store.retrieveNode(edge.endNode)!;
    const start = {
      x: startNode.x + startNode.width / 2,
      y: startNode.y + startNode.height / 2,
      width: startNode.width,
      height: startNode.height,
    };
    const end = {
      x: endNode.x + endNode.width / 2,
      y: endNode.y + endNode.height / 2,
      width: endNode.width,
      height: endNode.height,
    };
    const mid = {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
    };
    return {
      start,
      end,
      mid,
    };
  }
}

enum Action {
  NONE,
  ZOOM,
  PAN,
  MOVE,
  LINK,
  MARQUEE,
}

interface Offset {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

type Rect = Offset & Size;

type PositionMixin = BaseNode & Rect;

/**
 * Canvas Node
 */
export interface CanvasNode extends PositionMixin {
  backgroundColor?: string;
  type: "node";
}

function renderCanvasNode(
  ctx: CanvasRenderingContext2D,
  node: CanvasNode,
  options?: {
    isSelected?: boolean;
    isHovered?: boolean;
  }
) {
  // Draw label
  // ctx.moveTo(node.x, node.y - 5);
  drawLabel(ctx, node.name, {
    offset: { x: node.x, y: node.y - 5 },
  });

  // Draw stats
  // ctx.moveTo(node.x, node.y + node.height + 5);
  const offset = `(${node.x.toFixed(2)},${node.y.toFixed(2)})`;
  const size = `${node.width}x${node.height}`;
  drawLabel(ctx, `${offset} - ${size}`, {
    offset: { x: node.x, y: node.y + node.height + 10 },
  });

  // ctx.moveTo(node.x, node.y);

  // Draw background
  ctx.fillStyle = node?.backgroundColor ?? "white";
  ctx.fillRect(node.x, node.y, node.width, node.height);

  // Draw outline
  const isSelected = options?.isSelected ?? false;
  const isHovered = options?.isHovered ?? false;
  ctx.strokeStyle = isSelected ? "red" : isHovered ? "blue" : "black";
  ctx.strokeRect(node.x, node.y, node.width, node.height);
}

function drawLabel(
  ctx: CanvasRenderingContext2D,
  name: string,
  options?: {
    color?: string;
    textAlign?: "left" | "center" | "right";
    offset?: Offset;
    maxWidth?: number;
  }
): Size {
  const size = 10;
  const lineHeight = 1.2;
  ctx.font = `${size}px ${lineHeight}em Arial`;
  ctx.textAlign = options?.textAlign ?? "left";
  ctx.fillStyle = options?.color ?? "black";
  const x = options?.offset?.x ?? 0;
  const y = options?.offset?.y ?? 0;
  const maxWidth = options?.maxWidth ?? undefined;
  ctx.fillText(name, x, y, maxWidth);
  const metrics = ctx.measureText(name);
  const height = size * lineHeight;
  return { height, width: metrics.width };
}

function renderBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  ctx.fillStyle = "whitesmoke";
  ctx.fillRect(0, 0, width, height);
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  start: Offset,
  end: Offset,
  color: string = "black"
) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

function renderRect(
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  options?: {
    color?: string;
  }
) {
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  const color = options?.color ?? "red";
  ctx.fillStyle = color;
  ctx.fill();
}

function isPointOnLine(
  ctx: CanvasRenderingContext2D,
  start: Offset,
  end: Offset,
  point: Offset
) {
  ctx.beginPath();
  ctx.strokeStyle = "transparent";
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  return ctx.isPointInStroke(point.x, point.y);
}

function drawMarquee(
  ctx: CanvasRenderingContext2D,
  start: Offset,
  end: Offset
) {
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 1, 0.2)";
  ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
  ctx.fill();
}

interface GestureEvent extends MouseEvent {
  rotation: number;
  scale: number;
}
