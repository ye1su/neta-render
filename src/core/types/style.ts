export interface ItemStyle {
  fill?: string;

  textAlign?: "start" | "end" | "left" | "right" | "center";
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'

  lineWidth?: number;
  stroke?: string;
  lineCap?: string;
  lineJoin?: string;
  lineDash?: number[];

  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
}
