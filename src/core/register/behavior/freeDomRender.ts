import { isString } from "lodash-es";
import { TEMPORARY_CREATE_EDGE_ID } from "../../config";
import { EVENT_TYPE } from "../../events/config";
import { createRoot } from "react-dom/client";
import React from "react";

const clickEditNode = {
  name: "freedom-node",
  render: {
    vid: null,
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
      const vNode = evt.container?.html;
      if (!vNode) return;
      if (isString(vNode)) return;
      const bbox = evt.container.getBBox();
      const newEle = document.createElement("div");
      clickEditNode.render.vid = "stagehtml-" + evt.container.id;
      newEle.id = clickEditNode.render.vid;

      const renderItem = createRoot(newEle);

      renderItem.render(vNode);

      newEle.style.position = "absolute";
      newEle.style.left = evt.target.x / 2 + "px";
      newEle.style.top = evt.target.y / 2 + "px";
      newEle.style.width = (bbox.maxX - bbox.minX) / 2 + "px";
      newEle.style.height = (bbox.maxY - bbox.minY) / 2 + "px";

      this.instance.el.appendChild(newEle);
    },
    onCanvasClick(evt) {
      if (clickEditNode.render.vid) {
        const stageChildren =
          this.instance.el.querySelectorAll("[id^='stagehtml-']");
        for (const child of stageChildren) {
          this.instance.el.removeChild(child);
        }
      }
    },
  },
};

export default clickEditNode;
