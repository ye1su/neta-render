import { LineType } from "..";
import { Point } from "../math";
import { Polygon } from "../shapes";
import { Line } from "./Line";

export class Straight extends Line {

  public readonly type = LineType.Straight;

  constructor(source: string, target: string) {
    super();
    this.sourceId = source
    this.targetId = target
    this._polygon = new Polygon([])
  }

  public contains(p: Point): boolean {
    return false;
  }
}
