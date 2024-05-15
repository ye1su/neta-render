import { CanvasRenderer } from "../renderer";
import { AnchorPort, BBox } from "../types/graphics";
import { Point } from "./Point";

export class Anchor {
  public visible = false
  public ports: AnchorPort[]= [];
  public bbox: BBox;
  public anchorIndex: number = 0
  constructor() {}

  get anchorPort() {
    return this.ports.find(port => port.id === this.anchorIndex)
  }

  updateContainerBBox(bbox: BBox) {
    this.bbox = bbox;
    const _ports = [
      new Point(bbox.minX, bbox.minY),
      new Point(bbox.centerX, bbox.minY),
      new Point(bbox.maxX, bbox.minY),
      new Point(bbox.minX, bbox.centerY),
      new Point(bbox.centerX, bbox.centerY),
      new Point(bbox.maxX, bbox.centerY),
      new Point(bbox.minX, bbox.maxY),
      new Point(bbox.centerX, bbox.maxY),
      new Point(bbox.maxX, bbox.maxY),
    ];
    this.ports = _ports.map((point, index) => {
      return {
        id: index,
        point,
      };
    });

    this.anchorIndex = 4
  }


  render(render: CanvasRenderer) {
    if(!this.visible) return
    const ctx = render.ctx;
    this.ports.forEach((port) => {
      const { point } = port;
      ctx.beginPath();

      ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    });
  }
}
