// 节点类
export class TreeNode {
  // 存放节点数据
  public data: any;

  // 父节点
  public parent: TreeNode;
  // 孩子节点
  public children: TreeNode[];

  // 节点所在的层级
  public layer: number;
  // 节点在层级的位置
  public index: number;
  // 横坐标
  public x: number;
  // 纵坐标
  public y: number;

  // 初始横坐标
  public ox: number;

  constructor(
    data: any,
    parent: TreeNode,
    layer: number,
    index: number,
    x: number,
    y: number
  ) {
    this.data = data;
    this.parent = parent;
    this.layer = layer;
    this.index = index;
    this.x = x;
    this.y = y;

    this.ox = x;
    this.children = [];
  }
}


export function initializeNode(data: any, parent: TreeNode, layer: number, index: number, x: number, y: number): TreeNode {
  const node = new TreeNode(data, parent, layer, index, x, y);

  if (data.children && data.children.length > 0) {
    for (let i = 0; i < data.children.length; i++) {
      const childNode = data.children[i];
      const children = initializeNode(childNode, node, layer + 1, i, 0, 0);
      children.parent = node
      node.children.push(children);
    }
  }

  return node;
}