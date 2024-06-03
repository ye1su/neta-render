import { TEMPORARY_CREATE_EDGE_ID } from "../../config";
import { EVENT_TYPE } from "../../events/config";

const clickEditNode = {
  name: "clic-edit-node",
  render: {
    id: null,
    getEvents() {
      return {
        "graphics:pointerdown": "onPointerDown",
        [EVENT_TYPE.CANVAS_POINTERDOWN]: "onCanvasClick"
      };
    },
    onPointerDown(evt) {
      const bbox = evt.container.getBBox();
      clickEditNode.render.id =  "stage-html-" + evt.container.id;
      const stageChild = this.instance.el.querySelector(`#${clickEditNode.render.id}`);
      if (stageChild) {
        this.instance.el.removeChild(stageChild);
      }

      const newEle = document.createElement("div");
      newEle.id = clickEditNode.render.id;
      newEle.innerHTML = evt.container.html;
      newEle.style.position = "absolute";
      newEle.style.left = evt.target.x / 2 + "px";
      newEle.style.top = evt.target.y / 2 + "px";
      newEle.style.width = (bbox.maxX - bbox.minX) / 2 + "px";
      newEle.style.height = (bbox.maxY - bbox.minY) / 2 + "px";

      this.instance.el.appendChild(newEle);
    },
    onCanvasClick(evt) {
      if(clickEditNode.render.id) {
        const stageChild = this.instance.el.querySelector(`#${clickEditNode.render.id}`);
        this.instance.el.removeChild(stageChild);
      }
    }
  },
};

export default clickEditNode;
