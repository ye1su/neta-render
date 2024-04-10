import { Container } from "./display";
import { getRenderer } from "./renderer";
import { Renderer } from "./renderer/Renderer";
import { IApplicationOptions } from "./type";

export class Application {
  public el: HTMLCanvasElement;
  public stage = new Container()
  private renderer: Renderer
  
  constructor(options: IApplicationOptions) {
    const { el } = options;
    this.el = el;
    this.renderer = getRenderer(options)
    this.render()
  }

  public render() {
    this.renderer.render(this.stage)
  }

  private start() {
    const func = () => {
      this.render()
      requestAnimationFrame(func)
    }
    func()
  }
}
