import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";

/**
 * A tree view component.
 */
@customElement("tree-view")
export class TreeView extends LitElement {
  @property({ type: Object })
  tree: Tree = {
    children: [],
  };

  @state()
  selectedNode: BaseTreeNode | null = null;

  static get styles() {
    return [styles];
  }

  render() {
    return template({
      tree: this.tree,
      onSelect: (node) => {
        this.selectedNode = node;
      },
      onUpdate: () => {
        this.requestUpdate();
      },
    });
  }
}

/**
 * Tree view
 */
export declare interface Tree {
  children: BaseTreeNode[];
}

/**
 * Base tree node
 */
export declare interface BaseTreeNode {
  id: string;
  name: string;
  children: BaseTreeNode[];
  collapsed: boolean;
}

/**
 * Tree view styles
 */
export const styles = css`
  ul.tree {
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    white-space: nowrap;
  }
  ul.tree,
  ul.tree ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul.tree ul {
    margin-left: 10px;
  }
  ul.tree li {
    margin: 0;
    padding: 0 7px;
    line-height: 20px;
    color: #369;
    font-weight: bold;
    border-left: 1px solid rgb(100, 100, 100);
  }
  ul.tree li:last-child {
    border-left: none;
  }
  ul.tree li:before {
    position: relative;
    top: -0.3em;
    height: 1em;
    width: 12px;
    color: white;
    border-bottom: 1px solid rgb(100, 100, 100);
    content: "";
    display: inline-block;
    left: -7px;
  }
  ul.tree li:last-child:before {
    border-left: 1px solid rgb(100, 100, 100);
  }
`;

interface TemplateProps {
  tree: Tree;
  onSelect: (node: BaseTreeNode) => void;
  onUpdate: () => void;
}

/**
 * Build a tree view
 *
 * @param props Tree view properties
 */
export function template(props: TemplateProps): TemplateResult {
  return html`
    <ul class="tree">
      ${props.tree.children.map((node) => buildNode(node, props))}
    </ul>
  `;
}

function buildNode(node: BaseTreeNode, props: TemplateProps): TemplateResult {
  return html`
    <li
      @click=${() => {
        props.onSelect(node);
      }}
      @dblclick=${() => {
        node.collapsed = !node.collapsed;
        props.onUpdate();
      }}
    >
      ${node.name}
      ${node.collapsed || node.children.length === 0
        ? html``
        : html`
            <ul class="nested">
              ${node.children.map((n) => buildNode(n, props))}
            </ul>
          `}
    </li>
  `;
}
