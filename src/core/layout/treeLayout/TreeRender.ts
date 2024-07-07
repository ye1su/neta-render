import { TreeNode } from "./TreeNode";

export interface TreeData {
  id: string;
  children?: TreeData[];
  [key: string]: any;
}
export interface TreeRenderConfig {
  direction: "tb" | "bt" | "lr" | "rl";
}

const DIRECT_MAP = {
  tb: {
    main: "y",
    side: "x",
    increase: true,
  },
  bt: {
    main: "y",
    side: "x",
    increase: false,
  },
  lr: {
    main: "x",
    side: "y",
    increase: true,
  },
  rl: {
    main: "x",
    side: "y",
    increase: false,
  },
};

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
  // 树的方向
  private direction: "tb" | "bt" | "lr" | "rl";

  constructor(treeData: TreeData, config?: TreeRenderConfig) {
    this.count = 0;

    this.nodeWidth = 110;
    this.nodeHeight = 50;
    // 因为节点间的距离是从节点的中心距离计算的，所以为了方便计算，加上2*(节点宽度/2)即一个节点宽度
    this.nodeInterval = 60 + this.nodeWidth;
    // 同理上面
    this.yInterval = 120 + this.nodeHeight;

    this.rootX = 300;
    this.rootY = 200;

    this.hashTree = [];
    this.renderRequestCount = this.renderCount = 0;

    // 创建一个节点到根节点（createNode函数代码省略）
    this.root = this.createNode(treeData);
    this.root.x = this.rootX;
    this.root.y = this.rootY;

    this.direction = config?.direction ?? "tb";
    if (!DIRECT_MAP[this.direction].increase) {
      this.yInterval = -this.yInterval;
    }
  }

  get sideKey() {
    return DIRECT_MAP[this.direction].side;
  }

  get mianKey() {
    return DIRECT_MAP[this.direction].main;
  }

  createNode(treeData: TreeData) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    function initializeNode(
      data: TreeData,
      parent: TreeNode,
      layer: number,
      index: number,
      x: number,
      y: number
    ): TreeNode {
      const node = new TreeNode(data, parent, layer, index, x, y);
      const layerList = _this.hashTree[layer];
      if (!layerList) {
        _this.hashTree[layer] = [node];
      } else {
        _this.hashTree[layer].push(node);
      }

      if (data.children && data.children.length > 0) {
        for (let i = 0; i < data.children.length; i++) {
          const childNode = data.children[i];
          const children = initializeNode(childNode, node, layer + 1, i, 0, 0);
          children.parent = node;
          node.children.push(children);
        }
      }

      return node;
    }

    return initializeNode(treeData, null, 0, 0, 0, 0);
  }

  /**
   * 核心函数：布局调整函数
   */
  layout() {
    // 正推布局，从根节点开始，按照节点的水平垂直间距布局整棵树
    this.layoutChild(this.root);
    // 回推布局，从最底层开始，往上检索，查找重叠节点，调整优化树的布局
    this.layoutOverlaps();

    // replaceXY(this.root)
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
  translateTree(node: TreeNode, num: number) {
    const _key = this.sideKey;
    // 计算移动的距离
    const dx = num - node[_key];

    // 更新节点的横坐标
    node[_key] = num;

    // 位移所有子节点
    for (let i = 0; i < node.children.length; i++) {
      this.translateTree(node.children[i], node.children[i][_key] + dx);
    }
  }

  /**
   * 回推函数
   */
  layoutOverlaps() {
    const _key = this.sideKey;
    // 外层循环，扫描hashtree，从最底层开始往上
    for (let i = this.hashTree.length - 1; i >= 0; i--) {
      // 获取当前层
      const curLayer = this.hashTree[i];

      // 内层循环，遍历该层所有节点
      for (let j = 0; j < curLayer.length - 1; j++) {
        // 获取相邻的两个节点，保存为n1，n2
        const n1 = curLayer[j],
          n2 = curLayer[j + 1];

        // 若n1，n2有重叠
        if (this.isOverlaps(n1, n2)) {
          // 计算需要移动距离
          const dx = n1[_key] + this.nodeInterval - n2[_key];
          // 找出与n1的某个祖先为兄弟节点的n2的祖先
          const node2Move = this.findCommonParentNode(n1, n2);

          // 往右移动n2
          this.translateTree(node2Move, node2Move[_key] + dx);
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

    const _key = this.sideKey;

    // 只有一个子节点，则只要将该子节点与父节点对齐即可
    if (parent.children.length === 1) {
      dx = parent[_key] - parent.children[0][_key];
    }

    // > 1 的子节点，就要计算最左的子节点和最右的子节点的距离的中点与父节点的距离
    if (parent.children.length > 1) {
      const halfValue =
        (parent.children[parent.children.length - 1][_key] -
          parent.children[0][_key]) /
        2;
      dx = parent[_key] - (parent.children[0][_key] + halfValue);
    }

    // 若要移动的距离不为0
    if (dx) {
      // 将所有子节点居中对齐父节点
      for (let i = 0; i < parent.children.length; i++) {
        this.translateTree(parent.children[i], parent.children[i][_key] + dx);
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
      const _key = this.sideKey;
      const start =
        node[_key] - ((node.children.length - 1) * this.nodeInterval) / 2;

      // 遍历子节点
      for (let i = 0, len = node.children.length; i < len; i++) {
        // 计算当前子节点横坐标
        const coordinate = start + i * this.nodeInterval;
        // 移动该子节点及以该子节点为根的整棵树
        this.translateTree(node.children[i], coordinate);
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
    const _key = this.sideKey;

    // 若左边节点的横坐标比右边节点大，或者两节点间的间距小于最小间距，均判断为重叠
    return (
      node1[_key] - node2[_key] > 0 ||
      node2[_key] - node1[_key] < this.nodeInterval
    );
  }

  /**
   * 更新需要更新的节点
   * @param node
   */
  patch(node: TreeNode, callback) {
    const _key = this.mianKey;
    node[_key] = this.rootY + node.layer * this.yInterval;
    callback(node);
    // 递归更新子节点
    for (let i = 0; i < node.children.length; i++) {
      this.patch(node.children[i], callback);
    }
  }

  /**
   * 异步更新视图
   */
  update() {
    this.renderRequestCount++;

    // 异步更新
    requestAnimationFrame(() => {
      this.renderCount++;

      if (this.renderCount === this.renderRequestCount) {
        this.layout();
        this.renderCount = this.renderRequestCount = 0;
      }
    });
  }
}
