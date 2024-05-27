import { LineType } from "..";
import { Point } from "../math";
import { Polygon } from "../shapes";
import { StraightConfig } from "../types/graphics";
import { Line } from "./Line";

export class Straight extends Line {
  public readonly type = LineType.Straight;
  public readonly config: StraightConfig;
  constructor(source: string, target: string, config: StraightConfig = {}) {
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
