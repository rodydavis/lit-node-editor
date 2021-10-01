import { Store, BaseNode, NodeEdge, ID } from "../store";
import { drawLabel } from "./label";
import { drawLine, getMidPoint, isPointOnLine } from "./line";
import {
  applyDefaultMatrix,
  applyMatrix,
  createMatrix,
  defaultMatrix,
  MatrixContext,
  matrixInfo,
  toWorld,
} from "./matrix";
import { drawRect } from "./rect";
import { Offset, Rect, Size } from "./utils";

/**
 * Editor Canvas
 */
export class Canvas {
  constructor(props?: { canvas?: HTMLCanvasElement; size?: Size }) {
    this.canvas = props?.canvas ?? document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.imageSmoothingEnabled = true;
    this.resize(props?.size);
    this.init();
  }
  canvas: HTMLCanvasElement;
  store = new Store<CanvasNode>();
  action: Action = Action.NONE;
  start?: Offset;
  end?: Offset;
  selection = new Array<ID>();
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
  context: MatrixContext = defaultMatrix;
  ctx: CanvasRenderingContext2D;
  onUpdate = () => {};

  get size(): Size {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }

  init() {
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
    // window.addEventListener("mousewheel", (e) => {
    //   e.preventDefault();
    // });
    window.addEventListener("DOMMouseScroll", (e) => {
      e.preventDefault();
    });

    this.render();
    this.onUpdate();
  }

