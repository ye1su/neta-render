import { NetaGraph } from "../NetaGraph";

export class BuiltInEvent {

  constructor() {
    
  }

  eventInit(instance: NetaGraph) {
    instance.on("graphics:pointerdown", this.pointdown);
  }

  pointdown(event, target) {
    console.log("event: ", event, target);
  }
}
