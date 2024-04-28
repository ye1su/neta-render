import { Container } from "../display";
import { IApplicationOptions } from "../type";
import { Renderer } from "./Renderer";

// 创建变换矩阵
// const matrix = [
//   scaleX, 0, 0,
//   0, scaleY, 0,
//   translateX, translateY, 1
// ];

export class CanvasRenderer extends Renderer {
  public ctx: CanvasRenderingContext2D;
  private background: string | undefined;
  public matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

  constructor(options: IApplicationOptions) {
    super(options);
    const { backgroundColor } = options;
    this.background = backgroundColor;
    this.ctx = this.el.getContext("2d") as CanvasRenderingContext2D;
  }

  get translate() {
    return {
      x: this.matrix[6],
      y:  this.matrix[7],
    }
  }

  public render(container: Container) {
    container.updateTransform();
    this.ctx.save();
    const _matrix = this.matrix;
    this.ctx.setTransform(_matrix[0], _matrix[1], _matrix[3], _matrix[4], _matrix[6], _matrix[7]);

    // this.ctx.setTransform(this.matrix);

    this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);

    if (this.background) {
      this.ctx.fillStyle = this.background;
      this.ctx.fillRect(0, 0, this.screen.width, this.screen.height);
    }

    container.renderCanvasRecursive(this);

    this.ctx.restore();
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
  }

}
