import { Container } from "../display";
import { Graphics } from "../graphics/Graphics";
import { Point } from "../math";
import { CanvasRenderer } from "../renderer/CanvasRender";

export class EventSystem {
  // canvas元素
  private canvasEle: HTMLCanvasElement;
  // 数据结构
  private stage: Container;
  // 渲染器
  private _renderer: CanvasRenderer;
  // 寻找目标节点
  public hasFoundTarget: boolean = false;
  public hitTarget: Graphics | Container | null = null;
  // 是否在拖拽中
  private _dragging = false;
  // 点击鼠标后存取的数据
  public _mouseDownPoint = {
    x: 0,
    y: 0,
    diffx: 0,
    diffy: 0,
  };
  private emit;

  constructor(stage: Container, renderer: CanvasRenderer, emit) {
    this.canvasEle = renderer.viewer;
    this.stage = stage;
    this._renderer = renderer;
    this.emit = emit;
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

  private onPointerDown = (event) => {
    const e = Object.assign({}, event, {
      offsetX: event.offsetX * 2,
      offsetY: event.offsetY * 2,
    });
    const target = this.hitTest(this.stage, new Point(e.offsetX, e.offsetY));
    // 获取当前点击的相关信息
    this._mouseDownPoint = {
      x: e.offsetX,
      y: e.offsetY,
      diffx: 0,
      diffy: 0,
    };
    // 拖拽开始时存取当前矩阵快照
    this._dragging = true;
    this._renderer.cloneMatrix();

    if (target) {
      const tansferTarget = this._renderer.getPointByTransform(
        target.x,
        target.y
      );
      // 记录点击节点在图形的位置
      this._mouseDownPoint.diffx = e.offsetX - tansferTarget.x;
      this._mouseDownPoint.diffy = e.offsetY - tansferTarget.y;
      this.emit("graphics:pointerdown", event, target);
    }
  };

  private onPointerMove = (event) => {
    const e = Object.assign({}, event, {
      offsetX: event.offsetX * 2,
      offsetY: event.offsetY * 2,
    });
    const movePosition = {
      x: e.offsetX,
      y: e.offsetY,
    };

    // 拖拽节点事件
    if (this._dragging && this.hitTarget) {
      // 相对当前位置的偏移量
      const diffX =
        movePosition.x - this._mouseDownPoint.x - this._mouseDownPoint.diffx;
      const diffY =
        movePosition.y - this._mouseDownPoint.y - this._mouseDownPoint.diffy;

      const whole = this.hitTarget?.parent?.whole;

      // 如果为组合节点则指向parent
      if (whole) {
        this.hitTarget = this.hitTarget.parent;
      }

      // 根据画布缩放平移动
      const realPoint = this._renderer.getTransformByPoint(
        this._mouseDownPoint.x + diffX,
        this._mouseDownPoint.y + diffY
      );

      // 更新拖拽的的节点位置
      this.hitTarget.updatePosition(
        this._mouseDownPoint.x + diffX,
        this._mouseDownPoint.y + diffY
      );
      this.hitTarget.updatePosition(realPoint.x, realPoint.y);
      this._renderer.render(this.stage);
    }

    // 拖拽画布
    if (this._dragging && !this.hitTarget) {
      const diffX = movePosition.x - this._mouseDownPoint.x;
      const diffY = movePosition.y - this._mouseDownPoint.y;
      this._renderer.updateCanvasTranslate(diffX, diffY);
    }
  };

  private onPointerup = (e) => {
    this._dragging = false;
    this.emit("graphics:pointerup", e);
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
