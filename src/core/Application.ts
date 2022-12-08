let start = 0;
let lastTime = 0;
let count = 0;

export class Application {
  // 标记当前Application是否进入不间断地循环状态
  protected _start = false;
  // 可以使用cancelAnimateionFrame(this._requestId)来取消动画循环
  protected _requestIdId = -1;
  //基于时间的物理更新
  protected _lastTime!: number;
  protected _startTime!: number;

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

  public isRunning() {
    return this._start;
  }

  update(elapsedMesc: number, intervalSec: number) {}

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
}