  render() {
    this.paint();
    requestAnimationFrame(() => this.render());
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
    const { scale, offset, rotation } = matrixInfo(this.context);
    let localRotation = rotation;
    let localScale = scale;
    let localOffset = offset;

    const rotationDelta = (this.lastRotation - e.rotation) * 0.01;
    localRotation -= rotationDelta;
    this.lastRotation = e.rotation;

    const scaleDelta = (this.lastScale - e.scale) * 1;
    localScale -= scaleDelta;
    this.lastScale = e.scale;

    const offsetDelta = {
      x: (this.lastOffset.x - e.clientX) * 0.01,
      y: (this.lastOffset.y - e.clientY) * 0.01,
    };
    localOffset.x -= offsetDelta.x * localScale;
    localOffset.y -= offsetDelta.y * localScale;
    this.lastOffset = { x: e.clientX, y: e.clientY };

    this.context = createMatrix(localOffset, localScale, localRotation);

    this.onUpdate();
    applyMatrix(this.ctx, this.context);
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
    const mouseOffset = toWorld(this.context, point);
    if (this.selection.length > 1) {
      this.action = Action.MOVE;
      return;
    }
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
        this.selection = [nodeId];
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
        for (const id of this.selection) {
          const node = this.store.retrieveNode(id);
          if (node) {
            this.moveNode(node, delta);
          }
        }
      }
      this.pointers.set(pointerId, point);
    }
  }

  onPointerUp(e: PointerEvent) {
    this.canvas.releasePointerCapture(e.pointerId);
    this.pointers.delete(e.pointerId);
    if (this.start && this.end) {
      const start = toWorld(this.context, this.start);
      const end = toWorld(this.context, this.end);
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

    // Select all
    if (e.key === "a" && e.metaKey) {
      this.selection = this.store.nodes.map((n) => n.id);
      this.onUpdate();
    }
  }

  zoom(amount: number) {
    const { scale, offset, rotation } = matrixInfo(this.context);
    let localScale = scale;
    localScale += amount;
    this.context = createMatrix(offset, localScale, rotation);
  }

  pan(delta: Offset) {
    const { offset, scale, rotation } = matrixInfo(this.context);
    let localOffset = offset;
    localOffset.x += delta.x / scale;
    localOffset.y += delta.y / scale;
    this.context = createMatrix(localOffset, scale, rotation);
  }

  rotate(amount: number) {
    const { rotation, offset, scale } = matrixInfo(this.context);
    let localRotation = rotation;
    localRotation += amount;
    this.context = createMatrix(offset, scale, localRotation);
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
    const overlappedEdges = this.store.edges.filter((edge) => {
      const { start, end } = this.getEdgePoints(edge);
      const overlaps = isPointOnLine(start, end, offset);
      return overlaps;
    });
    if (overlappedEdges.length > 0) {
      const topEdge = overlappedEdges[overlappedEdges.length - 1];
      selection.push(topEdge.id);
    }

    return selection;
  }

  get scale(): number {
    const { scale } = matrixInfo(this.context);
    return scale;
  }

  get rotation(): number {
    const { rotation } = matrixInfo(this.context);
    return rotation;
  }

  get offset(): Offset {
    const { offset } = matrixInfo(this.context);
    return offset;
  }

  moveNode(node: CanvasNode, delta: Offset) {
    const { scale } = matrixInfo(this.context);
    node.x += delta.x / scale;
    node.y += delta.y / scale;
    this.store.updateNode(node);
  }

  clear() {
    this.selection = [];
    this.onUpdate();
  }

  paint() {
    applyDefaultMatrix(this.ctx);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    drawRect(this.ctx, {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height,
      fillColor: "whitesmoke",
    });

    applyMatrix(this.ctx, this.context);

    const mouse = this.mouse;
    const mouseOffset = toWorld(this.context, mouse);

    // Draw edges
    for (const edge of this.store.edges) {
      const isSelected = this.selection.includes(edge.id);
      const { start, end, mid } = this.getEdgePoints(edge);

      // Draw line
      const ctx = this.ctx;
      drawLine(ctx, {
        start,
        end,
        strokeColor: isSelected ? "red" : "black",
      });

      // Check if point is anywhere on the line
      const overlaps = isPointOnLine(start, end, mouseOffset);
      if (overlaps && !isSelected) {
        ctx.strokeStyle = "blue";
        ctx.stroke();
      }

      // Draw label
      drawLabel(this.ctx, {
        text: edge.name,
        textAlign: "center",
        x: mid.x,
        y: mid.y,
        fillColor: "black",
      });
    }

    // Draw nodes
    for (const node of this.store.nodes) {
      const isSelected = this.selection.includes(node.id);

      const ctx = this.ctx;
      // Draw label
      drawLabel(ctx, {
        text: node.name,
        x: node.x,
        y: node.y - 5,
        fillColor: "black",
      });

      drawRect(ctx, {
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
        strokeColor: isSelected ? "red" : "black",
        fillColor: "white",
      });

      const overlaps =
        mouseOffset.x >= node.x &&
        mouseOffset.x <= node.x + node.width &&
        mouseOffset.y >= node.y &&
        mouseOffset.y <= node.y + node.height;
      if (overlaps && !isSelected) {
        ctx.strokeStyle = "blue";
        ctx.strokeRect(node.x, node.y, node.width, node.height);
      }
    }

    if (this.start && this.end) {
      const localStart = toWorld(this.context, this.start);
      const localEnd = toWorld(this.context, this.end);

      if (this.action == Action.LINK) {
        // Render line to link
        drawLine(this.ctx, {
          start: localStart,
          end: localEnd,
          strokeColor: "red",
        });
      }
      if (this.action == Action.MARQUEE) {
        // Render marquee
        drawRect(this.ctx, {
          x: Math.min(localStart.x, localEnd.x),
          y: Math.min(localStart.y, localEnd.y),
          width: Math.abs(localStart.x - localEnd.x),
          height: Math.abs(localStart.y - localEnd.y),
          fillColor: "rgba(135, 206, 235, 0.2)",
          strokeColor: "rgba(135, 206, 235, 0.5)",
        });
      }
    }

    if (this.selection.length > 1) {
      const nodes = this.store.nodes.filter((node) =>
        this.selection.includes(node.id)
      );
      const topY = Math.min(...nodes.map((node) => node.y));
      const leftX = Math.min(...nodes.map((node) => node.x));
      const bottomY = Math.max(...nodes.map((node) => node.y + node.height));
      const rightX = Math.max(...nodes.map((node) => node.x + node.width));
      const topLeft: Offset = { x: leftX, y: topY };
      const bottomRight: Offset = { x: rightX, y: bottomY };

      if (topLeft && bottomRight) {
        drawRect(this.ctx, {
          x: topLeft.x,
          y: topLeft.y,
          width: bottomRight.x - topLeft.x,
          height: bottomRight.y - topLeft.y,
          fillColor: "transparent",
          strokeColor: "blue",
        });
      }
    }
  }

  private getEdgePoints(edge: NodeEdge) {
    const startNode = this.store.retrieveNode(edge.startNode)!;
    const endNode = this.store.retrieveNode(edge.endNode)!;
    const createOffset = (node: CanvasNode) => ({
      x: node.x + node.width / 2,
      y: node.y + node.height / 2,
      width: node.width,
      height: node.height,
    });
    const start = createOffset(startNode);
    const end = createOffset(endNode);
    const mid = getMidPoint(start, end);
    return { start, end, mid };
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

type PositionMixin = BaseNode & Rect;

/**
 * Canvas Node
 */
export interface CanvasNode extends PositionMixin {
  backgroundColor?: string;
  type: "node";
}

interface GestureEvent extends MouseEvent {
  rotation: number;
  scale: number;
}
