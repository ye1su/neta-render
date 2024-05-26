import { NetaGraph } from "../NetaGraph";

export class BuiltInEvent {
  private instance: NetaGraph;

  private selectedAnchor = null;

  constructor(instance: NetaGraph) {
    this.instance = instance;
  }

  eventInit() {
    this.instance.on("graphics:pointerdown", this.pointdown.bind(this));
    this.instance.on("canvas:pointermove", this.pointermove.bind(this));
    this.instance.on("canvas:pointerup", this.pointerup.bind(this));
  }

  pointdown(event, target) {
    if (target.anchor.anchorPort) {
      const port = target.anchor.containPort;
      const p = port.point;
      this.selectedAnchor = {
        ...p,
      };
    }
  }

  pointermove(e) {
    if (this.selectedAnchor) {
      const child = this.instance.stage.findChild("built-create-edge");
      if (child) {
        this.instance.stage.removeChild(child);
      }
      this.instance.addNode({
        id: "built-create-edge",
        type: "polygon",
        x: this.selectedAnchor.x / 2,
        y: this.selectedAnchor.y / 2,
        points: [
          0,
          0,
          e.offsetX / 2 - this.selectedAnchor.x / 2,
          e.offsetY / 2 - this.selectedAnchor.y / 2,
        ],
      });
      this.instance.render();
    }
  }

  pointerup() {
    if(this.selectedAnchor) {
      this.selectedAnchor = null
      const child = this.instance.stage.findChild("built-create-edge");
      if (child) {
        this.instance.stage.removeChild(child);
        this.instance.render();
      }
    }
  }
}
