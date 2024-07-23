import { Container } from "../display";
import { getBezierLength, getQuadraticBezierLength } from "./utils";
import { ItmeType, LineType } from "../enums";
import {
  BezierCurve,
  Line,
  Orthogonal,
  QuadraticCurve,
  Straight,
} from "../lines";
import { CanvasRenderer } from "../renderer";
import { Polygon } from "../shapes";
import { GraphicsGeometry } from "./GraphicsGeometry";
import { ShapeStyle } from "./style";
import {
  BezierCurveConfig,
  IShapeStyle,
  OrthogonalConfig,
  QuadraticCurveConfig,
} from "../types/graphics";
import { Point } from "../math";
import { fixFactor } from "../utils";

export class GraphicsOfLine extends Container {
  private _render: CanvasRenderer;
  private _shapeStyle = new ShapeStyle();
  private _geometry = new GraphicsGeometry();
  public currentPath: Polygon | null = null;

  constructor() {
    super();
    this.type = ItmeType.Line;
    this._shapeStyle.fill = 'transparent'
  }
  protected renderCanvas(render: CanvasRenderer) {
    this._render = render;

    const graphicsList = this.parent.parent.children.filter((item) => item.whole);

    const data = this._geometry.graphicsData;

    const ctx = render.ctx;

    const { shapeStyle, shape } = data;

    if (shapeStyle.visible) {
      // 设置颜色
      ctx.fillStyle = shapeStyle.fill;

      // 设置阴影
      ctx.shadowColor = shapeStyle.shadowColor;
      ctx.shadowBlur = shapeStyle.shadowBlur;

      ctx.shadowOffsetX = shapeStyle.shadowOffsetX;
      ctx.shadowOffsetY = shapeStyle.shadowOffsetY;

      // 设置line
      ctx.lineWidth = shapeStyle.lineWidth;
      ctx.lineCap = shapeStyle.lineCap;
      ctx.lineJoin = shapeStyle.lineJoin;
      ctx.strokeStyle = shapeStyle.stroke;

      // 设置虚线
      if (Array.isArray(shapeStyle.lineDash)) {
        ctx.setLineDash(shapeStyle.lineDash);
      } else {
        ctx.setLineDash([]);
      }
    }

    // 修改线的数据
    const { _polygon, targetId, sourceId } = shape as Line;
    (shape as Line).target = graphicsList.find((item) => item.id == targetId);
    (shape as Line).source = graphicsList.find((item) => item.id == sourceId);

    // 修改points
    const { source: _source, target: _target, config } = shape as Line;

    let sourceAnchor = _source.position as Point;
    let targetAnchor = _target.position as Point;

    if (config.sourceAnchor !== undefined) {
      sourceAnchor = _source.anchor.getAnchorPort(config.sourceAnchor).point;
    }

    if (config.targetAnchor !== undefined) {
      targetAnchor = _target.anchor.getAnchorPort(config.targetAnchor).point;
    }
    _polygon.points = [
      sourceAnchor.x,
      sourceAnchor.y,
      targetAnchor.x,
      targetAnchor.y,
    ];

    // draw 正交线
    if (shape.type == LineType.Orthogonal) {
      const { anchorPoints } = (shape as Orthogonal).config;

      // 收集途径的点
      const _points = [[sourceAnchor.x, sourceAnchor.y]];
      if (Array.isArray(anchorPoints)) {
        anchorPoints.forEach((itemPoint) => {
          _points.push(itemPoint);
        });
      }
      _points.push([targetAnchor.x, targetAnchor.y]);

      // 进行正交转换
      const polygonPoints = [];
      _points.forEach((item, index) => {
        if (index != 0) {
          // [sourceAnchor.x, targetAnchor.y]
          const pre = _points[index - 1];
          polygonPoints.push(pre[0]);
          polygonPoints.push(item[1]);
        }

        polygonPoints.push(item[0]);
        polygonPoints.push(item[1]);
      });

      _polygon.points = polygonPoints;
    }

    // draw 贝塞尔
    if (shape.type == LineType.QuadraticCurve) {
      const { anchorPoints } = (shape as QuadraticCurve).config;
      this.currentPath = new Polygon();
      this.moveTo(sourceAnchor.x, sourceAnchor.y);
      this.quadraticCurveTo(
        anchorPoints[0],
        anchorPoints[1],
        targetAnchor.x,
        targetAnchor.y
      );
      _polygon.points = this.currentPath.points;
      this.currentPath = null;
    }

    // draw 3次贝塞尔
    if (shape.type == LineType.BezierCurve) {
      const { anchorPoints } = (shape as QuadraticCurve).config;
      this.currentPath = new Polygon();
      this.moveTo(sourceAnchor.x, sourceAnchor.y);

      this.bezierCurveTo(
        anchorPoints[0][0],
        anchorPoints[0][1],
        anchorPoints[1][0],
        anchorPoints[1][1],
        targetAnchor.x,
        targetAnchor.y
      );
      _polygon.points = this.currentPath.points;
      this.currentPath = null;
    }

 
    ctx.beginPath();

    // 渲染线上绘制的多边形
    const { points } = _polygon;

    ctx.moveTo(points[0], points[1]);

    for (let i = 2; i < points.length; i += 2) {
      ctx.lineTo(points[i], points[i + 1]);
    }
 

    if (shapeStyle.visible) {
      ctx.globalAlpha = shapeStyle.alpha * this.worldAlpha;
      ctx.fill();
      ctx.stroke();
    }
  }

