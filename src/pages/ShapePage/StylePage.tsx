import { useEffect, useRef } from "react";
import { NetaGraph, RendererType } from "../../core";

export function StylePage() {
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
        fill: "#0DDE67",
        stroke: 'rgb(18, 150, 231)',
        lineWidth: 6,
        lineDash: [10, 5]
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
      style={{   width: 800, height: 600 }}
    ></div>
  );
}
