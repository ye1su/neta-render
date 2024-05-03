export const BaseShapes = ["rect", "circle"];

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
