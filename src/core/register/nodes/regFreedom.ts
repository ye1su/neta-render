import { RegNodeType } from "../../types/register";

const freedomNode: RegNodeType = {
  name: "freedom",
  render: {
    draw(action) {
      const initJson = action.inputProperties;
      console.log("initJson: ", initJson);
      freedomNode.render.html =  initJson.vDom;
      action.addShape("rect", {
        x: 0,
        y: 0,
        width: 160,
        height: 36,
        style: {
          stroke: "#1296db",
          lineWidth: 2,
        },
      });
      action.addShape("text", {
        x: 4,
        y: 22,
        text: initJson.text,
        style: {
          fill: "#000",
          textAlign: "center",
          textBaseline: "middle",
        },
      });
    },
  },
};

export default freedomNode;
