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
import { Force, Dagre } from "./layout";
import { Application } from "./Application";
import { LayoutType } from "./enums";
import { cloneDeep } from "lodash-es";
import { BuiltInEvent } from "./events";
import { RegNodeType } from "./types/register";
import { EXTEND_NODE } from "./register";
import _ from "lodash-es";
import { fixFactor } from "./utils";

export class NetaGraph extends Application {
  public model: Model = { nodes: [], edges: [] };
  public registerMap: Map<string, RegNodeType["render"]> = new Map();
  public layoutConfig: LayoutConfig = undefined;
  public buildInEvent = new BuiltInEvent(this);

  constructor(options: NetaGraphOptions) {
    super(options);
    if (options.layout) {
      this.layout(options.layout);
    }

    // 如果内置注册节点
    Object.values(EXTEND_NODE).forEach((item) => {
      this.registerMap.set(item.name, item.render);
    });
    // 注册传入节点
    if (Array.isArray(options.register)) {
      options.register.forEach((item) => {
        this.registerMap.set(item.name, item.render);
      });
    }
    this.buildInEvent.init();
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

  addNode(data: NodeModel) {
    const targetNode = this.model.nodes.find((item) => item.id == data.id);
    if (!targetNode) {
      this.model.nodes.push(data);
    }
    const graphic = graphicsShapeParse(this.registerMap, data);
    this.stage.addChild(graphic);
  }
  addEdge(data: EdgeModel) {
    const targetEdge = this.model.edges.find((item) => item.id == data.id);
    if (!targetEdge) {
      this.model.edges.push(data);
    }
    const graphic = graphicsLineParse(data);
    this.stage.addChild(graphic);
  }
  updateNodeData(data: NodeModel | NodeModel[]) {
    if (Array.isArray(data)) {
      return;
    }

    this.model.nodes.forEach((n) => {
      if (n.id == data.id) {
        n = _.merge(n, n.factor, data);
      }
    });

    this.read(this.model);
  }
}
