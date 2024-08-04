import { useEffect, useRef } from "react";
import { NetaGraph, RendererType } from "../../core";

export function RectanglePage() {
  const appRef = useRef<NetaGraph>();
  useEffect(() => {
    appRef.current = new NetaGraph({
      rendererType: RendererType.Canvas,
      el: document.getElementById("dom")!,
      backgroundColor: "#fff",
      behaviors: ['drag-all', 'contextMenu'],
    });

    const model = {
      id: "node1",
      label: "node1",
      type: "rect",
      x: 200,
      y: 150,
      width: 100,
      height: 100,
      style: {
        fill: "#0DDE67",
      },
    };

    appRef.current.addItem('node', model)

    const model2 = {
      id: "node1",
      label: "node1",
      type: "rect",
      x: 400,
      y: 350,
      width: 140,
      height: 100,
      radius: 20,
      style: {
        fill: "blue",
      },
    };

    appRef.current.addItem('node', model2)
    appRef.current.render();

    return () => {
      appRef.current.destroy();
    };
  }, []);

  return (
    <div
      id="dom"
      style={{   width: 800, height: 600 }}
    ></div>
  );
}
