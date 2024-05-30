import { RegNodeType } from "../../types/register";

enum CATE {
  AND = "and",
  OR = "or",
}

const andOrNode: RegNodeType = {
  name: "andOr",
  render: {
    draw(action) {
      const initJson = action.inputProperties;
      console.log("initJson: ", initJson);
      action.addShape("circle", {
        x: 0,
        y: 0,
        radius: 20,
        style: {
          stroke: "#1296db",
          lineWidth: 2,
        },
      });

      action.addShape("text", {
        x: -8,
        y: 4,
        text: initJson.data?.cate == CATE.AND ? "且" : "或",
        style: {
          fill: "#1296db",
        },
      });
    },
  },
};

export default andOrNode;
