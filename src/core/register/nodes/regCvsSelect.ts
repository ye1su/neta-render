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
        height: 60,
        style: {
          stroke: "#1296db",
          lineWidth: 2,
        },
      });


    },
  },
};

export default andOrNode;
