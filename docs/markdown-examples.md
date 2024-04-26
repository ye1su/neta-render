# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

# HTML 页面示例

<h1>Hello, HTML!</h1>

<p>This is a simple HTML page written in Markdown.</p>

<canvas id="canvans" width="800" height="400"  style="border:1px solid" ></canvas>

<script setup>
import { NetaGraph } from '../src/core'
import { onMounted } from 'vue'
console.log('onMounted: ', onMounted);
onMounted(() => {

  const graph= new NetaGraph({
    rendererType: 'canvas',
    el: document.getElementById("canvans"),
    backgroundColor: "#fff",
  }); 

  const model = {
    id: 'node1',
    label: 'node1',
    x: 200,
    y: 150,
    style: {
      fill: 'blue',
    },
  };
  graph.addItem('node', model)
  graph.render();
})
</script>
