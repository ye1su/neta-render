import userIcon from "../imgs/user.svg";

const userTaskNode = {
  name: "userTask",
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
      action.addShape("image", {
        src: userIcon,
        x: 10,
        y: 10,
        width: 20,
        height: 20,
      });
    },
  },
};

export default userTaskNode;
