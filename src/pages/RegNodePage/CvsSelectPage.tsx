import { useEffect, useRef } from "react";
import { EXTEND_NODE, NetaGraph, RendererType } from "../../core";
import { Tree } from "../../core/layout/tree/Tree";

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
      type: "cvsInput",
      x: 50,
      y: 50,
    };

    appRef.current.addItem("node", model);
    appRef.current.render();
    appRef.current.on("graphics:pointerdown", (evt) => {


    });


    const tree = {
      id: 'xxx',
      children: [
        {
          id: '22'
        },
        {
          id: '33'
        }
      ]
    }

    // const result = initializeNode(tree, null,  0, 0, 0, 0)
    const result = new Tree(tree)
    result.layout()
    console.log('result: ', result);

    return () => {
      appRef.current.destroy();
    };
  }, []);

  return (
    <div
      id="dom"
      style={{ width: 800, height: 600, position: "relative" }}
    ></div>
  );
}
