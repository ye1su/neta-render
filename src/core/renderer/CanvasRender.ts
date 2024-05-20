import { Container } from "../display";
import { IApplicationOptions } from "../types";
import { fixFactor } from "../utils";
import { Renderer } from "./Renderer";

// 创建变换矩阵
// const matrix = [
//   scaleX, 0, 0,
//   0, scaleY, 0,
//   translateX, translateY, 1
// ];

export class CanvasRenderer extends Renderer {
  public readonly viewer: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  private background: string | undefined;
  private _container: Container;
  // 当前矩阵
  public matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  // 克隆矩阵
  public _cloneMatrix = this.matrix;

  constructor(options: IApplicationOptions) {
    super(options);
    const { backgroundColor } = options;
    this.background = backgroundColor;

    // 创建canvas函数
    const _canvas = document.createElement("canvas");

    _canvas.setAttribute("width", fixFactor(this.screen.width) + "");
    _canvas.setAttribute("height", fixFactor(this.screen.height) + "");

    _canvas.style.width = this.screen.width + "px";
    _canvas.style.height = this.screen.height + "px";
    _canvas.style.backgroundColor = this.background;
    this.el.appendChild(_canvas);
    this.viewer = _canvas;

    this.ctx = this.viewer.getContext("2d") as CanvasRenderingContext2D;
  }

  get translate() {
    return {
      x: this.matrix[6],
      y: this.matrix[7],
    };
  }

  get scale() {
    return this.matrix[0];
  }

  // 取当前矩阵快照
  public cloneMatrix() {
    this._cloneMatrix = JSON.parse(JSON.stringify(this.matrix));
  }

  // 更新translate
  public updateCanvasTranslate(ox: number, oy: number) {
    const _x = this._cloneMatrix[6];
    const _y = this._cloneMatrix[7];
    this.matrix[6] = _x + ox;
    this.matrix[7] = _y + oy;
    this.render(this._container);
  }

  public updateCanvasScale(scale: number) {
    this.matrix[0] = scale;
    this.matrix[4] = scale;
    this.render(this._container);
  }

  public render(container: Container) {
    this._container = container;

    container.updateTransform();

    this.ctx.save();
    const _matrix = this.matrix;
    this.ctx.setTransform(
      _matrix[0],
      _matrix[1],
      _matrix[3],
      _matrix[4],
      _matrix[6],
      _matrix[7]
    );

    this.ctx.clearRect(
      -_matrix[6],
      -_matrix[7],
      this.width,
      this.height
    );

    container.renderCanvasRecursive(this);

    this.ctx.restore();
  }

  public clear() {
    this.el.removeChild(this.viewer);
  }
}
