import UserTask from "./nodes/regUserTask";
import AndOr from "./nodes/regAndOr";
import CvsInput from "./nodes/regCvsInput";

import CreateEdge from "./behavior/createEdge";
import clickEditNode from "./behavior/clickEditNode";

export const EXTEND_NODE = {
  UserTask,
  AndOr,
  CvsInput,
};

export const BEHAVIOR = {
  CreateEdge,
  clickEditNode
};
