import { Container } from "./display";
import { EventSystem } from "./events";
import { getRenderer } from "./renderer";
import { Renderer } from "./renderer/Renderer";
import { IApplicationOptions } from "./type";

export class Application {
  public readonly el: HTMLCanvasElement;
  public readonly stage = new Container();
  private readonly renderer: Renderer;
  private eventSystem: EventSystem;

  constructor(options: IApplicationOptions) {
    const { el } = options;
    this.el = el;
    this.renderer = getRenderer(options);
    this.render();

    this.eventSystem = new EventSystem(this.el, this.stage, this.renderer);
    // this.start()
  }

  public render() {
    this.renderer.render(this.stage);
    console.log('this.stage: ', this.stage);
  }

  public destroy() {
    this.renderer.clear()
    this.eventSystem.removeEvents()   
  }

  private start() {
    const func = () => {
      this.render();
      requestAnimationFrame(func);
    };
    func();
  }
}
