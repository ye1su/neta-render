import { useEffect, useRef } from "react";
import { NetaGraph, RendererType } from "../../core";

export function CirclePage() {
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
      type: "circle",
      x: 200,
      y: 150,
      radius: 20,
      // style: {
      //   fill: "blue",
      // },
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
      style={{  width: 800, height: 600 }}
    ></div>
  );
}
