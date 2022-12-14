import { RenderState } from './RenderState';
export class RenderStateStack {
  public _stack = [new RenderState()];

  private get _currentState() {
    return this._stack[this._stack.length - 1];
  }

  public save() {
    this._stack.push(this._currentState.clone());
  }

  public restore() {
    this._stack.pop();
  }

  public get lineWidth() {
    return this._currentState.lineWidth;
  }

  public set lineWidth(value: number) {
    this._currentState.lineWidth = value;
  }

  public get strokeStyle() {
    return this._currentState.strokeStyle;
  }

  public get fillStyle() {
    return this._currentState.strokeStyle;
  }

  public set fillStyle(value: string) {
    this._currentState.strokeStyle = value;
  }

  public printCurrentStateInfo() {
    console.log(this._currentState.toString());
  }
}
