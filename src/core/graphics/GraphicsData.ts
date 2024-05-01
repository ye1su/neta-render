import { Shape } from "../shapes/Shape";
import { FillStyle } from "./style/FillStyle";
import { LineStyle } from "./style/LineStyle";

export class GraphicsData {
  public shape: Shape
  public lineStyle: LineStyle
  public fillStyle: FillStyle
  public points: number[] = []

  constructor(shape: Shape, fillStyle: FillStyle, lineStyle: LineStyle) {
    this.shape = shape
    this.lineStyle = lineStyle
    this.fillStyle = fillStyle
  }

}