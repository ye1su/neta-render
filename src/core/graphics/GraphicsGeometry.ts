import { Shape } from "../Shapes/Shape";
import { Point } from "../math";
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
    this.graphicsData = [];
  }
  public updateShapePosition(x: number, y: number) {
    this.graphicsData.forEach((item) => {
      item.shape.setPosition(x, y);
    });
  }
  public updateShapeGlobalTransform(transform) {
    this.graphicsData.forEach((item) => {
      item.shape.globalTransform = transform
    });
  }
  /**
   * @param p 待检测点
   * @returns {boolean} 待检测点是否落在某一个子图形内
   */
  public containsPoint(p: Point): boolean {
    for (let i = 0; i < this.graphicsData.length; i++) {
      const { shape, fillStyle } = this.graphicsData[i];
      if (!fillStyle.visible) {
        continue;
      }
      if (shape.contains(p)) {
        return true;
      }
    }

    return false;
  }
}
