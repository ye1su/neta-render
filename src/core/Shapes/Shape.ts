import { ShapeType } from "../enums";
import { Point } from "../math/Point";

export abstract class Shape {
  public abstract type: ShapeType;
  public globalTransform: any
  constructor() {}
  public abstract contains(point: Point): boolean;
  public abstract setPosition(x: number, y: number): void
}
