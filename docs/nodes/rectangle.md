---
outline: deep
---

# 矩形 Rect

## Attrs

### Attrs.type
<pre>rect</pre>

### Attrs.width
矩形的宽
<pre>number</pre>

### Attrs.height
矩形的高
<pre>number</pre>

### Attrs.radius
矩形的边角弧度
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
    label: "rect",
    type: "rect",
    x: 100,
    y: 100,
    width: 200,
    height: 100,

    },{
      id: "node2",
      label: "rect",
      type: "rect",
      x: 400,
      y: 100,
      width: 200,
      height: 100,
      radius: 10,
  
    }]
  }

  graph.read(model1)
  graph.render();
})
</script>
