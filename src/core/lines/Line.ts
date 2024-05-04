import { Container } from "../display";
import { LineType } from "../enums";
import { Graphics } from "../graphics/Graphics";
import { Point } from "../math/Point";
import { Polygon } from "../shapes";

export abstract class Line {
  public type: LineType;
  public sourceId: string
  public targetId: string
  public source: Container
  public target: Container
  public _polygon: Polygon
  constructor() {}
  public abstract contains(point: Point): boolean;
}
