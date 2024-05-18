import {
  EdgeModel,
  ItemType,
  LayoutConfig,
  Model,
  NetaGraphOptions,
  NodeModel,
} from "./types";
import {
  graphicsLineParse,
  graphicsShapeParse,
} from "./graphics/GraphicsParse";
import { Force } from "./layout";
import { Application } from "./Application";
import { LayoutType } from "./enums";

export class NetaGraph extends Application {
  public model: Model;
  public layoutConfig: LayoutConfig = undefined;

  constructor(options: NetaGraphOptions) {
    super(options);
    if (options.layout) {
      this.layout(options.layout);
    }
    this.mount()
  }

  mount() {
    console.log('===');
    this.on("graphics:click", (event, target) => {
      // console.log("event: ", event, target);
    });
    this.on("graphics:mousedown", (event, target) => {
      console.log("event: ", event, target);
    });
  }

  layoutRender(nodes, edges) {
    if (this.layoutConfig?.type == LayoutType.Force) {
      const force = new Force(nodes, edges, null, {
        afterLayout: (layoutInfo) => {
          layoutInfo.nodes.forEach((node) => {
            const targetNode = this.stage.children.find((n) => n.id == node.id);
            if (targetNode) {
              targetNode.updatePosition(node.x, node.y);
            }
          });
          this.render();
        },
      });
      force.layout();
      return;
    }
    this.render();
  }

  public layout(config: LayoutConfig) {
    this.layoutConfig = config;
  }

  read(model: Model) {
    this.model = model;

    const { nodes, edges } = model;
    this.stage.clearChildren();
    nodes.forEach((node) => {
      this.addNode(node);
    });
    edges.forEach((edge) => {
      this.addEdge(edge);
    });
    // this.render();
    this.layoutRender(nodes, edges);
  }

  addItem(type: ItemType, model: NodeModel | EdgeModel) {
    if (type == "node") {
      this.addNode(model as NodeModel);
    }
    if (type == "edge") {
      this.addEdge(model as EdgeModel);
    }
  }

  addNode(model: NodeModel) {
    const graphic = graphicsShapeParse(model);
    this.stage.addChild(graphic);
  }
  addEdge(model: EdgeModel) {
    const graphic = graphicsLineParse(model);
    this.stage.addChild(graphic);
  }
}
