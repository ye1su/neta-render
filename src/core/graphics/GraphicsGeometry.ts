import { Rectangle, Shape } from "../shapes";
import { Point } from "../math";
import { GraphicsData } from "./GraphicsData";
import { FillStyle } from "./style/FillStyle";
import { LineStyle } from "./style/LineStyle";
import { GlobalTransform } from "../types/shapes";
import { Line } from "../lines";

export class GraphicsGeometry<T extends Shape | Line> {
  public graphicsData: GraphicsData<T>;
  constructor() {}
  public drawShape(
    shape: T,
    fillStyle: FillStyle,
    lineStyle: LineStyle
  ) {
    const data = new GraphicsData(shape, fillStyle, lineStyle);
    // this.graphicsData.push(data);
    this.graphicsData = data;
  }
  public clear() {
    this.graphicsData = null;
  }
  public updateShapePosition(x: number, y: number) {
    if (!(this.graphicsData.shape instanceof Shape)) return;
    this.graphicsData.shape.setPosition(x, y);
  }
  public updateShapeGlobalTransform(transform: GlobalTransform) {
    if (!(this.graphicsData.shape instanceof Shape)) return;
    this.graphicsData.shape.globalTransform = transform;
  }
  /**
   * @param p 待检测点
   * @returns {boolean} 待检测点是否落在某一个子图形内
   */
  public containsPoint(p: Point): boolean {
    const { shape, fillStyle } = this.graphicsData
    if (!fillStyle.visible) {
      return false
    }
    if (shape.contains(p)) {
      return true;
    }
    return false;
  }
}
