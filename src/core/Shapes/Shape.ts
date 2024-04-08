import { ShapeType } from "../enums";
import { Point } from "../math/Point";

export abstract class Shape {
  public abstract type: ShapeType;
  constructor() {}
  public abstract contains(point: Point): boolean;
}
