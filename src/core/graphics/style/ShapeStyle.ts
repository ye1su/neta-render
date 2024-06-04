import { LineCap, LineJoin } from "../../enums";

export class ShapeStyle {

  public alpha = 1.0
  public visible = true

  public fill = '#ffffff'

  public textAlign = 'start'
  public textBaseline = 'alphabetic'

  public lineWidth = 0.8;
  public stroke = "#000";
  public lineCap = LineCap.Butt;
  public lineJoin = LineJoin.Miter;
  public lineDash = null


  public shadowColor ='rgba(0, 0, 0, 0)'
  public shadowBlur = 0
  public shadowOffsetX = 0
  public shadowOffsetY = 0

  public clone(): ShapeStyle {
    const obj = new ShapeStyle()


    obj.alpha = this.alpha
    obj.visible = this.visible

    obj.fill = this.fill

    obj.textAlign = this.textAlign
    obj.textBaseline = this.textBaseline

    obj.shadowColor = this.shadowColor
    obj.shadowBlur = this.shadowBlur
    obj.shadowOffsetX = this.shadowOffsetX
    obj.shadowOffsetY = this.shadowOffsetY

    obj.stroke = this.stroke;

    obj.lineWidth = this.lineWidth;
    obj.lineCap = this.lineCap;
    obj.lineJoin = this.lineJoin;
    obj.lineDash = this.lineDash
    return obj
  }

  public reset(): void {
    this.alpha = 1
    this.visible = true

    this.fill = '#ffffff'

    this.textAlign = 'start'
    this.textBaseline = 'alphabetic'

    this.shadowColor = 'rgba(0, 0, 0, 0)'
    this.shadowBlur = 0
    this.shadowOffsetX = 0
    this.shadowOffsetY = 0

    this.stroke = "#000";
    this.lineWidth = 0.8;
    this.lineCap = LineCap.Butt;
    this.lineJoin = LineJoin.Miter;
    this.lineDash = null
  }
}
