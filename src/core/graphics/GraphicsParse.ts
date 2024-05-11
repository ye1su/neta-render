import { Container } from "../display";
import { BaseShapes, LineType } from "../enums";
import { BASE_FONT_SIZE, fixFactor, getCenterX } from "../utils";
import { Graphics } from "./Graphics";
import { GraphicsOfLine } from "./GraphicsOfLine";

export function graphicsShapeParse(json: Record<string, any>) {
  json.x = fixFactor(json.x);
  json.y = fixFactor(json.y);
  json.wdith = fixFactor(json.wdith);
  json.height = fixFactor(json.height);
  json.radius = fixFactor(json.radius);
  const { id, type, x, y, wdith, height } = json;

  const graphic = new Container();
  if (type == "rect") {
    const rect = new Graphics();
    rect.drawRect(0, 0, wdith, height);
    const text = new Graphics();
    const textStart = getCenterX(
      json.label,
      wdith / 2,
      fixFactor(BASE_FONT_SIZE)
    );
    text.drawText(textStart, height / 2 + BASE_FONT_SIZE, json.label);

    graphic.addChild(rect);
    graphic.addChild(text);
  }
  if (type == "circle") {
    const { radius } = json;
    const circle = new Graphics();
    circle.drawCircle(0, 0, radius);

    const text = new Graphics();
    const textStart = getCenterX(json.label, 0, fixFactor(BASE_FONT_SIZE));
    text.drawText(textStart, 0 + BASE_FONT_SIZE, json.label);

    graphic.addChild(circle);
    graphic.addChild(text);
  }

  if (type == "image") {
    const { src } = json;
    const image = new Graphics();
    image.drawImage(0, 0, wdith, height, src);

    graphic.addChild(image);
  }

  if(type == "ellipse") {
    const { radiusX, radiusY } = json;
    const ellipse = new Graphics()
    ellipse.drawEllipse(0, 0, radiusX, radiusY );

    const text = new Graphics();
    const textStart = getCenterX(json.label, 0, fixFactor(BASE_FONT_SIZE));
    text.drawText(textStart, 0 + BASE_FONT_SIZE, json.label);

    graphic.addChild(ellipse);
    graphic.addChild(text);
  }

  graphic.whole = true;

  graphic.id = id;
  graphic.updatePosition(x, y);

  return graphic;
}

export function graphicsLineParse(json: Record<string, any>) {
  const { id, type, source, target } = json;

  const line = new GraphicsOfLine();
  line.id = id;

  if (type == LineType.Straight) {
    line.drawStraight(source, target);
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
