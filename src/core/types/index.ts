import { RendererType } from "../enums";
import { RefBehavior, RegBhvType, RegNodeType } from "./register";
import { ItemStyle } from "./style";

// Application 的如惨
export interface IApplicationOptions {
  el: HTMLDivElement;
  rendererType?: RendererType;
  backgroundColor?: string;
}

export interface GlobalTransform {
  matrix: number[];
  translate: {
    x: number;
    y: number;
  };
  scale: number;
}

export interface NetaGraphOptions extends IApplicationOptions {
  layout?: LayoutConfig;
  register?: {
    nodes?: RegNodeType[];
    edges?: RegNodeType[];
    behaviors?: RegBhvType[];
  };
  behaviors?: RefBehavior[];
}

// 布局配置
export interface LayoutConfig {
  type: string;
  config?: Record<string, any>;
}

// itemType
export type ItemType = "node" | "edge";

export interface Model {
  nodes: NodeModel[];
  edges: EdgeModel[];
}

export interface BaseModel {
  id: string;
  type: string;
  label?: string;
  factor?: Record<string, any>;
}

export interface NodeModel extends BaseModel {
  // x 节点x位置
  x: number;
  // y 节点y
  y: number;
  // 节点文字
  text?: string;
  // style样式
  style?: ItemStyle;
  // 节点宽度
  width?: number;
  // 节点高度
  height?: number;
  // 圆的半径或者 直角的圆角
  radius?: number;
  // 图片地址
  src?: string;
  // 椭圆x
  radiusX?: number;
  // 椭圆y
  radiusY?: number;
  // 多边形节点
  points?: number[];
  // 是否启动锚点
  anchor?: boolean;
  // shape的名称
  name?: string;

  [key: string]: any;
}

export interface EdgeModel extends BaseModel {
  // source Id
  source: string;
  // target Id
  target: string;
  // style样式
  style?: ItemStyle;
  // source节点的信息
  sourceModel?: NodeModel
  // target节点的信息
  targetModel?: NodeModel
  // source节点的锚点
  sourceAnchor?: number;
  // target节点的锚点
  targetAnchor?: number;
  // 线需要经过的必经点
  anchorPoints?: number[][];
}

export type AddShapeConfig = Omit<NodeModel, "type" | "id">;
export type AddEdgeConfig = Omit<EdgeModel, "type" | "id">;

// 注册上下问初始化参数
export interface RegisterContextOptions {
  inputProperties: Partial<NodeModel> &
    Partial<EdgeModel> & { [name: string]: any };
}
