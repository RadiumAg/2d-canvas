export class Canvas2D {
  public context!: CanvasRenderingContext2D;

  public constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (context) {
      this.context = context;
    }
  }

  public drawText(text: string) {
    this.context.save();
    this.context.textAlign = 'center';
    const centerX = this.context.canvas.width * 0.5;
    const centerY = this.context.canvas.height * 0.5;
    this.context.fillText(text, centerX, centerY);
    this.context.strokeStyle = 'green';
    this.context.strokeText(text, centerX, centerY);
    this.context.restore();
  }
}
