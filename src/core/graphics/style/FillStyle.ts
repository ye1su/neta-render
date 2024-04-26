import { BaseStyle } from "./BaseStyle"

export class FillStyle extends BaseStyle {
  public fill = '#ffffff'
  public alpha = 1.0
  public visible = true

  public clone(): FillStyle {
    const obj = new FillStyle()

    obj.fill = this.fill
    obj.alpha = this.alpha
    obj.visible = this.visible

    return obj
  }

  public reset(): void {
    super.reset()
    this.fill = '#ffffff'
    this.alpha = 1
    this.visible = true
  }
}
