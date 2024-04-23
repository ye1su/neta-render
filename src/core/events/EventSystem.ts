import { Container } from "../display";
import { Point } from "../math";

export class EventSystem {
  private canvasEle: HTMLCanvasElement; // canvas元素
  private stage: Container;
  public hasFoundTarget: boolean = false
  public hitTarget: Container | null = null;

  constructor(canvasEle: HTMLCanvasElement, stage: Container) {
    this.canvasEle = canvasEle;
    this.stage = stage;
    this.addEvents();
  }
  private addEvents = () => {
    // this.canvasEle.addEventListener('pointermove', this.onPointerMove, true)
    // this.canvasEle.addEventListener('pointerleave', this.onPointerLeave, true)
    // this.canvasEle.addEventListener('pointerdown', this.onPointerDown, true)
    // this.canvasEle.addEventListener('pointerup', this.onPointerup, true)

    this.canvasEle.addEventListener("click", (e) => {
      console.log("e:  ++++++", e);
      const target = this.hitTest(this.stage, new Point(e.offsetX, e.offsetY));
      if (target) {
        console.log("target: ", target);
        target.emit("click");
      }
    });
  };

  hitTestRecursive(curTarget: Container, globalPos: Point) {
    // 如果对象不可见
    if (!curTarget.visible) {
      return;
    }

    if (this.hasFoundTarget) {
      return;
    }

    // 深度优先遍历子元素
    for (let i = curTarget.children.length - 1; i >= 0; i--) {
      const child = curTarget.children[i];
      this.hitTestRecursive(child, globalPos);
    }

    if (this.hasFoundTarget) {
      return;
    }

    // 最后检测自身
    const p = globalPos;

    if (curTarget.containsPoint(p)) {
      this.hitTarget = curTarget;
      this.hasFoundTarget = true;
    }
  }

  hitTest(root: Container, globalPos: Point): Container | null {
    this.hasFoundTarget = false;
    this.hitTarget = null;

    this.hitTestRecursive(root, globalPos);

    return this.hitTarget;
  }
}