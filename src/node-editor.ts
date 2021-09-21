import "./styles.css";

import { LitElement, customElement, html, css } from "lit-element";
import { CanvasNode, Canvas } from "./canvas";

const PROPERTY_WIDTH = 200;

@customElement("node-editor")
export class NodeEditor extends LitElement {
  editor = new Canvas({
    size: {
      width: window.innerWidth - PROPERTY_WIDTH,
      height: window.innerHeight,
    },
  });

  static styles = css`
    main {
      display: flex;
      flex-direction: row;
    }
    #output {
      flex: 1;
    }
    #properties {
      width: ${PROPERTY_WIDTH}px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
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
  `;

  render() {
    return html`<main>
      <div id="output">${this.editor.canvas}</div>
      <div id="properties">
        <span class="title">Properties</span>
        ${this.renderProperties()}
      </div>
    </main>`;
  }

  renderProperties() {
    const node = this.editor.selectedNode();
    if (!node) {
      return html`<div>
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
              this.editor.scale = Number(e.target.value);
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
              this.editor.offset.x = Number(e.target.value);
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
              this.editor.offset.y = Number(e.target.value);
            }}
          />
        </div>
        <div class="property">
          <button
            @click=${() => {
              const node = this.addRandomNode();
              this.editor.selected.push(node.id);
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
    return html`
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
    `;
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

    this.editor.onUpdate = () => {
      this.requestUpdate();
    };

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
