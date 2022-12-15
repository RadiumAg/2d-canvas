import { ETextLayout } from './canvas/Application';
import { Canvas2DApplication } from './canvas/Canvas2DApplication';
import { Rectangle, Size, vec2 } from './canvas/math2d';

type Repeatition = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';

type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end';

type TextBaseline = 'alphabetic' | 'hanging' | 'top' | 'middle' | 'bottom';

type FontType =
  | '10px sans-serif'
  | '15px sans-serif'
  | '20px sans-serif'
  | '25px sans-serif';

export class ApplicationTest extends Canvas2DApplication {
  private _lineDashOffset = 0;
  private _pattern!: CanvasPattern;
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

  calcTextSize(text: string, char = 'W', scale = 0.5) {
    if (this.context2D !== null) {
      const size = new Size();
      size.width = this.context2D.measureText(text).width;
      const w = this.context2D.measureText(char).width;
      size.height = w + w * scale;
      return size;
    }
    throw new Error('context2D 渲染上下文为null');
  }

  calcLocalTextRectangle(
    layout: ETextLayout,
    text: string,
    parentWidth: number,
    parentHeight: number,
  ) {
    const s = this.calcTextSize(text);
    const o = vec2.create();
    const left = 0;
    const top = 0;
    const right = parentWidth - s.width;
    const bottom = parentHeight - s.height;
    const center = right * 0.5;
    const middle = bottom * 0.5;

    switch (layout) {
      case ETextLayout.LEFT_TOP:
        o.x = left;
        o.y = top;
        break;

      case ETextLayout.RIGHT_TOP:
        o.x = right;
        o.y = top;
        break;

      case ETextLayout.RIGHT_BOTTOM:
        o.x = right;
        o.y = bottom;
        break;

      case ETextLayout.CENTER_MIDDLE:
        o.x = center;
        o.y = middle;
        break;

      case ETextLayout.CENTER_TOP:
        o.x = center;
        o.y = 0;
        break;

      case ETextLayout.RIGHT_MIDDLE:
        o.x = right;
        o.y = middle;
        break;

      case ETextLayout.CENTER_BOTTOM:
        o.x = center;
        o.y = bottom;
        break;

      case ETextLayout.LEFT_MIDDLE:
        o.x = left;
        o.y = middle;
        break;
    }

    return new Rectangle(o, s);
  }

  fillRectWithText() {}

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

  fillPatternRect(
    x: number,
    y: number,
    w: number,
    h: number,
    repeat: Repeatition = 'repeat',
  ) {
    if (this.context2D !== null) {
      if (this._pattern === undefined) {
        const img = document.createElement('img') as HTMLImageElement;
        img.src = './data/test.jpg';
        img.addEventListener('load', () => {
          if (!this.context2D) return;
          this._pattern =
            this.context2D.createPattern(img, repeat) || this._pattern;
          this.context2D?.save();
          this.context2D.fillStyle = this._pattern;
          this.context2D?.beginPath();
          this.context2D?.rect(x, y, w, h);
          this.context2D?.fill();
          this.context2D?.restore();
        });
      } else {
        this.context2D.save();
        this.context2D.fillStyle = this._pattern;
        this.context2D.beginPath();
        this.context2D.rect(x, y, w, h);
        this.context2D.fill();
      }
      this.context2D.restore();
    }
  }

  fillText(
    text: string,
    x: number,
    y: number,
    color = 'white',
    align: TextAlign = 'left',
    baseline: TextBaseline = 'top',
    font: FontType = '10px sans-serif',
  ) {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.textAlign = align;
      this.context2D.font = font;
      this.context2D.textBaseline = baseline;
      this.context2D.fillStyle = color;
      this.context2D.fillText(text, x, y);
      this.context2D.restore();
    }
  }

  fillCircle(
    x: number,
    y: number,
    radius: number,
    fillStyle: string | CanvasGradient | CanvasPattern = 'red',
  ) {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.fillStyle = fillStyle;
      this.context2D.beginPath();
      this.context2D.arc(x, y, radius, 0, Math.PI * 2);
      this.context2D.fill();
      this.context2D.restore();
    }
  }

  public strokeLine(x0: number, y0: number, x1: number, y1: number) {
    if (this.context2D !== null) {
      this.context2D.beginPath();
      this.context2D.moveTo(x0, y0);
      this.context2D.lineTo(x1, y1);
      this.context2D.stroke();
    }
  }

  public strokeCoord(
    orginX: number,
    orginY: number,
    width: number,
    height: number,
  ) {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.strokeStyle = 'red';
      this.strokeLine(orginX, orginY, orginX + width, orginY);
      this.context2D.strokeStyle = 'blue';
      this.strokeLine(orginX, orginY, orginX, orginY + height);
      this.context2D.restore();
    }
  }

  fillRadialRect(x: number, y: number, w: numbers, h: number) {
    if (this.context2D !== null) {
      this.context2D.save();
      if (this._radialGradient === undefined) {
        const centX = x + w * 0.5;
        const centY = y + h * 0.5;
        let radius = Math.min(w, h);
        radius *= 0.5;
        this._radialGradient = this.context2D.createRadialGradient(
          centX,
          centY,
          radius * 0.3,
          centX,
          centY,
          radius,
        );
        this._radialGradient.addColorStop(0.0, 'black');
        this._radialGradient.addColorStop(0.25, 'rgba(255,0,0,1)');
        this._radialGradient.addColorStop(0.5, 'green');
        this._radialGradient.addColorStop(0.75, '#0000F');
        this._radialGradient.addColorStop(1.0, 'white');
      }
      this.context2D.fillStyle = this._radialGradient;
      this.context2D.fillRect(x, y, w, h);
      this.context2D.restore();
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
    this.strokeGrid();
  }

  strokeGrid(color = 'grey', interval = 10) {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.strokeStyle = color;
      this.context2D.lineWidth = 0.5;
      for (let i = interval + 0.5; i < this.canvas.width; i += interval) {
        this.strokeLine(i, 0, i, this.canvas.height);
      }

      for (let i = interval + 0.5; i < this.canvas.height; i += interval) {
        this.strokeLine(0, i, this.canvas.width, i);
      }

      this.context2D.restore();
      this.fillCircle(0, 0, 5, 'green');
      this.strokeCoord(0, 0, this.canvas.width, this.canvas.height);
    }
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
