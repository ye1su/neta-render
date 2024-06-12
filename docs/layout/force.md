---
outline: deep
---

# 力导布局  Force

## Attrs

### Attrs.type
```text
force
```

## Options




## 示例
<div id="canvans"   style="width: 688px; height: 600px" ></div>

<script setup>
import { NetaGraph } from '../../src/core'
import { BASE_MODEL } from '../mock'
import { onMounted } from 'vue'
onMounted(() => {

  const graph= new NetaGraph({
    rendererType: 'canvas',
    el: document.getElementById("canvans"),
    backgroundColor: "#ffe",
    layout: {
      type: "force",
    },
  }); 

  graph.read(BASE_MODEL)
  graph.render();
})
</script>
