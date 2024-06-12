---
outline: deep
---

# 椭圆 Ellipse

## Attrs

### Attrs.type
<pre>ellipse</pre>

### Attrs.radiusX
X轴方向的半径
<pre>number</pre>

### Attrs.radiusY
Y轴方向的半径
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
    label: "ellipse",
    type: "ellipse",
      x: 200,
      y: 100,
      radiusX: 200,
      radiusY: 100,
    }]
  }

  graph.read(model1)
  graph.render();
})
</script>
