import { CanvasRenderer } from "../renderer";
import { GlobalTransform } from "../types";
import { AnchorPort, BBox } from "../types/graphics";
import { Point } from "./Point";

export class Anchor {
  public globalTransform: GlobalTransform;
  public visible = false;
  public ports: AnchorPort[] = [];
  public bbox: BBox;
  public radius = 8;
  public containPort: AnchorPort = null;
  constructor() {}

  public transformPoint(p: Point) {
    if (!this.globalTransform) return p;
    const { translate, scale } = this.globalTransform;
    p = p.clone();
    p.x = p.x - translate.x;
    p.y = p.y - translate.y;
    p.x = p.x / scale;
    p.y = p.y / scale;
    return p;
  }

  getAnchorPort(anchorIndex?: number) {
    return this.ports.find((port) => port.id === anchorIndex);
  }

  updateContainerBBox(bbox: BBox) {
    this.bbox = bbox;
    const _ports = [
      new Point(bbox.minX, bbox.minY),
      new Point(bbox.centerX, bbox.minY),
      new Point(bbox.maxX, bbox.minY),
      new Point(bbox.minX, bbox.centerY),
      // new Point(bbox.centerX, bbox.centerY),
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
    if (!this.visible) return;
    const ctx = render.ctx;

    this.ports.forEach((port) => {
      const { point } = port;
      ctx.beginPath();

      ctx.arc(point.x, point.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    });
  }

  portsContains(checkPoint: Point) {
    // console.log("checkPoint: ", checkPoint);

    const p = this.transformPoint(checkPoint);
    if (Array.isArray(this.ports)) {
      for (const port of this.ports) {
        const po = port.point;
        const _x = po.x;
        const _y = po.y;
        if (
          (p.x - _x) * (p.x - _x) + (p.y - _y) * (p.y - _y) <
          this.radius * this.radius
        ) {
          this.containPort = {
            ...port,
            // point: this.transformPoint(port.point),
          };
          return true;
        }
      }
    }

    return false;
  }
}
