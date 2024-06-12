---
outline: deep
---

# 圆 Circle

## Attrs

### Attrs.type
<pre>circle</pre>

### Attrs.radius
圆的半径
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
    label: "circle",
    type: "circle",
    x: 200,
    y: 100,
    radius: 40,
    }]
  }

  graph.read(model1)
  graph.render();
})
</script>
