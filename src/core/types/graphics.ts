export interface IShapeStyle {
  fill?: string
  stroke?: string;
  lineWidth?: string
}

// 二次贝塞尔曲线的config
export interface QuadraticCurveConfig {
  anchorPoints: number[]
}


// 三次贝塞尔曲线的config
export interface BezierCurveConfig {
  anchorPoints: number[][]
}

// 正交直线的config
export interface  OrthogonalConfig {
  anchorPoints?: number[][]
}