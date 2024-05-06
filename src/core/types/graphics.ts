export interface IShapeStyle {
  fill?: string
  stroke?: string;
  lineWidth?: string
}

export interface QuadraticCurveConfig {
  anchorPoints: number[]
}

export interface BezierCurveConfig {
  anchorPoints: number[][]
}