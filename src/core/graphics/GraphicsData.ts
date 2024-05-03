import { Line } from "../lines";
import { Shape } from "../shapes";
import { FillStyle } from "./style/FillStyle";
import { LineStyle } from "./style/LineStyle";

export class GraphicsData {
  public shape: Shape | Line
  public lineStyle: LineStyle
  public fillStyle: FillStyle
  public points: number[] = []

  constructor(shape: Shape  | Line, fillStyle: FillStyle, lineStyle: LineStyle) {
    this.shape = shape
    this.lineStyle = lineStyle
    this.fillStyle = fillStyle
  }

}