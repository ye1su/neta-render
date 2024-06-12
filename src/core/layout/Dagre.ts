import { Layer } from "./Layer";
import * as dagre from "dagre";

class Dagre extends Layer {
  private graphlib = new dagre.graphlib.Graph();

  constructor(nodes, edges, config, event) {
    super(nodes, edges, config, event);

    this.graphlib.setGraph({
      nodesep: 100,
      ranksep: 100
    });

    this.graphlib.setDefaultEdgeLabel(() => ({}));
  }

  layout() {
    this.nodes.forEach((node) => {
      if (node.radius) {
        node.width = node.radius;
        node.height = node.radius;
      }
      let { width, height } = node;
      if (!width || !height) {
        width = 0;
        height = 0;
        console.warn("当前节点没有包围框缺失width或者height");
      }

      this.graphlib.setNode(node.id, { width, height });
    });

    this.edges.forEach((edge) => {
      this.graphlib.setEdge(edge.source, edge.target);
    });

    dagre.layout(this.graphlib);

    this.graphlib.nodes().forEach((v) => {
      const id = v;
      const targetNode = this.nodes.find((node) => (node.id == id));
      const nodeInfo = this.graphlib.node(id);
      targetNode.x = nodeInfo.x;
      targetNode.y = nodeInfo.y;
    });

    this.graphlib.edges().forEach((e) => {
      const source = e.v;
      const target = e.w;
      const edgeInfo = this.graphlib.edge(e);

      const filterEdges = this.edges.filter(
        (edge) => edge.source == source && edge.target == target
      );
      filterEdges.forEach((e) => {
        e.anchorPoints = edgeInfo.points;
      });
    });

    this.event.stage.clearChildren();
    this.event.graph.data({ nodes: this.nodes, edges: this.edges });
  }
}

export default Dagre;
