import { LineCap, LineJoin } from "../../enums";

export class ShapeStyle {

  public alpha = 1.0
  public visible = true

  public fill = '#ffffff'

  // 文字
  public fontSize = 16
  public textAlign: CanvasTextAlign = 'start'
  public textBaseline: CanvasTextBaseline = 'alphabetic'
  public textLineHight = null

  // 绘制线相关
  public lineWidth = 1;
  public stroke = "#000";
  public lineCap = LineCap.Butt;
  public lineJoin = LineJoin.Miter;
  public lineDash = null

  // 阴影相关
  public shadowColor ='rgba(0, 0, 0, 0)'
  public shadowBlur = 0
  public shadowOffsetX = 0
  public shadowOffsetY = 0

  public reset(): void {
    this.alpha = 1
    this.visible = true

    this.fill = '#ffffff'

    this.fontSize = 16
    this.textAlign = 'start'
    this.textBaseline = 'alphabetic'
    this.textLineHight = null

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

  public clone(): ShapeStyle {
    const obj = new ShapeStyle()


    obj.alpha = this.alpha
    obj.visible = this.visible

    obj.fill = this.fill

    obj.fontSize = this.fontSize
    obj.textAlign = this.textAlign
    obj.textBaseline = this.textBaseline
    obj.textLineHight = this.textLineHight

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


}
