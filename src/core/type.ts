import { LineCap, LineJoin, RendererType } from "./enums";

export interface IApplicationOptions {
  el: HTMLCanvasElement;
  rendererType?: RendererType;
  backgroundColor?: string
}

export interface IFillStyleOptions {
  color?: string
  alpha?: number
  visible?: boolean
}

export interface ILineStyleOptions extends IFillStyleOptions {
  width?: number
  cap?: LineCap
  join?: LineJoin
}
