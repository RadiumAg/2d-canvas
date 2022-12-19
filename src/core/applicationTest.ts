import { EImageFillType, ETextLayout } from './canvas/Application';
import { Canvas2DApplication } from './canvas/Canvas2DApplication';
import { Rectangle, Size, vec2 } from './canvas/math2d';

type Repeatition = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';

type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end';

type TextBaseline = 'alphabetic' | 'hanging' | 'top' | 'middle' | 'bottom';

type FontStyle = 'normal' | 'italic' | 'oblique';

type FontVariant = 'normal' | 'small-caps';

type FontWeight =
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type FontSize =
  | '10px'
  | '12px'
  | '16px'
  | '18px'
  | '24px'
  | '50%'
  | '75%'
  | '100%'
  | '125%'
  | '150%'
  | 'xx-small'
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large';

type FontFamily = 'sans-serif' | 'serif' | 'courier' | 'fantasy' | 'monospace';

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

  drawImage(
    img: HTMLImageElement,
    destRect: Rectangle,
    srcRect = Rectangle.create(0, 0, img.width, img.height),
    fillType: EImageFillType.STRETCH,
  ) {
    if (this.context2D === null) {
      return false;
    }
    if (srcRect.isEmpty()) {
      return false;
    }

    if (destRect.isEmpty()) {
      return false;
    }

    if (fillType === EImageFillType.STRETCH) {
      this.context2D.drawImage(
        img,
        srcRect.origin.x,
        srcRect.origin.y,
        srcRect.size.width,
        srcRect.size.height,
        destRect.origin.x,
        destRect.origin.y,
        destRect.size.width,
        destRect.size.height,
      );
    }
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
      case ETextLayout.LEFT_BOTTOM:
        o.x = left;
        o.y = bottom;
        break;

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

  strokeRect(x: number, y: number, w: number, h: number, color = 'black') {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.strokeStyle = color;
      this.context2D.beginPath();
      this.context2D.moveTo(x, y);
      this.context2D.lineTo(x + w, y);
      this.context2D.lineTo(x + w, y + h);
      this.context2D.lineTo(x, y + h);
      this.context2D.closePath();
      this.context2D.stroke();
      this.context2D.restore();
    }
  }

  loadAndDrawImage(url: string) {
    const img = document.createElement('img') as HTMLImageElement;
    img.src = url;

    img.addEventListener('load', () => {
      if (this.context2D !== null) {
        console.log(`${url}尺寸为[${img.width},${img.height}]`);
        this.context2D.drawImage(img, 10, 10);
        this.context2D.drawImage(img, img.width + 30, 10, 200, img.height);
        this.context2D.drawImage(
          img,
          44,
          6,
          162,
          175,
          200,
          img.height + 300,
          200,
          130,
        );
      }
    });
  }

  fillRectWithTitle(
    x: number,
    y: number,
    width: number,
    height: number,
    title = '',
    layout = ETextLayout.CENTER_BOTTOM,
    color = 'grey',
    showCoord = true,
  ) {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.fillStyle = color;
      this.context2D.beginPath();
      this.context2D.rect(x, y, width, height);
      this.context2D.fill();

      if (title.length > 0) {
        const rect = this.calcLocalTextRectangle(layout, title, width, height);
        this.fillText(
          title,
          x + rect.origin.x,
          y + rect.origin.y,
          'white',
          'left',
          'top',
          '10px sans-serif',
        );

        this.strokeRect(
          x + rect.origin.x,
          y + rect.origin.y,
          rect.size.width,
          rect.size.height,
          'rgba(0,0,0,0.5)',
        );

        this.fillCircle(x + rect.origin.x, y + rect.origin.y, 2);

        if (showCoord) {
          this.strokeCoord(x, y, width + 20, height + 20);
        }
        this.context2D.restore();
      }
    }
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

  public makeFontString(
    size: FontSize = '10px',
    weight: FontWeight = 'normal',
    style: FontStyle = 'normal',
    variant: FontVariant = 'normal',
    family: FontFamily = 'sans-serif',
  ): string {
    const strs: string[] = [];
    strs.push(style, variant, weight, size, family);
    const ret: string = strs.join(' ');
    console.log(ret);
    return ret;
  }

  testMyTextLayout(
    font: string = this.makeFontString(
      '10px',
      'normal',
      'normal',
      'normal',
      'sans-serif',
    ),
  ) {
    const x = 20;
    const y = 20;
    const width: number = this.canvas.width - x * 2;
    const height: number = this.canvas.height - y * 2;
    const right: number = x + width;
    const bottom: number = y + height;

    let drawX: number = x;
    let drawY: number = y;
    const drawWidth = 150;
    const drawHeight = 50;

    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.font = font;
      this.fillRectWithTitle(x, y, width, height);
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'left-top',
        ETextLayout.LEFT_TOP,
        'rgba( 255 , 255 , 0 , 0.2 )',
      );
      drawX = right - drawWidth;
      drawY = y;
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'right-top',
        ETextLayout.RIGHT_TOP,
        'rgba( 255 , 255 , 0 , 0.2 )',
      );
      drawX = right - drawWidth;
      drawY = bottom - drawHeight;
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'right-bottom',
        ETextLayout.RIGHT_BOTTOM,
        'rgba( 255 , 255 , 0 , 0.2 )',
      );
      drawX = x;
      drawY = bottom - drawHeight;
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'left-bottom',
        ETextLayout.LEFT_BOTTOM,
        'rgba( 255 , 255 , 0 , 0.2 )',
      );
      drawX = (right - drawWidth) * 0.5;
      drawY = (bottom - drawHeight) * 0.5;
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'center-middle',
        ETextLayout.CENTER_MIDDLE,
        'rgba( 255 , 0 , 0 , 0.2 )',
      );
      drawX = (right - drawWidth) * 0.5;
      drawY = y;
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'center-top',
        ETextLayout.CENTER_TOP,
        'rgba( 0 , 255 , 0 , 0.2 )',
      );
      drawX = right - drawWidth;
      drawY = (bottom - drawHeight) * 0.5;
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'right-middle',
        ETextLayout.RIGHT_MIDDLE,
        'rgba( 0 , 255 , 0 , 0.2 )',
      );
      drawX = (right - drawWidth) * 0.5;
      drawY = bottom - drawHeight;
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'center-bottom',
        ETextLayout.CENTER_BOTTOM,
        'rgba( 0 , 255 , 0 , 0.2 )',
      );
      drawX = x;
      drawY = (bottom - drawHeight) * 0.5;
      this.fillRectWithTitle(
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        'left-middle',
        ETextLayout.LEFT_MIDDLE,
        'rgba( 0 , 255 , 0 , 0.2 )',
      );
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
