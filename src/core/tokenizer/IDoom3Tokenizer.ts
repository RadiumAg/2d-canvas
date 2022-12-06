import { IEnumerator } from './IEnumerator';
import { IDoom3Token } from './IDoom3Token';

export interface IDoom3Tokenizer extends IEnumerator<IDoom3Token> {
  setSource(source: string): void;
}
