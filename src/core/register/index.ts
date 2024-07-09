import UserTask from "./nodes/regUserTask";
import AndOr from "./nodes/regAndOr";
import CvsInput from "./nodes/regCvsInput";
import Freedom from "./nodes/regFreedom";

import CreateEdge from "./behavior/createEdge";
import ClickEditNode from "./behavior/clickEditNode";
import FreeDomRender from "./behavior/freeDomRender";
import DragAll from './behavior/dragAll'
import WheelCanvasMove from './behavior/wheelCanvasMove'

export const EXTEND_NODE = {
  UserTask,
  AndOr,
  CvsInput,
  Freedom,
};

export const BEHAVIOR = {
  CreateEdge,
  ClickEditNode,
  FreeDomRender,
  DragAll,
  WheelCanvasMove,
};

