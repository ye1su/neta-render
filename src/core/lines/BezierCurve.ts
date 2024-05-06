import { LineType } from "..";
import { Point } from "../math";
import { Polygon } from "../shapes";
import { BezierCurveConfig } from "../types/graphics";
import { Line } from "./Line";

export class BezierCurve extends Line {
  public readonly type = LineType.BezierCurve;
  public readonly config: BezierCurveConfig;

  constructor(source: string, target: string, config: BezierCurveConfig) {
    super();
    this.sourceId = source;
    this.targetId = target;
    this.config = config;
    this._polygon = new Polygon([]);
  }

  public contains(p: Point): boolean {
    return false;
  }
}
