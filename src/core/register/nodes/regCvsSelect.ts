import { RegNodeType } from "../../types/register";


const andOrNode: RegNodeType = {
  name: "cvsSelect",
  render: {
    draw(action) {
      const initJson = action.inputProperties;
      action.addShape("rect", {
        x: 0,
        y: 0,
        width: 200,
        height: 40,
        style: {
          stroke: "#1296db",
          lineWidth: 2,
        },
      });
    },
    html: () => {
      return `<input style="width: 100%; height: 100%"></input>`
    }
  },
};

export default andOrNode;
