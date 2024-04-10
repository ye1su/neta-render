import { Circle, Ellipse, Polygon, Rectangle } from "../Shapes";
import { RoundedRectangle } from "../Shapes/RoundedRectangle";
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
    const ctx = render.ctx;
    const { a, b, c, d, tx, ty } = this.transform.worldTransform;

    ctx.setTransform(a, b, c, d, tx, ty);

    const graphicsData = this._geometry.graphicsData;

    for (let i = 0; i < graphicsData.length; i++) {
      const data = graphicsData[i];
      const { lineStyle, fillStyle, shape } = data;

      if (fillStyle.visible) {
        ctx.fillStyle = fillStyle.color
      }

      if (lineStyle.visible) {
        ctx.lineWidth = lineStyle.width
        ctx.lineCap = lineStyle.cap
        ctx.lineJoin = lineStyle.join
        ctx.strokeStyle = lineStyle.color
      }

      ctx.beginPath()

      if (shape instanceof Rectangle) {
        const rectangle = shape
        const { x, y, width, height } = rectangle
        if (fillStyle.visible) {
          ctx.globalAlpha = fillStyle.alpha * this.worldAlpha
          ctx.fillRect(x, y, width, height)
        }
        if (lineStyle.visible) {
          ctx.globalAlpha = lineStyle.alpha * this.worldAlpha
          ctx.strokeRect(x, y, width, height)
        }
      }

      if (shape instanceof Circle) {
        const circle = shape;
        const { x, y, radius } = circle;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);

        if (fillStyle.visible) {
          ctx.globalAlpha = fillStyle.alpha * this.worldAlpha;
          ctx.fill();
        }
        if (lineStyle.visible) {
          ctx.globalAlpha = lineStyle.alpha * this.worldAlpha;
          ctx.stroke();
        }
      }

      if(shape instanceof Ellipse) {
        const ellipse = shape
        const { x, y, radiusX, radiusY } = ellipse

        ctx.ellipse(x, y, radiusX, radiusY, 0 , 0, Math.PI * 2)

        if(fillStyle.visible) {
          ctx.globalAlpha = fillStyle.alpha * this.worldAlpha
          ctx.fill()
        }

        if (lineStyle.visible) {
          ctx.globalAlpha = lineStyle.alpha * this.worldAlpha
          ctx.stroke()
        }
      }

      if (shape instanceof RoundedRectangle) {
        const roundedRectangle = shape
        const { x, y, width, height, radius } = roundedRectangle

        ctx.moveTo(x + radius, y)
        ctx.arc(x + radius, y + radius, radius, Math.PI * 1.5, Math.PI, true)
        ctx.lineTo(x, y + height - radius)
        ctx.arc(
          x + radius,
          y + height - radius,
          radius,
          Math.PI,
          Math.PI / 2,
          true
        )
        ctx.lineTo(x + width - radius, y + height)
        ctx.arc(
          x + width - radius,
          y + height - radius,
          radius,
          Math.PI / 2,
          0,
          true
        )
        ctx.lineTo(x + width, y + radius)
        ctx.arc(x + width - radius, y + radius, radius, 0, Math.PI * 1.5, true)
        ctx.closePath()

        if (fillStyle.visible) {
          ctx.globalAlpha = fillStyle.alpha * this.worldAlpha
          ctx.fill()
        }
        if (lineStyle.visible) {
          ctx.globalAlpha = lineStyle.alpha * this.worldAlpha
          ctx.stroke()
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
