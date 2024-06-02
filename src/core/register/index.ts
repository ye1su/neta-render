import UserTask from "./nodes/regUserTask";
import AndOr from "./nodes/regAndOr";
import CvsSelect from "./nodes/regCvsSelect";

import CreateEdge from "./behavior/createEdge";

export const EXTEND_NODE = {
  UserTask,
  AndOr,
  CvsSelect,
};

export const BEHAVIOR = {
  CreateEdge,
};
