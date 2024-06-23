const headTitleNode = {
  name: "headTitle",
  render: {
    draw(action) {
      const initJson = action.inputProperties;
      console.log('initJson: ', initJson);
      const shapeWidth = initJson.width ?? 108

      const inputOutPadding = 8

      action.addShape("rect", {
        x: 0,
        y: 0,
        width: shapeWidth,
        height: 48,
        radius: 4,
        style: {
          stroke: "transparent",
          fill: '#F9DDB0'
        },
      });

      action.addShape("rect", {
        x: inputOutPadding,
        y: inputOutPadding,
        width: shapeWidth - inputOutPadding * 2,
        height: 32,
        style: {
          stroke: "#8C80A7",
          fill: 'transparent'
        },
      });

      
      action.addShape("circle", {
        x: shapeWidth,
        y: 0,
        radius: 5,
        style: {
          stroke: '#fff' ,
          fill: "#9E8BE1",
          lineWidth: 2,
        },
      })


    },
  },
};

export default headTitleNode;
