import { ShapeType } from "..";
import { Point } from "../math";
import { Shape } from "./Shape";

export class Ellipse extends Shape {
  public x: number;
  public y: number;
  public offsetX: number;
  public offsetY: number;
  public radiusX: number;
  public radiusY: number;
  public readonly type = ShapeType.Ellipse;

  constructor(x = 0, y = 0, radiusX = 0, radiusY = 0) {
    super();
    this.offsetX = x;
    this.offsetY = y;

    this.x = 0;
    this.y = 0;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
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

  public contains(p: Point): boolean {
    if (
      ((p.x - this.x) * (p.x - this.x)) / (this.radiusX * this.radiusX) +
        ((p.y - this.y) * (p.y - this.y)) / (this.radiusY * this.radiusY) <
      1
    ) {
      return true;
    } else {
      return false;
    }
  }

}
