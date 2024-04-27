import { Point } from "../math";
import { Graphics } from "./Graphics";

export function graphicsParse(graphic: Graphics, json: Record<string, any>) {
  const { type, x, y } = json;
  


  if(type == 'rect') {
    graphic.drawRect(0 ,0 , 100, 50)
    graphic.updatePosition(x, y)
  } if(type == 'combo'){
    graphic.drawRect(0 ,0 , 300, 160)
    graphic.drawCircle(100, 50, 50);
    graphic.updatePosition(x, y)
  } else {
    graphic.drawCircle(0, 0, 50);
    graphic.updatePosition(x, y)
  }
}
