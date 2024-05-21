import { LineCap, LineJoin } from "../../enums";
import { BaseStyle } from "./BaseStyle";

export class LineStyle extends BaseStyle {
  public lineWidth = 0.8;
  public stroke = "#000";
  public lineCap = LineCap.Butt;
  public lineJoin = LineJoin.Miter;
  public lineDash = null

  public clone(): LineStyle {
    const obj = new LineStyle();

    obj.stroke = this.stroke;
    obj.alpha = this.alpha;
    obj.visible = this.visible;
    obj.lineWidth = this.lineWidth;
    obj.lineCap = this.lineCap;
    obj.lineJoin = this.lineJoin;
    obj.lineDash = this.lineDash

    return obj;
  }

  public reset(): void {
    super.reset();

    this.stroke = "#000";
    this.lineWidth = 0.8;
    this.lineCap = LineCap.Butt;
    this.lineJoin = LineJoin.Miter;
    this.lineDash = null
  }
}
