export class BaseStyle {
  public alpha = 1.0
  public visible = true

  constructor() {
    this.reset()
  }

  public clone(): BaseStyle {
    const obj = new BaseStyle()

    obj.alpha = this.alpha
    obj.visible = this.visible

    return obj
  }

  public reset(): void {
    this.alpha = 1
    this.visible = true
  }
}
