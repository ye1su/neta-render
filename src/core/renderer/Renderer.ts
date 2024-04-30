import { Rectangle } from "../Shapes";
import { IApplicationOptions } from "../type";

export class Renderer {
  public el: HTMLCanvasElement;
  public screen = new Rectangle();
  constructor(options: IApplicationOptions) {
    const { el } = options;
    this.el = el;
    this.screen.width = parseInt(el.style.width);
    this.screen.height = parseInt(el.style.height);
  }

  public resizeView(width: number, height: number) {
    this.el.width = width;
    this.el.height = height;
  }
  public render(container: Container) {
    // nothing
  }
  public clear() {
    
  }
}
