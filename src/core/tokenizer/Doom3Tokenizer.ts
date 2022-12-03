import { Doom3Token } from './Doom3Token';
import { IDoom3Token } from './IDoom3Token';
import { IDoom3Tokenizer } from './IDoom3Tokenizer';

export class Doom3Tokenizer implements IDoom3Tokenizer {
  private _source = 'Doom3Tokenizer';
  private _currIdx = 0;

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
      }else if(this.)
    } while (c.length > 0);
    return false;
  }
}
