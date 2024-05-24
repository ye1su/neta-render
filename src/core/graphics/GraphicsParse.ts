import { Container } from "../display";
import { BaseShapes, LineType } from "../enums";
import { RegisterMap } from "../types";
import { BASE_FONT_SIZE, fixFactor, getCenterX } from "../utils";
import { Graphics } from "./Graphics";
import { GraphicsOfLine } from "./GraphicsOfLine";

export function addShape(type: string, config: Record<string, any>) {
  const { x, y, wdith, height, style, text } = config;
  const graphics = new Graphics();
  graphics.style(style);

  if (type == "rect") {
    const { radius } = config;
    graphics.drawRect(x, y, wdith, height, radius);
  }
  if (type == "circle") {
    const { radius } = config;
    graphics.drawCircle(x, y, radius);
  }

  if (type == "image") {
    const { src } = config;
    graphics.drawImage(x, y, wdith, height, src);
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

export function graphicsShapeParse(
  registerMap: Map<string, RegisterMap["render"]>,
  json: Record<string, any>
) {
  console.log('registerMap: ', registerMap);

  json.x = fixFactor(json.x);
  json.y = fixFactor(json.y);
  if (json.wdith) {
    json.wdith = fixFactor(json.wdith);
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
  const { id, type, x, y, wdith, height } = json;

  const graphic = new Container();
  let children: Graphics[] = [];
  if (type == "rect") {
    const rect = addShape("rect", {
      ...json,
      x: 0,
      y: 0,
    });

    const textStart = getCenterX(
      json.label,
      wdith / 2,
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

  if (type == "test") {
    const rect = addShape("rect", {
      ...json,
      x: 0,
      y: 0,
    });
    console.log("rect: ", rect);
    const image = addShape("image", {
      ...json,
      x: 20,
      y: 20,
      wdith: 40,
      height: 40,
    });

    children = [rect, image];
  }
  console.log("children: ", children);

  children.forEach((item) => {
    graphic.addChild(item);
  });

  graphic.whole = true;

  graphic.id = id;
  graphic.updatePosition(x, y);

  return graphic;
}

export function graphicsLineParse(json: Record<string, any>) {
  const { id, type, source, target, anchorPoints } = json;

  const line = new GraphicsOfLine();
  line.zIndex = -1;
  line.id = id;

  if (type == LineType.Straight) {
    line.drawStraight(source, target);
  }

  if (type == LineType.Orthogonal) {
    line.drawOrthogonal(source, target, { anchorPoints });
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
