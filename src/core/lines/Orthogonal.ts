import { LineType } from "..";
import { Point } from "../math";
import { Polygon } from "../shapes";
import { OrthogonalConfig } from "../types/graphics";
import { Line } from "./Line";

export class Orthogonal extends Line {
  public readonly type = LineType.Orthogonal;
  public readonly config: OrthogonalConfig;

  constructor(source: string, target: string, config: OrthogonalConfig = {}) {
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
