import { NetaGraph } from "../NetaGraph";
import { BEHAVIOR } from "../register";
import { EVENT_TYPE } from "./config";

export class BuiltInEvent {
  private instance: NetaGraph;
  private behaviors = BEHAVIOR;

  constructor(instance: NetaGraph) {
    this.instance = instance;
  }

  init() {

    this.instance.on(
      EVENT_TYPE.GRAPHICS_POINTERDOWN,
      this.pointdown.bind(this)
    );
    this.instance.on(
      EVENT_TYPE.CANVAS_POINTERDOWN,
      this.canvasPointDown.bind(this)
    );
    this.instance.on(
      EVENT_TYPE.CANVAS_POINTERMOVE,
      this.canvasPointermove.bind(this)
    );
    this.instance.on(EVENT_TYPE.CANVAS_POINTERUP, this.canvasPointerup.bind(this));
  }

  destroy() {
    this.instance.off(EVENT_TYPE.GRAPHICS_POINTERDOWN, this.pointdown);
    this.instance.off(EVENT_TYPE.CANVAS_POINTERMOVE, this.canvasPointermove);
    this.instance.off(EVENT_TYPE.CANVAS_POINTERUP, this.canvasPointerup);
  }

  canvasPointDown(event) {
    const name = EVENT_TYPE.CANVAS_POINTERDOWN;
    this.loadEvent(name, [event]);
  }

  pointdown(event) {
    const name = EVENT_TYPE.GRAPHICS_POINTERDOWN;
    this.loadEvent(name, [event]);
  }

  canvasPointermove(event) {
    const name = EVENT_TYPE.CANVAS_POINTERMOVE;
    this.loadEvent(name, [event]);
  }

  canvasPointerup(event) {
    const name = EVENT_TYPE.CANVAS_POINTERUP;
    this.loadEvent(name, [event]);
  }

  loadEvent(name: string, args: any[]) {

    for (const behaviorKey in this.behaviors) {
      const behaviorIns = this.behaviors[behaviorKey];
      const events = behaviorIns.render.getEvents();
      const evnetName = events[name];

      if (typeof behaviorIns.render[evnetName] == "function") {
        // throw new Error("当前挂载的behavior动作异常");
        behaviorIns.render[evnetName].apply(this, [...args]);
      }
    }
  }
}
