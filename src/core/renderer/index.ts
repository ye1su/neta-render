import { RendererType } from "../enums";
import { IApplicationOptions } from "../types";
import { CanvasRenderer } from "./CanvasRender";
import { WebGlRenderer } from "./WebGlRenderer";

export * from "./Renderer";
export * from './CanvasRender'
export * from './WebGlRenderer'

export function getRenderer(options: IApplicationOptions) {
  const { rendererType: renderType } = options;
  switch (renderType) {
    case RendererType.Canvas:
      return new CanvasRenderer(options);
    case RendererType.WebGl:
      return new WebGlRenderer(options);
    default:
      return new CanvasRenderer(options);
  }
}
