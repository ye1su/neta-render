import { autoFixWrap } from "../../../core/utils";

export class MindNode {
  private inputOutPadding = 12;
  private shapeWidth = 130;
  private shapeHeight = this.inputOutPadding * 2;
  public action;
  public isSelect: boolean;
  public isHover: boolean;
  public isInput: boolean;
  public type: "headTitle" | "content";

  constructor(action, type) {
    this.action = action;
    this.type = type;
  }

  draw() {
    const initJson = this.action.inputProperties;
    this.shapeWidth = initJson.width ?? 130;
    const _fontSize = 24;

    // 状态
    const nodeState = initJson.nodeState ?? [];
    this.isSelect = nodeState.find((item) => item == "select");
    this.isHover = nodeState.find((item) => item == "hover");
    this.isInput = nodeState.find((item) => item == "input");

    // 转换成新的text
    const _text = initJson?.text ?? "";
    const innerWidth = this.shapeWidth - this.inputOutPadding * 2;
    const { text: fixText, length: lineLen } = autoFixWrap(_text, innerWidth, {
      size: _fontSize,
      family: "monospace",
    });

    // 计算text 的height
    const textHeight = _fontSize * 1.5 * (lineLen || 1);

    // 加上padding 为box的高度
    this.shapeHeight = textHeight + this.inputOutPadding * 2;

    let currentShape;

    if (this.type == "headTitle") {
      currentShape = this.action.addShape("rect", {
        x: 0,
        y: 0,
        width: this.shapeWidth,
        height: this.shapeHeight,
        radius: 8,
        style: this.getHeadTitleStyle(),
      });
    }

    if (this.type == "content") {
      currentShape = this.action.addShape("rect", {
        x: 0,
        y: 0,
        width: this.shapeWidth,
        height: this.shapeHeight,
        radius: 8,
        style: this.getContentStyle(),
      });

      this.action.addShape("rect", {
        x: 3,
        y: 3,
        width: this.shapeWidth - 3 * 2,
        height: this.shapeHeight - 3 * 2,
        radius: 8,
        style: {
          fill: "transparent",
          stroke: "#95a3cc",
          lineWidth: 6,
        },
      });
    }

    this.generateOption(fixText);

    return currentShape;
  }

  /**
   * 生成节点的操作项
   * @param fixText
   */
  generateOption(fixText: string) {
    if (!this.isInput) {
      this.action.addShape("text", {
        x: this.inputOutPadding + 2,
        y: this.inputOutPadding + 2,
        text: fixText,
        style: {
          fill: "#595959",
          fontSize: 24,
          textBaseline: "middle",
          textLineHight: 1.5,
        },
      });
    }

    if (this.isHover) {
      this.action.addShape("rect", {
        x: this.shapeWidth,
        y: this.shapeHeight / 2 - 4,
        width: 16,
        height: 6,
        style: {
          stroke: "transparent",
          fill: "#8C80A7",
        },
      });

      this.action.addShape("circle", {
        x: this.shapeWidth + 16,
        y: this.shapeHeight / 2 - 2,
        name: "expand-circle",
        radius: 8,
        style: {
          stroke: "transparent",
          fill: "#8C80A7",
        },
      });
    }

    if (this.isSelect) {
      this.action.addShape("circle", {
        name: "drag-pointer",
        x: this.shapeWidth,
        y: 0,
        radius: 5,
        style: {
          stroke: "#fff",
          fill: "#9E8BE1",
          lineWidth: 2,
        },
      });
    }
  }

  /**
   * 获取头样式
   * @returns
   */
  getHeadTitleStyle() {
    let syl: Record<string, any> = {
      fill: "#F9DDB0",
      stroke: "transparent",
    };

    if (this.isHover) {
      syl = {
        ...syl,
        lineWidth: 0,
      };
    }

    if (this.isSelect) {
      syl = {
        ...syl,
        stroke: "#e7e6f8",
        lineWidth: 6,
      };
    }

    return syl;
  }

  getContentStyle() {
    let syl: Record<string, any> = {
      fill: "transparent",
      stroke: 'transparent',
      lineWidth: 0,
    };

    if (this.isSelect) {
      syl = {
        ...syl,
        stroke: "#e7e6f8",
        lineWidth: 8,
      };
    }

    return syl;
  }
}

export function generateDynamicElement({ config }) {
  return {
    eleType: "textarea",
    style: {
      // border: "none",
      background: "transparent",
      minHeight: "1.5em" /* 初始高度设为一行的高度 */,
      lineHeight: "1.5em" /* 每行的高度 */,
      padding: 0,
      outline: "none",
      resize: "none" /* 禁用调整大小 */,
      width: "100%" /* 可选：使 textarea 占满父容器的宽度 */,
    },
    text: config.text ?? "",
  };
}
