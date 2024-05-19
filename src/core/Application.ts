import { Container } from "./display";
import { EventSystem } from "./events";
import { getRenderer } from "./renderer";
import { WebGlRenderer, CanvasRenderer } from "./renderer";
import { IApplicationOptions } from "./types";
import { default as Eventemitter } from "eventemitter3";

export class Application extends Eventemitter {
  public readonly el: HTMLDivElement;
  public readonly stage = new Container();
  private readonly renderer: CanvasRenderer;
  private eventSystem: EventSystem;

  constructor(options: IApplicationOptions) {
    super();
    const { el } = options;
    this.el = el;

    this.renderer = getRenderer({ ...options });
    this.render();

    const _emit = this.emit;
    if (this.renderer instanceof CanvasRenderer) {
      this.eventSystem = new EventSystem(
        this.stage,
        this.renderer,
        _emit.bind(this)
      );
    }
  }

  //渲染
  public render() {
    this.renderer.render(this.stage);
  }

  // 销毁
  public destroy() {
    this.renderer.clear();
    this.eventSystem.removeEvents();
  }

  /**
   * 使当前画布居中显示
   */
  public fitCenter() {
    const containerBox = this.stage.getBBox();
    const canvasCenter = {
      x: this.renderer.width / 2,
      y: this.renderer.height / 2,
    };
    const containerCenter = {
      x: containerBox.centerX,
      y: containerBox.centerY
    }

    const shift = {
      x: canvasCenter.x - containerCenter.x,
      y: canvasCenter.y - containerCenter.y
    }
    this.renderer.updateCanvasTranslate(shift.x, shift.y)
  }

  // 逐帧渲染
  private frameRender() {
    const func = () => {
      this.render();
      requestAnimationFrame(func);
    };
    func();
  }
}
