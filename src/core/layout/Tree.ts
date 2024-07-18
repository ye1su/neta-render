import { BuildTree } from "../utils/treeUtils";
import { Layer } from "./Layer";
import { TreeRender } from "./treeLayout";

class Tree extends Layer {
  constructor(nodes, edges, config) {
    super(nodes, edges, config);
    // this.init();
  }

  init() {}

  layout() {

    const tree = BuildTree({ nodes: this.nodes, edges: this.edges });

    const treeRender = new TreeRender(tree, { direction: this.config.direction });
    treeRender.layout();

    treeRender.patch(treeRender.root, (nodeInfo) => {
      const targetNode = this.nodes.find((n) => n.id === nodeInfo.data.id);
      targetNode.x = nodeInfo.x;
      targetNode.y = nodeInfo.y;
    });

  }
}

export default Tree;

