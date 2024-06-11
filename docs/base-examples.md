---
outline: deep
---

## 开始使用
可以通过 NPM 或 Yarn 等包管理器来安装。

```javascript
npm install neta-render
```
成功安装之后，可以通过 import 导入 Graph 对象。

```html
<div id="canvans"   style="width: 800px; height: 600px" ></div>
```

```javascript
import { NetaGraph } from 'neta-render'

const graph= new NetaGraph({
  rendererType: 'canvas',
  el: document.getElementById("canvans"),
  backgroundColor: "#ffe",
}); 

const model = {
  nodes: [{
  id: "node1",
  label: "node1",
  type: "rect",
  x: 200,
  y: 100,
  width: 100,
  height: 100,
  style: {
    fill: "#0DDE67",
  },
  }, {
    id: "node1",
    label: "node1",
    type: "circle",
    x: 400,
    y: 350,
    radius: 40,

  }]
}

graph.read(model)
graph.render();
```


## 示例
<div id="canvans"   style="width: 688px; height: 600px" ></div>

<script setup>
import { NetaGraph } from '../src/core'
import { onMounted } from 'vue'
onMounted(() => {

  const graph= new NetaGraph({
    rendererType: 'canvas',
    el: document.getElementById("canvans"),
    backgroundColor: "#ffe",
  }); 
    console.log('document.getElementById("canvans"): ', document.getElementById("canvans"));


  const model1 = {
    nodes: [{
    id: "node1",
    label: "node1",
    type: "rect",
    x: 200,
    y: 100,
    width: 100,
    height: 100,
    style: {
      fill: "#0DDE67",
    },
    }, {
      id: "node1",
      label: "node1",
      type: "circle",
      x: 400,
      y: 350,
      radius: 40,

    }]
  }

  graph.read(model1)
  graph.render();
  console.log('graph: ', graph);
})
</script>
