import { RendererType } from "../enums";

export interface IApplicationOptions {
  el: HTMLDivElement;
  rendererType?: RendererType;
  backgroundColor?: string
}


export type ItemType = 'node' | 'edge'

export interface GlobalTransform {
  matrix: number[];
  translate: {
    x: number;
    y: number;
  };
  scale: number;
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