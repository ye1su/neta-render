import { LineType } from "..";
import { Point } from "../math";
import { Polygon } from "../shapes";
import { QuadraticCurveConfig } from "../types/graphics";
import { Line } from "./Line";

export class QuadraticCurve extends Line {
  public readonly type = LineType.QuadraticCurve;
  public readonly config: QuadraticCurveConfig;

  constructor(source: string, target: string, config: QuadraticCurveConfig) {
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
