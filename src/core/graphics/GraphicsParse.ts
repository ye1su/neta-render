import { Container } from "../display";
import { BaseShapes } from "../enums";
import { Point } from "../math";
import { Graphics } from "./Graphics";
import { GraphicsOfLine } from "./GraphicsOfLine";

export function graphicsShapeParse(json: Record<string, any>) {
  const { type, x, y, wdith, height } = json;

  let graphic: Container | Graphics;

  if (!type) {
    graphic = new Graphics();
    graphic.drawCircle(0, 0, 50);
  } else if (BaseShapes.includes(type)) {
    graphic = new Graphics();
    if (type == "rect") {
      graphic.drawRect(0, 0, wdith, height);
    }
  } else {
    graphic = new Container();
    if (type == "combo") {
      const g1 = new Graphics();
      g1.drawRect(0, 0, 300, 160);
      const g2 = new Graphics();
      g2.drawCircle(100, 50, 50);
      graphic.whole = true;
      graphic.addChild(g1);
      graphic.addChild(g2);
    }
  }

  graphic.updatePosition(x, y);

  return graphic;
}

export function graphicsLineParse(json: Record<string, any>) {
  const { source, target } = json;
  
  const line = new GraphicsOfLine()
  line.drawStraight(source, target)

  return line
}