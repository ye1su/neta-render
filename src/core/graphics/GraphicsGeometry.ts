import { Shape } from "../Shapes/Shape";
import { GraphicsData } from "./GraphicsData";
import { FillStyle } from "./style/FillStyle";
import { LineStyle } from "./style/LineStyle";

export class GraphicsGeometry {
  public graphicsData: GraphicsData[] = [];
  constructor() {}
  public drawShape(shape: Shape, fillStyle: FillStyle, lineStyle: LineStyle) {
    const data = new GraphicsData(shape, fillStyle, lineStyle);
    this.graphicsData.push(data);
  }
  public clear() {
    this.graphicsData = []
  }
}
