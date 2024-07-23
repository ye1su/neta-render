import { autoFixWrap } from "../../../core/utils";

const headTitleNode = {
  name: "headTitle",
  render: {
    draw(action) {
      const initJson = action.inputProperties;
      const shapeWidth = initJson.width ?? 130;
      const inputOutPadding = 12;
      const _fontSize = 24

      // 状态
      const nodeState = initJson.nodeState ?? [];
      const isSelect = nodeState.find((item) => item == "select");
      const isHover = nodeState.find((item) => item == "hover");
      const isInput = nodeState.find((item) => item == "input");

      // 转换成新的text
      const _text = initJson?.text ?? "";
      const innerWidth = shapeWidth - inputOutPadding * 2;
      const { text: fixText, length: lineLen} = autoFixWrap(_text, innerWidth, {
        size: _fontSize,
        family: "monospace",
      })

      // 计算text 的height
      const textHeight = _fontSize * 1.5 * (lineLen || 1) 

      // 加上padding 为box的高度
      const shapeHeight = textHeight + inputOutPadding * 2


      const currentShape = action.addShape("rect", {
        x: 0,
        y: 0,
        width: shapeWidth,
        height: shapeHeight,
        // radius: 4,
        style: getBaseRectStyle({ isSelect, isHover }),
      });

      if (isInput) {
        // action.addShape("rect", {
        //   x: inputOutPadding,
        //   y: inputOutPadding,
        //   width: shapeWidth - inputOutPadding * 2,
        //   height: 32,
        //   style: {
        //     stroke: "#8C80A7",
        //     fill: "transparent",
        //   },
        // });
      }

      if (!isInput) {

        action.addShape("text", {
          x: inputOutPadding + 2,
          y: inputOutPadding + 2,
          text: fixText,
          style: {
            fill: "#595959",
            fontSize: 24,
            textBaseline: "middle",
            textLineHight: 1.5,
          },
        });
      }

      if (isHover) {
        action.addShape("rect", {
          x: shapeWidth,
          y: shapeHeight / 2 - 4,
          width: 16,
          height: 6,
          style: {
            stroke: "transparent",
            fill: "#8C80A7",
          },
        });

        action.addShape("circle", {
          x: shapeWidth + 16,
          y: shapeHeight / 2 - 2,
          name: "expand-circle",
          radius: 8,
          style: {
            stroke: "transparent",
            fill: "#8C80A7",
          },
        });
      }

      if (isSelect) {
        action.addShape("circle", {
          name: "drag-pointer",
          x: shapeWidth,
          y: 0,
          radius: 5,
          style: {
            stroke: "#fff",
            fill: "#9E8BE1",
            lineWidth: 2,
          },
        });
      }

      return currentShape;
    },
    dynamicElement: ({ config }) => {
      return {
        eleType: "textarea",
        style: {
          // border: "none",
          background: "transparent",
          minHeight: "1.5em" /* 初始高度设为一行的高度 */,
          lineHeight: "1.5em" /* 每行的高度 */,
          padding: 0,
          outline: "none",
          resize: "none" /* 禁用调整大小 */,
          width: "100%" /* 可选：使 textarea 占满父容器的宽度 */,
        },
        text: config.text ?? "",
      };
    },
  },
};

function getBaseRectStyle({ isSelect, isHover }) {
  let syl: Record<string, any> = {
    fill: "#F9DDB0",
    stroke: "transparent",
  };

  if (isHover) {
    syl = {
      ...syl,
      lineWidth: 0,
    };
  }

  if (isSelect) {
    syl = {
      ...syl,
      stroke: "#e7e6f8",
      lineWidth: 4,
    };
  }

  return syl;
}

export default headTitleNode;
