import { EVENT_TYPE } from "../../events/config";

const renderDynamicElement = {
  name: "render-dynamic-element",
  render: {
    id: null,
    renderContainer: null,
    init() {},
    destroy() {},
    getEvents() {
      return {
        "graphics:pointerdown": "onPointerDown",
        "canvas:wheel": "onCanvasWheel",
        [EVENT_TYPE.CANVAS_POINTERDOWN]: "onCanvasClick",
      };
    },
    onPointerDown(evt) {
      if (!evt.container?.dynamicElement) return;

      const target = evt.target;
      const node = getTargetNode(this.instance.model.nodes, target.parent.id);
      const shape = target._geometry?.graphicsData?.shape ?? null;
      if (node.nodeState.indexOf("select") == -1) return;

      if (shape.name === "drag-pointer") return


      const originThis = evt.originThis;
      const dynamicElementInfo = evt.container?.dynamicElement;
      originThis.renderContainer = evt.container;

      const bbox = evt.container.getBBox();
      originThis.id = "stagehtml-" + evt.container.id;
      // 去除elements
      originThis.clearAllDynamicEles(this.instance.el);

      // 创建element
      const newEle = document.createElement(dynamicElementInfo.eleType);
      newEle.id = originThis.id;


      if (typeof dynamicElementInfo.style == "object") {
        for (const key in dynamicElementInfo.style) {
          newEle.style[key] = dynamicElementInfo.style[key];
        }
      }

      const ltPoint = this.instance.renderer.getPointByTransform(
        evt.target.x,
        evt.target.y
      );

      const offsetMargin = 12;
      
      newEle.style.fontSize = '24px'
      newEle.style.position = "absolute";
      newEle.style.left = ltPoint.x / 2 + offsetMargin + "px";
      newEle.style.top = ltPoint.y / 2 + offsetMargin + "px";
      newEle.style.width =
        (bbox.maxX - bbox.minX) / 2 - offsetMargin * 2 + "px";
      // newEle.style.height =
      //   (bbox.maxY - bbox.minY) / 2 - offsetMargin * 2 + "px";

      this.instance.el.appendChild(newEle);

      // appendChild 完之后进行赋值
      newEle.value = dynamicElementInfo.text;
      // 进行高度计算
      const initialHeight = '1.5em';
      newEle.style.height = initialHeight;
      newEle.style.height = newEle.scrollHeight + 'px'
      // 刷新元素高度
      const targetId = originThis.renderContainer.id;
      this.instance.updateNodeData({
        id: targetId,
        height: newEle.scrollHeight / 2 + 13
      });


      // 处理input时间
      const _this = this
      newEle.addEventListener('input', function() {

        const initialHeight = '1.5em';
        newEle.style.height = initialHeight; // 重置高度
        const newHeight = newEle.scrollHeight + 'px';
        newEle.style.height = newHeight; // 设置为新的高度


        const targetId = originThis.renderContainer.id;

        _this.instance.updateNodeData({
          id: targetId,
          height: this.scrollHeight / 2 + 13
        });

      });

      setTimeout(() => {
        newEle.focus();
      }, 0);
    },
    onCanvasClick(evt) {
      const originThis = evt.originThis;
      const stageChild = this.instance.el.querySelector(`#${originThis.id}`);

      if (originThis.id && stageChild) {
        const text = stageChild.value;

        const targetId = originThis.renderContainer.id;
        this.instance.updateNodeData({
          id: targetId,
          text,
        });

        originThis.clearAllDynamicEles(this.instance.el);
      }
    },
    onCanvasWheel(evt) {
      const originThis = evt.originThis;
      const stageChild = this.instance.el.querySelector(`#${originThis.id}`);
      if (stageChild) {
        stageChild.style.left =
          parseFloat(stageChild.style.left) + evt.deltaX / 2 + "px";
        stageChild.style.top =
          parseFloat(stageChild.style.top) + evt.deltaY / 2 + "px";
      }
    },
    clearAllDynamicEles(fatherNode) {
      const stageChildren = fatherNode.querySelectorAll("[id^='stagehtml-']");

      for (const child of stageChildren) {
        fatherNode.removeChild(child);
      }
    },
  },
};

function getTargetNode(nodes = [], id) {
  return nodes.find((node) => node.id === id);
}

export default renderDynamicElement;
