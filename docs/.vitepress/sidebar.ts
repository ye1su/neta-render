export const sidebar = [
  {
    text: "组件使用",
    items: [{ text: "快速入门", link: "/base-examples" }],
  },
  {
    text: "图配置(Graph)",
    items: [
      { text: "渲染", link: "/canvas/render.md" },
      { text: "视图", link: "/canvas/viewbox.md" },
      { text: "数据", link: "/canvas/data.md" },
      { text: "元素", link: "/canvas/element.md" },
      { text: "布局", link: "/canvas/layout.md" },
    ],
  },
  {
    text: "布局",
    items: [
      { text: "树 Tree", link: "/layout/tree.md" },
      { text: "层级 Dagre", link: "/layout/dagre.md" },
      { text: "力导向 Force", link: "/layout/force.md" },
    ],
  },
  {
    text: "节点",
    items: [
      {
        text: "内置节点",
        items: [
          { text: "矩形 rect", link: "/nodes/rectangle.md" },
          { text: "圆形 circle", link: "/nodes/circle.md" },
          { text: "椭圆 ellipse", link: "/nodes/ellipse.md" },
          { text: "图片 image", link: "/nodes/image.md" },
          { text: "多边形 polygon", link: "/nodes/polygon.md" },
        ],
      },
      {
        text: "自定义节点",
        items: [
          { text: "用户 userTask", link: "/nodes/reg-userTask" },
          { text: "且或 andOr", link: "/nodes/reg-andOr" },
        ],
      },
    ],
  },
  {
    text: "线",
    items: [
      {
        text: "内置线",
        items: [
          { text: "直线 straight", link: "/edges/straight.md" },
          { text: "正交线 orth", link: "/edges/orth.md" },
        ],
      },
    ],
  },
]