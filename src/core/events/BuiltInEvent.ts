import { NetaGraph } from "../NetaGraph";
import { BEHAVIOR } from "../register";
import { EVENT_TYPE } from "./config";

export class BuiltInEvent {
  private instance: NetaGraph;
  private behaviors = BEHAVIOR;

  constructor(instance: NetaGraph, registerEvent) {
    this.instance = instance;
    if (Array.isArray(registerEvent)) {
      for (const regEvent of registerEvent) {
        this.behaviors[regEvent.name] = regEvent;
      }
    }

    const _this = this
    for(const key in EVENT_TYPE) {
      this[`EVENT_${key}`] = function(event) {
        const name = EVENT_TYPE[key];
        _this.loadEvent(name, [event]);
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

    for(const key in this) {
      if(!key.startsWith('EVENT_')) continue
      const eventKey = key.slice(6)
      this.instance.on(EVENT_TYPE[eventKey], this[key].bind(this))
    }

  }

  destroy() {
    for (const behaviorKey in this.behaviors) {
      const behaviorIns = this.behaviors[behaviorKey];
      if (typeof behaviorIns?.render?.destroy == "function") {
        behaviorIns.render.destroy();
      }
    }

    for(const key in this) {
      if(!key.startsWith('EVENT_')) continue

      const eventKey = key.slice(6)
      this.instance.off(EVENT_TYPE[eventKey], this[key])
    }

  }


  loadEvent(name: string, args: any[]) {

    for (const behaviorKey in this.behaviors) {
      const behaviorIns = this.behaviors[behaviorKey];
      const events = behaviorIns.render.getEvents();
      const evnetName = events[name];

      if (typeof behaviorIns.render[evnetName] == "function") {
        // throw new Error("当前挂载的behavior动作异常");
        const originThis = behaviorIns.render;

  
        if(typeof args[0] === 'object') {
          args[0].originThis = originThis
        }
        behaviorIns.render[evnetName].apply(this, [...args]);
      }
    }
  }
}
