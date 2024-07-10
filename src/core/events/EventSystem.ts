import { Container } from "../display";
import { ItmeType } from "../enums";
import { Graphics } from "../graphics/Graphics";
import { Point } from "../math";
import { CanvasRenderer } from "../renderer/CanvasRender";
import { EVENT_TYPE } from "./config";

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
  private emit;

  private moveItem: Container = null

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
    this.canvasEle.addEventListener('wheel', this.onWheel)
  };
  public removeEvents = () => {
    this.canvasEle.removeEventListener("pointerdown", this.onPointerDown);
    this.canvasEle.removeEventListener("pointermove", this.onPointerMove);
    this.canvasEle.removeEventListener("pointerup", this.onPointerup);
    this.canvasEle.removeEventListener("wheel", this.onWheel);
  };

  private onPointerDown = (event) => {
    const e = Object.assign({}, event, {
      x: event.x,
      y: event.y,
      offsetX: event.offsetX * 2,
      offsetY: event.offsetY * 2,
      hitTarget: this.hitTarget
    });
    const target = this.hitTest(this.stage, new Point(e.offsetX, e.offsetY));
    e.target = target;
    e.container = target instanceof Graphics ? target.parent : null;

    if (target) {

      this.emit(EVENT_TYPE.GRAPHICS_POINTERDOWN, e);
      return;
    }
    this.emit(EVENT_TYPE.CANVAS_POINTERDOWN, e);
  };

  private onPointerMove = (event) => {
    const e = Object.assign({}, event, {
      offsetX: event.offsetX * 2,
      offsetY: event.offsetY * 2,
      hitTarget: this.hitTarget
    });

    const target = this.hitTest(this.stage, new Point(e.offsetX, e.offsetY));

    if(!this.moveItem && target) {
      this.moveItem = target
      e.target = target
      this.emit(EVENT_TYPE.GRAPHICS_MOUSEENTER, e)
      
    }
    if(this.moveItem && !target) {
      e.target = target
      this.moveItem = null
      this.emit(EVENT_TYPE.GRAPHICS_MOUSEOUT, e)
    }

    // 传递事件
    this.emit(EVENT_TYPE.CANVAS_POINTERMOVE, e);

  };

  private onPointerup = (event) => {
    const e = Object.assign({}, event, {
      offsetX: event.offsetX * 2,
      offsetY: event.offsetY * 2,
      hitTarget: this.hitTarget
    });
    const target = this.hitTest(this.stage, new Point(e.offsetX, e.offsetY));
    e.target = target;
    e.container = target instanceof Graphics ? target.parent : null;
    this.emit(EVENT_TYPE.CANVAS_POINTERUP, e);
  };

  private onWheel = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const e = Object.assign({}, event, {
      deltaX: event.deltaX * 2,
      deltaY: event.deltaY * 2,
      offsetX: event.offsetX * 2,
      offsetY: event.offsetY * 2,
    });
    this.emit(EVENT_TYPE.CANVAS_WHEEL, e);
  }

  public hitTest(root: Container, globalPos: Point): Container | null {
    this.hasFoundTarget = false;
    this.hitTarget = null;

    this.hitTestRecursive(root, globalPos);
    // this.hitTestBreadthFirst(root, globalPos);

    return this.hitTarget;
  }

  // 深度遍历
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

  // 广度遍历
  public hitTestBreadthFirst(root: Graphics | Container, globalPos: Point) {
    const queue: (Graphics | Container)[] = [root];

    while (queue.length > 0) {
      const curTarget = queue.shift();

      if (!curTarget.visible) {
        continue;
      }

      // 检查自身
      if (curTarget.containsPoint(globalPos)) {
        this.hitTarget = curTarget;
        return;
      }

      // 将子元素加入队列
      for (let i = 0; i < curTarget.children.length; i++) {
        queue.push(curTarget.children[i]);
      }
    }
  }
}
