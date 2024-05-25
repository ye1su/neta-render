const userTaskNode = {
  name: "userTask",
  render: {
    draw(action) {
      console.log("action: ", action);
      const initJson = action.inputProperties;
      action.addShape("rect", {
        ...initJson,
        x: 0,
        y: 0,
      });
      action.addShape("image", {
        ...initJson,
        x: 20,
        y: 20,
        wdith: 40,
        height: 40,
      });
    },
  },
};

export default userTaskNode;
