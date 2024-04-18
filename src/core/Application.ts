import { Container } from "./display";
import { EventSystem } from "./events";
import { Point } from "./math";
import { getRenderer } from "./renderer";
import { Renderer } from "./renderer/Renderer";
import { IApplicationOptions } from "./type";

let hasFoundTarget = false;
let hitTarget: Container | null = null;

const hitTestRecursive = (curTarget: Container, globalPos: Point) => {
  // 如果对象不可见
  if (!curTarget.visible) {
    return;
  }

  if (hasFoundTarget) {
    return;
  }

  // 深度优先遍历子元素
  for (let i = curTarget.children.length - 1; i >= 0; i--) {
    const child = curTarget.children[i];
    hitTestRecursive(child, globalPos);
  }

  if (hasFoundTarget) {
    return;
  }

  // 最后检测自身
  const p = globalPos;
  if (curTarget.containsPoint(p)) {
    hitTarget = curTarget;
    hasFoundTarget = true;
  }
};

const hitTest = (root: Container, globalPos: Point): Container | null => {
  hasFoundTarget = false;
  hitTarget = null;

  hitTestRecursive(root, globalPos);

  return hitTarget;
};

export class Application {
  public readonly  el: HTMLCanvasElement;
  public readonly stage = new Container();
  private readonly renderer: Renderer;
  private eventSystem: EventSystem

  constructor(options: IApplicationOptions) {
    const { el } = options;
    this.el = el;
    this.renderer = getRenderer(options);
    this.render();

    this.eventSystem = new EventSystem(this.el, this.stage)
    this.start()
  }

  public render() {
    this.renderer.render(this.stage);
  }

  private start() {
    const func = () => {
      this.render()
      requestAnimationFrame(func)
    }
    func()
  }
}
