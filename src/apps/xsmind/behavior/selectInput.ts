const mindSelectNode = {
  name: "mind-select-node",
  render: {
    currentShape: null,
    currentNode: null,
    init() {},
    destroy() {},
    getEvents() {
      return {
        "graphics:pointerdown": "onPointerDown",
        "canvas:pointermove": "onPointerMove",
        "canvas:pointerup": "onPointerUp",
      };
    },
    onPointerDown(evt) {
      const originThis = evt.originThis;

      const target = evt.target;
      const shape = target._geometry.graphicsData?.shape;

      originThis.currentShape = shape;
      originThis.currentNode = target;
    },
    onPointerMove(evt) {
      const originThis = evt.originThis;
      if (originThis?.currentShape?.name !== "drag-pointer") return;
      const endPoint = {
        x: evt.offsetX,
        y: evt.offsetY,
      };

      const tPoint = this.instance.renderer.getTransformByPoint(
        endPoint.x,
        endPoint.y
      );

      const targetNode = this.instance.model.nodes.find(
        (n) => n.id == originThis.currentNode.parent.id
      );
      if (targetNode) {
        this.instance.model.nodes[0].width =
          (tPoint.x - originThis.currentNode.x) / 4;
        this.instance.refresh();
      }
    },
    onPointerUp(evt) {
      const originThis = evt.originThis;
      originThis.currentShape = null;
      originThis.currentNode = null;
    },
  },
};

export default mindSelectNode;
