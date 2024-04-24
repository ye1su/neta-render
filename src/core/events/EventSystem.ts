import { Container } from "../display";
import { Point } from "../math";

export class EventSystem {
  private canvasEle: HTMLCanvasElement; // canvas元素
  private stage: Container;
  private renderer;
  public hasFoundTarget: boolean = false;
  public hitTarget: Container | null = null;

  constructor(canvasEle: HTMLCanvasElement, stage: Container, renderer: any) {
    this.canvasEle = canvasEle;
    this.stage = stage;
    this.renderer = renderer;
    this.addEvents();
  }
  private addEvents = () => {
    // this.canvasEle.addEventListener('pointermove', this.onPointerMove, true)
    // this.canvasEle.addEventListener('pointerleave', this.onPointerLeave, true)
    // this.canvasEle.addEventListener('pointerdown', this.onPointerDown, true)
    // this.canvasEle.addEventListener('pointerup', this.onPointerup, true)

    let dragging = false;
    let mouseDownPoint;
    let t;
    this.canvasEle.addEventListener("pointerdown", (e) => {
      const target = this.hitTest(this.stage, new Point(e.offsetX, e.offsetY));
      if (target) {
        console.log("target: ", target);
        dragging = true;
        mouseDownPoint = {
          x: e.offsetX,
          y: e.offsetY,
        };
        t = target;
        // target.emit("click");
      }
    });

    this.canvasEle.addEventListener("pointermove", (e) => {
      if (!dragging) {
        return;
      }

      const newP = {
        x: e.offsetX,
        y: e.offsetY,
      };
      const diffX = newP.x - mouseDownPoint.x;
      const diffY = newP.y - mouseDownPoint.y;
      t.updatePosition(mouseDownPoint.x + diffX, mouseDownPoint.y + diffY);
      this.renderer.render(this.stage);
    });
    this.canvasEle.addEventListener("pointerup", (e) => {
      dragging = false;
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
