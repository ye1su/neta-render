import { Graphics } from "../graphics/Graphics";
import { RegisterContext } from "../graphics/GraphicsParse";

export interface RegNodeType {
  name: string;
  render: {
    init?: (val: any) => void;
    getEvents: () => Record<string, string>;
    draw: (action: RegisterContext) => Graphics | undefined;
    dynamicElement?: (val: any) => any;
    destroy?: () => void;
  };
  [key: string]: any;
}

export type RefBehavior = string | RefBehaviorItem;
export interface RefBehaviorItem {
  key: string;
  options: Record<string, any>;
}
