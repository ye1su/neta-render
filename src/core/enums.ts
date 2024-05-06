export const BaseShapes = ["rect", "circle"];

export enum ItmeType {
  Line = 'line',
  Graphics = 'graphics'
}

export enum RendererType {
  WebGl = "webgl",
  Canvas = "canvas",
}

export enum ShapeType {
  Rectangle = "Rectangle",
  Polygon = "Polygon",
  Circle = "Circle",
  Ellipse = "Ellipse",
  RoundedRectangle = "RoundedRectangle",
}

export enum LineType {
  Straight = "Straight",
  QuadraticCurve = 'QuadraticCurve',
  BezierCurve = 'BezierCurve'
}

export enum LineCap {
  Butt = "butt",
  Round = "round",
  Square = "square",
}

export enum LineJoin {
  Miter = "miter",
  Bevel = "bevel",
  Round = "round",
}
