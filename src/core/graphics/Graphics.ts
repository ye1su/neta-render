import {
  Shape,
  Circle,
  Ellipse,
  Polygon,
  Rectangle,
  Text,
  Image as ImageShpe,
} from "../shapes";
import { Container } from "../display";
import { Point } from "../math";
import { CanvasRenderer } from "../renderer/CanvasRender";
import { IShapeStyle } from "../types/graphics";
import { GraphicsGeometry } from "./GraphicsGeometry";
import { FillStyle } from "./style/FillStyle";
import { LineStyle } from "./style/LineStyle";
import { ItmeType, ShapeType } from "../enums";
import { getPolygonSurround } from "../utils";

export class Graphics extends Container {
  private _render: CanvasRenderer;
  private _lineStyle = new LineStyle();
  private _fillStyle = new FillStyle();
  private _geometry = new GraphicsGeometry<Shape>();
  public currentPath: Polygon | null = null;

  constructor() {
    super();
    this.type = ItmeType.Graphics;
  }

  public getBBox() {
    if(!this._render) return
    const { shape } = this._geometry.graphicsData;
    
    if (shape instanceof Rectangle || shape instanceof ImageShpe) {
      const box = {
        minX: shape.x,
        minY: shape.y,
        maxX: shape.x + shape.width,
        maxY: shape.y + shape.height,
        centerX: 0,
        centerY: 0,
      };
      box.centerX = (box.maxX + box.minX) / 2;
      box.centerY = (box.maxY + box.minY) / 2;
      return box;
    }

    if (shape instanceof Circle) {
      const { radius } = shape;
      const box = {
        minX: shape.x - radius,
        minY: shape.y - radius,
        maxX: shape.x + radius,
        maxY: shape.y + radius,
        centerX: shape.x,
        centerY: shape.y,
      };
      return box;
    }

    if (shape instanceof Ellipse) {
      const { radiusX, radiusY } = shape;
      const box = {
        minX: shape.x - radiusX,
        minY: shape.y - radiusY,
        maxX: shape.x + radiusX,
        maxY: shape.y + radiusY,
        centerX: shape.x,
        centerY: shape.y,
      };
      return box;
    }

    if (shape instanceof Polygon) {
      const { points } = shape;
      if (!Array.isArray(points)) return;

      const surround = getPolygonSurround(points)
      return surround
    }
  }

