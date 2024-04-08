interface STableOptions {
  el: HTMLCanvasElement;
  columns: any[];
  dataSource: any[];
}

export class STable {
  public width: number;
  public height: number;
  public rowHeight: number;
  public options: STableOptions;
  public el: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public columns: any[];
  public dataSource: any[];

  constructor(options: STableOptions) {
    this.options = options;
    const { el, columns, dataSource } = options;
    this.el = el;
    this.ctx = el.getContext("2d")!;
    this.width = 600;
    this.height = 600;
    this.rowHeight = 40;
    this.columns = columns;
    this.dataSource = dataSource;
    this.init();
  }

  init() {
    this.drawHeader();
    this.drawBody()
  }

  drawHeader() {
    const ctx = this.ctx;
    console.log("ctx: ", ctx, this);
    // 第一条横线
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.width, 0);
    ctx.lineWidth = 0.5;
    ctx.closePath();
    ctx.stroke();
    // 第二条横线
    ctx.beginPath();
    ctx.moveTo(0, this.rowHeight);
    ctx.lineTo(this.width, this.rowHeight);
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.closePath();

    const colWidth = Math.ceil(this.width / this.columns.length);
    // 绘制表头文字内容
    for (let index = 0; index < this.columns.length + 1; index++) {
        if (this.columns[index]) {
            ctx.fillText(this.columns[index].label, index * colWidth + 10, 18);
        }
    }
  }

  drawBody() {
    const { ctx, el: canvansDom, rowHeight, dataSource, columns } = this;
    const row = Math.ceil(this.height / rowHeight);
    const tableDataLen = dataSource.length;
    const colWidth = Math.ceil(this.width / columns.length);
    // 画横线
    for (let i = 2; i < row + 2; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * rowHeight);
        ctx.lineTo(canvansDom.width, i * rowHeight);
        ctx.stroke();
        ctx.closePath();
    }
    console.log(this.dataSource, 'tableDataLen')
    // 绘制竖线
    for (let index = 0; index < columns.length + 1; index++) {
        ctx.beginPath();
        ctx.moveTo(index * colWidth, 0);
        ctx.lineTo(index * colWidth, (tableDataLen + 1) * rowHeight);
        ctx.stroke();
        ctx.closePath();
    }
    // 填充内容
    const columnsKeys = columns.map((v) => v.key);
    //   ctx.fillText(tableData[0].name, 10, 48);
    for (let i = 0; i < dataSource.length; i++) {
        columnsKeys.forEach((keyName, j) => {
            const x = 10 + colWidth * j;
            const y = 18 + rowHeight * (i + 1);
            if (dataSource[i][keyName]) {
                ctx.fillText(dataSource[i][keyName], x, y);
            }
        });
    }
 }
}
