import { ShapeType } from "../enums";
import { Point } from "../math";
import { Shape } from "./Shape";

export class Polygon extends Shape {
  public points: number[] = [];
  public closeStroke = false;
  public type = ShapeType.Polygon;
  constructor() {
    super();
  }
  public contains(point: Point): boolean {
    return true;
  }
}
