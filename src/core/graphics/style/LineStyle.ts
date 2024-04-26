import { LineCap, LineJoin } from "../../enums";
import { BaseStyle } from "./BaseStyle";

export class LineStyle extends BaseStyle {
  public lineWidth = 1;
  public stroke = "#D3D3D3";
  public lineCap = LineCap.Butt;
  public lineJoin = LineJoin.Miter;

  public clone(): LineStyle {
    const obj = new LineStyle();

    obj.stroke = this.stroke;
    obj.alpha = this.alpha;
    obj.visible = this.visible;
    obj.lineWidth = this.lineWidth;
    obj.lineCap = this.lineCap;
    obj.lineJoin = this.lineJoin;

    return obj;
  }

  public reset(): void {
    super.reset();

    this.stroke = "#D3D3D3";
    this.lineWidth = 1;
    this.lineCap = LineCap.Butt;
    this.lineJoin = LineJoin.Miter;
  }
}
