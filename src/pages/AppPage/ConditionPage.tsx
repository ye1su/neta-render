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
    });

    const model = {
      id: "node1",
      label: "node1",
      type: "userTask",
      x: 20,
      y: 20,
    };

    appRef.current.addItem("node", model);
    appRef.current.render();

    return () => {
      appRef.current.destroy();
    };
  }, []);

  return <div id="dom" style={{ width: 800, height: 600 }}></div>;
}
