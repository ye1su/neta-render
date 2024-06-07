

import { useEffect, useRef } from "react";
import { EXTEND_NODE, NetaGraph, RendererType } from "../../core";
import neta from "./neta.jpg";

const data = {
  nodes: [
    {
      id: '1',
      label: 'Company1',
    },
    {
      id: '2',
      label: 'Company2',
    },
    {
      id: '3',
      label: 'Company3',
    },
    {
      id: '4',
      label: 'Company4',
    },
    {
      id: '5',
      label: 'Company5',
    },
    {
      id: '6',
      label: 'Company6',
    },
    {
      id: '7',
      label: 'Company7',
    },
    {
      id: '8',
      label: 'Company8',
    },
    {
      id: '9',
      label: 'Company9',
    },
    {
      id: '10',
      label: 'Company10',
    },
    {
      id: '11',
      label: 'Company11',
    },
    {
      id: '12',
      label: 'Company12',
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '1',
      target: '3',
    },
    {
      source: '2',
      target: '5',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '4',
      target: '7',
    },
    {
      source: '1',
      target: '8',
    },
    {
      source: '1',
      target: '9',
    },
    {
      source: '5',
      target: '10',
    },
    {
      source: '5',
      target: '11',
    },
    {
      source: '3',
      target: '12',
    },
  ],
};

export function TreePage() {
  const appRef = useRef<NetaGraph>();
  useEffect(() => {
    appRef.current = new NetaGraph({
      rendererType: RendererType.Canvas,
      el: document.getElementById("dom")!,
      backgroundColor: "#fff",
      layout: {
        type: "tree",
      },
    });

    const model = data
    appRef.current.read(model);
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

