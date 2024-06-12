---
outline: deep
---

# 正交线

## Attrs

### Attrs.type
<pre>Straight</pre>



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
  }); 

    const model = {
      nodes: [
        {
          id: "node1",
          label: "node1",
          type: "rect",
          x: 200,
          y: 150,
          width: 100,
          height: 100,
        },
        {
          id: "node2",
          label: "node12",
          type: "rect",
          x: 400,
          y: 350,
          width: 100,
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
          anchorPoints: [[300, 400]],
        },
      ],
    };

    graph.read(model);


  graph.render();
})
</script>
