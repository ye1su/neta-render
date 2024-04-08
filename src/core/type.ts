import { RendererType } from "./enums";

export interface IApplicationOptions {
  el: HTMLCanvasElement;
  rendererType?: RendererType;
  backgroundColor?: string
}
