import { RegNodeType } from "../../types/register";

const andOrNode: RegNodeType = {
  name: "cvsInput",
  render: {
    draw(action) {
      const initJson = action.inputProperties;
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
    html: ({ config }) => {
      return `<input  style="width: 100%; height: 100%" text=${config.text ?? ''}></input>`;
    },
  },
};

export default andOrNode;
