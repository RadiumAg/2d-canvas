export class RenderState {
  public lineWidth = 1;
  public strokeStyle = 'red';
  public fillStyle = 'green';

  public clone() {
    const state = new RenderState();
    state.lineWidth = this.lineWidth;
    state.strokeStyle = this.strokeStyle;
    state.fillStyle = this.fillStyle;
    return state;
  }

  public toString() {
    return JSON.stringify(this, null, '');
  }
}
