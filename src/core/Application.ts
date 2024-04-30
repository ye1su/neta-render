import { Container } from "./display";
import { EventSystem } from "./events";
import { getRenderer } from "./renderer";
import { WebGlRenderer, CanvasRenderer } from "./renderer";
import { IApplicationOptions } from "./type";

export class Application {
  public readonly el: HTMLDivElement;
  public readonly stage = new Container();
  private readonly renderer: CanvasRenderer | WebGlRenderer;
  private eventSystem: EventSystem;

  constructor(options: IApplicationOptions) {
    const { el } = options;
    this.el = el;

    this.renderer = getRenderer({ ...options });
    this.render();

    if (this.renderer instanceof CanvasRenderer) {
      this.eventSystem = new EventSystem(this.stage, this.renderer);
    }
    // this.start()
  }

  public render() {
    this.renderer.render(this.stage);
    console.log("this.stage: ", this.stage);
  }

  public destroy() {
    this.renderer.clear();
    this.eventSystem.removeEvents();
  }

  private start() {
    const func = () => {
      this.render();
      requestAnimationFrame(func);
    };
    func();
  }
}
