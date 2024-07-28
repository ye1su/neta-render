import { NetaGraph } from "../../core";
import { MIND_BEHAVIOR } from "./behavior";
import { MIND_NODE, MIND_EDGE } from "./register";

class Mind {
  private netaRender: NetaGraph;
  constructor(options: any) {
    const { el } = options;
    this.netaRender = new NetaGraph({
      rendererType: "canvas",
      el,
      backgroundColor: "#fff",
      layout: {
        type: "mind",
        config: {
          direction: "lr",
        },
      },
      behaviors: ["wheel-canvas-move", "render-dynamic-element"],
      register: {
        nodes: MIND_NODE,
        edges: MIND_EDGE,
        behaviors: MIND_BEHAVIOR,
      },
    });
  }

  render() {
    this.netaRender.read({
      nodes: [
        {
          id: "1",
          type: "headTitle",
          text: "XtMind123131",
          width: 65,
          nodeState: [],
        },
      ],
      edges: [],
    });
    this.netaRender.render();

    this.netaRender.fitCenter()
  }

  destroy() {
    this.netaRender.destroy();
  }
}

export default Mind;
