import { Line } from "../lines";
import { Shape } from "../shapes";
import { ShapeStyle } from "./style";

export class GraphicsData<T extends Shape | Line> {
  public shape: T;
  public shapeStyle: ShapeStyle;
  public points: number[] = [];

  constructor(shape: T, shapeStyle: ShapeStyle) {
    this.shape = shape;
    this.shapeStyle = shapeStyle;
  }
}
