import { NetaGraph } from "../NetaGraph";
import { TEMPORARY_CREATE_EDGE_ID } from "../config";

export class BuiltInEvent {
  private instance: NetaGraph;

  private selectedAnchor = null;

  constructor(instance: NetaGraph) {
    this.instance = instance;
  }

  init() {
    this.instance.on("graphics:pointerdown", this.pointdown.bind(this));
    this.instance.on("canvas:pointermove", this.pointermove.bind(this));
    this.instance.on("canvas:pointerup", this.pointerup.bind(this));
  }

  destroy() {
    this.instance.off("graphics:pointerdown", this.pointdown);
    this.instance.off("canvas:pointermove", this.pointermove);
    this.instance.off("canvas:pointerup", this.pointerup);
  }

  pointdown(event, target) {
    if (target.anchor?.containPort) {
      this.selectedAnchor = target.anchor?.containPort;
    }
  }

  pointermove(e) {
    if (this.selectedAnchor) {
      const child = this.instance.stage.findChild(TEMPORARY_CREATE_EDGE_ID);
      if (child) {
        this.instance.stage.removeChild(child);
      }
      const endPoint = {
        x: e.offsetX,
        y: e.offsetY,
      };

      const tPoint = this.instance.renderer.getTransformByPoint(
        endPoint.x,
        endPoint.y
      );

      this.instance.addNode({
        id: TEMPORARY_CREATE_EDGE_ID,
        type: "polygon",
        x: this.selectedAnchor.point.x / 2,
        y: this.selectedAnchor.point.y / 2,
        points: [
          0,
          0,
          tPoint.x / 2 - this.selectedAnchor.point.x / 2,
          tPoint.y / 2 - this.selectedAnchor.point.y / 2,
        ],
      });
      this.instance.render();
    }
  }

  pointerup(e, target) {
    console.log("target: ", target);

    if (this.selectedAnchor) {
      const child = this.instance.stage.findChild(TEMPORARY_CREATE_EDGE_ID);
      if (child) {
        this.instance.stage.removeChild(child);
        this.instance.render();
      }

      const port = target?.anchor?.containPort;

      if (port && target.id !== TEMPORARY_CREATE_EDGE_ID) {
        const craeteEdge = {
          id: "xxxxccc",
          label: "edge",
          source: "node1",
          target: "node2",
          type: "Straight",
          sourceAnchor: this.selectedAnchor.id,
          targetAnchor: port.id,
        };

        this.instance.addEdge(craeteEdge);
        this.instance.render();
      }
      this.selectedAnchor = null;
    }
  }
}
