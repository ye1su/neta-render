import {
  Circle,
  Ellipse,
  Polygon,
  Rectangle,
  RoundedRectangle,
} from "../Shapes";
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

    const graphicsData = this._geometry.graphicsData;

    for (let i = 0; i < graphicsData.length; i++) {
      const data = graphicsData[i];
      const { lineStyle, fillStyle, shape } = data;

      if (fillStyle.visible) {
        ctx.fillStyle = fillStyle.color;
      }

      if (lineStyle.visible) {
        ctx.lineWidth = lineStyle.width;
        ctx.lineCap = lineStyle.cap;
        ctx.lineJoin = lineStyle.join;
        ctx.strokeStyle = lineStyle.color;
      }

      ctx.beginPath();

      if (shape instanceof Rectangle) {
        const rectangle = shape;
        const { x, y, width, height } = rectangle;
        if (fillStyle.visible) {
          ctx.globalAlpha = fillStyle.alpha * this.worldAlpha;
          ctx.fillRect(x, y, width, height);
        }
        if (lineStyle.visible) {
          ctx.globalAlpha = lineStyle.alpha * this.worldAlpha;
          ctx.strokeRect(x, y, width, height);
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

      if (shape instanceof Ellipse) {
        const ellipse = shape;
        const { x, y, radiusX, radiusY } = ellipse;

        ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);

        if (fillStyle.visible) {
          ctx.globalAlpha = fillStyle.alpha * this.worldAlpha;
          ctx.fill();
        }

        if (lineStyle.visible) {
          ctx.globalAlpha = lineStyle.alpha * this.worldAlpha;
          ctx.stroke();
        }
      }

      if (shape instanceof RoundedRectangle) {
        const roundedRectangle = shape;
        const { x, y, width, height, radius } = roundedRectangle;

        ctx.moveTo(x + radius, y);
        ctx.arc(x + radius, y + radius, radius, Math.PI * 1.5, Math.PI, true);
        ctx.lineTo(x, y + height - radius);
        ctx.arc(
          x + radius,
          y + height - radius,
          radius,
          Math.PI,
          Math.PI / 2,
          true
        );
        ctx.lineTo(x + width - radius, y + height);
        ctx.arc(
          x + width - radius,
          y + height - radius,
          radius,
          Math.PI / 2,
          0,
          true
        );
        ctx.lineTo(x + width, y + radius);
        ctx.arc(x + width - radius, y + radius, radius, 0, Math.PI * 1.5, true);
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

      if (shape instanceof Polygon) {
        const polygon = shape;

        const { points, closeStroke } = polygon;
        ctx.moveTo(points[0], points[i]);

        for (let i = 2; i < points.length; i += 2) {
          ctx.lineTo(points[i], points[i + 1]);
        }
        if (closeStroke) {
          ctx.closePath();
        }

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
  }

  protected drawShape(shape: Shape) {
    this._geometry.drawShape(
      shape,
      this._fillStyle.clone(),
      this._lineStyle.clone()
    );
    return this;
  }

  /**
   * 清空已有的path，开始新的path
   */
  protected startPoly() {
    if (this.currentPath) {
      const len = this.currentPath.points.length;
      if (len > 2) {
        this.drawShape(this.currentPath);
      }
    }
    this.currentPath = new Polygon();
  }

  /**
   * 开始填充模式，接下来绘制的所有路径都将被填充，直到调用了endFill
   * @param color 填充颜色
   * @param alpha 不透明度
   */
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

  /**
   * 结束填充模式
   */
  public endFill() {
    this.startPoly();

    this._fillStyle.reset();

    return this;
  }

  /**
   * 画矩形
   * @param x x坐标
   * @param y y坐标
   * @param width 宽度
   * @param height 高度
   */
  public drawRect(x: number, y: number, width: number, height: number): this {
    return this.drawShape(new Rectangle(x, y, width, height));
  }

  /**
   * 画圆
   * @param x 圆心X坐标
   * @param y 圆心Y坐标
   * @param radius 半径
   */
  public drawCircle(x: number, y: number, radius: number) {
    return this.drawShape(new Circle(x, y, radius));
  }

  public drawEllipse(x: number, y: number, radiusX: number, radiusY: number) {
    return this.drawShape(new Ellipse(x, y, radiusX, radiusY));
  }

  /**
   * 画圆角矩形
   * @param x x坐标
   * @param y y坐标
   * @param width 宽度
   * @param height 高度
   * @param radius 圆角半径
   */
  public drawRoundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    return this.drawShape(new RoundedRectangle(x, y, width, height, radius));
  }

  /**
   * 画多边形
   * @param points 多边形顶点坐标数组，每2个元素算一组(x,y)
   */
  public drawPolygon(points: number[]) {
    const poly = new Polygon(points);
    poly.closeStroke = true;

    return this.drawShape(poly);
  }
}
