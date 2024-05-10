import letterAspectRatio from "./letterAspectRatio";

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

export function getCenterX(str: string, center: number, fontSize: number = 16) {
  const len = getStringSize(str, fontSize);

  return Number((center - len / 2).toFixed(2));
}
