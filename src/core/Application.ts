import { EInputEventType } from './CanvasInputEvent';
import { CanvasKeyBoardEvent, CanvasMouseEvent } from './CanvasKeyBoardEvent';
import { vec2 } from './math2d';

export type TimerCallback = (id: number, data: any) => void;

export class Timer {
  public id = -1;
  public enabled = false;
  public callback: TimerCallback;
  public callbackData: any = undefined;

  public countdown = 0;
  public timeout = 0;
  public onlyOnce = false;

  constructor(callback: TimerCallback) {
    this.callback = callback;
  }
}

export class Application implements EventListenerObject {
  // 标记当前Application是否进入不间断地循环状态
  protected _start = false;
  // 可以使用cancelAnimateionFrame(this._requestId)来取消动画循环
  protected _requestIdId = -1;
  //基于时间的物理更新
  protected _lastTime!: number;
  protected _startTime!: number;
  public isSupportMouseMove: boolean;
  protected _isMouseDown: boolean;
  protected canvas: HTMLCanvasElement;
  public timers: Timer[] = [];
  private _timeId = 1;
  private _fps = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.addEventListener('mousedown', this, false);
    this.canvas.addEventListener('mouseup', this, false);
    this.canvas.addEventListener('mousemove', this, false);

    window.addEventListener('keydown', this, false);
    window.addEventListener('keyup', this, false);
    window.addEventListener('keypress', this, false);
    this._isMouseDown = false;
    this.isSupportMouseMove = false;
  }

  start() {
    if (!this._start) {
      this._start = true;
      this._requestIdId = -1;
      this._lastTime = -1;
      this._startTime - 1;
      this._requestIdId = requestAnimationFrame(elapsedMsec => {
        this.step(elapsedMsec);
      });
    }
  }

  stop() {
    if (this._start) {
      cancelAnimationFrame(this._requestIdId);
      this._requestIdId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      this._start = false;
    }
  }

  update(elapsedMesc: number, intervalSec: number) {}

  get fps() {
    return this._fps;
  }

  addTimer(
    callback: TimerCallback,
    timeout = 1.0,
    onlyOnce = false,
    data: any,
  ) {
    let timer: Timer;

    for (let i = 0; i < this.timers.length; i++) {
      timer = this.timers[i];
      if (timer.enabled === false) {
        timer.callback = callback;
        timer.callbackData = data;
        timer.timeout = timeout;
        timer.countdown = timeout;
        timer.enabled = true;
        timer.onlyOnce = onlyOnce;
        return timer.id;
      }
    }

    timer = new Timer(callback);
    timer.callbackData = data;
    timer.timeout = timeout;
    timer.countdown = timeout;
    timer.enabled = true;
    timer.onlyOnce = onlyOnce;
    timer.id = ++this._timeId;

    this.timers.push(timer);
    return timer.id;
  }

  removeTimer(id: number): boolean {
    let found = false;
    for (let i = 0; i < this.timers.length; i++) {
      if (this.timers[i].id === id) {
        const timer = this.timers[i];
        timer.enabled = false;
        found = true;
        break;
      }
    }

    return found;
  }

  protected dispatchMouseDown(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchMouseUp(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchMouseMove(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchMouseDrag(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
    return;
  }

  protected dispatchKeyUp(evt: CanvasKeyBoardEvent): void {
    return;
  }

  protected dispatchKeyPress(evt: CanvasKeyBoardEvent): void {
    return;
  }

  handleEvent(evt: Event): void {
    switch (evt.type) {
      case 'mousedown':
        this._isMouseDown = true;
        this.dispatchMouseDown(
          this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDOWN),
        );
        break;

      case 'mouseup':
        this._isMouseDown = false;
        this.dispatchMouseUp(
          this._toCanvasMouseEvent(evt, EInputEventType.MOUSEUP),
        );
        break;
      case 'mousemove':
        if (this.isSupportMouseMove) {
          this.dispatchMouseMove(
            this._toCanvasMouseEvent(evt, EInputEventType.MOUSEMOVE),
          );
        }
        if (this._isMouseDown) {
          this.dispatchMouseDrag(
            this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDRAG),
          );
        }
        break;
      case 'keypress':
        this.dispatchKeyPress(
          this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYPRESS),
        );
        break;
      case 'keydown':
        this.dispatchKeyDown(
          this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYDOWN),
        );
        break;
      case 'keyup':
        this.dispatchKeyUp(
          this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYUP),
        );
        break;
    }
  }

  isRunning() {
    return this._start;
  }

  render(): void {
    console.log('render');
  }

  private _handleTimers(intervalSec: number) {
    for (let i = 0; i < this.timers.length; i++) {
      const timer = this.timers[i];
      if (timer.enabled === false) {
        continue;
      }
      timer.countdown -= intervalSec;

      if (timer.countdown < 0.0) {
        timer.callback(timer.id, timer.callbackData);
        if (timer.onlyOnce === false) {
          timer.countdown = timer.timeout;
        } else {
          this.removeTimer(timer.id);
        }
      }
    }
  }

  protected step(timeStamp: number) {
    if (this._startTime === -1) this._startTime = timeStamp;
    if (this._lastTime === -1) this._lastTime = timeStamp;

    const elapsedMsec = timeStamp - this._startTime;
    let intervalSec = timeStamp - this._lastTime;
    if (intervalSec !== 0) {
      this._fps === 1000.0 / intervalSec;
    }
    intervalSec /= 1000.0;
    this._lastTime = timeStamp;
    this._handleTimers(intervalSec);
    this.update(elapsedMsec, intervalSec);
    this.render();
    requestAnimationFrame(this.step.bind(this));
  }

  private _viewportToCanvasCoordinate(evt: MouseEvent): vec2 {
    if (this.canvas) {
      const react = this.canvas.getBoundingClientRect();

      if (evt.type === 'mousedown') {
        console.log(`boundingClientRect${JSON.stringify(react)}`);
        console.log(`clientX:${evt.clientX}ClientY:${evt.clientY}`);
      }

      const x = evt.clientX - react.left;
      const y = evt.clientY - react.top;
      return vec2.create(x, y);
    }
    throw new Error('canvas为null');
  }

  private _toCanvasMouseEvent(
    evt: Event,
    type: EInputEventType,
  ): CanvasMouseEvent {
    const event = evt as MouseEvent;

    const mousePosition = this._viewportToCanvasCoordinate(event);
    const canvasMouseEvent = new CanvasMouseEvent(
      type,
      mousePosition,
      event.button,
      event.altKey,
      event.ctrlKey,
      event.shiftKey,
    );

    return canvasMouseEvent;
  }

  private _toCanvasKeyBoardEvent(
    evt: Event,
    type: EInputEventType,
  ): CanvasKeyBoardEvent {
    const event = evt as KeyboardEvent;
    const canvasKeyboardEvent = new CanvasKeyBoardEvent(
      type,
      event.key,
      event.keyCode,
      event.altKey,
      event.ctrlKey,
      event.shiftKey,
    );

    return canvasKeyboardEvent;
  }
}
