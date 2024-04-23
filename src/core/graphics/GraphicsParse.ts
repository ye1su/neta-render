import { Point } from "../math";
import { Graphics } from "./Graphics";

export function graphicsParse(graphic: Graphics, json: Record<string, any>) {
  const { type, x, y } = json;
  // #D3D3D3
  graphic.beginFill("red").drawCircle(x, y, 50);
  // graphic.position.set(x, y);
  graphic.cursor = "pointer";
  // let dragging = false;
  // let startPoint = new Point(g.x, g.y);
  // let mouseDownPoint = new Point(0, 0);


}
