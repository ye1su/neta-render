import { TreeNode, initializeNode } from "./TreeNode";

// 树的主类
export class TreeRender {
  // 根节点
  public root: TreeNode;
  // 节点数
  public count: number;

  // 一个保存树层次结构的hashtree
  private hashTree: Array<TreeNode[]>;
  // 渲染请求计数器
  private renderRequestCount: number;
  // 渲染执行计数器
  private renderCount: number;

  // 根节点横坐标
  private rootX: number;
  // 根节点纵坐标
  private rootY: number;
  // 父子节点的垂直间距
  private yInterval: number;
  // 节点间的水平最小间距
  private nodeInterval: number;
  // 节点的宽度
  private nodeWidth: number;
  // 节点的高度
  private nodeHeight: number;

  constructor(treeData) {
    this.count = 0;

    this.nodeWidth = 20;
    this.nodeHeight = 20;
    // 因为节点间的距离是从节点的中心距离计算的，所以为了方便计算，加上2*(节点宽度/2)即一个节点宽度
    this.nodeInterval = 30 + this.nodeWidth;
    // 同理上面
    this.yInterval = 60 + this.nodeHeight;

    this.rootX = 400;
    this.rootY = 80;

    this.hashTree = [];
    this.renderRequestCount = this.renderCount = 0;

    // 创建一个节点到根节点（createNode函数代码省略）
    this.root = this.createNode(treeData);
    this.root.x = this.rootX
    this.root.y = this.rootY
  }

  createNode(treeData) {
    return initializeNode(treeData, null,  0, 0, 0, 0)
  }

  /**
   * 核心函数：布局调整函数
   */
  layout() {
    // 正推布局，从根节点开始，按照节点的水平垂直间距布局整棵树
    this.layoutChild(this.root);
    // 回推布局，从最底层开始，往上检索，查找重叠节点，调整优化树的布局
    this.layoutOverlaps();

    replaceXY(this.root)
  }

  /**
   * 找出与node1的某个祖先节点为兄弟节点的node2的祖先节点
   * @param node1
   * @param node2
   */
  findCommonParentNode(node1: TreeNode, node2: TreeNode): TreeNode {
    // 若node1和node2为兄弟节点，返回node2
    if (node1.parent === node2.parent) {
      return node2;
    }
    // 否则，递归往上寻找
    else {
      return this.findCommonParentNode(node1.parent, node2.parent);
    }
  }

  /**
   * 水平位移整棵树
   * @param node 该树的根节点
   * @param x 要移动到的位置
   */
  translateTree(node: TreeNode, x: number) {
    // 计算移动的距离
    let dx = x - node.x;
    // 更新节点的横坐标
    node.x = x;

    // 位移所有子节点
    for (let i = 0; i < node.children.length; i++) {
      this.translateTree(node.children[i], node.children[i].x + dx);
    }
  }

  /**
   * 回推函数
   */
  layoutOverlaps() {
    // 外层循环，扫描hashtree，从最底层开始往上
    for (let i = this.hashTree.length - 1; i >= 0; i--) {
      // 获取当前层
      let curLayer = this.hashTree[i];

      // 内层循环，遍历该层所有节点
      for (let j = 0; j < curLayer.length - 1; j++) {
        // 获取相邻的两个节点，保存为n1，n2
        let n1 = curLayer[j],
          n2 = curLayer[j + 1];

        // 若n1，n2有重叠
        if (this.isOverlaps(n1, n2)) {
          // 计算需要移动距离
          let dx = n1.x + this.nodeInterval - n2.x,
            // 找出与n1的某个祖先为兄弟节点的n2的祖先
            node2Move = this.findCommonParentNode(n1, n2);

          // 往右移动n2
          this.translateTree(node2Move, node2Move.x + dx);
          this.centerChild(node2Move.parent);

          // 移动后下层节点有可能再次发生重叠，所以重新从底层扫描
          i = this.hashTree.length;
        }
      }
    }
  }

  /**
   * 居中所有子节点
   * @param parent 父节点：按照该父节点的位置，居中该父节点下的所有子节点
   */
  centerChild(parent: TreeNode) {
    // 要移动的距离
    let dx = 0;

    // 父节点为null，返回
    if (parent === null) return;

    // 只有一个子节点，则只要将该子节点与父节点对齐即可
    if (parent.children.length === 1) {
      dx = parent.x - parent.children[0].x;
    }

    // > 1 的子节点，就要计算最左的子节点和最右的子节点的距离的中点与父节点的距离
    if (parent.children.length > 1) {
      dx =
        parent.x -
        (parent.children[0].x +
          (parent.children[parent.children.length - 1].x - parent.children[0].x) / 2);
    }

    // 若要移动的距离不为0
    if (dx) {
      // 将所有子节点居中对齐父节点
      for (let i = 0; i < parent.children.length; i++) {
        this.translateTree(parent.children[i], parent.children[i].x + dx);
      }
    }
  }

  /**
   * 正推布局函数，将当前节点的所有子节点按等间距布局
   * @param node 当前节点
   */
  layoutChild(node: TreeNode) {
    // 若当前节点为叶子节点，返回
    if (node.children.length === 0) return;
    else {
      // 计算子节点最左位置
      let start = node.x - ((node.children.length - 1) * this.nodeInterval) / 2;

      // 遍历子节点
      for (let i = 0, len = node.children.length; i < len; i++) {
        // 计算当前子节点横坐标
        let x = start + i * this.nodeInterval;

        // 移动该子节点及以该子节点为根的整棵树
        this.translateTree(node.children[i], x);
        // 递归布局该子节点
        this.layoutChild(node.children[i]);
      }
    }
  }

  /**
   * 判断重叠函数
   * @param node1 左边的节点
   * @param node2 右边的节点
   */
  isOverlaps(node1: TreeNode, node2: TreeNode): boolean {
    // 若左边节点的横坐标比右边节点大，或者两节点间的间距小于最小间距，均判断为重叠
    return node1.x - node2.x > 0 || node2.x - node1.x < this.nodeInterval;
  }

  /**
   * 更新需要更新的节点
   * @param node
   */
  patch(node: TreeNode, callback) {
    // 若节点的当前位置不等于初始位置，则更新
    if (node.x !== node.ox) {
      // 渲染视图（根据你所使用的渲染库而定，这句只是伪代码）
    //   updateViewOnYourRenderer();

      // 更新节点的初始位置为当前位置
      // node.ox = node.x;
    }
    node.x = this.rootX + node.layer * this.nodeInterval
    callback(node)
    // 递归更新子节点
    for (let i = 0; i < node.children.length; i++) {
      this.patch(node.children[i], callback);
    }
  }

}


function replaceXY(node: TreeNode) {
  const temp = node.x
  node.x = node.y
  node.y = temp

  for (let i = 0, len = node.children.length; i < len; i++) {
    replaceXY(node.children[i]);
  }
}