  protected renderCanvas(render: CanvasRenderer) {
    this._render = render;
    const { matrix, translate, scale } = this._render;
    this._geometry.updateShapeGlobalTransform({ matrix, translate, scale });
    this.startPoly();
    const ctx = render.ctx;
    const data = this._geometry.graphicsData;

    const { lineStyle, fillStyle, shape } = data;

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

    if (shape instanceof Rectangle) {
      const rectangle = shape;
      const { width, height, radius } = rectangle;
      const { x, y } = shape.getXy();

      if (!radius) {
        if (fillStyle.visible) {
          ctx.globalAlpha = fillStyle.alpha * this.worldAlpha;
          ctx.fillRect(x, y, width, height);
        }
        if (lineStyle.visible) {
          ctx.globalAlpha = lineStyle.alpha * this.worldAlpha;
          ctx.strokeRect(x, y, width, height);
        }
      }
      if (radius) {
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
    }

    if (shape instanceof Circle) {
      const circle = shape;
      const { radius } = circle;
      const { x, y } = shape.getXy();

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

    if (shape instanceof Text) {
      const { text } = shape;
      const { x, y } = shape.getXy();

      const _fontSize = 32;
      ctx.font = `${_fontSize}px Arial`;
      ctx.fillStyle = "#000";

      // 绘制文字
      ctx.fillText(text, x, y);
    }

    if (shape instanceof ImageShpe) {
      const { src, width, height } = shape;
      const { x, y } = shape.getXy();
      const img = new Image();
      img.src = src;

      img.onload = function () {
        ctx.drawImage(img, x, y, width, height);
      };
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

    if (shape instanceof Polygon) {
      const polygon = shape;

      const { points, closeStroke } = polygon;

      ctx.moveTo(points[0], points[1]);

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
   * 画文字
   * @param x x坐标
   * @param y y坐标
   * @param text 文字内容
   */
  public drawText(x: number, y: number, text: string): this {
    return this.drawShape(new Text(x, y, text));
  }

  /**
   * 画矩形
   * @param x x坐标
   * @param y y坐标
   * @param width 宽度
   * @param height 高度
   */
  public drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius?: number
  ): this {
    return this.drawShape(new Rectangle(x, y, width, height, radius));
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

  /**
   * 画圆
   * @param x 圆心X坐标
   * @param y 圆心Y坐标
   * @param radius 半径
   */
  public drawImage(
    x: number,
    y: number,
    width: number,
    height: number,
    src: string
  ) {
    return this.drawShape(new ImageShpe(x, y, width, height, src));
  }

  public drawEllipse(x: number, y: number, radiusX: number, radiusY: number) {
    return this.drawShape(new Ellipse(x, y, radiusX, radiusY));
  }

  /**
   * 画多边形
   * @param points 多边形顶点坐标数组，每2个元素算一组(x,y)
   */
  public drawPolygon(x: number, y: number, points: number[]) {
    const poly = new Polygon(x, y, points);
    poly.closeStroke = true;

    return this.drawShape(poly);
  }

  /**
   * 曲线转化用
   * @param x
   * @param y
   * @returns
   */
  public moveTo(x: number, y: number) {
    this.startPoly();

    this.currentPath.points[0] = x;
    this.currentPath.points[1] = y;

    return this;
  }

  /**
   * 曲线转化用
   * @param x
   * @param y
   * @returns
   */
  public lineTo(x: number, y: number) {
    if (this.currentPath.points.length === 0) {
      this.moveTo(x, y);
      return this;
    }

    // 去除重复的点
    const points = this.currentPath.points;
    const fromX = points[points.length - 2];
    const fromY = points[points.length - 1];

    if (fromX !== x || fromY !== y) {
      points.push(x, y);
    }

    return this;
  }

  /**
   * 画圆弧
   * @param cx 圆弧对应的圆的中心点的x坐标
   * @param cy 圆弧对应的圆的中心点的y坐标
   * @param radius 半径
   * @param startAngle 开始角度
   * @param endAngle 结束角度
   * @param anticlockwise 是否逆时针
   */
  public arc(
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise = false
  ) {
    if (!anticlockwise) {
      while (endAngle < startAngle) {
        endAngle += Math.PI * 2;
      }

      if (endAngle - startAngle > Math.PI * 2) {
        endAngle = startAngle + Math.PI * 2;
      }
    }

    if (anticlockwise) {
      while (endAngle > startAngle) {
        startAngle += Math.PI * 2;
      }

      if (startAngle - endAngle > Math.PI * 2) {
        endAngle = startAngle - Math.PI * 2;
      }
    }

    const diff = endAngle - startAngle;

    if (diff === 0) {
      return this;
    }

    const startX = cx + Math.cos(startAngle) * radius;
    const startY = cy + Math.sin(startAngle) * radius;

    this.lineTo(startX, startY);

    const curveLen = Math.abs(diff) * radius; // 角度(弧度制)乘以半径等于弧长
    let segmentsCount = Math.ceil(curveLen / 10);

    // 最大2048份
    if (segmentsCount > 2048) {
      segmentsCount = 2048;
    }

    // 最小8份
    if (segmentsCount < 8) {
      segmentsCount = 8;
    }

    for (let i = 1; i <= segmentsCount; i++) {
      const angle = startAngle + diff * (i / segmentsCount);
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      this.lineTo(x, y);
    }

    return this;
  }

  /**
   * 画圆弧
   * @param x1 控制点1的x坐标
   * @param y1 控制点1的y坐标
   * @param x2 控制点2的x坐标
   * @param y2 控制点2的y坐标
   * @param radius 半径
   */
  public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number) {
    const len = this.currentPath.points.length;

    /**
     * 如果画笔当前没有落点，则该操作相当于moveTo(x1, y1)
     * 如果半径为0，则该操作也相当于lineTo(x1, y1)
     */
    if (len === 0 || radius === 0) {
      this.lineTo(x1, y1);
      return this;
    }

    /**
     * 假设画笔落点为P0，控制点1为P1，控制点2为P2，如果向量P0P1和向量P1P2的夹角太小或者夹角接近180度，
     * 或者向量P0P1或向量P1P2其中一个的长度为0，
     * 那么该操作也相当于moveTo(x1, y1)，
     * 我们用叉积来判断这种情况
     */
    const a1 = this.currentPath.points[len - 1] - y1;
    const b1 = this.currentPath.points[len - 2] - x1;
    const a2 = y2 - y1;
    const b2 = x2 - x1;
    const crossProduct = a1 * b2 - b1 * a2;
    const mm = Math.abs(crossProduct);
    if (mm < 1.0e-8) {
      this.lineTo(x1, y1);
      return this;
    }

    // copy from pixijs
    const dd = a1 * a1 + b1 * b1;
    const cc = a2 * a2 + b2 * b2;
    const tt = a1 * a2 + b1 * b2;
    const k1 = (radius * Math.sqrt(dd)) / mm;
    const k2 = (radius * Math.sqrt(cc)) / mm;
    const j1 = (k1 * tt) / dd;
    const j2 = (k2 * tt) / cc;
    const cx = k1 * b2 + k2 * b1;
    const cy = k1 * a2 + k2 * a1;
    const px = b1 * (k2 + j1);
    const py = a1 * (k2 + j1);
    const qx = b2 * (k1 + j2);
    const qy = a2 * (k1 + j2);
    const startAngle = Math.atan2(py - cy, px - cx);
    const endAngle = Math.atan2(qy - cy, qx - cx);
    const anticlockwise = b1 * a2 > b2 * a1;

    return this.arc(
      cx + x1,
      cy + y1,
      radius,
      startAngle,
      endAngle,
      anticlockwise
    );
  }

  /**
   * 停止画线
   */
  public closePath() {
    this.currentPath.closeStroke = true;
    this.startPoly();

    return this;
  }

  /**
   * 清除当前的所有配置
   */
  public clear() {
    this._geometry.clear();
    this._lineStyle.reset();
    this._fillStyle.reset();
    this.currentPath = new Polygon();

    return this;
  }

  /**
   * 判断当前节点是否在图形中
   * @param p
   */
  public containsPoint(p: Point): boolean {
    return this._geometry.containsPoint(p);
  }

  /**
   * 更新地址
   * @param x
   * @param y
   */
  public updatePosition(x: number, y: number) {
    this._geometry.updateShapePosition(x, y);
    this.position.set(x, y);
  }

  public style(styleConfig: IShapeStyle) {
    for (const styleKey in styleConfig) {
      if (!styleConfig[styleKey]) continue;

      if (["fill"].includes(styleKey)) {
        this._fillStyle.fill = styleConfig[styleKey];
        continue;
      }

      this._lineStyle[styleKey] = styleConfig[styleKey];
    }
  }
}
