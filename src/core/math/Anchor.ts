import { CanvasRenderer } from "../renderer";
import { BBox } from "../types/graphics";
import { Point } from "./Point";

export class Anchor {
  public ports = [];
  public bbox: BBox;
  constructor() {}

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
  }
  render(render: CanvasRenderer) {
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
