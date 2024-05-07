import { Application } from "./Application";
import { EdgeModel, IApplicationOptions, ItemType, NodeModel } from "./types";
import {
  graphicsLineParse,
  graphicsShapeParse,
} from "./graphics/GraphicsParse";
import { Graphics } from ".";

export class NetaGraph extends Application {
  constructor(options: IApplicationOptions) {
    super(options);
  }

  addItem(type: ItemType, model: NodeModel | EdgeModel) {
    if (type == "node") {
      this.addNode(model as NodeModel);
    }
    if (type == "edge") {
      this.addEdge(model as EdgeModel);
    }
  }
  addNode(model: NodeModel) {
    const graphic = graphicsShapeParse(model);
    this.stage.addChild(graphic);
  }
  addEdge(model: EdgeModel) {
    const graphic = graphicsLineParse(model);
    this.stage.addChild(graphic);
  }
}
