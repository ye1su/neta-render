import { NetaGraph } from "../NetaGraph";
import { BEHAVIOR } from "../register";
import { EVENT_TYPE } from "./config";

export class BuiltInEvent {
  private instance: NetaGraph;
  private behaviors = BEHAVIOR

  constructor(instance: NetaGraph) {
    this.instance = instance;
  }

  init() {
    this.instance.on(EVENT_TYPE.GRAPHICS_POINTERDOWN, this.pointdown.bind(this));
    this.instance.on(EVENT_TYPE.CANVAS_POINTERMOVE, this.pointermove.bind(this));
    this.instance.on(EVENT_TYPE.CANVAS_POINTERUP, this.pointerup.bind(this));
    console.log(this.behaviors, '===');
    
  }

  destroy() {
    this.instance.off(EVENT_TYPE.GRAPHICS_POINTERDOWN, this.pointdown);
    this.instance.off(EVENT_TYPE.CANVAS_POINTERMOVE, this.pointermove);
    this.instance.off(EVENT_TYPE.CANVAS_POINTERUP, this.pointerup);
  }

  pointdown(event, target) {
    const name = EVENT_TYPE.GRAPHICS_POINTERDOWN
    this.behaviors.CreateEdge.render.onPointerDown.apply(this, [event, target])
  }

  pointermove(event) {
    const name = EVENT_TYPE.CANVAS_POINTERMOVE
    this.behaviors.CreateEdge.render.onPointerMove.apply(this, [event])
  }

  pointerup(event, target) {
    const name = EVENT_TYPE.CANVAS_POINTERUP
    this.behaviors.CreateEdge.render.onPointerUp.apply(this, [event, target])
  }
}
