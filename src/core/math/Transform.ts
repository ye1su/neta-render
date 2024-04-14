import { ObservablePoint } from './Point'

export class Transform {
  public position: ObservablePoint
  public scale: ObservablePoint
  public pivot: ObservablePoint
  public skew: ObservablePoint
  public _rotation = 0
  
  constructor() {
    this.position = new ObservablePoint(this.onChange)
    this.scale = new ObservablePoint(this.onChange, 1, 1)
    this.pivot = new ObservablePoint(this.onChange)
    this.skew = new ObservablePoint(this.onChange)
  }

  private onChange = () => {
  }

  get rotation() {
    return this._rotation
  }

  set rotation(r: number) {
    this._rotation = r
    this.onChange()
  }


}
