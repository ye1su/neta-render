import { Layer } from "./Layer";
import { TreeRender } from "./treeLayout";

class Tree extends Layer {
  constructor(nodes, edges, config, event) {
    super(nodes, edges, config, event);
    // this.init();
  }

  init() {}

  layout() {
    const tree = BuildTree({ nodes: this.nodes, edges: this.edges });

    const treeRender = new TreeRender(tree);
    treeRender.layout();
    treeRender.patch(treeRender.root, (nodeInfo) => {
      const targetNode = this.nodes.find((n) => n.id === nodeInfo.data.id);
      targetNode.x = nodeInfo.x;
      targetNode.y = nodeInfo.y;
    });
    this.event.stage.clearChildren();
    this.event.graph.data({ nodes: this.nodes, edges: this.edges });
  }
}

export default Tree;

export function BuildTree(model) {
  const { nodes, edges: beforeEdges } = model;
  const edges = beforeEdges.filter((edge) => edge.source !== edge.target);
  const nodeMap: { [id: string]: any } = {};

  for (const node of nodes) {
    nodeMap[node.id] = {
      id: node.id,
      name: node.name,
      type: node.type,
      children: [],
      parentId: "",
    };
  }

  // 所有线 按照 node的顺序进行排序
  let sortEdges: any[] = [];
  nodes.forEach((node) => {
    const sourceEdges = edges.filter((e) => e.target === node.id);
    sortEdges = [...sortEdges, ...sourceEdges];
  });

  for (const edge of sortEdges) {
    const sourceNode = nodeMap[edge.source];
    const targetNode = nodeMap[edge.target];

    if (sourceNode && targetNode) {
      sourceNode.children.push({ ...targetNode, parentId: sourceNode.id });
    }
  }

  const rootNodes: any[] = [];
  for (const node of nodes) {
    if (!edges.some((edge) => edge.target === node.id)) {
      rootNodes.push(nodeMap[node.id]);
    }
  }
  return rootNodes[0];
}
