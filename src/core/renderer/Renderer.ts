import { Rectangle } from "../shapes";
import { IApplicationOptions } from "../types";
import { fixFactor } from "../utils";

export class Renderer {
  public el: HTMLCanvasElement;
  public screen = new Rectangle();
  public width: number;
  public height: number;
  constructor(options: IApplicationOptions) {
    const { el } = options;
    this.el = el;
    this.screen.width = parseInt(el.style.width);
    this.screen.height = parseInt(el.style.height);
    this.width = fixFactor(this.screen.width);
    this.height = fixFactor(this.screen.height);
  }

  public resizeView(width: number, height: number) {
    this.el.width = width;
    this.el.height = height;
  }
  public render(container: Container) {
    // nothing
  }
  public clear() {}
}
