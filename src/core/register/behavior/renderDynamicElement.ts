import { isString } from "lodash-es";
import { TEMPORARY_CREATE_EDGE_ID } from "../../config";
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
        [EVENT_TYPE.CANVAS_POINTERDOWN]: "onCanvasClick",
      };
    },
    onPointerDown(evt) {
      console.log("evt: ", evt);
      if (!evt.container?.dynamicElement) return;
      const originThis = evt.originThis;
      const dynamicElementInfo = evt.container?.dynamicElement;
      originThis.renderContainer = evt.container;
      console.log("evt.container: ", evt.container);
      const bbox = evt.container.getBBox();

      originThis.id = "stagehtml-" + evt.container.id;

      originThis.clearAllDynamicEles(this.instance.el);

      const newEle = document.createElement(dynamicElementInfo.eleType);
      newEle.id = originThis.id;
      newEle.value = dynamicElementInfo.text;
      if (typeof dynamicElementInfo.style == "object") {
        for (const key in dynamicElementInfo.style) {
          newEle.style[key] = dynamicElementInfo.style[key];
        }
      }

      newEle.style.position = "absolute";
      newEle.style.left = evt.target.x / 2 + "px";
      newEle.style.top = evt.target.y / 2 + "px";
      newEle.style.width = (bbox.maxX - bbox.minX) / 2 + "px";
      newEle.style.height = (bbox.maxY - bbox.minY) / 2 + "px";

      this.instance.el.appendChild(newEle);

      setTimeout(() => {
        newEle.focus();
      }, 0);
    },
    onCanvasClick(evt) {
      const originThis = evt.originThis;
      if (originThis.id) {
        const stageChild = this.instance.el.querySelector(`#${originThis.id}`);

        console.log("stageChild: ", stageChild);

        const text = stageChild.value;
        console.log("text: ", text);

        const targetId = originThis.renderContainer.id;
        this.instance.updateNodeData({
          id: targetId,
          text,
        });
        // stageChild && this.instance.el.removeChild(stageChild);

        originThis.clearAllDynamicEles(this.instance.el);
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

export default renderDynamicElement;
