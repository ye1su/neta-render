const headTitleNode = {
  name: "headTitle",
  render: {
    draw(action) {
      const initJson = action.inputProperties;
      action.addShape("rect", {
        x: 0,
        y: 0,
        width: 100,
        height: 80,
        style: {
          stroke: "#1296db",
          lineWidth: 2,
        },
      });

    },
  },
};

export default headTitleNode;
