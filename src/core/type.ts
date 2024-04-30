import { RendererType } from "./enums";

export interface IApplicationOptions {
  el: HTMLDivElement;
  rendererType?: RendererType;
  backgroundColor?: string
}


export type ItemType = 'node' | 'edge'

export interface NodeModel {
  id: string;
  label?: string;
  x: number,
  y: number,
}

export interface IShapeStyle {
  fill?: string
  stroke?: string;
  lineWidth?: string

}