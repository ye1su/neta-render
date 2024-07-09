const wheelCanvasMove = {
  name: "wheel-canvas-move",
  render: {
    getEvents() {
      return {
        "canvas:wheel": "onCanvasWheel",
      };
    },
    onCanvasWheel(event) {
      this.instance.renderer.updateCanvasTranslate(event.deltaX, event.deltaY);
    }
  },
};

export default wheelCanvasMove;
