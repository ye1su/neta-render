import React from "react";
import { useEffect, useRef } from "react";
import { NetaGraph, RendererType } from "../../core";

function DagrePage() {
  const appRef = useRef<NetaGraph>();
  useEffect(() => {
    appRef.current = new NetaGraph({
      rendererType: RendererType.Canvas,
      el: document.getElementById("dom")!,
      backgroundColor: "#fff",
      layout: {
        type: 'dagre'
      }
    });

    const model = {
      nodes: [
        {
          id: "node1",
          label: "node1",
          type: "circle",
          x: 200,
          y: 150,
          radius: 40,
        },
        {
          id: "node2",
          label: "node12",
          type: "circle",
          x: 400,
          y: 300,
          radius: 40,
        },

        {
          id: "node3",
          label: "node12",
          type: "circle",
          x: 600,
          y: 400,
          radius: 40,
        },
      ],
      edges: [
        {
          id: "edge1",
          label: "edge",
          source: "node1",
          target: "node2",
          type: "Straight",
        },
        {
          id: "edge2",
          label: "edge",
          source: "node1",
          target: "node3",
          type: "Straight",
        },
      ],
    };

    appRef.current.read(model);
    appRef.current.render();

    appRef.current.fitView()

    return () => {
      console.log("destroy");
      appRef.current.destroy();
    };
  }, []);

  return (
    <>
      <div id="dom" style={{ width: 800, height: 600 }}></div>
    </>
  );
}

export default DagrePage;
