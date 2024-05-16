import { EventSystem } from "./events";
import { getRenderer } from "./renderer";
import { WebGlRenderer, CanvasRenderer } from "./renderer";
import {
  EdgeModel,
  IApplicationOptions,
  ItemType,
  Model,
  NodeModel,
} from "./types";
import {
  graphicsLineParse,
  graphicsShapeParse,
} from "./graphics/GraphicsParse";
import { Container, Graphics } from ".";
import { Force } from "./layout";

export class NetaGraph {
  public readonly el: HTMLDivElement;
  public stage = new Container();
  public model;
  private readonly renderer: CanvasRenderer | WebGlRenderer;
  private eventSystem: EventSystem;

  constructor(options: IApplicationOptions) {
    const { el } = options;
    this.el = el;

    this.renderer = getRenderer({ ...options });
    // this.render();
    if (this.renderer instanceof CanvasRenderer) {
      this.eventSystem = new EventSystem(this.stage, this.renderer);
      console.log("this.stage: ", this.stage);
    }

    // this.start()
  }

  public render() {
    this.renderer.render(this.stage);
  }

  public destroy() {
    this.renderer.clear();
    this.eventSystem.removeEvents();
  }

  layout(nodes, edges) {
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
  }

  read(model: Model) {
    this.model = model;

    const { nodes, edges } = model;
    this.stage = new Container();
    nodes.forEach((node) => {
      this.addNode(node);
    });
    edges.forEach((edge) => {
      this.addEdge(edge);
    });
    // this.render();
    this.layout(nodes, edges);
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

  private start() {
    const func = () => {
      this.render();
      requestAnimationFrame(func);
    };
    func();
  }
}
