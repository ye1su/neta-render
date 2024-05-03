import { LineType } from "..";
import { Point } from "../math";
import { Polygon } from "../shapes";
import { Line } from "./Line";

export class Straight extends Line {

  public readonly type = LineType.Straight;

  constructor(polygon: Polygon) {
    super();
    this._polygon = polygon
  }

  public contains(p: Point): boolean {
    return false;
  }
}
