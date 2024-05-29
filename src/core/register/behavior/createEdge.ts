import { TEMPORARY_CREATE_EDGE_ID } from "../../config";

const createEdge = {
  name: "create-edge",
  render: {
    getEvents() {
      return {
        "graphics:pointerdown": "onPointerDown",
        "canvas:pointermove": "onPointerMove",
        "canvas:pointerup": "onPointerUp",
      };
    },
    onPointerDown(event, target) {
      if (target.anchor?.containPort) {
        this._selectedAnchor = {
          target,
          containPort: target.anchor?.containPort,
        };
      }
    },
    onPointerMove(e) {
      if (this._selectedAnchor) {
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
          x: this._selectedAnchor.containPort.point.x / 2,
          y: this._selectedAnchor.containPort.point.y / 2,
          points: [
            0,
            0,
            tPoint.x / 2 - this._selectedAnchor.containPort.point.x / 2,
            tPoint.y / 2 - this._selectedAnchor.containPort.point.y / 2,
          ],
        });
        this.instance.render();
      }
    },
    onPointerUp(e, target) {
      if (this._selectedAnchor) {
        const child = this.instance.stage.findChild(TEMPORARY_CREATE_EDGE_ID);
        if (child) {
          this.instance.stage.removeChild(child);
          this.instance.render();
        }

        const port = target?.anchor?.containPort;

        // 自己和自己的port相连会被取消
        const isSamePort =
          target.id === this._selectedAnchor.target.id &&
          this._selectedAnchor.containPort.id == port.id;

        if (port && target.id !== TEMPORARY_CREATE_EDGE_ID && !isSamePort) {
          const craeteEdge = {
            id: new Date().getTime(),
            source: this._selectedAnchor.target.id,
            target: target.id,
            type: "Straight",
            sourceAnchor: this._selectedAnchor.containPort.id,
            targetAnchor: port.id,
          };

          this.instance.addEdge(craeteEdge);
          this.instance.render();
        }
        this._selectedAnchor = null;
      }
    },
  },
};

export default createEdge;
