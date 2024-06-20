
const mindSelectNode = {
  name: "mind-select-node",
  render: {
    id: null,
    renderContainer: null,
    init() {},
    destroy() {},
    getEvents() {
      return {
        "graphics:pointerdown": "onPointerDown",
      };
    },
    onPointerDown(evt) {
      console.log('evt: ', evt);
  
    },

  },
};

export default mindSelectNode;
