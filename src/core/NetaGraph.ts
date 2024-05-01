import { Container, Graphics } from "./index";
import { Application } from "./Application";
import { IApplicationOptions, ItemType, NodeModel } from "./types";
import { graphicsParse } from "./graphics/GraphicsParse";

export class NetaGraph extends Application {
  constructor(options: IApplicationOptions) {
    super(options);
    // this.stage.hitArea = new Rectangle(0, 0, 1200, 800);

    // this.stage.addEventListener("mousedown", (e) => {
    //   console.log("e: -------", e);
 
    // });
    // this.stage.addEventListener("mousemove", (e) => {
    //   // console.log('e:------ ', e);
    // });
  }

  addItem(type: ItemType, model: NodeModel) {
    if (type == "node") {
      this.addNode(model);
    }
  }
  addNode(model: NodeModel) {
    const graphic = graphicsParse( model);
    this.stage.addChild(graphic);

  }
}
