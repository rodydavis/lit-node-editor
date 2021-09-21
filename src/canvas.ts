import { Store, BaseNode, NodeEdge, ID } from "./store";

/**
 * Editor Canvas
 */
export class Canvas {
  constructor(props?: { canvas?: HTMLCanvasElement; size?: Size }) {
    this.canvas = props?.canvas ?? document.createElement("canvas");
    this.resize(props?.size);
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.imageSmoothingEnabled = true;
    this.init();
  }
  canvas: HTMLCanvasElement;
  size!: Size;
  store = new Store<CanvasNode>();
  offset: Offset = { x: 0, y: 0 };
  rotation = 0;
  scale = 1;
  action: Action = Action.NONE;
  start?: Offset;
  end?: Offset;
  ctx: CanvasRenderingContext2D;
  selectedNodes = new Array<ID>();
  selectedEdges = new Array<ID>();
  hoveredNodes = new Array<ID>();
  matrix = [1, 0, 0, 1, 0, 0];
  invMatrix = [1, 0, 0, 1];
  shiftPressed = false;
  onUpdate = () => {};

  init() {
    this.render();
    this.canvas.addEventListener(
      "contextmenu",
      (e) => e.preventDefault(),
      false
    );
    this.canvas.addEventListener("wheel", (e) => this.onWheel(e), false);
    this.canvas.addEventListener(
      "mousedown",
      (e) => this.onMouseDown(e),
      false
    );
    this.canvas.addEventListener(
      "mousemove",
      (e) => this.onMouseMove(e),
      false
    );
    this.canvas.addEventListener("mouseup", (e) => this.onMouseUp(e), false);
    window.addEventListener("keydown", (e) => {
      this.shiftPressed = e.shiftKey;
    });
    window.addEventListener("keyup", (_) => {
      this.shiftPressed = false;
    });
  }

  import(value: string) {
    this.store = Store.fromJson<CanvasNode>(value);
  }

  deleteNode(node: CanvasNode) {
    this.store.deleteNode(node.id);
    this.clear();
  }

  deleteEdge(edge: NodeEdge) {
    this.store.deleteEdge(edge.id);
    this.clearLinks();
    this.onUpdate();
  }

  resize(size?: Size) {
    this.size = size ?? {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.canvas.setAttribute("width", `${this.size.width}px`);
    this.canvas.setAttribute("height", `${this.size.height}px`);
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;
  }

  onWheel(e: WheelEvent) {
    e.preventDefault();
    if (e.ctrlKey) {
      this.action = Action.ZOOM;
      this.scale -= e.deltaY * 0.01;
    } else {
      this.action = Action.PAN;
      this.offset.x -= e.deltaX * 2;
      this.offset.y -= e.deltaY * 2;
    }
    this.onUpdate();
    this.action = Action.NONE;
  }

  onMouseDown(e: MouseEvent) {
    this.start = {
      x: e.offsetX,
      y: e.offsetY,
    };
    this.end = {
      x: e.offsetX,
      y: e.offsetY,
    };
    this.action = this.shiftPressed ? Action.LINK : Action.MOVE;
    this.clear();
    const selection = this.getSelection(this.start);
    this.selectedNodes.push(...selection);
    this.onUpdate();
  }

  onMouseUp(_: MouseEvent) {
    if (this.action === Action.LINK) {
      const startNode = this.getSelection(this.start!);
      const endNode = this.getSelection(this.end!);
      if (startNode.length > 0 && endNode.length > 0) {
        const start = this.store.retrieveNode(startNode[startNode.length - 1]);
        const end = this.store.retrieveNode(endNode[endNode.length - 1]);
        if (start && end) {
          this.store.linkNodes(start, end, "simple");
        }
      }
    }
    this.start = undefined;
    this.end = undefined;
    this.action = Action.NONE;
  }

  onMouseMove(e: MouseEvent) {
    if (this.selectedNodes.length > 0) {
      if (this.action === Action.MOVE) {
        const delta = {
          x: e.offsetX - this.start!.x,
          y: e.offsetY - this.start!.y,
        };
        const node = this.selectedNode();
        if (node) this.moveNode(node, delta);
        this.start = {
          x: e.offsetX,
          y: e.offsetY,
        };
      }
      if (this.action === Action.LINK) {
        this.end = {
          x: e.offsetX,
          y: e.offsetY,
        };
      }
    } else {
      this.checkHover({
        x: e.offsetX,
        y: e.offsetY,
      });
    }
  }

  checkHover(offset: Offset) {
    this.hoveredNodes.splice(0, this.hoveredNodes.length);
    const selection = this.getSelection(offset);
    this.hoveredNodes.push(...selection);
    const node = this.hoveredNode();
    if (node) {
      this.canvas.style.cursor = "pointer";
    } else {
      this.canvas.style.cursor = "default";
    }
  }

  moveNode(node: CanvasNode, delta: Offset) {
    node.x += delta.x / this.scale;
    node.y += delta.y / this.scale;
    this.store.updateNode(node);
  }

  selectedNode(): CanvasNode | undefined {
    if (this.selectedNodes.length === 0) return;
    const id = this.selectedNodes[this.selectedNodes.length - 1];
    const node = this.store.retrieveNode(id);
    return node;
  }

  hoveredNode(): CanvasNode | undefined {
    if (this.hoveredNodes.length === 0) return;
    const id = this.hoveredNodes[this.hoveredNodes.length - 1];
    const node = this.store.retrieveNode(id);
    return node;
  }

  clear() {
    this.selectedNodes.splice(0, this.selectedNodes.length);
    this.onUpdate();
  }

  clearLinks() {
    this.selectedEdges.splice(0, this.selectedEdges.length);
    this.onUpdate();
  }

  getSelection(target: Offset) {
    const items = new Array<ID>();

    // Get the local offset
    const localOffset = this.toWorld(target.x, target.y);

    for (const node of this.store.nodes) {
      // Check if offset overlaps node rect
      if (
        localOffset.x >= node.x &&
        localOffset.x <= node.x + node.width &&
        localOffset.y >= node.y &&
        localOffset.y <= node.y + node.height
      ) {
        items.push(node.id);
      }
    }

    return items;
  }

  render() {
    this.paint();
    requestAnimationFrame(() => this.render());
  }

  paint() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderBackground();

    this.updateMatrix();

    this.renderEdges();
    this.renderNodes();

    this.renderLink();
  }

