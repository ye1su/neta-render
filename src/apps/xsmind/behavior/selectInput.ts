const mindSelectNode = {
  name: "mind-select-node",
  render: {
    currentShape: null,
    currentNode: null,
    hoverShape: null,
    init() {},
    destroy() {},
    getEvents() {
      return {
        "graphics:pointerdown": "onPointerDown",
        "graphics:mouseenter": "onMouseEnter",
        "graphics:mouseout": "onMouseOut",
        "canvas:pointerdown": "onCanvasDown",
        "canvas:pointermove": "onCanvasMove",
        "canvas:pointerup": "onCanvasUp",
      };
    },
    onPointerDown(evt) {
      const originThis = evt.originThis;

      const target = evt.target;
      const shape = target._geometry?.graphicsData?.shape ?? null;

      if (target.parent._data?.type === "headTitle") {
        const node = getTargetNode(this.instance.model.nodes, target.parent.id);
        node.nodeState.push("select");
        this.instance.refresh();
      }

      if (shape.name === "expand-circle") {
        const newNodeId = new Date().getTime();
        this.instance.model.nodes.push({
          id: `node-${newNodeId}`,
          type: "headTitle",
          label: "Company1",
          nodeState: [],
        });
        this.instance.model.edges.push({
          id: `edge-${newNodeId}`,
          source: target.parent.id,
          target: `node-${newNodeId}`,
        });
        this.instance.refresh();
      }

      originThis.currentShape = shape;
      originThis.currentNode = target;
    },
    onMouseEnter(evt) {
      const originThis = evt.originThis;
      let parent = null;
      if (evt.target.whole) {
        parent = evt.target;
      } else {
        parent = evt.target.parent;
      }

      if (parent._data?.type === "headTitle") {
        originThis.hoverShape = parent;
        const node = getTargetNode(this.instance.model.nodes, parent.id);
        node.nodeState.push("hover");
        this.instance.refresh();
      }
    },
    onMouseOut(evt) {
      const originThis = evt.originThis;

      if (originThis.hoverShape) {
        const node = getTargetNode(
          this.instance.model.nodes,
          originThis.hoverShape.id
        );
        const nodeState = node.nodeState;
        const hoverIndex = nodeState.indexOf("hover");
        nodeState.splice(hoverIndex, 1);
        this.instance.refresh();
      }
    },
    onCanvasDown() {
      let refreshTag = false;
      this.instance.model.nodes.forEach((node) => {
        if (node.nodeState) {
          const hoverIndex = node.nodeState.indexOf("select");
          node.nodeState.splice(hoverIndex, 1);
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
        const node = getTargetNode(this.instance.model.nodes, targetNode.id);
        node.width = offsetX / 4;
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

function getTargetNode(nodes = [], id) {
  return nodes.find((node) => node.id === id);
}

export default mindSelectNode;
