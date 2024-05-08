import { useEffect, useRef } from "react";
import { NetaGraph, RendererType } from "../../core";

export function RectanglePage() {
  const appRef = useRef<NetaGraph>();
  useEffect(() => {
    appRef.current = new NetaGraph({
      rendererType: RendererType.Canvas,
      el: document.getElementById("dom")!,
      backgroundColor: "#fff",
    });

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

    appRef.current.addItem('node', model)
    appRef.current.render();

    return () => {
      appRef.current.destroy();
    };
  }, []);

  return (
    <div
      id="dom"
      style={{ border: "1px solid", width: 800, height: 600 }}
    ></div>
  );
}
