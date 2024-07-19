import _ from "lodash-es";
import { buchheim, DrawTree } from "./mindRender";

export function mindLayout(tree) {
  console.log("treeNode: ", treeNode);
}

export class MindRender {
  public root;
  public treeData;

  constructor(treeData) {
    this.treeData = treeData;
  }

  layout() {
    let treeNode = new DrawTree(_.cloneDeep(this.treeData));
    treeNode = buchheim(treeNode);
    this.root = treeNode;
  }

  patch(node: DrawTree, callback) {
    callback(node);
    // 递归更新子节点
    for (let i = 0; i < node.children.length; i++) {
      this.patch(node.children[i], callback);
    }
  }
}
