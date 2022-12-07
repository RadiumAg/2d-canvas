import { Doom3Tokenizer } from './src/core/tokenizer/Doom3Tokenizer';
import { Doom3Token } from './src/core/tokenizer/Doom3Token';
import { ETokenType } from './src/core/tokenizer/IDoom3Token';

const input = '[3.14,-3.14,.14,-.14,3.,-3,+3.14]';

const tokenizer = new Doom3Tokenizer();
const token = new Doom3Token();
tokenizer.setSource(input);

while (tokenizer.moveNext()) {
  console.log(token);
  if (tokenizer.current.type === ETokenType.NUMBER) {
    console.log(`NUMBER：${token.getFloat()}`);
  } else {
    console.log(`STRING：${token.getFloat()}`);
  }
}
