import { RegisterContext } from "../graphics/GraphicsParse"


export interface RegNodeType {
  name: string
  render: {
    draw: (action: RegisterContext) => void
  }
}