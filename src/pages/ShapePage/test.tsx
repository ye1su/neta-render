import { useEffect, useRef } from "react";
import { NetaGraph, Container, Graphics, RendererType } from "../../core";

export function RectanglePage() {
  const appRef = useRef<NetaGraph>();
  useEffect(() => {
    appRef.current = new NetaGraph({
      rendererType: RendererType.Canvas,
      el: document.getElementById("dom")!,
      backgroundColor: "#fff",
    });
    // appRef.current.render();

    const model = {
      id: "node1",
      label: "node1",
      type: "rect",
      x: 200,
      y: 150,
      width: 100,
      height: 100,
      style: {
        fill: "blue",
      },
    };
    appRef.current.addItem("node", model);
    const model2 = {
      id: "node2",
      label: "node12",
      type: "rect",
      x: 400,
      y: 150,
      width: 100,
      height: 100,
      style: {
        fill: "blue",
      },
    };
    appRef.current.addItem("node", model2);

    const edge1 = {
      id: "edge1",
      label: "edge",
      source: "node1",
      target: "node2",
      type: "BezierCurve",
      anchorPoints: [
        [100, 300],
        [200, 100],
      ],
    };
    appRef.current.addItem("edge", edge1);
    // appRef.current.addItem('node', rectModel)
    appRef.current.render();

    return () => {
      console.log("destroy");
      appRef.current.destroy();
    };
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

  // useEffect(() => {
  //   const quadraticBezierCurve = new Graphics();
  //   quadraticBezierCurve.lineStyle(1);
  //   quadraticBezierCurve.moveTo(100, 100);
  //   quadraticBezierCurve.quadraticCurveTo(100, 300, 300, 300);

  //   appRef.current?.stage.addChild(quadraticBezierCurve);

  //   const bezierCurve = new Graphics();
  //   bezierCurve.lineStyle(1);
  //   bezierCurve.moveTo(400, 100);
  //   bezierCurve.bezierCurveTo(600, 100, 600, 400, 800, 400);
  //   appRef.current?.stage.addChild(bezierCurve);

  //   appRef.current?.render();
  // }, []);

  // useEffect(() => {
  //   // arcTo测试代码

  //   const path = new Graphics()
  //     .lineStyle(3, "purple")
  //     .beginFill("pink", 0.6)
  //     .moveTo(100, 100)
  //     .lineTo(300, 100)
  //     .arc(300, 300, 200, Math.PI * 1.5, Math.PI * 2)
  //     .bezierCurveTo(500, 400, 600, 500, 700, 500)
  //     .lineTo(600, 300)
  //     .arcTo(700, 100, 800, 300, 150)
  //     .quadraticCurveTo(900, 100, 1100, 200)
  //     .closePath();

  //   appRef.current?.stage.addChild(path);
  //   console.log("appRef.current: ", appRef.current);
  //   appRef.current?.render();
  // });

  // useEffect(() => {
  //   const c = new Container();
  //   const redRect = new Graphics()
  //     .beginFill("red")
  //     .drawRect(400, 300, 200, 200)
  //     .on("click", () => {
  //       alert('点击了红色的矩形')
  //     });
  //   c.addChild(redRect);
  //   const bluePoly = new Graphics()
  //     .beginFill("blue", 0.7)
  //     .moveTo(100, 200)
  //     .lineTo(400, 0)
  //     .lineTo(1000, 300)
  //     .lineTo(900, 600)
  //     .closePath()
  //     .on("click", () => {
  //       alert('点击了蓝色的多边形')
  //     });
  //   c.addChild(bluePoly);

  //   const path = new Graphics()
  //     .lineStyle(3, "purple")
  //     .beginFill("pink", 0.6)
  //     .moveTo(100, 100)
  //     .lineTo(300, 100)
  //     .arc(300, 300, 200, Math.PI * 1.5, Math.PI * 2)
  //     .bezierCurveTo(500, 400, 600, 500, 700, 500)
  //     .lineTo(600, 300)
  //     .arcTo(700, 100, 800, 300, 150)
  //     .quadraticCurveTo(900, 100, 1100, 200)
  //     .closePath()
  //     .on("click", () => {
  //       alert('点击了粉色的多边形')
  //     });

  //   const greenCircle = new Graphics()
  //     .beginFill("green")
  //     .drawCircle(200, 400, 200)
  //     .on("click", () => {
  //       alert('点击了绿色的圆')
  //     });

  //   appRef.current.stage.addChild(c);
  //   appRef.current.stage.addChild(path);
  //   appRef.current.stage.addChild(greenCircle);

  //   appRef.current?.render();
  // }, []);

  // useEffect(() => {
  //   const g = new Graphics()
  //     .beginFill("red")
  //     .drawRect(100, 50, 100, 100)
  //   g.cursor = "pointer";
  //   g.scale.set(0.3, 0.8);
  //   g.position.set(100, 50);
  //   appRef.current.stage.addChild(g);
  //   console.log("appRef.current: ", appRef.current);
  //   appRef.current?.render();

  //   let dragging = false;
  //   let startPoint = new Point(g.x, g.y);
  //   let mouseDownPoint = new Point(0, 0);
  //   g.addEventListener("mousedown", (e) => {
  //     console.log("e: -------", e);
  //     dragging = true;
  //     mouseDownPoint = e.global.clone();
  //     startPoint = new Point(g.x, g.y);
  //     console.log("startPoint: ", startPoint);
  //   });
  //   appRef.current.stage.hitArea = new Rectangle(0, 0, width, height);
  //   appRef.current.stage.addEventListener("mousemove", (e) => {

  //     if (!dragging) {
  //       return;
  //     }

  //     const newP = e.global.clone();
  //     const diffX = newP.x - mouseDownPoint.x;
  //     const diffY = newP.y - mouseDownPoint.y;
  //     g.position.set(startPoint.x + diffX, startPoint.y + diffY);
  //     appRef.current?.render();
  //   });
  //   appRef.current.stage.addEventListener("mouseup", (e) => {
  //     dragging = false;
  //   });
  // }, []);

  return (
    <>
      <div
        id="dom"
        style={{   width: 800, height: 600 }}
      ></div>
    </>
  );
}
