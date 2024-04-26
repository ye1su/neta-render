import { Container } from "../display";
import { Graphics } from "../graphics/Graphics";
import { Point } from "../math";
import { Renderer } from "../renderer";

export class EventSystem {
  private canvasEle: HTMLCanvasElement; // canvas元素
  private stage: Container;
  private renderer: Renderer;
  public hasFoundTarget: boolean = false;
  public hitTarget: Graphics | Container | null = null;
  public _dragging = false;
  public _mouseDownPoint = {
    x: 0,
    y: 0,
    diffx: 0,
    diffy: 0
  };

  constructor(
    canvasEle: HTMLCanvasElement,
    stage: Container,
    renderer: Renderer
  ) {
    this.canvasEle = canvasEle;
    this.stage = stage;
    this.renderer = renderer;
    this.addEvents();
  }
  private addEvents = () => {
    this.canvasEle.addEventListener("pointerdown", this.onPointerDown);
    this.canvasEle.addEventListener("pointermove", this.onPointerMove);
    this.canvasEle.addEventListener("pointerup", this.onPointerup);
  };
  public removeEvents = () => {
    this.canvasEle.removeEventListener("pointerdown", this.onPointerDown);
    this.canvasEle.removeEventListener("pointermove", this.onPointerMove);
    this.canvasEle.removeEventListener("pointerup", this.onPointerup);
  };

  private onPointerDown = (e) => {
    const target = this.hitTest(this.stage, new Point(e.offsetX, e.offsetY));
    console.log('target: ', target);
    if (target) {
      this._dragging = true;
      this._mouseDownPoint = {
        x: e.offsetX,
        y: e.offsetY,
        diffx: e.offsetX - target.x,
        diffy: e.offsetY - target.y,
      };
      // target.emit("click");
    }
  };

  private onPointerMove = (e) => {
    // 拖拽事件
    if (this._dragging) {
      const movePosition = {
        x: e.offsetX,
        y: e.offsetY,
      };

      const diffX = movePosition.x - this._mouseDownPoint.x - this._mouseDownPoint.diffx;
      const diffY = movePosition.y - this._mouseDownPoint.y - this._mouseDownPoint.diffy;
      (this.hitTarget as Graphics).updatePosition(
        this._mouseDownPoint.x + diffX,
        this._mouseDownPoint.y + diffY
      );
      this.renderer.render(this.stage);
    }
  };

  private onPointerup = (e) => {
    this._dragging = false;
  };

  public hitTest(root: Container, globalPos: Point): Container | null {
    this.hasFoundTarget = false;
    this.hitTarget = null;

    this.hitTestRecursive(root, globalPos);

    return this.hitTarget;
  }

  public hitTestRecursive(curTarget: Graphics | Container, globalPos: Point) {
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
}
