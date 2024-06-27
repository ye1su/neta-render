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
        "graphics:mouseenter": "onMouseEnter",
        "canvas:pointerdown": "onCanvasDown",
        "canvas:pointermove": "onCanvasMove",
        "canvas:pointerup": "onCanvasUp",
      };
    },
    onPointerDown(evt) {
      const originThis = evt.originThis;

      const target = evt.target;
      console.log("target: ", target);
      const shape = target._geometry?.graphicsData?.shape ?? null;

      if (target.parent._data?.type === "headTitle") {
        this.instance.model.nodes[0].nodeState = ["select"];
        this.instance.refresh();
      }

      originThis.currentShape = shape;
      originThis.currentNode = target;
    },
    onMouseEnter(evt) {
      console.log('evt: ', evt);
      const target = evt.target;
      if (target.parent._data?.type === "headTitle") {
        this.instance.model.nodes[0].nodeState.push('hover');
        this.instance.refresh();
      }
    },
    onCanvasDown() {
      let refreshTag = false;
      this.instance.model.nodes.forEach((node) => {
        if (node.nodeState) {
          node.nodeState = [];
          refreshTag = true;
        }
      });

      if (refreshTag) {
        this.instance.refresh();
      }
    },
    onCanvasMove(evt) {
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
        let offsetX = tPoint.x - originThis.currentNode.x;
        if (offsetX < 80) {
          offsetX = 80;
        }
        this.instance.model.nodes[0].width = offsetX / 4;
        this.instance.refresh();
      }
    },
    onCanvasUp(evt) {
      const originThis = evt.originThis;
      originThis.currentShape = null;
      originThis.currentNode = null;
    },
  },
};

export default mindSelectNode;
