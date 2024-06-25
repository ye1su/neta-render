import { ShapeType } from "../enums";
import { Point } from "../math";
import { Shape } from "./Shape";

export class Rectangle extends Shape {
  public x: number;
  public y: number;
  public offsetX: number;
  public offsetY: number;
  public width: number;
  public height: number;
  public radius: number | undefined;
  public type = ShapeType.Rectangle;
  constructor(x = 0, y = 0, name: string, width = 0, height = 0, radius?: number) {
    super();

    this.offsetX = x;
    this.offsetY = y;

    this.x = 0;
    this.y = 0;

    this.name = name

    this.width = width;
    this.height = height;

    if (radius) {
      const r = Math.min(width, height) / 2;
      this.radius = radius > r ? r : radius;
      this.type = ShapeType.RoundedRectangle;
    }
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getXy() {
    return {
      x: this.x + this.offsetX,
      y: this.y + this.offsetY,
    };
  }

  public contains(point: Point): boolean {
    if (this.radius) {
      return this.containsRadius(point);
    }
    return this.containsNormal(point);
  }

  private containsNormal(point: Point): boolean {
    const _x = this.x + this.offsetX;
    const _y = this.y + this.offsetY;

    const p = this.transformPoint(point);

    if (
      p.x > _x &&
      p.x < _x + this.width &&
      p.y > _y &&
      p.y < _y + this.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  private containsRadius(point: Point): boolean {
    const _x = this.x + this.offsetX;
    const _y = this.y + this.offsetY;

    const p = this.transformPoint(point);

    const con1 =
      p.x > _x && p.x < _x + this.width && p.y > _y && p.y < _y + this.height;
    if (!con1) {
      return false;
    }

    // 判断左上角
    const c1x = _x + this.radius;
    const c1y = _y + this.radius;
    if (p.x < c1x && p.y < c1y) {
      if (
        (p.x - c1x) * (p.x - c1x) + (p.y - c1y) * (p.y - c1y) <
        this.radius * this.radius
      ) {
        return true;
      } else {
        return false;
      }
    }

    // 判断左下角
    const c2x = _x + this.radius;
    const c2y = _y + this.height - this.radius;
    if (p.x < c2x && p.y > c2y) {
      if (
        (p.x - c2x) * (p.x - c2x) + (p.y - c2y) * (p.y - c2y) <
        this.radius * this.radius
      ) {
        return true;
      } else {
        return false;
      }
    }

    // 判断右上角
    const c3x = _x + this.width - this.radius;
    const c3y = _y + this.radius;
    if (p.x > c3x && p.y < c3y) {
      if (
        (p.x - c3x) * (p.x - c3x) + (p.y - c3y) * (p.y - c3y) <
        this.radius * this.radius
      ) {
        return true;
      } else {
        return false;
      }
    }

    // 判断右下角
    const c4x = _x + this.width - this.radius;
    const c4y = _y + this.height - this.radius;
    if (p.x > c4x && p.y < c4y) {
      if (
        (p.x - c4x) * (p.x - c4x) + (p.y - c4y) * (p.y - c4y) <
        this.radius * this.radius
      ) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }
}
