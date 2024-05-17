import { useEffect, useRef } from "react";
import { NetaGraph, RendererType } from "../../core";

export function EllipsePage() {
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
      type: "ellipse",
      x: 400,
      y: 200,
      radiusX: 200,
      radiusY: 100,
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
