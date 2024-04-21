import { Graphics } from "./Graphics";

export function graphicsParse(graphic: Graphics, json: Record<string, any>) {
  const { type, x, y } = json;
  // #D3D3D3
  graphic.beginFill("#fff").drawCircle(0, 0, 50);
  graphic.position.set(x, y);
}
