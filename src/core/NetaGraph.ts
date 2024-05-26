import {
  EdgeModel,
  ItemType,
  LayoutConfig,
  Model,
  NetaGraphOptions,
  NodeModel,
  RegisterMap,
} from "./types";
import {
  graphicsLineParse,
  graphicsShapeParse,
} from "./graphics/GraphicsParse";
import { Force, Dagre } from "./layout";
import { Application } from "./Application";
import { LayoutType } from "./enums";
import { cloneDeep } from "lodash-es";
import { BuiltInEvent } from "./events";

export class NetaGraph extends Application {
  public model: Model;
  public registerMap: Map<string, RegisterMap["render"]> = new Map();
  public layoutConfig: LayoutConfig = undefined;
  public buildInEvent = new BuiltInEvent(this)

  constructor(options: NetaGraphOptions) {
    super(options);
    if (options.layout) {
      this.layout(options.layout);
    }
    if (Array.isArray(options.register)) {
      options.register.forEach((item) => {
        this.registerMap.set(item.name, item.render);
      });
    }
    this.buildInEvent.eventInit()
  }



  layoutRender(nodes, edges) {
    const evnetParmas = {
      stage: this.stage,
      graph: this,
    };
    if (this.layoutConfig?.type == LayoutType.Force) {
      const force = new Force(nodes, edges, null, evnetParmas);
      force.layout();
      return;
    }

    if (this.layoutConfig?.type == LayoutType.Dagre) {
      const dagre = new Dagre(nodes, edges, null, evnetParmas);
      dagre.layout();
      return;
    }

    this.render();
  }

  layout(config: LayoutConfig) {
    this.layoutConfig = config;
  }

  data(model: Model) {
    this.model = cloneDeep(model);

    const { nodes, edges } = model;
    this.stage.clearChildren();
    nodes.forEach((node) => {
      this.addNode(node);
    });
    edges.forEach((edge) => {
      this.addEdge(edge);
    });
  }

  read(model: Model) {
    this.data(model);
    const { nodes, edges } = this.model;
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
    const graphic = graphicsShapeParse(this.registerMap, model);
    this.stage.addChild(graphic);
  }
  addEdge(model: EdgeModel) {
    const graphic = graphicsLineParse(model);
    this.stage.addChild(graphic);
  }
}
