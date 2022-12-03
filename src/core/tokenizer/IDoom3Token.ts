export interface IDoom3Token {
  reset(): void;
  isString(str: string): boolean;
  getString(): string;
  getFloat(): number;
  getInt(): number;
}

export enum ETokenType {
  NONE, // default
  STRING, // 表示字符串类型
  NUMBER, // 表示数字类型
}
