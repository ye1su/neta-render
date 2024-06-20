const headTitleNode = {
  name: "headTitle",
  render: {
    draw(action) {
      const initJson = action.inputProperties;

      action.addShape("rect", {
        x: 0,
        y: 0,
        width: 108,
        height: 48,
        radius: 4,
        style: {
          stroke: "transparent",
          fill: '#F9DDB0'
        },
      });

      action.addShape("rect", {
        x: 8,
        y: 8,
        width: 92,
        height: 32,
        style: {
          stroke: "#8C80A7",
        },
      });


    },
  },
};

export default headTitleNode;
