const dragAll = {
  name: "drag-all",
  // 是否在拖拽中
  _dragging: false,
  // 点击鼠标后存取的数据
  _mouseDownPoint: {
    x: 0,
    y: 0,
    diffx: 0,
    diffy: 0,
  },
  render: {
    getEvents() {
      return {
        "graphics:pointerdown": "onGraphicsPointerDown",
        "graphics:contextmenu": "onGraphicsContextMenu",
        "canvas:pointerdown": "onCanvasPointerDown",
        "canvas:pointermove": "onCanvasPointerMove",
        "canvas:pointerup": "onCanvasPointerUp",
      };
    },
    handleCommonDown(event) {
      const originThis = event.originThis;
      // 获取当前点击的相关信息
      originThis._mouseDownPoint = {
        x: event.offsetX,
        y: event.offsetY,
        diffx: 0,
        diffy: 0,
      };
      // 拖拽开始时存取当前矩阵快照
      originThis._dragging = true;
      // originThis._dragging = false;

      this.instance.renderer.cloneMatrix();
    },
    onGraphicsPointerDown(event) {
      const originThis = event.originThis;
      const target = event.target;

      originThis.handleCommonDown.call(this, event)

      this.instance.renderer.cloneMatrix();

      const tansferTarget = this.instance.renderer.getPointByTransform(
        target.x,
        target.y
      );
      // 记录点击节点在图形的位置
      originThis._mouseDownPoint.diffx = event.offsetX - tansferTarget.x;
      originThis._mouseDownPoint.diffy = event.offsetY - tansferTarget.y;
    },
    onCanvasPointerDown(event) {
      const originThis = event.originThis;
      originThis.handleCommonDown.call(this, event)
    },
    onCanvasPointerMove(event) {
      const originThis = event.originThis;
      let hitTarget = event.hitTarget;
      const movePosition = {
        x: event.offsetX,
        y: event.offsetY,
      };

      if (originThis._dragging && hitTarget) {
        // 相对当前位置的偏移量
        const diffX =
          movePosition.x -
          originThis._mouseDownPoint.x -
          originThis._mouseDownPoint.diffx;
        const diffY =
          movePosition.y -
          originThis._mouseDownPoint.y -
          originThis._mouseDownPoint.diffy;

        const whole = hitTarget?.parent?.whole;

        // 如果为组合节点则指向parent
        if (whole) {
          hitTarget = hitTarget.parent;
        }

        // 根据画布缩放平移动
        const realPoint = this.instance.renderer.getTransformByPoint(
          originThis._mouseDownPoint.x + diffX,
          originThis._mouseDownPoint.y + diffY
        );

        // 更新拖拽的的节点位置
        hitTarget.updatePosition(
          originThis._mouseDownPoint.x + diffX,
          originThis._mouseDownPoint.y + diffY
        );
        hitTarget.updatePosition(realPoint.x, realPoint.y);
        this.instance.renderer.render(this.instance.stage);
      }

      if (originThis._dragging && !hitTarget) {
        const diffX = movePosition.x - originThis._mouseDownPoint.x;
        const diffY = movePosition.y - originThis._mouseDownPoint.y;
        this.instance.renderer.updateCanvasTranslate(diffX, diffY);
      }
    },
    onCanvasPointerUp(event) {
      const originThis = event.originThis;
      originThis._dragging = false;
    },
    onGraphicsContextMenu(event) {
      const originThis = event.originThis;
      originThis._dragging = false;
    }
  },
};

export default dragAll;
