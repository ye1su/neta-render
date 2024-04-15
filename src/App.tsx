import { useEffect, useRef } from "react";
import "./App.css";
import { Application, Graphics, RendererType } from "./core";

function App() {
  const appRef = useRef<Application>();
  useEffect(() => {
    appRef.current = new Application({
      rendererType: RendererType.Canvas,
      el: document.getElementById("canvans")!,
      backgroundColor: "#ccc",
    });
    appRef.current.render();
  }, []);

  // useEffect(() => {
  //   // 测试代码
  //   const blackGraphic = new Graphics()
  //   blackGraphic.beginFill('black')
  //   blackGraphic.drawRect(0, 0, 300, 300)

  //   const redGraphic = new Graphics()
  //   redGraphic.beginFill('red')
  //   redGraphic.drawRect(0, 0, 200, 200)

  //   const container1 = new Container()
  //   container1.addChild(blackGraphic)
  //   container1.addChild(redGraphic)

  //   const container2 = new Container()
  //   container2.addChild(container1)

  //   const greenGraphic = new Graphics()
  //   greenGraphic.beginFill('green')
  //   greenGraphic.drawRect(150, 0, 180, 180)

  //   container2.addChild(greenGraphic)

  //   const yellowGraphic = new Graphics()
  //   yellowGraphic.beginFill('yellow')
  //   yellowGraphic.drawRect(0, 0, 250, 150)

  //   appRef.current?.stage.addChild(container2)
  //   appRef.current?.stage.addChild(yellowGraphic)
  //   console.log('appRef.current?.stage: ', appRef.current?.stage);

  //   appRef.current?.render()
  // }, [])

  // useEffect(() => {
  //   const graphic = new Graphics()
  //     .beginFill("red")
  //     .drawRect(100, 100, 100, 100)
  //     .beginFill("green")
  //     .drawCircle(100, 300, 100)
  //     .beginFill("pink")
  //     .drawEllipse(400, 200, 200, 100)
  //     .beginFill("brown")
  //     .drawRoundedRect(300, 400, 200, 100, 100)
  //     .beginFill("purple")
  //     .drawPolygon([
  //       600, 300, 700, 100, 700, 200, 1000, 100, 900, 400, 700, 600,
  //     ]);

  //   appRef.current?.stage.addChild(graphic);
  //   appRef.current?.render()
  // }, []);

  useEffect(() => {
    const quadraticBezierCurve = new Graphics();
    quadraticBezierCurve.lineStyle(1)
    quadraticBezierCurve.moveTo(100, 100);
    quadraticBezierCurve.quadraticCurveTo(100, 300, 300, 300);


    appRef.current?.stage.addChild(quadraticBezierCurve);

    // const bezierCurve = new Graphics()
    // bezierCurve.lineStyle(1)
    // bezierCurve.moveTo(400, 100)
    // bezierCurve.bezierCurveTo(600, 100, 600, 400, 800, 400)
    // appRef.current?.stage.addChild(bezierCurve)
    console.log("appRef.current: ", appRef.current);
    appRef.current?.render();
  }, []);

  // useEffect(() => {
  //   // arcTo测试代码

  //   const cir = new Graphics()
  //     .lineStyle(1, 'red')
  //     .moveTo(100, 100)
  //     .arcTo(300, 100, 200, 200, 80)

  //   appRef.current?.stage.addChild(cir)
  //   console.log("appRef.current: ", appRef.current);
  //   appRef.current?.render();
  // })

  return (
    <>
      <canvas
        id="canvans"
        width="1200"
        height="800"
        style={{ border: "1px solid" }}
      ></canvas>
    </>
  );
}

export default App;
