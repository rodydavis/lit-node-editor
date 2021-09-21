/**
 * Node or Edge ID type
 */
export type ID = string;

/**
 * Node store with NodeEdges
 */
export class Store<T extends BaseNode> {
  nodes: T[] = [];
  edges: NodeEdge[] = [];

  /**
   * Parse a JSON object into a Store
   *
   * @param value JSON String
   * @returns Store
   */
  static fromJson<T extends BaseNode>(value: string) {
    const { nodes, edges } = JSON.parse(value);
    const store = new Store<T>();
    if (nodes) store.nodes = nodes;
    if (edges) store.edges = edges;
    return store;
  }

  /**
   * Save the store to a JSON string
   *
   * @returns JSON String
   */
  toJson() {
    const value = {
      nodes: this.nodes,
      edges: this.edges,
    };
    return JSON.stringify(value, null, 2);
  }

  private getNodeIndex(id: ID): number {
    return this.nodes.findIndex((n) => n.id === id);
  }

  createNode(node: T): void {
    const index = this.getNodeIndex(node.id);
    if (index === -1) {
      this.nodes.push(node);
    } else {
      this.nodes[index] = node;
    }
  }

  retrieveNode(id: ID): T | undefined {
    return this.nodes.find((node) => node.id === id);
  }

  updateNode(node: T): void {
    const index = this.getNodeIndex(node.id);
    if (index === -1) return;
    this.nodes[index] = node;
  }

  deleteNode(id: ID): void {
    const index = this.getNodeIndex(id);
    if (index === -1) return;
    this.nodes.splice(index, 1);
  }

  private getEdgeIndex(id: ID): number {
    return this.edges.findIndex((n) => n.id === id);
  }

  createEdge(edge: NodeEdge): void {
    const index = this.getEdgeIndex(edge.id);
    if (index === -1) {
      this.edges.push(edge);
    } else {
      this.edges[index] = edge;
    }
  }

  retrieveEdge(id: ID): NodeEdge | undefined {
    return this.edges.find((edge) => edge.id === id);
  }

  updateEdge(edge: NodeEdge): void {
    const index = this.getEdgeIndex(edge.id);
    if (index === -1) return;
    this.edges[index] = edge;
  }

  deleteEdge(id: ID): void {
    const index = this.getEdgeIndex(id);
    if (index === -1) return;
    this.edges.splice(index, 1);
  }

  linkNodes(start: T, end: T, name: string): void {
    const randomId = generateRandomId();
    this.createEdge({
      id: randomId,
      startNode: start.id,
      endNode: end.id,
      name,
    });
  }
}

/**
 * Node Edge
 */
export interface NodeEdge extends BaseNode {
  startNode: ID;
  endNode: ID;
}

/**
 * Base Node
 */
export interface BaseNode {
  id: ID;
  name: string;
}

function generateRandomId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
