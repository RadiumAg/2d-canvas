import { Canvas2D } from './src/core/canvas-2d';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

if (canvas === null) {
  alert('无法获取HTMLCanvasElement!!!');
  throw new Error('无法获取HTMLCanavsElement!!!');
}

const canvas2d = new Canvas2D(canvas);
canvas2d.drawText('Hellow World');
