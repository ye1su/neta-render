import { Layer } from "./Layer";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  Simulation,
  SimulationNodeDatum,
} from "d3-force";

class Force extends Layer {
  public simulation: Simulation<SimulationNodeDatum, any>;
  constructor(nodes, edges, config) {
    super(nodes, edges, config);
    // this.init();
  }

  init() {
    this.event.graph.on("graphics:pointerdown", (event, target) => {
      // this.simulation.alphaTarget(0.3).restart();
    });

    this.event.graph.on('graphics:pointerup', () => {
      // this.simulation.alphaTarget(0).restart()
    })
  }

  layout() {
    const _nodes = this.nodes;
    const _edges = this.edges;
    const simulation = forceSimulation(_nodes)
      .force(
        "link",
        forceLink(_edges)
          .id((d) => {
            return d.id;
          })
          .distance(300)
      )
      .force("charge", forceManyBody().strength(-200))
      .force("center", forceCenter(600, 600));
    this.simulation = simulation;
    simulation.nodes(_nodes).on("tick", () => {
      this.nodes.forEach((node) => {
        const targetNode = this.event.stage.children.find(
          (n) => n.id == node.id
        );
        if (targetNode) {
          targetNode.updatePosition(node.x, node.y);
        }
      });
      this.event.graph.render();
    });
  }
}

export default Force;
