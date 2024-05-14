import { DisplayObject } from "./DisplayObject";
import { CanvasRenderer } from "../renderer/CanvasRender";
import { Anchor, Point } from "../math";
import { isObject } from "lodash-es";

export class Container extends DisplayObject {
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
    this.renderCanvas(render);

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

  public addChild(child: Container) {
    child.parent?.removeChild(child); // 将要添加的child从它的父元素的children中移除

    this.children.push(child);
    child.parent = this; // 将要添加的child的parent指向this
    this.sortDirty = true;
  }
  public removeChild(child: Container) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] === child) {
        this.children.splice(i, 1);
        child.parent = null;
        return;
      }
    }
  }
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
  public getBBox() {
    const box = {
      minX: 99999,
      minY: 99999,
      maxX: -99999,
      maxY: -99999,
      centerX: 0,
      centerY: 0,
    };
    this.children.forEach((shape) => {
      const shapeBox = shape.getBBox();
      if (isObject(shapeBox)) {
        if (shapeBox.minX < box.minX) {
          box.minX = shapeBox.minX;
        }
        if (shapeBox.minY < box.minY) {
          box.minY = shapeBox.minY;
        }
        if (shapeBox.maxX > box.maxX) {
          box.maxX = shapeBox.maxX;
        }
        if (shapeBox.maxY > box.maxY) {
          box.maxY = shapeBox.maxY;
        }
      }
    });
    box.centerX = (box.maxX + box.minX) / 2;
    box.centerY = (box.maxY + box.minY) / 2;

    return box;
  }

  public containsPoint(p: Point) {
    return false;
  }
}
