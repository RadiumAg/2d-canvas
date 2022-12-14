import { RenderStateStack } from './src/core/canvas/RenderStateStack';
import { ApplicationTest } from './src/core/applicationTest';

//获取canvas元素，并创建Application对象
const canvas: HTMLCanvasElement = document.querySelector(
  '#canvas',
) as HTMLCanvasElement;
const app = new ApplicationTest(canvas);
app.render();

const stack = new RenderStateStack();
stack.printCurrentStateInfo();
stack.save();
stack.lineWidth = 10;
stack.fillStyle = 'black';
stack.printCurrentStateInfo();
stack.restore();
