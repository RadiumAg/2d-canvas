import { Doom3Tokenizer } from './Doom3Tokenizer';
export class DOOm3Factory {
  public static createDoom3Tokenizer() {
    const ret = new Doom3Tokenizer();
    return ret;
  }
}
