const headTitleNode = {
  name: "headTitle",
  render: {
    draw(action) {
      const initJson = action.inputProperties;
      // console.log("initJson: ", initJson);
      const shapeWidth = initJson.width ?? 108;
      const shapeHeight = 48;
      const inputOutPadding = 8

      const nodeState = initJson.nodeState ?? [];
      const isSelect = nodeState.find((item) => item == "select");
      const isHover = nodeState.find((item) => item == "hover");
      const isInput = nodeState.find((item) => item == "input");

      const currentShape = action.addShape("rect", {
        x: 0,
        y: 0,
        width: shapeWidth,
        height: shapeHeight,
        // radius: 4,
        style: getBaseRectStyle({ isSelect, isHover }),
      });

      if(isInput) {
        action.addShape("rect", {
          x: inputOutPadding,
          y: inputOutPadding,
          width: shapeWidth - inputOutPadding * 2,
          height: 32,
          style: {
            stroke: "#8C80A7",
            fill: "transparent",
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

      return currentShape
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
