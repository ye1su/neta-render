import { cloneDeep, pick } from "lodash-es";

export class Layer {
  public nodes;
  public edges
  public config
  public event
  constructor(nodes, edges, config) {
    // this.nodes = cloneDeep(nodes)
    this.nodes = nodes
    this.edges = edges
    // this.edges = cloneDeep(edges)
    this.config = config ?? {}
    this.event = event ?? {}
  }

}