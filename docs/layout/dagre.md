---
outline: deep
---

# 层级布局  Dagre

## Attrs

### Attrs.type
```text
dagre
```

## Options

### Options.rankdir
<p>渲染方向 </p>

**值为**  string   `"tb" | "bt" | "lr" | "rl"`


### Options.nodesep
<p>节点间距 </p>

**值为**     nunber   `50`

### Options.ranksep
<p>层级间距 </p>

**值为**     nunber   `10`



## 示例
<div id="canvans"   style="width: 688px; height: 600px" ></div>

<script setup>
import { NetaGraph } from '../../src/core'
import { onMounted } from 'vue'
onMounted(() => {

  const graph= new NetaGraph({
    rendererType: 'canvas',
    el: document.getElementById("canvans"),
    backgroundColor: "#ffe",
    layout: {
      type: 'dagre',
    },
  }); 

  const model = {
    nodes: [
      {
        id: "1",
        label: "Company1",
      },
      {
        id: "2",
        label: "Company2",
      },
      {
        id: "3",
        label: "Company3",
      },
      {
        id: "4",
        label: "Company4",
      },
      {
        id: "5",
        label: "Company5",
      },
      {
        id: "6",
        label: "Company6",
      },
      {
        id: "7",
        label: "Company7",
      },
      {
        id: "8",
        label: "Company8",
      },
      {
        id: "9",
        label: "Company9",
      },
      {
        id: "10",
        label: "Company10",
      },
      {
        id: "11",
        label: "Company11",
      },
      {
        id: "12",
        label: "Company12",
      },
    ],
    edges: [
      {
        source: "1",
        target: "2",
      },
      {
        source: "1",
        target: "3",
      },
      {
        source: "2",
        target: "5",
      },
      {
        source: "5",
        target: "6",
      },
      {
        source: "3",
        target: "4",
      },
      {
        source: "4",
        target: "7",
      },
      {
        source: "1",
        target: "8",
      },
      {
        source: "1",
        target: "9",
      },
      {
        source: "5",
        target: "10",
      },
      {
        source: "5",
        target: "11",
      },
      {
        source: "3",
        target: "12",
      },
    ],
  }

  graph.read(model)
  graph.render();
})
</script>
