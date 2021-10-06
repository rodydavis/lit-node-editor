import { css, html, TemplateResult } from "lit";

/**
 * Tree view
 */
export declare interface TreeView {
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

const styles = css`
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
  treeView: TreeView;
  onSelect: (node: BaseTreeNode) => void;
  onUpdate: () => void;
}

export function template(props: TemplateProps): TemplateResult {
  return html`
    <ul class="tree">
      ${props.treeView.children.map((node) => buildNode(node, props))}
    </ul>
  `;
}

function buildNode(node: BaseTreeNode, props: TemplateProps): TemplateResult {
  return html`
    <li
      @click=${() => {
        node.collapsed = !node.collapsed;
        props.onSelect(node);
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

/**
 * Tree view
 */
export const treeView = {
  styles,
  template,
};
