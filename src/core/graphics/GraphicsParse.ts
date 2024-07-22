import { Container } from "../display";
import { BaseShapes, LineType } from "../enums";
import {
  AddEdgeConfig,
  AddShapeConfig,
  NodeModel,
  RegisterContextOptions,
} from "../types";
import { RegNodeType } from "../types/register";
import { BASE_FONT_SIZE, fixFactor, getCenterX } from "../utils";
import { Graphics } from "./Graphics";
import { GraphicsOfLine } from "./GraphicsOfLine";
import _ from "lodash-es";

export function graphicsShapeParse(
  registerMap: Map<string, RegNodeType["render"]>,
  json: NodeModel,
  ctx
) {
  fixUnit(json);

  const { id, type, x, y, width, height } = json;

  const container = new Container();
  if (json?.anchor) {
    container.anchor.visible = true;
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
      x: textStart,
      y: 0 + BASE_FONT_SIZE,
      text: json.label,
      style: {
        fill: "#000",
      },
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
    const kernelShape = shapeIns.draw(action);
    // 如果自定义节点返回了节点，则以当前节点为核心节点
    if (kernelShape) {
      kernelShape.kernel = true;
    }
    children = action.groups;
    if (
      shapeIns.dynamicElement &&
      typeof shapeIns.dynamicElement == "function"
    ) {
      container.dynamicElement = shapeIns.dynamicElement({ config: json, ctx });
    }
  }

  children.forEach((item) => {
    container.addChild(item);
  });

  container.whole = true;

  container.id = id;
  container._data = json;
  container.updatePosition(x, y);
  return container;
}

export function graphicsLineParse(
  registerMap: Map<string, RegNodeType["render"]>,
  json: Record<string, any>
) {
  const { id, type } = json;

  const container = new Container();

  container.zIndex = -1;
  container.id = id;

  let children = [];

  if (registerMap.get(type)) {
    const action = new RegisterContext({
      inputProperties: json,
    });
    const edgeIns = registerMap.get(type);
    edgeIns.draw(action);
    children = action.groups;
  } else {
    const line = addEdge(type, json);
    children = [line];
  }

  children.forEach((item) => {
    container.addChild(item);
  });

  return container;
}

function addShape(type: string, config: AddShapeConfig) {
  const { x, y, name, width, height, style, text } = config;
  const graphics = new Graphics();
  graphics.style(style);

  if (type == "rect") {
    const { radius } = config;
    graphics.drawRect(x, y, name, width, height, radius);
  }
  if (type == "circle") {
    const { radius } = config;
    graphics.drawCircle(x, y, name, radius);
  }

  if (type == "image") {
    const { src } = config;
    graphics.drawImage(x, y, name, width, height, src);
  }

  if (type == "ellipse") {
    const { radiusX, radiusY } = config;
    graphics.drawEllipse(x, y, name, radiusX, radiusY);
  }

  if (type == "polygon") {
    const { points } = config;
    graphics.drawPolygon(x, y, name, points);
  }

  if (type == "text") {
    graphics.drawText(x, y, name, text);
  }
  return graphics;
}

function addEdge(type: string, config: AddEdgeConfig) {
  const graphicsLine = new GraphicsOfLine();

  const { source, target, anchorPoints, sourceAnchor, targetAnchor } = config;

  if (!type || type == LineType.Straight) {
    graphicsLine.drawStraight(source, target, { sourceAnchor, targetAnchor });
  }

  if (type == LineType.Orthogonal) {
    graphicsLine.drawOrthogonal(source, target, {
      anchorPoints,
      sourceAnchor,
      targetAnchor,
    });
  }

  if (type == LineType.QuadraticCurve) {
    const { anchorPoints } = config;
    graphicsLine.drawQuadraticCurve(source, target, { anchorPoints });
  }

  if (type == LineType.BezierCurve) {
    const { anchorPoints } = config;
    graphicsLine.drawBezierCurve(source, target, { anchorPoints });
  }

  return graphicsLine;
}

export class RegisterContext {
  public groups: Graphics[] = [];
  public inputProperties: RegisterContextOptions["inputProperties"] = null;

  constructor(options: RegisterContextOptions) {
    this.inputProperties = options.inputProperties;
  }

  public addShape(type: string, config: AddShapeConfig) {
    const _confg = { ...config, type };

    fixUnit(_confg);

    const shape = addShape(type, _confg);
    this.groups.push(shape);
    return shape;
  }

  public addEdge(type: string, config: AddEdgeConfig) {
    const _confg = { ...config, type };
    const shape = addShape(type, _confg);
    this.groups.push(shape);
    return shape;
  }
}

function fixUnit(json: Omit<NodeModel, "id">) {
  if (!json.type) {
    json.type = "circle";
    json.radius = 30;
  }

  json.factor = _.pick(json, ["x", "y", "width", "height", "radius", "points"]);
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
