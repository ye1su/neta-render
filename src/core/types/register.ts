import { Graphics } from "../graphics/Graphics";
import { RegisterContext } from "../graphics/GraphicsParse";

export interface RegNodeType {
  name: string;
  render: {
    draw: (action: RegisterContext) => Graphics | undefined;
    dynamicElement?: (val: any) => any;
  };
}
