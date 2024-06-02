import { useEffect, useRef } from "react";
import { EXTEND_NODE, NetaGraph, RendererType } from "../../core";

export function CvsSelectPage() {
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
      type: "cvsSelect",
      x: 50,
      y: 50,
    };

    appRef.current.addItem("node", model);
    appRef.current.render();
    // appRef.current.on("graphics:pointerdown", (evt) => {
    //   const isAnd = evt.container?._data?.data?.cate == "and";
    //   appRef.current.updateNodeData({
    //     id: evt.container.id,
    //     data: { cate: isAnd ? "or" : "and" },
    //   });
    // });
    return () => {
      appRef.current.destroy();
    };
  }, []);

  return <div id="dom" style={{ width: 800, height: 600 }}></div>;
}
