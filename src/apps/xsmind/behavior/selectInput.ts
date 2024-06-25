
const mindSelectNode = {
  name: "mind-select-node",
  render: {
    currentShape: null,
    init() {},
    destroy() {},
    getEvents() {
      return {
        "graphics:pointerdown": "onPointerDown",
        "graphics:pointermove": "onPointerMove",
        "graphics:pointerup": "onPointerUp",
      };
    },
    onPointerDown(evt) {
      console.log('evt: ', evt);
      console.log('this:====== ', this);
      const originThis = this.originThis
      console.log('originThis: ', originThis);

      
    },
    onPointerMove(evt) {

    },
    onPointerUp(evt) {

    }

  },
};

export default mindSelectNode;
