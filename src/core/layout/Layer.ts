import { cloneDeep, pick } from "lodash-es";

export class Layer {
  public nodes;
  public edges
  public config
  public event
  constructor(nodes, edges, config, event) {
    this.nodes = cloneDeep(nodes)
    this.edges = cloneDeep(edges)
    this.config = config
    this.event = event
  }

  afterLayout() {
    this.event?.afterLayout && this.event?.afterLayout({
      nodes: this.nodes
    })
  }
}