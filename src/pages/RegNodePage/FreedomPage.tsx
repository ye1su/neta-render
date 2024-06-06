import { useEffect, useRef } from "react";
import { EXTEND_NODE, NetaGraph, RendererType } from "../../core";
import { Input } from "antd";

function TestInput(props) {
  console.log("props: ", props);
  return (
    <Input
      value={props.config.text}
      onChange={(e) => {
        console.log("val: ", e.target.value);
        props.ctx.updateNodeData({
          id: props.config.id,
          text: e.target.value,
        });
      }}
      placeholder="请输入"
    ></Input>
  );
}

export function FreedomPage() {
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
      type: "freedom",
      x: 50,
      y: 50,
      vDom: TestInput,
    };

    appRef.current.addItem("node", model);
    appRef.current.render();

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
