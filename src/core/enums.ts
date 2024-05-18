export const BaseShapes = ["rect", "circle"];

export enum ItmeType {
  Line = "line",
  Graphics = "graphics",
  Container = "container",
}

export enum RendererType {
  WebGl = "webgl",
  Canvas = "canvas",
}

export enum LineType {
  Straight = "Straight",
  Orthogonal = "Orthogonal",
  QuadraticCurve = "QuadraticCurve",
  BezierCurve = "BezierCurve",
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

export enum ShapeType {
  Rectangle = "Rectangle",
  Polygon = "Polygon",
  Circle = "Circle",
  Ellipse = "Ellipse",
  RoundedRectangle = "RoundedRectangle",
  Text = "Text",
  Image = "Image",
}

export enum LayoutType {
  Force = "force",
}