  updateMatrix() {
    this.createMatrix(this.offset.x, this.offset.y, this.scale, this.rotation);
    const m = this.matrix;
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

  private renderLink() {
    if (this.action === Action.LINK) {
      this.scopedPaint((ctx) => {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        const localStart = this.toWorld(this.start!.x, this.start!.y);
        const localEnd = this.toWorld(this.end!.x, this.end!.y);
        ctx.moveTo(localStart.x, localStart.y);
        ctx.lineTo(localEnd.x, localEnd.y);
        ctx.stroke();
      });
    }
  }

  private renderBackground() {
    this.ctx.save();
    this.ctx.fillStyle = "whitesmoke";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.restore();
  }

  private renderNodes() {
    for (const node of this.store.nodes) {
      this.renderNode(node);
    }
  }

  private renderEdges() {
    for (const edge of this.store.edges) {
      this.renderEdge(edge);
    }
  }

  private renderNode(node: CanvasNode) {
    this.ctx.save();

    this.ctx.moveTo(node.x, node.y);

    const isSelected = this.selectedNode()?.id === node.id;
    const isHovered = this.hoveredNode()?.id === node.id;

    // Draw label
    this.scopedPaint((ctx) => {
      ctx.translate(node.x, node.y - 5);
      ctx.font = "12px Arial";
      ctx.textAlign = "left";
      ctx.fillStyle = "black";
      ctx.fillText(node.name, 0, 0);
    });

    // Draw background
    this.ctx.fillStyle = node?.backgroundColor ?? "white";
    this.ctx.fillRect(node.x, node.y, node.width, node.height);

    // Draw outline
    this.ctx.strokeStyle = isSelected ? "red" : isHovered ? "blue" : "black";
    this.ctx.strokeRect(node.x, node.y, node.width, node.height);
    this.ctx.restore();
  }

  private renderEdge(edge: NodeEdge) {
    this.scopedPaint((ctx) => {
      const isSelected = this.selectedEdges.includes(edge.id);
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
      ctx.beginPath();
      ctx.strokeStyle = isSelected ? "purple" : "black";
      ctx.moveTo(start.x, start.y);
      ctx.bezierCurveTo(
        start.x + start.width / 2,
        start.y,
        end.x - end.width / 2,
        end.y,
        end.x,
        end.y
      );
      ctx.stroke();
    });
  }

  private scopedPaint(action: (ctx: CanvasRenderingContext2D) => void) {
    this.ctx.save();
    action(this.ctx);
    this.ctx.restore();
  }
}

enum Action {
  NONE,
  ZOOM,
  PAN,
  MOVE,
  LINK,
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
}
