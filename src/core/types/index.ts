import { RendererType } from "../enums";


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
  label?: string;
}

export interface NodeModel extends BaseModel {

  x: number,
  y: number,
}


export interface EdgeModel extends  BaseModel{
  source: string
  target: string
}

// 注册上下问初始化参数
export interface RegisterContextOptions {
  inputProperties: Record<string, any>
}