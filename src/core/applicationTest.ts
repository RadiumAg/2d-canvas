import { CanvasKeyBoardEvent, CanvasMouseEvent } from './CanvasKeyBoardEvent';
import { Application } from './Application';

export class ApplicationTest extends Application {
  protected dispatchKeyDown(evt: CanvasKeyBoardEvent) {
    console.log(`key${evt.key}is down`);
  }

  protected dispatchMouseDown(evt: CanvasMouseEvent) {
    console.log(`canvasPosition${evt.canvasPosition}`);
  }

  public update(elapsedMsec: number, intervalSec: number) {
    console.log(`elapsedMsec${elapsedMsec}intervalSec${intervalSec}`);
  }

  public render() {
    console.log('调用render方法');
  }
}
