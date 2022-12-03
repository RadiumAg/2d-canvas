import { IDoom3Token } from './IDoom3Token';

export interface IDoom3Tokenizer {
  setSource(source: string): void;

  reset(): void;

  getNextToken(token: IDoom3Token): boolean;
}
