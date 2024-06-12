---
outline: deep
---

# 多边形 Polygon

## Attrs

### Attrs.type
<pre>polygon</pre>

### Attrs.points
多边形的顶点
<pre>number</pre>




## 示例
<div id="canvans"   style="width: 688px; height: 300px" ></div>

<script setup>
import { NetaGraph } from '../../src/core'
import { onMounted } from 'vue'
onMounted(() => {

  const graph= new NetaGraph({
    rendererType: 'canvas',
    el: document.getElementById("canvans"),
    backgroundColor: "#ffe",
  }); 

  const model1 = {
    nodes: [{
    id: "node1",
    label: "polygon",
    type: "polygon",
    x: 200,
    y: 100,
    points: [0, 0, 100, 100, -100, 100],
    }]
  }

  graph.read(model1)
  graph.render();
})
</script>
