import { ApplicationTest } from './src/core/applicationTest';

//获取canvas元素，并创建Application对象
const canvas: HTMLCanvasElement = document.querySelector(
  '#canvas',
) as HTMLCanvasElement;
const app = new ApplicationTest(canvas);
app.testChangePartCanvasImageData();
