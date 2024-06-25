import { ShapeType } from "../enums";
import { Point } from "../math";
import { Shape } from "./Shape";

export class Image extends Shape {
  public x: number;
  public y: number;
  public offsetX: number;
  public offsetY: number;
  public width: number;
  public height: number;
  public src: string;
  public type = ShapeType.Image;
  constructor(x = 0, y = 0, name: string,  width = 0, height = 0, src = "") {
    super();
    this.offsetX = x;
    this.offsetY = y;

    this.x = 0;
    this.y = 0;

    this.name = name

    this.width = width;
    this.height = height;
    this.src = src;
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
}
