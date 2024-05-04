import { Container } from "../display";
import { ItmeType } from "../enums";
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
    this.type = ItmeType.Line;
  }
  protected renderCanvas(render: CanvasRenderer) {
    this._render = render;
    const graphicsList = this.parent.children.filter(
      (item) => item.type == ItmeType.Graphics
    );

    const graphicsData = this._geometry.graphicsData;
    const ctx = render.ctx;

    for (let i = 0; i < graphicsData.length; i++) {
      const data = graphicsData[i];

      const { lineStyle, fillStyle, shape } = data;
      
      // 修改线的数据
      const { _polygon, targetId, sourceId} = shape as Line;
      (shape as Line).target = graphicsList.find((item) => item.id == targetId);
      (shape as Line).source = graphicsList.find((item) => item.id == sourceId);
      // 修改points
      const { source: _source, target: _target } = shape as Line;
      _polygon.points = [_source.x, _source.y, _target.x, _target.y];

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

      // 渲染线上绘制的多边形
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

  /**
   * 绘制图形
   */
  protected drawShape(shape: Line) {
    this._geometry.drawShape(
      shape,
      this._fillStyle.clone(),
      this._lineStyle.clone()
    );
    return this;
  }

  /**
   * 画直线
   */
  public drawStraight(sourceId: string, targetId: string): this {
    // const polygon = new Polygon(points);

    return this.drawShape(new Straight(sourceId, targetId));
  }
}
