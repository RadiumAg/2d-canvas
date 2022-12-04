import { ETokenType, IDoom3Token } from './IDoom3Token';

export class Doom3Token implements IDoom3Token {
  public constructor() {
    this._charArr.length = 0;
    this._type = ETokenType.NONE;
    this._val = 0.0;
  }

  private _type: ETokenType;
  private _charArr: string[] = [];
  private _val: number;

  reset(): void {
    this._charArr.length = 0;
    this._type = ETokenType.NONE;
    this._val = 0.0;
  }

  isString(str: string): boolean {
    const count = this._charArr.length;
    if (str.length !== count) {
      return false;
    }

    for (let i = 0; i < count; i++) {
      if (this._charArr[i] !== str[i]) {
        return false;
      }
    }

    return true;
  }

  getFloat(): number {
    return this._val;
  }

  getInt(): number {
    return Number.parseInt(this._val.toString(), 10);
  }

  get type() {
    return this._type;
  }

  getString() {
    return this._charArr.join('');
  }

  addChar(c: string) {
    this._charArr.push(c);
  }

  setVal(num: number) {
    this._val = num;
    this._type = ETokenType.NUMBER;
  }

  setType(type: ETokenType) {
    this._type = type;
  }
}
