import { BBox } from "../types/graphics";

// 标准字体
export const BASE_FONT_SIZE = 16;

// 画布缩放倍数
export const RESOLUTION_RATION = 2;

// 根据缩放倍数进行修复
export function fixFactor(num: number, isClose = false) {
  if (isClose) {
    return num / 2;
  }
  return num * RESOLUTION_RATION;
}

/**
 * 统计自定义图形的包围框
 * @param points
 * @returns
 */
export function getPolygonSurround(points: number[]) {
  const box = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
    centerX: 0,
    centerY: 0,
  };

  points.forEach((num, index) => {
    // y
    if (index & 1) {
      if (num < box.minY) {
        box.minY = num;
      }
      if (num > box.maxY) {
        box.maxY = num;
      }
    }
    // x
    if (num < box.minX) {
      box.minX = num;
    }
    if (num > box.maxX) {
      box.maxX = num;
    }
  });
  box.centerX = (box.maxX + box.minX) / 2;
  box.centerY = (box.maxY + box.minY) / 2;
  return box;
}

/**
 * 统计container的包围框
 * @param shapeBoxList
 * @returns
 */
export function getContainerSurround(shapeBoxList: BBox[]) {
  const box = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
    centerX: 0,
    centerY: 0,
  };
  shapeBoxList.forEach((shapeBox) => {
    if (shapeBox.minX < box.minX) {
      box.minX = shapeBox.minX;
    }
    if (shapeBox.minY < box.minY) {
      box.minY = shapeBox.minY;
    }
    if (shapeBox.maxX > box.maxX) {
      box.maxX = shapeBox.maxX;
    }
    if (shapeBox.maxY > box.maxY) {
      box.maxY = shapeBox.maxY;
    }
  });
  box.centerX = (box.maxX + box.minX) / 2;
  box.centerY = (box.maxY + box.minY) / 2;
  
  return box;
}
