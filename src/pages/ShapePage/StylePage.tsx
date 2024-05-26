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
      width: 100,
      height: 100,
      style: {
        fill: "#0DDE67",
        stroke: 'rgb(18, 150, 231)',
        lineWidth: 1,
        // lineDash: [10, 5],
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowBlur: 4,
        shadowOffsetX: 6,
        shadowOffsetY: 6
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
