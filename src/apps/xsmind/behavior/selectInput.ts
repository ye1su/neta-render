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

      /**
       * 点击选中
       */
      if (target.parent._data?.type === "headTitle") {
        const node = getTargetNode(this.instance.model.nodes, target.parent.id);

        const selectIndex = node.nodeState.indexOf("select");
        const inputIndex = node.nodeState.indexOf("input");

        this.instance.model.nodes.forEach((node) => {
          // 清除select
          const selectIndex = node.nodeState?.indexOf("select");
          if (typeof selectIndex == "number" && selectIndex > -1) {
            node.nodeState.splice(selectIndex, 1);
          }
          // 清除input
          const inputIndex = node.nodeState?.indexOf("input");
          if (typeof inputIndex == "number" && inputIndex > -1) {
            node.nodeState.splice(inputIndex, 1);
          }
        });

        if (selectIndex == -1 && inputIndex == -1) {
          node.nodeState.push("select");
        } else {
          node.nodeState.push("input");
        }

        this.instance.refresh();
      }

      /**
       * 新增节点
       */
      if (shape.name === "expand-circle") {
        const newNodeId = new Date().getTime();
        this.instance.model.nodes.push({
          id: `node-${newNodeId}`,
          type: "headTitle",
          label: "Company1",
          width: 54,
          nodeState: [],
        });
        this.instance.model.edges.push({
          id: `edge-${newNodeId}`,
          source: target.parent.id,
          target: `node-${newNodeId}`,
          sourceAnchor: 4,
          targetAnchor: 3,
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

      // hover进入后展示新增的bar
      if (parent._data?.type === "headTitle") {
        originThis.hoverShape = parent;
        const node = getTargetNode(this.instance.model.nodes, parent.id);
        const nodeState = node.nodeState;
        const hoverIndex = nodeState.indexOf("hover");
        if (hoverIndex == -1) {
          node.nodeState.push("hover");
          this.instance.refresh();
        }
      }
    },
    onMouseOut(evt) {
      const originThis = evt.originThis;

      // hover一处去出bar
      if (originThis.hoverShape) {
        const node = getTargetNode(
          this.instance.model.nodes,
          originThis.hoverShape.id
        );

        const hoverIndex = node.nodeState?.indexOf("hover");

        if (typeof hoverIndex == "number" && hoverIndex > -1) {
          node.nodeState.splice(hoverIndex, 1);
          setTimeout(() => {
            this.instance.refresh();
          }, 300);
        }
      }
    },
    onCanvasDown() {
      let refreshTag = false;
      this.instance.model.nodes.forEach((node) => {
        // 清除select
        const selectIndex = node.nodeState?.indexOf("select");
        if (typeof selectIndex == "number" && selectIndex > -1) {
          node.nodeState.splice(selectIndex, 1);
          refreshTag = true;
        }
        // 清除input
        const inputIndex = node.nodeState?.indexOf("input");
        if (typeof inputIndex == "number" && inputIndex > -1) {
          node.nodeState.splice(inputIndex, 1);
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
