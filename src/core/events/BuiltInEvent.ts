import { NetaGraph } from "../NetaGraph";
import { BEHAVIOR } from "../register";
import { EVENT_TYPE } from "./config";

export class BuiltInEvent {
  private instance: NetaGraph;
  private behaviors = BEHAVIOR;

  constructor(instance: NetaGraph, registerEvent) {
    this.instance = instance;
    if (Array.isArray(registerEvent)) {
      for(const regEvent of registerEvent) {
        this.behaviors[regEvent.name] = regEvent
      }
    }
  }

  init() {
    for (const behaviorKey in this.behaviors) {
      const behaviorIns = this.behaviors[behaviorKey];
      if (typeof behaviorIns?.render?.init == "function") {
        behaviorIns.render.init();
      }
    }

    this.instance.on(
      EVENT_TYPE.GRAPHICS_POINTERDOWN,
      this.graphicPointDown.bind(this)
    );
    this.instance.on(
      EVENT_TYPE.CANVAS_POINTERDOWN,
      this.canvasPointDown.bind(this)
    );
    this.instance.on(
      EVENT_TYPE.CANVAS_POINTERMOVE,
      this.canvasPointerMove.bind(this)
    );
    this.instance.on(
      EVENT_TYPE.CANVAS_POINTERUP,
      this.canvasPointerUp.bind(this)
    );
  }

  destroy() {
    for (const behaviorKey in this.behaviors) {
      const behaviorIns = this.behaviors[behaviorKey];
      if (typeof behaviorIns?.render?.destroy == "function") {
        behaviorIns.render.destroy();
      }
    }

    this.instance.off(EVENT_TYPE.GRAPHICS_POINTERDOWN, this.graphicPointDown);
    this.instance.off(EVENT_TYPE.CANVAS_POINTERDOWN, this.canvasPointDown);
    this.instance.off(EVENT_TYPE.CANVAS_POINTERMOVE, this.canvasPointerMove);
    this.instance.off(EVENT_TYPE.CANVAS_POINTERUP, this.canvasPointerUp);
  }

  graphicPointDown(event) {
    const name = EVENT_TYPE.GRAPHICS_POINTERDOWN;
    this.loadEvent(name, [event]);
  }

  canvasPointDown(event) {
    const name = EVENT_TYPE.CANVAS_POINTERDOWN;
    this.loadEvent(name, [event]);
  }

  canvasPointerMove(event) {
    const name = EVENT_TYPE.CANVAS_POINTERMOVE;
    this.loadEvent(name, [event]);
  }

  canvasPointerUp(event) {
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
