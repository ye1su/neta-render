import { NetaGraph } from "../../core";
import { MIND_BEHAVIOR } from "./behavior";
import { MIND_NODE } from "./node";

class Mind {
  private netaRender: NetaGraph;
  constructor(options: any) {
    const { el } = options;
    this.netaRender = new NetaGraph({
      rendererType: "canvas",
      el,
      backgroundColor: "#fff",
      layout: {
        type: "tree",
        config: {
          direction: "lr",
        },
      },
      behaviors: ["wheel-canvas-move"],
      register: { nodes: MIND_NODE, behaviors: MIND_BEHAVIOR },
    });
  }

  render() {
    this.netaRender.read({
      nodes: [
        {
          id: "1",
          type: "headTitle",
          label: "Company1",
          width: 54,
          nodeState: [],
        },
      ],
      edges: [],
    });
    this.netaRender.render();
  }

  destroy() {
    this.netaRender.destroy();
  }
}

export default Mind;
