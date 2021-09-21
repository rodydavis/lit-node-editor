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
  hoveredEdges = new Array<ID>();
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
    this.selectedNodes.push(...selection.nodes);
    this.selectedEdges.push(...selection.edges);
    this.onUpdate();
  }

  onMouseUp(_: MouseEvent) {
    if (this.action === Action.LINK) {
      const startNode = this.getSelection(this.start!).nodes;
      const endNode = this.getSelection(this.end!).nodes;
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
    this.checkHover({
      x: e.offsetX,
      y: e.offsetY,
    });
    if (this.selectedNodes.length > 0) {
      if (this.action === Action.MOVE) {
        const delta = {
          x: e.offsetX - this.start!.x,
          y: e.offsetY - this.start!.y,
        };
        const selectedItem = this.topSelection();
        if (selectedItem?.type === "node") {
          this.moveNode(selectedItem, delta);
        }
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
    }
  }

  checkHover(offset: Offset) {
    this.hoveredNodes.splice(0, this.hoveredNodes.length);
    this.hoveredEdges.splice(0, this.hoveredEdges.length);

    const selection = this.getSelection(offset);
    this.hoveredNodes.push(...selection.nodes);
    this.hoveredEdges.push(...selection.edges);
    
    const topHoveredItem = this.topHovered();
    if (topHoveredItem) {
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

  topSelection(): CanvasNode | NodeEdge | undefined {
    if (this.selectedNodes.length > 0) {
      const id = this.selectedNodes[this.selectedNodes.length - 1];
      return this.store.retrieveNode(id);
    }
    if (this.selectedEdges.length > 0) {
      const id = this.selectedEdges[this.selectedEdges.length - 1];
      return this.store.retrieveEdge(id);
    }
    return undefined;
  }

  topHovered(): CanvasNode | NodeEdge | undefined {
    if (this.hoveredNodes.length > 0) {
      const id = this.hoveredNodes[this.hoveredNodes.length - 1];
      return this.store.retrieveNode(id);
    }
    if (this.hoveredEdges.length > 0) {
      const id = this.hoveredEdges[this.hoveredEdges.length - 1];
      return this.store.retrieveEdge(id);
    }
    return undefined;
  }

  clear() {
    this.selectedNodes.splice(0, this.selectedNodes.length);
    this.selectedEdges.splice(0, this.selectedEdges.length);
    this.onUpdate();
  }

  clearLinks() {
    this.selectedEdges.splice(0, this.selectedEdges.length);
    this.onUpdate();
  }

  getSelection(target: Offset) {
    const nodes = new Array<ID>();
    const edges = new Array<ID>();

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
        nodes.push(node.id);
      }
    }
    for (const edge of this.store.edges) {
      // Check if offset overlaps edge rect
      const edgePoints = this.getEdgePoints(edge);
      const labelSize = this.drawLabel(edge.name, {
        offset: edgePoints.mid,
        textAlign: "center",
      });
      const rect = {
        x: edgePoints.mid.x - labelSize.width / 2,
        y: edgePoints.mid.y - labelSize.height / 2,
        width: labelSize.width,
        height: labelSize.height,
      };
      if (
        localOffset.x >= rect.x &&
        localOffset.x <= rect.x + rect.width &&
        localOffset.y >= rect.y &&
        localOffset.y <= rect.y + rect.height
      ) {
        edges.push(edge.id);
      }
    }
    return { nodes, edges };
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
      const localStart = this.toWorld(this.start!.x, this.start!.y);
      const localEnd = this.toWorld(this.end!.x, this.end!.y);
      this.drawLine(localStart, localEnd, "red");
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
    const { isSelected, isHovered } = this.getNodeStats(node);

    this.ctx.save();
    this.ctx.moveTo(node.x, node.y);

    // Draw label
    const labelOffset = { x: node.x, y: node.y - 5 };
    this.drawLabel(node.name, { offset: labelOffset });

    // Draw background
    this.ctx.fillStyle = node?.backgroundColor ?? "white";
    this.ctx.fillRect(node.x, node.y, node.width, node.height);

    // Draw outline
    this.ctx.strokeStyle = isSelected ? "red" : isHovered ? "blue" : "black";
    this.ctx.strokeRect(node.x, node.y, node.width, node.height);
    this.ctx.restore();
  }

  private renderEdge(edge: NodeEdge) {
    const { isSelected, isHovered } = this.getNodeStats(edge);
    const { start, end, mid } = this.getEdgePoints(edge);

    // Draw line
    this.drawLine(
      start,
      end,
      isSelected ? "red" : isHovered ? "blue" : "black"
    );

    // Draw label
    this.drawLabel(edge.name, { textAlign: "center", offset: mid });
  }

  private getNodeStats(node: BaseNode) {
    const selectedItem = this.topSelection();
    const topHoveredItem = this.topHovered();
    const sameSelectedType = selectedItem?.type === node.type;
    const sameHoveredType = topHoveredItem?.type === node.type;
    const isSelected = sameSelectedType && selectedItem.id === node.id;
    const isHovered = sameHoveredType && topHoveredItem.id === node.id;
    return {
      isSelected,
      isHovered,
    };
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

  private drawLine(start: Offset, end: Offset, color: string = "black") {
    this.scopedPaint((ctx) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    });
  }

  private drawLabel(name: string, options?: LabelOptions): Size {
    let metrics: TextMetrics;
    this.ctx.save();
    if (options?.offset) {
      this.ctx.translate(options.offset.x, options.offset.y);
    }
    const size = 10;
    const lineHeight = 1.2;
    this.ctx.font = `${size}px ${lineHeight}em Arial`;
    this.ctx.textAlign = options?.textAlign ?? "left";
    this.ctx.fillStyle = options?.color ?? "black";
    this.ctx.fillText(name, 0, 0);
    metrics = this.ctx.measureText(name);
    this.ctx.restore();
    const height = size * lineHeight;
    return { height, width: metrics.width };
  }

  private scopedPaint(action: (ctx: CanvasRenderingContext2D) => void) {
    this.ctx.save();
    action(this.ctx);
    this.ctx.restore();
  }
}

interface LabelOptions {
  offset?: Offset;
  color?: string;
  textAlign?: "left" | "center" | "right";
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
  type: "node";
}
