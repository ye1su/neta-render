---
outline: deep
---

## graph.render 
根据this.stage进行渲染
```javascript
graph.render()
```

## graph.frameRender
逐帧渲染（暂时废弃⚠️）
```javascript
graph.frameRender()
```

## graph.layoutRender
根据布局进行render，如果没有根据node的x y
```javascript
graph.layoutRender(nodes, edges)
```

## graph.refresh
刷新所有节点并进行渲染
```javascript
graph.refresh()
```

## graph.destroy
销毁画布
```javascript
graph.destroy()
```

