import { CanvasKeyBoardEvent, CanvasMouseEvent } from './CanvasKeyBoardEvent';
let start = 0;
let lastTime = 0;
let count = 0;

export class Application implements EventListenerObject {
  // 标记当前Application是否进入不间断地循环状态
  protected _start = false;
  // 可以使用cancelAnimateionFrame(this._requestId)来取消动画循环
  protected _requestIdId = -1;
  //基于时间的物理更新
  protected _lastTime!: number;
  protected _startTime!: number;
  public isSupoortMouseMove: boolean;
  protected _isMouseDown: boolean;
  protected canvas: HTMLCanvasElement;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.addEventListener('mousedown', this, false);
    this.canvas.addEventListener('mouseup', this, false);
    this.canvas.addEventListener('mousemove', this, false);

    window.addEventListener('keydown', this, false);
    window.addEventListener('keyup', this, false);
    window.addEventListener('keypress', this, false);
    this._isMouseDown = false;
    this.isSupoortMouseMove = false;
  }

  public start() {
    if (!this._start) {
      this._start = true;
      this._requestIdId = -1;
      this._lastTime = -1;
      this._startTime - 1;
      this._requestIdId = requestAnimationFrame(elapsedMsec => {
        this.setup(elapsedMsec);
      });
    }
  }

  public stop() {
    if (this._start) {
      cancelAnimationFrame(this._requestIdId);
      this._requestIdId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      this._start = false;
    }
  }

  update(elapsedMesc: number, intervalSec: number) {}

  handleEvent(evt: Event): void {
    switch (evt.type) {
      case 'mousedown':
        this._isMouseDown = true;
        this.dispatchMouseDown = this._toCanvasMouseEvent(evt);
        break;

      case 'mousemove':
        if (this.isSupoortMouseMove) {
          this.dispatchMouseMove(this._toCanvasMouseEvent(evt));
        }

        if (this._isMouseDown) {
          this.dispatchMouseDrag(this._toCanvasMouseEvent(evt));
        }
        break;

      case 'keypress':
        this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt));
        break;

      case 'keydown':
        this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt));
        break;

      case 'keyup':
        this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt));
        break;
    }
  }

  public isRunning() {
    return this._start;
  }

  public render(): void {}

  setup(timestamp: number) {
    if (!start) start = timestamp;
    if (!lastTime) lastTime = timestamp;

    const elapsedMsec = timestamp - start;
    const intervalMsec = timestamp - lastTime;
    lastTime = timestamp;
    count++;
    console.log(`${count}timestamp=${timestamp}`);
    console.log(`${count}elapsedMsec=${elapsedMsec}`);
    console.log(`${count}intervalMsec=${intervalMsec}`);
  }

  protected step(timeStamp: number) {
    if (this._startTime === -1) this._startTime = timeStamp;
    if (this._lastTime === -1) this._lastTime = timeStamp;

    const elapsedMsec = timeStamp - this._startTime;
    const intervalSec = (timeStamp - this._lastTime) / 1000.0;
    this._lastTime = timeStamp;
    console.log(`elapsedTime = ${elapsedMsec}intervalSec =${intervalSec}`);
    this.update(elapsedMsec, intervalSec);
    this.render();
    requestAnimationFrame((elapsedMsec: number) => {
      this.step(elapsedMsec);
    });
  }

  private _viewportToCanvasCoordinate(evt: MouseEvent): vec2 {
    if (this.canvas) {
      const react = this.canvas.getBoundingClientRect();

      if (evt.type === 'mousedown') {
        console.log(`boundingClientRect${JSON.stringify(react)}`);
        console.log(`clientX:${evt.clientX}ClientY:${evt.clientY}`);
      }

      const x = (evt.clientX = react.left);
      const y = (evt.clientY = react.top);
      return vec2.create(x, y);
    }

    alert('canvas为null');
    throw new Error('canvas为null');
  }

  private _toCanvasMouseEvent(evt: Event): CanvasMouseEvent {
    const event = evt as MouseEvent;

    const mousePosition = this._viewportToCanvasCoordinate(event);
    const canvasMouseEvent = new CanvasMouseEvent(
      mousePosition.event.button,
      event.altKey,
      event.shiftKey,
    );

    return canvasMouseEvent;
  }

  private _toCanvasKeyBoardEvent(evt: Event): CanvasKeyBoardEvent {
    const event = evt as KeyboardEvent;
    const canvasKeyboardEvent = new CanvasKeyBoardEvent(
      event.key,
      event.keyCode,
      event.altKey,
      event.ctrlKey,
      event.shiftKey,
    );

    return canvasKeyboardEvent;
  }
}
