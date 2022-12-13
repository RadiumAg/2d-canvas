export type TimerCallback = (id: number, data: any) => void;

export class Timer {
  public id = -1;
  public enabled = false;
  public callback: TimerCallback;
  public countdown = 0;
  public timeout = 0;
  public onlyOnce = false;

  constructor(callback: TimerCallback) {
    this.callback = callback;
  }
}
