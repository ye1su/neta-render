import { useEffect, useRef } from "react";
import { EXTEND_NODE, NetaGraph, RendererType } from "../../core";
import neta from "./neta.jpg";

export function AndOrPage() {
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
      type: "andOr",
      data: {
        cate: "and",
      },
      x: 50,
      y: 50,
    };

    appRef.current.addItem("node", model);
    appRef.current.render();
    appRef.current.on("graphics:pointerdown", (evt) => {
      console.log("evt: ", evt);
      appRef.current.updateNodeData({
        id: evt.container.id,
        data: { cate: "or" },
      });
    });
    return () => {
      appRef.current.destroy();
    };
  }, []);

  return <div id="dom" style={{ width: 800, height: 600 }}></div>;
}
