---
outline: deep
---

# 用户节点

## Attrs

### Attrs.type
<pre>userTask</pre>


## 注册
```javascript
const userTaskNode = {
  name: "userTask",
  render: {
    draw(action) {
      const initJson = action.inputProperties;
      action.addShape("rect", {
        x: 0,
        y: 0,
        width: 100,
        height: 80,
        style: {
          stroke: "#1296db",
          lineWidth: 2,
        },
      });
      action.addShape("image", {
        src: userIcon,
        x: 10,
        y: 10,
        width: 20,
        height: 20,
      });
    },
  },
};

```


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
    nodes: [ { id: "node1",
      label: "userTask",
      type: "userTask",
      x: 200,
      y: 100,}]
  }

  graph.read(model1)
  graph.render();

})
</script>
