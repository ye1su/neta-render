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
import { Force, Dagre, Tree, Mind } from "./layout";
import { Application } from "./Application";
import { LayoutType } from "./enums";
import { cloneDeep } from "lodash-es";
import { BuiltInEvent } from "./events";
import { RegNodeType } from "./types/register";
import { EXTEND_NODE } from "./register";
import _ from "lodash-es";
import { Container } from "./display";

export class NetaGraph extends Application {
  public model: Model = { nodes: [], edges: [] };
  public registerMap: Map<string, RegNodeType["render"]> = new Map();
  public layoutConfig: LayoutConfig = undefined;
  public buildInEvent: BuiltInEvent;
  public behaviors?: string[];

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
    if (Array.isArray(options.register?.nodes)) {
      options.register.nodes.forEach((item) => {
        this.registerMap.set(item.name, item.render);
      });
    }
    if (Array.isArray(options.register?.edges)) {
      options.register.edges.forEach((item) => {
        this.registerMap.set(item.name, item.render);
      });
    }

    this.behaviors = options.behaviors;

    this.buildInEvent = new BuiltInEvent(
      this,
      options.register?.behaviors,
      options.behaviors
    );
    this.buildInEvent.init();
  }

  /**
   * 修改整个layout的内容
   * @param config
   */
  layout(config: LayoutConfig) {
    this.layoutConfig = config;
  }

  /**
   * 合并layout的config
   * @param config
   */
  updateLayoutConfig(config: LayoutConfig["config"]) {
    if (config) {
      this.layoutConfig.config = _.merge(this.layoutConfig.config, config);
    }
  }

  /**
   * 根据布局进行render，如果没有根据node的x y
   * @param nodes
   * @param edges
   */
  layoutRender(model) {
    if (this.layoutConfig?.type == LayoutType.Force) {
      const force = new Force(model.nodes, model.edges, null);
      force.layout();
    }

    if (this.layoutConfig?.type == LayoutType.Dagre) {
      const dagre = new Dagre(model.nodes, model.edges, null);
      dagre.layout();
    }

    if (this.layoutConfig?.type == LayoutType.Tree) {
      const tree = new Tree(model.nodes, model.edges, this.layoutConfig.config);
      tree.layout();
    }

    if (this.layoutConfig?.type == LayoutType.Mind) {
      const mind = new Mind(model.nodes, model.edges, this.layoutConfig.config);
      mind.layout();
    }

    this.data({ nodes: model.nodes, edges: model.edges });

    this.render();
  }

  /**
   * 更新数据， 需清除stage的内容
   * @param model
   */
  data(model: Model) {
    this.stage.children = [];
    this.model = cloneDeep(model);

    const { nodes, edges } = model;
    this.stage.clearChildren();
    Array.isArray(nodes) &&
      nodes.forEach((node) => {
        this.addNode(node);
      });
    
    Array.isArray(edges) &&
      edges.forEach((edge) => {
        if(edge.source) {
          edge.sourceModel = nodes.find(n => n.id === edge.source)
        }
        if(edge.target) {
          edge.targetModel = nodes.find(n => n.id === edge.target)
        }
        this.addEdge(edge);
      });
  }

  /**
   * 更新数据并进行渲染
   * @param model
   */
  read(model: {
    nodes?: Omit<NodeModel, "x" | "y">[];
    edges?: Omit<EdgeModel, "x" | "y">[];
  }) {
    // this.data(model);
    // const { nodes, edges } = model;
    this.layoutRender(model);
  }

  getContainerById(id) {
    function loopStage(list = []) {
      for (const item of list) {
        if (item instanceof Container && item.id == id) {
          return item;
        }
        if (Array.isArray(item.children)) {
          loopStage(item.children);
        }
      }
    }

    return loopStage(this.stage.children);
  }

  /**
   * 增加元素
   * @param type
   * @param model
   */
  addItem(type: ItemType, model: NodeModel | EdgeModel) {
    if (type == "node") {
      this.addNode(model as NodeModel);
    }
    if (type == "edge") {
      this.addEdge(model as EdgeModel);
    }
  }

  /**
   * 增加节点
   * @param data
   */
  addNode(data: NodeModel) {
    const targetNode = this.model.nodes.find((item) => item.id == data.id);
    if (!targetNode) {
      this.model.nodes.push(data);
    }
    const _this = this;
    const graphic = graphicsShapeParse(this.registerMap, data, _this);
    this.stage.addChild(graphic);
  }

  /**
   * 增加线
   * @param data
   */
  addEdge(data: EdgeModel) {
    const targetEdge = this.model.edges.find((item) => item.id == data.id);
    if (!targetEdge) {
      this.model.edges.push(data);
    }
    const graphic = graphicsLineParse(this.registerMap, data);
    this.stage.addChild(graphic);
  }

  /**
   * 更新某个节点的内容
   * @param data
   * @returns
   */
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

  /**
   * 刷新所有节点并进行渲染
   */
  refresh() {
    const _nodes = this.model.nodes;
    if (Array.isArray(_nodes))
      this.model.nodes = _nodes.map((n) =>
        Object.assign(n, { x: null, y: null })
      );
    this.read(this.model);
  }
}
