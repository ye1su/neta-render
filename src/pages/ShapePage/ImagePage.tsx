import { useEffect, useRef } from "react";
import { NetaGraph, RendererType } from "../../core";
import neta from './neta.jpg'

export function ImagePage() {
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
      type: "image",
      src: neta,
      x: 200,
      y: 150,
      width: 200,
      height: 180,
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
