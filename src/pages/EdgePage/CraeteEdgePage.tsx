import { useEffect, useRef } from "react";
import { NetaGraph, RendererType } from "../../core";

export function CraeteEdgePage() {
  const appRef = useRef<NetaGraph>();
  useEffect(() => {
    appRef.current = new NetaGraph({
      rendererType: RendererType.Canvas,
      el: document.getElementById("dom")!,
      backgroundColor: "#fff",
    });

    const model = {
      nodes: [
        {
          id: "node1",
          label: "node1",
          type: "rect",
          x: 200,
          y: 150,
          width: 100,
          height: 100,
          anchor: true,
        },
        {
          id: "node2",
          label: "node12",
          type: "rect",
          x: 400,
          y: 300,
          width: 100,
          height: 100,
          anchor: true,
        },

      ],
      edges: [

      ],
    };

    appRef.current.read(model);

    return () => {
      appRef.current.destroy();
    };
  }, []);

  return (
    <>
      <div id="dom" style={{ width: 800, height: 600 }}></div>
    </>
  );
}
