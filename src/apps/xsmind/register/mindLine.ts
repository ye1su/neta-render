const mindLine = {
  name: "mind-line",
  render: {
    draw(action) {
      const config = action.inputProperties;
      // console.log('config: ', config);
      const sourceModel = config.sourceModel;

      const targetModel = config.targetModel;

      const startPoint = {
        x: sourceModel.x + sourceModel._computedWidth * 2,
        y: sourceModel.y + sourceModel._conputedHeight,
      };

      const endPoint = {
        x: targetModel.x,
        y: targetModel.y + targetModel._conputedHeight,
      };

      const xDist = endPoint!.x - startPoint!.x;
      const curvePosition = [1 / 2, 1 / 2];
      const curveOffset = [0, 0];

      const innerPoint1 = [
        startPoint!.x + xDist * curvePosition[0] + curveOffset[0],
        startPoint!.y,
      ];

      const innerPoint2 = [
        endPoint!.x - xDist * curvePosition[1] + curveOffset[1],
        endPoint!.y,
      ];

      const anchorPoints = [innerPoint1, innerPoint2];
      action.addEdge("BezierCurve", {
        ...config,
        anchorPoints,
      });
    },
  },
};

export default mindLine;
