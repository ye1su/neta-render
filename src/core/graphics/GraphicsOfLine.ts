import { Container } from "../display";
import { Line, Straight } from "../lines";
import { CanvasRenderer } from "../renderer";
import { Polygon } from "../shapes";
import { GraphicsGeometry } from "./GraphicsGeometry";
import { FillStyle } from "./style/FillStyle";
import { LineStyle } from "./style/LineStyle";

export class GraphicsOfLine extends Container {
  private _render: CanvasRenderer;
  private _lineStyle = new LineStyle();
  private _fillStyle = new FillStyle();
  private _geometry = new GraphicsGeometry();
  public currentPath: Polygon | null = null;

  constructor() {
    super();
  }
  protected renderCanvas(render: CanvasRenderer) {
    this._render = render;

    const graphicsData = this._geometry.graphicsData;
    const ctx = render.ctx;

    for (let i = 0; i < graphicsData.length; i++) {
      const data = graphicsData[i];

      const { lineStyle, fillStyle, shape } = data;
      const { _polygon } = shape as Line;

      if (fillStyle.visible) {
        ctx.fillStyle = fillStyle.fill;
      }

      if (lineStyle.visible) {
        ctx.lineWidth = lineStyle.lineWidth;
        ctx.lineCap = lineStyle.lineCap;
        ctx.lineJoin = lineStyle.lineJoin;
        ctx.strokeStyle = lineStyle.stroke;
      }

      ctx.beginPath();



      const { points } = _polygon;

      ctx.moveTo(points[0], points[1]);

      for (let i = 2; i < points.length; i += 2) {
        ctx.lineTo(points[i], points[i + 1]);
      }
      ctx.closePath();

      if (fillStyle.visible) {
        ctx.globalAlpha = fillStyle.alpha * this.worldAlpha;
        ctx.fill();
      }
      if (lineStyle.visible) {
        ctx.globalAlpha = lineStyle.alpha * this.worldAlpha;
        ctx.stroke();
      }
    }
  }

  protected drawShape(shape: Line) {
    this._geometry.drawShape(
      shape,
      this._fillStyle.clone(),
      this._lineStyle.clone()
    );
    return this;
  }

  public drawStraight(points: number[]): this {
    const polygon = new Polygon(points);
    return this.drawShape(new Straight(polygon));
  }
}
