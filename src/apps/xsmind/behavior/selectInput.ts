
const mindSelectNode = {
  name: "mind-select-node",
  render: {
    init() {},
    destroy() {},
    getEvents() {
      return {
        "graphics:pointerdown": "onPointerDown",
      };
    },
    onPointerDown(evt) {
      console.log('evt: ', evt);
      console.log('this:====== ', this);
      
    },

  },
};

export default mindSelectNode;