  /**
   * 绘制图形
   */
  protected drawShape(shape: Line) {
    this._geometry.drawShape(shape, this._shapeStyle.clone());
    return this;
  }

  /**
   * 画直线
   */
  public drawStraight(
    sourceId: string,
    targetId: string,
    config?: OrthogonalConfig
  ): this {
    return this.drawShape(new Straight(sourceId, targetId, config));
  }
  /**
   * take part 正交线
   */
  public drawOrthogonal(
    sourceId: string,
    targetId: string,
    config?: OrthogonalConfig
  ) {
    return this.drawShape(new Orthogonal(sourceId, targetId, config));
  }

  /**
   * take part 二阶贝塞尔曲线
   */
  public drawQuadraticCurve(
    sourceId: string,
    targetId: string,
    config: QuadraticCurveConfig
  ): this {
    return this.drawShape(new QuadraticCurve(sourceId, targetId, config));
  }

  /**
   * take part 三阶贝塞尔曲线
   */
  public drawBezierCurve(
    sourceId: string,
    targetId: string,
    config: BezierCurveConfig
  ) {
    return this.drawShape(new BezierCurve(sourceId, targetId, config));
  }

  /**
   * 曲线转化用
   * @param x
   * @param y
   * @returns
   */
  public moveTo(x: number, y: number) {
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
   * 画二阶贝塞尔曲线
   * @param cpX 控制点的X坐标
   * @param cpY 控制点的Y坐标
   * @param toX 终点的X坐标
   * @param toY 终点的Y坐标
   */
  public quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number) {
    const len = this.currentPath.points.length;
    if (len === 0) {
      this.moveTo(0, 0);
    }

    const P0X = this.currentPath.points[len - 2];
    const P0Y = this.currentPath.points[len - 1];
    const P1X = cpX;
    const P1Y = cpY;
    const P2X = toX;
    const P2Y = toY;
    // 求出这条二阶贝塞尔曲线的长度
    const curveLength = getQuadraticBezierLength(P0X, P0Y, P1X, P1Y, P2X, P2Y);

    let segmentsCount = Math.ceil(curveLength / 10); // 每10个像素采样一次

    // 最大2048份
    if (segmentsCount > 2048) {
      segmentsCount = 2048;
    }

    // 最小8份
    if (segmentsCount < 8) {
      segmentsCount = 8;
    }
    // 计算出采样点的坐标然后放入points数组
    for (let i = 1; i <= segmentsCount; i++) {
      const t = i / segmentsCount;

      // 直接套用二阶贝塞尔曲线的公式
      const x = (1 - t) * (1 - t) * P0X + 2 * t * (1 - t) * P1X + t * t * P2X;
      const y = (1 - t) * (1 - t) * P0Y + 2 * t * (1 - t) * P1Y + t * t * P2Y;

      this.lineTo(x, y);
    }

    return this;
  }

  /**
   * 画三阶贝塞尔曲线
   * @param cpX 控制点1的X坐标
   * @param cpY 控制点1的Y坐标
   * @param cpX2 控制点2的X坐标
   * @param cpY2 控制点2的Y坐标
   * @param toX 终点的X坐标
   * @param toY 终点的Y坐标
   */
  public bezierCurveTo(
    cpX: number,
    cpY: number,
    cpX2: number,
    cpY2: number,
    toX: number,
    toY: number
  ) {
    const len = this.currentPath.points.length;

    if (len === 0) {
      this.moveTo(0, 0);
    }

    const P0X = this.currentPath.points[len - 2];
    const P0Y = this.currentPath.points[len - 1];
    const P1X = cpX;
    const P1Y = cpY;
    const P2X = cpX2;
    const P2Y = cpY2;
    const P3X = toX;
    const P3Y = toY;

    // 求出这条三阶贝塞尔曲线的长度
    const curveLength = getBezierLength(P0X, P0Y, P1X, P1Y, P2X, P2Y, P3X, P3Y);

    let segmentsCount = Math.ceil(curveLength / 10); // 每10个像素采样一次

    // 最大2048份
    if (segmentsCount > 2048) {
      segmentsCount = 2048;
    }

    // 最小8份
    if (segmentsCount < 8) {
      segmentsCount = 8;
    }

    // 计算出采样点的坐标然后放入points数组
    for (let i = 1; i <= segmentsCount; i++) {
      const t = i / segmentsCount;

      // 直接套用三阶贝塞尔曲线的公式
      const x =
        (1 - t) * (1 - t) * (1 - t) * P0X +
        3 * t * (1 - t) * (1 - t) * P1X +
        3 * t * t * (1 - t) * P2X +
        t * t * t * P3X;
      const y =
        (1 - t) * (1 - t) * (1 - t) * P0Y +
        3 * t * (1 - t) * (1 - t) * P1Y +
        3 * t * t * (1 - t) * P2Y +
        t * t * t * P3Y;

      this.lineTo(x, y);
    }

    return this;
  }

  public style(styleConfig: IShapeStyle = {}) {
    for (const styleKey in styleConfig) {
      if (typeof styleConfig[styleKey] == "number") {
        styleConfig[styleKey] = fixFactor(styleConfig[styleKey]);
      }

      this._shapeStyle[styleKey] = styleConfig[styleKey];
    }
  }

}
