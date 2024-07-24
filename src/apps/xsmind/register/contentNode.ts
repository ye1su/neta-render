import { generateDynamicElement, MindNode } from "./nodeUtils";

const contentNode = {
  name: "content",
  render: {
    draw(action) {
      const mindNode = new MindNode(action, "content");
      const currentShape = mindNode.draw();
      return currentShape;
    },
    dynamicElement: generateDynamicElement,
  },
};

export default contentNode;
