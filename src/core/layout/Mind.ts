import { autoFixWrap } from "../utils";
import { BuildTree } from "../utils/treeUtils";
import { Layer } from "./Layer";
import { TreeRender } from "./treeLayout";

const inputOutPadding = 12;

class Mind extends Layer {
  constructor(nodes, edges, config) {
    super(nodes, edges, config);
    // this.init();
  }

  init() {}

  layout() {
    this.nodes.forEach((node) => {
      // 转换成新的text
      const shapeWidth = node.width * 2;
      const _fontSize = 24 ;
      const _text = node?.text ?? "";
      const innerWidth = shapeWidth - inputOutPadding * 2;
      const { length: lineLen } = autoFixWrap(_text, innerWidth, {
        size: _fontSize,
        family: "monospace",
      });

      const textHeight = _fontSize * 1.5 * (lineLen || 1);

      const shapeHeight = textHeight + inputOutPadding * 2;
      node._computedWidth = shapeWidth
      node._conputedHeight = shapeHeight
    });

    const tree = BuildTree({ nodes: this.nodes, edges: this.edges });

    const treeRender = new TreeRender(tree, {
      direction: this.config.direction,
    });
    treeRender.layout();

    treeRender.patch(treeRender.root, (nodeInfo) => {
      const targetNode = this.nodes.find((n) => n.id === nodeInfo.data.id);
      targetNode.x = nodeInfo.x;
      targetNode.y = nodeInfo.y;
    });
  }
}

export default Mind;
