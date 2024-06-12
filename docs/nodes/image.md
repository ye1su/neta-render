---
outline: deep
---

# 图片 Image

## Attrs

### Attrs.type
<pre>image</pre>

### Attrs.src
图片地址
<pre>number</pre>

### Attrs.width
图片的宽
<pre>number</pre>

### Attrs.height
图片的高
<pre>number</pre>





## 示例
<div id="canvans"   style="width: 688px; height: 300px" ></div>

<script setup>
import { NetaGraph } from '../../src/core'
import { onMounted } from 'vue'
import neta from '../public/neta.jpg'
onMounted(() => {

  const graph= new NetaGraph({
    rendererType: 'canvas',
    el: document.getElementById("canvans"),
    backgroundColor: "#ffe",
  }); 

  const model1 = {
    nodes: [{
      id: "node1",
      label: "node1",
      type: "image",
      src: neta,
      x: 100,
      y: 50,
      width: 200,
      height: 180,
    }]
  }

  graph.read(model1)
  graph.render();
})
</script>
