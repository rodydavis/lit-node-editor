import "./styles.css";

import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { CanvasNode, Canvas } from "./canvas";
import { BaseTreeNode, treeView } from "./ui/tree-view";

const PROPERTY_WIDTH = 200;

@customElement("node-editor")
export class NodeEditor extends LitElement {
  editor = new Canvas(this, {
    size: {
      width: window.innerWidth - PROPERTY_WIDTH * 2,
      height: window.innerHeight,
    },
  });

  static styles = [
    treeView.styles,
    css`
      main {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: row;
      }
      #output {
        flex: 1;
      }
      .sidebar {
        width: ${PROPERTY_WIDTH}px;
      }
      #properties {
        width: ${PROPERTY_WIDTH}px;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        background-color: #eee;
      }
      .property {
        display: flex;
        flex-direction: column;
        padding: 10px;
      }
      .title {
        font-size: 1.5em;
        font-weight: bold;
        padding: 10px;
      }
      .destructive {
        background-color: red;
        color: white;
      }
      #links > span {
        padding-left: 10px;
        font-size: 0.9em;
        font-weight: bold;
      }
    `,
  ];

  render() {
    return html`<main>
      <div class="sidebar">
        ${treeView.template({
          treeView: this.editor.nodeTree(),
          onUpdate: () => this.requestUpdate(),
          onSelect: (node: BaseTreeNode) => {
            this.editor.selection.push(node.id);
          },
        })}
      </div>
      <div id="output">${this.editor.canvas}</div>
      <div id="properties">${this.renderProperties()}</div>
    </main>`;
  }

  renderProperties() {
    const nodeId = this.editor.selection[this.editor.selection.length - 1];
    const node =
      this.editor.store.retrieveNode(nodeId) ??
      this.editor.store.retrieveEdge(nodeId);
    if (node?.type === "node") {
      return html`
        <span class="title">Node</span>
        <div class="property">
          <label>Name</label>
          <input
            type="text"
            .value=${node.name}
            @change=${(e: any) => {
              node.name = e.target.value;
              this.editor.store.updateNode(node);
            }}
          />
        </div>
        <div class="property">
          <label>Background Color</label>
          <input
            type="color"
            .value=${node.backgroundColor ?? "#FFFFFF"}
            @change=${(e: any) => {
              node.backgroundColor = e.target.value;
              this.editor.store.updateNode(node);
            }}
          />
        </div>
        <div class="property">
          <label>Width</label>
          <input
            type="number"
            .value=${node.width.toString()}
            @change=${(e: any) => {
              node.width = Number(e.target.value);
              this.editor.store.updateNode(node);
            }}
          />
        </div>
        <div class="property">
          <label>Height</label>
          <input
            type="number"
            .value=${node.height.toString()}
            @change=${(e: any) => {
              node.height = Number(e.target.value);
              this.editor.store.updateNode(node);
            }}
          />
        </div>
        <div class="property">
          <button
            class="destructive"
            @click=${() => {
              if (confirm("Are you sure?")) {
                this.editor.deleteNode(node);
              }
            }}
          >
            Delete node
          </button>
        </div>
      `;
    }
    if (node?.type === "edge") {
      return html` <span class="title">Edge</span>
        <div class="property">
          <label>Name</label>
          <input
            type="text"
            .value=${node.name}
            @change=${(e: any) => {
              node.name = e.target.value;
              this.editor.store.updateEdge(node);
            }}
          />
        </div>
        <div class="property">
          <button
            class="destructive"
            @click=${() => {
              if (confirm("Are you sure?")) {
                this.editor.deleteEdge(node);
              }
            }}
          >
            Delete node
          </button>
        </div>`;
    }
    return html` <span class="title">Editor</span>
      <div>
        <div class="property">
          <label>Import JSON</label>
          <input
            type="file"
            accept=".json"
            @change=${(e: any) => {
              const files = e.target.files;
              if (files.length) {
                this.editor.clear();
                const reader = new FileReader();
                reader.onload = (e: any) => {
                  const data = e.target.result;
                  this.editor.import(data);
                };
                reader.readAsText(files[0]);
              }
            }}
          />
        </div>
        <div class="property">
          <label>Scale</label>
          <input
            type="number"
            .value=${this.editor.scale.toString()}
            step=".1"
            @change=${(e: any) => {
              this.editor.zoom(Number(e.target.value));
            }}
          />
        </div>
        <div class="property">
          <label>Rotation</label>
          <input
            type="number"
            .value=${this.editor.rotation.toString()}
            step=".1"
            @change=${(e: any) => {
              this.editor.rotate(Number(e.target.value));
            }}
          />
        </div>
        <div class="property">
          <label>Offset x</label>
          <input
            type="number"
            .value=${this.editor.offset.x.toString()}
            step=".1"
            @change=${(e: any) => {
              this.editor.pan({
                x: Number(e.target.value),
                y: this.editor.offset.y,
              });
            }}
          />
        </div>
        <div class="property">
          <label>Offset x</label>
          <input
            type="number"
            .value=${this.editor.offset.y.toString()}
            step=".1"
            @change=${(e: any) => {
              this.editor.pan({
                x: this.editor.offset.x,
                y: Number(e.target.value),
              });
            }}
          />
        </div>
        <div class="property">
          <button
            @click=${() => {
              const node = this.addRandomNode();
              this.editor.selection.push(node.id);
              this.requestUpdate();
            }}
          >
            Add new node
          </button>
        </div>
        <div class="property">
          <button
            @click=${() => {
              const a = window.document.createElement("a");
              const json = this.editor.store.toJson();
              a.href = window.URL.createObjectURL(
                new Blob([json], { type: "application/json" })
              );
              a.download = "editor.json";
              document.body.appendChild(a);
              a.click();
            }}
          >
            Export JSON
          </button>
        </div>
      </div>`;
  }

  firstUpdated() {
    const amount = 10;
    // Create random canvas nodes
    for (let i = 0; i < amount; i++) {
      this.addRandomNode(i);
    }

    // Link random canvas nodes
    for (let i = 0; i < amount / 2; i++) {
      const source: CanvasNode = this.editor.store.nodes[i];
      const target: CanvasNode = this.editor.store.nodes[i + amount / 2];
      this.editor.store.linkNodes(source, target, "simple");
    }

    window.addEventListener("resize", () => {
      this.editor.resize({
        width: window.innerWidth - PROPERTY_WIDTH,
        height: window.innerHeight,
      });
    });
  }

  addRandomNode(i: number = this.editor.store.nodes.length) {
    const node: CanvasNode = {
      id: `node${i}`,
      name: "Node " + i,
      x: Math.random() * this.editor.canvas.width,
      y: Math.random() * this.editor.canvas.height,
      width: 100,
      height: 100,
      type: "node",
    };
    this.editor.store.createNode(node);
    return node;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "node-editor": NodeEditor;
  }
}
