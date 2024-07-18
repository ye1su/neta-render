import letterAspectRatio from "./letterAspectRatio";

// 根据宽度 对一段文本增加 height
export function autoFixWrap(text, width, options) {
  const wrappedText = []; // 存储分割后的文本
  let start = 0; // 当前分割的起始位置
  for (let i = 0; i < text.length; i++) {
    const sliceText = text.slice(start, i + 1);
    const sliceWidth = getActualWidthOfChars(sliceText, options);

    if (sliceWidth > width) {
      wrappedText.push(sliceText.slice(0, sliceText.length - 1));
      start = i ; // 更新起始位置
    }
  }

  // 添加最后一段文本
  if (start < text.length) {
    wrappedText.push(text.slice(start));
  }

  return {
    text: wrappedText.join('\n'),
    length: wrappedText.length,
  }
}

// 根据文字大小获取宽度
export function getActualWidthOfChars(
  text,
  options = { size: 14, family: "Microsoft YaHei" }
) {
  const { size = 14, family = "Microsoft YaHei" } = options;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = `${size}px ${family}`;
  const metrics = ctx.measureText(text);
  const actual =
    Math.abs(metrics.actualBoundingBoxLeft) +
    Math.abs(metrics.actualBoundingBoxRight);
  return Math.max(metrics.width, actual);
}


// 根据文字大小获取宽度
export const getStringSize = (str: string, fontSize: number) => {
  if (!str || !fontSize) return 0;
  // eslint-disable-next-line no-control-regex
  const pattern = /[^\x00-\x80]/g;
  const isSingleLetter = str.length === 1 && !pattern.test(str);
  if (isSingleLetter) {
    let selectStr = "8";
    if (/^[a-z]$/.test(str)) {
      selectStr = "o";
    } else if (/^[0-9]$/.test(str)) {
      selectStr = "8";
    } else if (/^[A-Z]$/.test(str)) {
      selectStr = "O";
    }
    return getLetterWidth(selectStr, fontSize);
  }
  return getTextSize(str, fontSize)[0];
};

export const getTextSize = (text: string, fontSize: number) => {
  let width = 0;
  const pattern = new RegExp("[\u{4E00}-\u{9FA5}]+");
  text.split("").forEach((letter) => {
    if (pattern.test(letter)) {
      // 中文字符
      width += fontSize;
    } else {
      width += getLetterWidth(letter, fontSize);
    }
  });
  return [width, fontSize];
};

export const getLetterWidth = (letter: string, fontSize: number) => {
  return fontSize * (letterAspectRatio[letter] || 1);
};

// 根据文本长度获取中间值
export function getCenterX(str: string, center: number, fontSize: number = 16) {
  const len = getStringSize(str, fontSize);

  return Number((center - len / 2).toFixed(2));
}
