import { LineType } from "../enums";
import { Point } from "../math/Point";
import { Polygon } from "../shapes";

export abstract class Line {
  public type: LineType;
  public _polygon: Polygon
  constructor() {}
  public abstract contains(point: Point): boolean;
}
