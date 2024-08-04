import AndOr from "./nodes/regAndOr";
import CvsInput from "./nodes/regCvsInput";
import Freedom from "./nodes/regFreedom";

import CreateEdge from "./behavior/createEdge";
import RenderDynamicElement from "./behavior/renderDynamicElement";
import FreeDomRender from "./behavior/freeDomRender";
import DragAll from './behavior/dragAll'
import WheelCanvasMove from './behavior/wheelCanvasMove'
import ContentMenu from './behavior/contextMenu'

export const EXTEND_NODE = {
  AndOr,
  CvsInput,
  Freedom,
};

export const BEHAVIOR = {
  CreateEdge,
  RenderDynamicElement,
  FreeDomRender,
  DragAll,
  WheelCanvasMove,
  ContentMenu,
};

