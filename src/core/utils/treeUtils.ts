// 根据nodes和edges 构建树
export function BuildTree(model) {
  const { nodes, edges: beforeEdges } = model;
  const edges =
    beforeEdges?.filter((edge) => edge.source !== edge.target) ?? [];
  const nodeMap: { [id: string]: any } = {};

  for (const node of nodes) {
    nodeMap[node.id] = {
      id: node.id,
      _computedWidth: node._computedWidth,
      _conputedHeight: node._conputedHeight,
      name: node.name,
      type: node.type,
      children: [],
      parentId: "",
    };
  }

  for (const edge of edges) {
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
