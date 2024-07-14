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
      behaviors: ["wheel-canvas-move", 'render-dynamic-element'],
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
          width: 65,
          height: 31,
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
