import { DisplayObject } from "./DisplayObject";
import { CanvasRenderer } from "../renderer/CanvasRender";
import { Anchor, Point } from "../math";
import { getContainerSurround } from "../utils";
import { ItmeType } from "../enums";
import { BBox } from "../types/graphics";

export class Container extends DisplayObject {
  public type = ItmeType.Container;
  public sortDirty = false;
  public readonly children: Container[] = [];
  // 锚点
  public anchor = new Anchor();

  // 如果是组合whole为true 则container是个整体
  public whole = false;

  constructor() {
    super();
  }

  /**
   * 渲染自身，在container上面没有东西要渲染，所以这个函数的内容为空
   */
  protected renderCanvas(render: CanvasRenderer) {
    // nothing

    // 如果为shape为whole 则更新子节点的所有position
    if (this.whole) {
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.updatePosition(this.x, this.y);
      }

      // 更新锚点位置
      const containerBox = this.getBBox();
      this.anchor.updateContainerBBox(containerBox);
    }
  }

  /**
   * 递归渲染以自身为根的整棵节点树
   */
  public renderCanvasRecursive(render: CanvasRenderer) {
    if (!this.visible) {
      return;
    }

    // 如果container 需要提前更新位置
    if (this.type !== ItmeType.Container) {
      this.renderCanvas(render);
    }

    // 提前更新container的位置
    this.children
      .filter((child) => child.type == ItmeType.Container)
      .forEach((child) => {
        child.renderCanvas(render);
      });


    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      child.renderCanvasRecursive(render);
    }

    // 渲染锚点
    this.anchor.render(render);
  }

  /**
   * 递归更新当前元素以及所有子元素的transform
   */
  public updateTransform() {
    this.sortChildren();

    this.worldAlpha = (this.parent?.worldAlpha || 1) * this.alpha;

    if (this.worldAlpha <= 0 || !this.visible) {
      return;
    }

    for (let i = 0, j = this.children.length; i < j; ++i) {
      const child = this.children[i];

      child.updateTransform();
    }
  }

  /**
   * 新增某个child
   * @param child
   */
  public addChild(child: Container) {
    child.parent?.removeChild(child); // 将要添加的child从它的父元素的children中移除

    this.children.push(child);
    child.parent = this; // 将要添加的child的parent指向this
    this.sortDirty = true;
  }

  /**
   * 移除某个children
   */
  public removeChild(child: Container) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] === child) {
        this.children.splice(i, 1);
        child.parent = null;
        return;
      }
    }
  }
  /**
   * 清空children
   */
  public clearChildren() {
    for (let i = 0; i < this.children.length; i++) {
      this.children.splice(i, 1);
    }
  }
  /**
   * 排序children
   */
  public sortChildren() {
    if (!this.sortDirty) {
      return;
    }

    this.children.sort((a, b) => a.zIndex - b.zIndex);
    this.sortDirty = false;
  }

  /**
   * 更新x,y
   */
  public updatePosition(x: number, y: number) {
    this.position.set(x, y);
  }

  /**
   * 获取container 的包围框
   * @returns BBox
   */
  public getBBox(): BBox {
    const shapeBoxList = this.children
      .map((shape) => {
        return shape.getBBox();
      })
      .filter((item) => item != undefined);

    return getContainerSurround(shapeBoxList);
  }

  public containsPoint(p: Point) {
    const tag = this.anchor.portsContains(p)
    if(tag) {
      return true
    }
    return false;
  }

  /**
   * 获取锚点位置
   */
  get anchorPoint() {
    return this.anchor.anchorPort.point;
  }
}
