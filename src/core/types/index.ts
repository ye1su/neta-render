import { RendererType } from "../enums";
import { ItemStyle } from "./style";


// Application 的如惨
export interface IApplicationOptions {
  el: HTMLDivElement;
  rendererType?: RendererType;
  backgroundColor?: string
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
  layout?: LayoutConfig
  register?: RegisterMap[]
}

// 布局配置
export interface LayoutConfig {
  type: string
}

// itemType
export type ItemType = 'node' | 'edge'


// 注册函数的map
export interface RegisterMap {
  name: string
  render: Record<string, any>
}

export interface Model {
  nodes: NodeModel[];
  edges: EdgeModel[]
}


export interface BaseModel {
  id: string;
  type: string;
  label?: string;
}

export interface NodeModel extends BaseModel {
  // x 节点x位置
  x: number,
  // y 节点y
  y: number,
  // 节点文字
  text?: string
  // style样式
  style?: ItemStyle
  // 节点宽度
  width?: number,
  // 节点高度
  height?: number
  // 圆的半径或者 直角的圆角
  radius?: number
  // 图片地址
  src?: string
  // 椭圆x
  radiusX?: number
  // 椭圆y
  radiusY?: number
  // 多边形节点
  points?: number[]
}


export interface EdgeModel extends  BaseModel{
  // source Id
  source: string
  // target Id
  target: string
  // source节点的锚点
  sourceAnchor?: number
  // target节点的锚点
  targetAnchor?: number
  // 线需要经过的必经点
  anchorPoints?: number[][]
}

// 注册上下问初始化参数
export interface RegisterContextOptions {
  inputProperties: Record<string, any>
}