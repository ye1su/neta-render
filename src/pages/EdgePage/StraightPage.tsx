import { useEffect, useRef } from "react";
import { NetaGraph, RendererType } from "../../core";

export function StraightPage() {
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
      wdith: 100,
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
      wdith: 100,
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
      type: "Straight",
      anchorPoints: [
        [100, 300],
        [200, 100],
      ],
    };
    appRef.current.addItem("edge", edge1);

    appRef.current.render();

    return () => {
      console.log("destroy");
      appRef.current.destroy();
    };
  }, []);

  return (
    <>
      <div id="dom" style={{ width: 800, height: 600 }}></div>
    </>
  );
}
