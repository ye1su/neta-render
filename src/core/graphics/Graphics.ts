import { Polygon, Rectangle } from "../Shapes";
import { Shape } from "../Shapes/Shape";
import { Container } from "../display";
import { CanvasRenderer } from "../renderer/CanvasRender";
import { GraphicsGeometry } from "./GraphicsGeometry";
import { FillStyle } from "./style/FillStyle";
import { LineStyle } from "./style/LineStyle";

export class Graphics extends Container {
  private _lineStyle = new LineStyle();
  private _fillStyle = new FillStyle();
  private _geometry = new GraphicsGeometry();
  public currentPath: Polygon | null = null;
  constructor() {
    super();
  }

  protected renderCanvas(render: CanvasRenderer) {
    const ctx = render.ctx
    const { a, b, c, d, tx, ty } = this.transform.worldTransform

    ctx.setTransform(a, b, c, d, tx, ty)

    const graphicsData = this._geometry.graphicsData

    for (let i = 0; i < graphicsData.length; i++) {
      const data = graphicsData[i]
      const { lineStyle, fillStyle, shape } = data

      if (shape instanceof Rectangle) {
        const rectangle = shape
        // 先填充
        if (fillStyle.visible) {
          ctx.fillStyle = fillStyle.color
          ctx.globalAlpha = fillStyle.alpha * this.worldAlpha
          ctx.fillRect(
            rectangle.x,
            rectangle.y,
            rectangle.width,
            rectangle.height
          )
        }
        // 再stroke
        if (lineStyle.visible) {
          ctx.lineWidth = lineStyle.width
          ctx.lineCap = lineStyle.cap
          ctx.lineJoin = lineStyle.join
          ctx.strokeStyle = lineStyle.color
          ctx.globalAlpha = lineStyle.alpha * this.worldAlpha

          ctx.strokeRect(
            rectangle.x,
            rectangle.y,
            rectangle.width,
            rectangle.height
          )
        }
      }
    }
  }

  protected drawShape(shape: Shape) {
    this._geometry.drawShape(
      shape,
      this._fillStyle.clone(),
      this._lineStyle.clone()
    );
    return this;
  }

  protected startPoly() {
    if (this.currentPath) {
      const len = this.currentPath.points.length;
      if (len > 2) {
        this.drawShape(this.currentPath);
      }
    }
    this.currentPath = new Polygon();
  }

  public beginFill(color = "#000000", alpha = 1) {

    if (this.currentPath) {
      this.startPoly();
    }
    console.log('this.currentPath: ', this.currentPath);

    this._fillStyle.color = color;
    this._fillStyle.alpha = alpha;

    if (this._fillStyle.alpha > 0) {
      this._fillStyle.visible = true;
    }

    return this;
  }

  public drawRect(x: number, y: number, width: number, height: number): this {
    return this.drawShape(new Rectangle(x, y, width, height));
  }
}
