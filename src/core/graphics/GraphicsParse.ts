import { Container } from "../display";
import { BaseShapes, LineType } from "../enums";
import { RegisterContextOptions, RegisterMap } from "../types";
import { BASE_FONT_SIZE, fixFactor, getCenterX } from "../utils";
import { Graphics } from "./Graphics";
import { GraphicsOfLine } from "./GraphicsOfLine";

export function graphicsShapeParse(
  registerMap: Map<string, RegisterMap["render"]>,
  json: Record<string, any>
) {
  fixUnit(json);

  const { id, type, x, y, width, height } = json;

  const graphic = new Container();
  if (json?.anchor) {
    graphic.anchor.visible = true;
  }
  let children: Graphics[] = [];
  if (type == "rect") {
    const rect = addShape("rect", {
      ...json,
      x: 0,
      y: 0,
    });

    const textStart = getCenterX(
      json.label,
      width / 2,
      fixFactor(BASE_FONT_SIZE)
    );
    const text = addShape("text", {
      ...json,
      x: textStart,
      y: height / 2 + BASE_FONT_SIZE,
      text: json.label,
    });
    children = [rect, text];
  }
  if (type == "circle") {
    const circle = addShape("circle", {
      ...json,
      x: 0,
      y: 0,
    });

    const textStart = getCenterX(json.label, 0, fixFactor(BASE_FONT_SIZE));
    const text = addShape("text", {
      ...json,
      x: textStart,
      y: 0 + BASE_FONT_SIZE,
      text: json.label,
    });
    children = [circle, text];
  }

  if (type == "image") {
    const image = addShape("image", {
      ...json,
      x: 0,
      y: 0,
    });

    children = [image];
  }

  if (type == "ellipse") {
    const ellipse = addShape("ellipse", {
      ...json,
      x: 0,
      y: 0,
    });

    const textStart = getCenterX(json.label, 0, fixFactor(BASE_FONT_SIZE));
    const text = addShape("text", {
      ...json,
      x: textStart,
      y: 0 + BASE_FONT_SIZE,
      text: json.label,
    });

    children = [ellipse, text];
  }

  if (type == "polygon") {
    const polygon = addShape("polygon", {
      ...json,
      x: 0,
      y: 0,
    });

    children = [polygon];
  }

  if (registerMap.get(type)) {
    const action = new RegisterContext({
      inputProperties: json,
    });
    const shapeIns = registerMap.get(type);
    shapeIns.draw(action);
    children = action.groups;
  }

  children.forEach((item) => {
    graphic.addChild(item);
  });

  graphic.whole = true;

  graphic.id = id;
  graphic.updatePosition(x, y);
  return graphic;
}

export function graphicsLineParse(json: Record<string, any>) {
  const { id, type, source, target, anchorPoints, sourceAnchor, targetAnchor } =
    json;

  const line = new GraphicsOfLine();
  line.zIndex = -1;
  line.id = id;

  if (type == LineType.Straight) {
    line.drawStraight(source, target, { sourceAnchor, targetAnchor });
  }

  if (type == LineType.Orthogonal) {
    line.drawOrthogonal(source, target, {
      anchorPoints,
      sourceAnchor,
      targetAnchor,
    });
  }

  // if (type == LineType.QuadraticCurve) {
  //   const { anchorPoints } = json;
  //   line.drawQuadraticCurve(source, target, { anchorPoints });
  // }

  // if (type == LineType.BezierCurve) {
  //   const { anchorPoints } = json;
  //   line.drawBezierCurve(source, target, { anchorPoints });
  // }

  return line;
}

function fixUnit(json: Record<string, any>) {
  json.x = fixFactor(json.x);
  json.y = fixFactor(json.y);
  if (json.width) {
    json.width = fixFactor(json.width);
  }
  if (json.height) {
    json.height = fixFactor(json.height);
  }

  if (json.radius) {
    json.radius = fixFactor(json.radius);
  }
  if (Array.isArray(json.points)) {
    json.points = json.points.map((item) => fixFactor(item));
  }
}

function addShape(type: string, config: Record<string, any>) {
  const { x, y, width, height, style, text } = config;
  const graphics = new Graphics();
  graphics.style(style);

  if (type == "rect") {
    const { radius } = config;
    graphics.drawRect(x, y, width, height, radius);
  }
  if (type == "circle") {
    const { radius } = config;
    graphics.drawCircle(x, y, radius);
  }

  if (type == "image") {
    const { src } = config;
    graphics.drawImage(x, y, width, height, src);
  }

  if (type == "ellipse") {
    const { radiusX, radiusY } = config;
    graphics.drawEllipse(x, y, radiusX, radiusY);
  }

  if (type == "polygon") {
    const { points } = config;
    graphics.drawPolygon(x, y, points);
  }

  if (type == "text") {
    graphics.drawText(x, y, text);
  }
  return graphics;
}

class RegisterContext {
  public groups: Graphics[] = [];
  public inputProperties = null;

  constructor(options: RegisterContextOptions) {
    this.inputProperties = options.inputProperties;
  }

  public addShape(type: string, config: Record<string, any> = {}) {
    fixUnit(config);
    const shape = addShape(type, config);
    this.groups.push(shape);
  }
}
