---
outline: deep
---

# 且或节点

## Attrs

### Attrs.type
<pre>andOr</pre>


## 注册
```javascript
enum CATE {
  AND = "and",
  OR = "or",
}

const andOrNode: RegNodeType = {
  name: "andOr",
  render: {
    draw(action) {
      const initJson = action.inputProperties;
      action.addShape("circle", {
        x: 0,
        y: 0,
        radius: 20,
        style: {
          stroke: "#1296db",
          lineWidth: 2,
        },
      });

      action.addShape("text", {
        x: -8,
        y: 4,
        text: initJson.data?.cate == CATE.AND ? "且" : "或",
        style: {
          fill: "#1296db",
        },
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
      label: "andOr",
      type: "andOr",
      data: {
        cate: "and",
      },
      x: 50,
      y: 50,
    }]
  }

  graph.read(model1)
  graph.render();
  graph.on("graphics:pointerdown", (evt) => {
    const isAnd = evt.container?._data?.data?.cate == "and";
    graph.updateNodeData({
      id: evt.container.id,
      data: { cate: isAnd ? "or" : "and" },
    });
  });

})
</script>
