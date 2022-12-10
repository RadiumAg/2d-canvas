import { Application } from './src/core/Application';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const app = new Application(canvas);

app.update(0, 0);
app.render();
