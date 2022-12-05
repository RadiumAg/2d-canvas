import { Doom3Tokenizer } from './src/core/tokenizer/Doom3Tokenizer';
import { Canvas2D } from './src/core/canvas-2d';
import { Doom3Token } from './src/core/tokenizer/Doom3Token';
import { ETokenType } from './src/core/tokenizer/IDoom3Token';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

if (canvas === null) {
  alert('无法获取HTMLCanvasElement!!!');
  throw new Error('无法获取HTMLCanavsElement!!!');
}

const canvas2d = new Canvas2D(canvas);
canvas2d.drawText('Hellow World');

const input = '[3.14,-3.14,.14,-.14,3.,-3,+3.14]';
const tokenizer = new Doom3Tokenizer();
const token = new Doom3Token();
tokenizer.setSource(input);

while (tokenizer.getNextToken(token)) {
  if (token.type === ETokenType.NUMBER) {
    console.log(`NUMBER：${token.getFloat()}`);
  } else {
    console.log(`STRING：${token.getFloat()}`);
  }
}
