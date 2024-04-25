import { Point } from "../math";
import { Graphics } from "./Graphics";

export function graphicsParse(graphic: Graphics, json: Record<string, any>) {
  const { type, x, y } = json;
  


  if(type == 'rect') {
    graphic.beginFill("#fff").drawRect(0 ,0 , 100, 50)
    graphic.updatePosition(x, y)
  } else {
    graphic.beginFill("#fff").drawCircle(0, 0, 50);
    graphic.updatePosition(x, y)
  }
}
