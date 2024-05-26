import { Rectangle } from "../shapes";
import { IApplicationOptions } from "../types";
import { fixFactor } from "../utils";

export class Renderer {
  public el: HTMLCanvasElement;
  public screen = new Rectangle();
  public width: number;
  public height: number;
  public imageCache: Record<string, HTMLImageElement> = {};
  constructor(options: IApplicationOptions) {
    const { el } = options;
    this.el = el;
    this.screen.width = parseInt(el.style.width);
    this.screen.height = parseInt(el.style.height);
    this.width = fixFactor(this.screen.width);
    this.height = fixFactor(this.screen.height);
  }

  public resizeView(width: number, height: number) {
    this.el.width = width;
    this.el.height = height;
  }
  public render(container: Container) {
    // nothing
  }
  public clear() {}

  public loadImage(url: string, callback: (img: HTMLImageElement) => void) {

    if (this.imageCache[url]) {
      // 如果图像已在缓存中，直接使用
      callback(this.imageCache[url]);
    } else {
      // 否则加载图像并缓存
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.imageCache[url] = img;
        callback(img);
      };
    }
  }
}
