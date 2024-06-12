---
outline: deep
---

# 直线

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
    id: "node1",
    label: "node1",
    type: "rect",
    x: 200,
    y: 250,
    width: 100,
    height: 100,
    style: {
      fill: "blue",
    },
  };
  graph.addItem("node", model);
  const model2 = {
    id: "node2",
    label: "node12",
    type: "rect",
    x: 400,
    y: 100,
    width: 100,
    height: 100,
    style: {
      fill: "blue",
    },
  };
  graph.addItem("node", model2);

  const edge1 = {
    id: "edge1",
    label: "edge",
    source: "node1",
    target: "node2",
    type: "Straight",

  };
  graph.addItem("edge", edge1);

  graph.render();
})
</script>
