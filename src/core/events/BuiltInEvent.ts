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
    // for(const eventKey in EVENT_TYPE) {
    //   const eventName = EVENT_TYPE[eventKey]
    // }
    this.instance.on(
      EVENT_TYPE.GRAPHICS_POINTERDOWN,
      this.pointdown.bind(this)
    );
    this.instance.on(
      EVENT_TYPE.CANVAS_POINTERMOVE,
      this.pointermove.bind(this)
    );
    this.instance.on(EVENT_TYPE.CANVAS_POINTERUP, this.pointerup.bind(this));
  }

  destroy() {
    this.instance.off(EVENT_TYPE.GRAPHICS_POINTERDOWN, this.pointdown);
    this.instance.off(EVENT_TYPE.CANVAS_POINTERMOVE, this.pointermove);
    this.instance.off(EVENT_TYPE.CANVAS_POINTERUP, this.pointerup);
  }

  pointdown(event) {
    const name = EVENT_TYPE.GRAPHICS_POINTERDOWN;
    this.loadEvent(name,  [event])
  }

  pointermove(event) {
    const name = EVENT_TYPE.CANVAS_POINTERMOVE;
    this.loadEvent(name,  [event])
  }

  pointerup(event) {
    const name = EVENT_TYPE.CANVAS_POINTERUP;
    this.loadEvent(name,  [event])
  }

  loadEvent(name: string, args: any[]) {
    for (const behaviorKey in this.behaviors) {
      const behaviorIns = this.behaviors[behaviorKey];
      const events = behaviorIns.render.getEvents();
      const evnetName = events[name];
      if(typeof behaviorIns.render[evnetName] !== 'function') {
         throw new Error('当前挂载的behavior动作异常')
      }
      behaviorIns.render[evnetName].apply(this, [...args]);
    }
  }
}
