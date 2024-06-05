import { useEffect, useRef } from "react";
import { EXTEND_NODE, NetaGraph, RendererType } from "../../core";
import neta from './neta.jpg'

export function ConditionPage() {
  const appRef = useRef<NetaGraph>();
  useEffect(() => {
    appRef.current = new NetaGraph({
      rendererType: RendererType.Canvas,
      el: document.getElementById("dom")!,
      backgroundColor: "#fff",
      register: [EXTEND_NODE.UserTask],
      layout: {
        type: 'tree'
      }
    });


    const model = {
      nodes: [
        {
          id: "node1",
          label: "node1",
          type: "andOr",
          x: 100,
          y: 100,
        },
        {
          id: "node12",
          label: "node1",
          type: "cvsInput",
          x: 200,
          y: 50,
        },
        {
          id: "node13",
          label: "node1",
          type: "cvsInput",
          x: 200,
          y: 150,
        }
      ],
      edges: [
        {
          source: 'node1',
          target: 'node12'
        },
        {
          source: 'node1',
          target: 'node13'
        }
      ]
    }

    appRef.current.read(model)
    appRef.current.render();

    return () => {
      appRef.current.destroy();
    };
  }, []);

  return <div id="dom" style={{ width: 800, height: 600 }}></div>;
}
