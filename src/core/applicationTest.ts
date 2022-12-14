import { Canvas2DApplication } from './canvas/Canvas2DApplication';

export class ApplicationTest extends Canvas2DApplication {
  private _lineDashOffset = 0;
  private _radialGradient!: CanvasGradient;
  private _linearGradient!: CanvasGradient;

  public render() {
    // if (this.context2D !== null) {
    //   this.context2D.clearRect(
    //     0,
    //     0,
    //     this.context2D.canvas.width,
    //     this.context2D.canvas.height,
    //   );
    // }
    // this._drawRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);
  }

  fillLinearRect(x: number, y: number, w: number, h: number) {
    if (this.context2D !== null) {
      this.context2D.save();
      if (this._linearGradient === undefined) {
        this._linearGradient = this.context2D.createLinearGradient(
          x,
          y,
          x + w,
          y,
        );
        this._linearGradient.addColorStop(0.0, 'grey');
        this._linearGradient.addColorStop(0.25, 'rgba( 255 , 0 , 0 , 1 )');
        this._linearGradient.addColorStop(0.5, 'green');
        this._linearGradient.addColorStop(0.75, '#0000FF');
        this._linearGradient.addColorStop(1.0, 'black');
      }
      this.context2D.fillStyle = this._linearGradient;
      this.context2D.beginPath();
      this.context2D.rect(x, y, w, h);
      this.context2D.fill();
      this.context2D.restore();
    }
  }

  fillRadialRect(x: number, y: number, w: number, h: number) {
    if (this.context2D !== null) {
      this.context2D.save();
      if (this._radialGradient === undefined) {
        const centX = x + w * 0.5;
        const centY = y + h * 0.5;
        const radius = Math.min(w, h);
      }
    }
  }

  private _drawRect(x: number, y: number, w: number, h: number) {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.fillStyle = 'grey';
      this.context2D.strokeStyle = 'blue';
      this.context2D.beginPath();
      this.context2D.moveTo(x, y);
      this.context2D.lineTo(x + w, y);
      this.context2D.lineTo(x + w, y + h);
      this.context2D.lineTo(x, y + h);

      this.context2D.closePath();
      this.context2D.fill();
      this.context2D.stroke();
      this.context2D.restore();

      this.context2D.lineWidth = 2;
      this.context2D.setLineDash([10, 5]);
      this.context2D.lineDashOffset = this._lineDashOffset;
    }
  }

  private printLineStates() {
    if (this.context2D !== null) {
      console.log(
        '*****************************LineState*******************************',
      );
      console.log(`lineWidth${this.context2D.lineWidth}`);
      console.log(`lineCap${this.context2D.lineCap}`);
      console.log(`lineJoin${this.context2D.lineJoin}`);
      console.log(`miterLimit${this.context2D.miterLimit}`);
    }
  }

  private _updateLineDashOffset() {
    this._lineDashOffset++;
    if (this._lineDashOffset > 1000) {
      this._lineDashOffset = 0;
    }
  }

  timeCallback(id: number, data: any) {
    this._updateLineDashOffset();
    this.fillLinearRect(0, 0, 100, 30);
  }

  start(): void {
    this.addTimer(
      (id: number, data: any) => {
        this.timeCallback(id, data);
      },
      0.05,
      false,
      undefined,
    );
    super.start();
  }
}
