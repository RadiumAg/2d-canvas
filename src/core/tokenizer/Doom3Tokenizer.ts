import { Doom3Token } from './Doom3Token';
import { ETokenType, IDoom3Token } from './IDoom3Token';
import { IDoom3Tokenizer } from './IDoom3Tokenizer';

export class Doom3Tokenizer implements IDoom3Tokenizer {
  private _source = 'Doom3Tokenizer';
  private _currIdx = 0;
  private _digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  private _whiteSpaces = ['', '\t', '\v', '\n'];

  setSource(source: string) {
    this._source = source;
    this._currIdx = 0;
  }

  reset(): void {
    this._currIdx = 0;
  }

  private _getChar() {
    if (this._currIdx >= 0 && this._currIdx < this._source.length) {
      return this._source.charAt(this._currIdx++);
    }
    return '';
  }

  /**
   * 判断某个字符是不是空白符
   *
   * @private
   * @param {string} c
   * @return {*}
   * @memberof Doom3Token
   */
  private _isWhitespace(c: string) {
    for (let i = 0; i < this._whiteSpaces.length; i++) {
      if (c === this._whiteSpaces[i]) return true;
    }
    return false;
  }

  /**
   * 判断字符是不是数字
   *
   * @private
   * @param {string} c
   * @return {*}
   * @memberof Doom3Token
   */
  private _isDigit(c: string) {
    for (let i = 0; i < this._digits.length; i++) {
      if (c === this._digits[i]) return true;
    }
    return false;
  }

  private _getNumber(token: Doom3Token) {
    let val = 0.0;
    let isFloat = false;
    let scaleValue = 0.1;
    let c = this._getChar();
    const isNegate = c === '-';
    let consumed = false;
    const ascii0 = '0'.charCodeAt(0);

    do {
      token.addChar(c);

      if (c === '.') {
        isFloat = true;
      } else if (c !== '-') {
        const ascii: number = c.charCodeAt(0);
        const vc: number = ascii - ascii0;

        if (!isFloat) {
          val = 10 * val + vc;
        } else {
          val = val + scaleValue * vc;
          scaleValue *= 0.1;
        }
      } else {
        console.log(`运行到此处的只能是：${c}`);
      }

      if (consumed === true) {
        this._getChar();
        c = this._peekChar();
        consumed = true;
      }
    } while ((c.length > 0 && this._isDigit(c)) || (!isFloat && c === '.'));

    if (isNegate) {
      val = -val;
    }
    token.setVal(val);
  }

  /**
   * 获取string
   *
   * @private
   * @return {*}
   * @memberof Doom3Tokenizer
   */
  private _peekChar() {
    if (this._currIdx >= 0 && this._currIdx < this._source.length) {
      return this._source.charAt(this._currIdx);
    }

    return '';
  }

  private _ungetChar() {
    if (this._currIdx > 0) {
      --this._currIdx;
    }
  }

  private _skipWhitespace() {
    let c = '';
    do {
      c = this._getChar();
    } while (c.length > 0 && this._isWhitespace(c));
    return c;
  }

  /**
   * 跳过单行字符
   *
   * @private
   * @return {*}
   * @memberof Doom3Tokenizer
   */
  private _skipComments0() {
    let c = '';
    do {
      c = this._getChar();
    } while (c.length > 0 && c !== '\n');

    return c;
  }

  /**
   * 跳过多行注释
   *
   * @private
   * @memberof Doom3Tokenizer
   */
  private _skipComments1() {
    let c = '';
    c = this._getChar();

    do {
      c = this._getChar();
    } while ((c.length > 0 && c !== '*') || this._peekChar() !== '/');
    return c;
  }

  private _getString(token: Doom3Token) {
    const c = this._getChar();
    token.setType(ETokenType.STRING);
    do {
      token.addChar(c);
      if (!this._isSpecialChar(c)) {
        c = this._getChar();
      }
    } while (c.length > 0 && !this._isWhitespace(c) && !this._isSpecialChar(c));
  }

  private _isSpecialChar(c: string) {
    return ['(', ')', '[', ']', '{', '}', ',', '.'].includes(c);
  }

  getNextToken(tok: IDoom3Token): boolean {
    const token = tok as Doom3Token;
    let c = '';
    token.reset();

    do {
      c = this._skipWhitespace();
      if (c === '/' && this._peekChar() === '/') {
        c = this._skipComments0();
      } else if (c === '/' && this._peekChar() === '*') {
        c = this._skipComments1();
      } else if (c.length > 0) {
        this._ungetChar();
        this._getString(token);
        return true;
      }
    } while (c.length > 0);
    return false;
  }
}
