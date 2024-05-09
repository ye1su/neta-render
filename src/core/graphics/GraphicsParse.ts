import { Container } from "../display";
import { BaseShapes, LineType } from "../enums";
import { fixFactor } from "../utils";
import { Graphics } from "./Graphics";
import { GraphicsOfLine } from "./GraphicsOfLine";

export function graphicsShapeParse(json: Record<string, any>) {
  json.x = fixFactor(json.x);
  json.y = fixFactor(json.y);
  json.wdith = fixFactor(json.wdith);
  json.height = fixFactor(json.height);
  const { id, type, x, y, wdith, height } = json;

  // let graphic: Container | Graphics;

  // if (!type) {
  //   graphic = new Graphics();
  //   graphic.drawCircle(0, 0, 50);
  // } else if (BaseShapes.includes(type)) {
  //   graphic = new Graphics();
  //   if (type == "rect") {
  //     graphic.drawRect(0, 0, wdith, height);
  //     graphic.drawText(0, height / 2);
  //   }
  // } else {
  //   graphic = new Container();
  //   if (type == "combo") {
  //     const g1 = new Graphics();
  //     g1.drawRect(0, 0, 300, 160);
  //     const g2 = new Graphics();
  //     g2.drawCircle(100, 50, 50);
  //     graphic.whole = true;
  //     graphic.addChild(g1);
  //     graphic.addChild(g2);
  //   }
  // }
  const graphic = new Container();
  if (type == "rect") {
    const rect = new Graphics();
    rect.drawRect(0, 0, wdith, height);
    const text = new Graphics();
    text.drawText(100, height / 2, json.label);
    
    graphic.whole = true;
    graphic.addChild(rect);
    graphic.addChild(text);
  }

  graphic.id = id;
  graphic.updatePosition(x, y);

  return graphic;
}

export function graphicsLineParse(json: Record<string, any>) {
  const { id, type, source, target } = json;

  const line = new GraphicsOfLine();
  line.id = id;

  if (!type) {
    line.drawStraight(source, target);
  }

  if (type == LineType.QuadraticCurve) {
    const { anchorPoints } = json;
    line.drawQuadraticCurve(source, target, { anchorPoints });
  }

  if (type == LineType.BezierCurve) {
    const { anchorPoints } = json;
    line.drawBezierCurve(source, target, { anchorPoints });
  }

  return line;
}
