import { Container } from "./display";
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
  const p = curTarget.position;
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
  public el: HTMLCanvasElement;
  public stage = new Container();
  private renderer: Renderer;

  constructor(options: IApplicationOptions) {
    const { el } = options;
    this.el = el;
    this.renderer = getRenderer(options);
    this.render();

    this.el.addEventListener('pointermove', (e) => {
      const target = hitTest(this.stage, new Point(e.offsetX, e.offsetY))
      if (target) {
        this.el.style.cursor = 'pointer'
      } else {
        this.el.style.cursor = 'auto'
      }
    })

    this.el.addEventListener('click', (e) => {
      const target = hitTest(this.stage, new Point(e.offsetX, e.offsetY))
      if (target) {
        target.emit('click')
      }
    })
  }

  public render() {
    this.renderer.render(this.stage);
  }

  // private start() {
  //   const func = () => {
  //     this.render();
  //     requestAnimationFrame(func);
  //   };
  //   func();
  // }
}
