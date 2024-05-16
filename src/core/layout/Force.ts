import { Layer } from "./Layer";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
} from "d3-force";

class Force extends Layer {
  constructor(nodes, edges, config, event) {
    super(nodes, edges, config, event);
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

    simulation.nodes(_nodes).on("tick", () => {
      this.afterLayout()
    });

  }
}

export default Force;
