import { useEffect, useRef } from "react";
import { NetaGraph, RendererType } from "../../core";

export function PolygonPage() {
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
      type: "polygon",
      x: 200,
      y: 150,
      points: [0, 0, 100, 100, -100, 100],
    };

    appRef.current.addItem("node", model);
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
