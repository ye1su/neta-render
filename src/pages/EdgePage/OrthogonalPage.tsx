import { useEffect, useRef } from "react";
import { NetaGraph, RendererType } from "../../core";

export function OrthogonalPage() {
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
          wdith: 100,
          height: 100,
        },
        {
          id: "node2",
          label: "node12",
          type: "rect",
          x: 400,
          y: 300,
          wdith: 100,
          height: 100,
        },

        {
          id: "node2",
          label: "node12",
          type: "rect",
          x: 600,
          y: 400,
          wdith: 100,
          height: 100,
        },
      ],
      edges: [
        {
          id: "edge1",
          label: "edge",
          source: "node1",
          target: "node2",
          type: "Orthogonal",
          anchorPoints: [
            [300, 400],
          ],
        },
      ],
    };


    appRef.current.read(model);

    return () => {
      console.log("destroy");
      appRef.current.destroy();
    };
  }, []);

  return (
    <>
      <div
        id="dom"
        style={{ border: "1px solid", width: 800, height: 600 }}
      ></div>
    </>
  );
}
