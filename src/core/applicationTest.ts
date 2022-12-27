import {
  CanvasKeyBoardEvent,
  CanvasMouseEvent,
} from './canvas/CanvasKeyBoardEvent';
import { EImageFillType, ELayout } from './canvas/Application';
import { Canvas2DApplication } from './canvas/Canvas2DApplication';
import { Math2D, Rectangle, Size, vec2 } from './canvas/math2d';
import { Tank } from './Tank';

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
  private _mouseX = 0;
  private _mouseY = 0;
  private _tank: Tank;
  private _radialGradient!: CanvasGradient;
  private _linearGradient!: CanvasGradient;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this._tank = new Tank();
    this._tank.x = canvas.width * 0.5;
    this._tank.y = canvas.height * 0.5;
    this.isSupportMouseMove = true;
  }

  drawTank() {
    this._tank.draw(this);
  }

  dispatchKeyPress(evt: CanvasKeyBoardEvent) {
    this._tank.onKeyPress(evt);
  }

  dispatchMouseMove(evt: CanvasMouseEvent) {
    this._mouseX = evt.canvasPosition.x;
    this._mouseY = evt.canvasPosition.y;
    this._tank.onMouseMove(evt);
  }

  render() {
    if (this.context2D !== null) {
      let centX: number;
      this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.strokeGrid();
      this.drawCanvasCoordCenter();
      this.draw4Quadrant();
      this.drawTank();

      this.drawCoordInfo(
        `坐标[${(this._mouseX - this._tank.x).toFixed(2)},${(
          this._mouseY - this._tank.y
        ).toFixed(2)}] 角度${Math2D.toDegree(this._tank.tankRotation).toFixed(
          2,
        )}`,
        this._mouseX,
        this._mouseY,
      );
    }
  }

  doTransform(degree: number, rotateFirst = true) {
    if (this.context2D !== null) {
      const radians = Math2D.toRadian(degree);
      this.context2D.save();

      if (rotateFirst) {
        this.context2D.rotate(radians);
        this.context2D.translate(
          this.canvas.width * 0.5,
          this.canvas.height * 0.5,
        );
      } else {
        this.context2D.translate(
          this.canvas.width * 0.5,
          this.canvas.height * 0.5,
        );

        this.context2D.rotate(radians);
      }

      this.fillRectWithTitle(0, 0, 100, 60, `+${degree}度旋转`);
      this.context2D.restore();
      this.context2D.save();

      if (rotateFirst) {
        this.context2D.rotate(-radians);
        this.context2D.translate(
          this.canvas.width * 0.5,
          this.canvas.height * 0.5,
        );
      } else {
        this.context2D.translate(
          this.canvas.width * 0.5,
          this.canvas.height * 0.5,
        );
        this.context2D.rotate(-radians);
      }
      this.fillRectWithTitle(0, 0, 100, 60, `-${degree}度旋转`);
      this.context2D.restore();
    }
  }

  doLocalTransform() {
    if (this.context2D === null) {
      return;
    }

    const width = 100;
    const height = 60;

    const coordWidth = width * 1.2;
    const coordHeight = height * 1.2;
    const radius = 5;
    this.context2D.save();
    this.context2D.restore();
  }

  static Colors = [
    'aqua', //浅绿色
    'black', //黑色
    'blue', //蓝色
    'fuchsia', //紫红色
    'gray', //灰色
    'green', //绿色
    'lime', //绿黄色
    'maroon', //褐红色
    'navy', //海军蓝
    'olive', //橄榄色
    'orange', //橙色
    'purple', //紫色
    'red', //红色
    'silver', //银灰色
    'teal', //蓝绿色
    'yellow', //黄色
    'white', //白色
  ];

  setShadowState(
    shadowBlur = 5,
    showColor = 'rgba(127,127,127,0.5)',
    shadowOffsetX = 10,
    shadowOffsetY = 10,
  ) {
    if (this.context2D !== null) {
      this.context2D.shadowBlur = shadowBlur;
      this.context2D.shadowColor = showColor;
      this.context2D.shadowOffsetX = shadowOffsetX;
      this.context2D.shadowOffsetY = shadowOffsetY;
    }
  }

  drawCanvasCoordCenter() {
    if (this.context2D === null) {
      return;
    }

    const halfWidth = this.canvas.width * 0.5;
    const halfHeight = this.canvas.height * 0.5;

    this.context2D.save();
    this.context2D.lineWidth = 2;
    this.context2D.strokeStyle = 'rgba(255,0,0,0.5)';
    this.strokeLine(0, halfHeight, this.canvas.width, halfHeight);
    this.strokeLine(halfWidth, 0, halfWidth, this.canvas.height);
    this.context2D.restore();
    this.fillCircle(halfWidth, halfHeight, 5, 'rgba(0,0,0,0.5)');
  }

  drawCoordInfo(info: string, x: number, y: number) {
    this.fillText(info, x, y, 'black', 'center', 'bottom');
  }

  distance(x0: number, y0: number, x1: number, y1: number) {
    const diffX = x1 - x0;
    const diffY = y1 - y0;
    return Math.sqrt(diffX * diffX + diffY * diffY);
  }

  testChangePartCanvasImageData(
    rRow = 2,
    rColum = 0,
    cRow = 1,
    cColumn = 0,
    size = 32,
  ) {
    const colorCanvas = this.getColorCanvas(size);
    const context = colorCanvas.getContext('2d');
    if (context === null) {
      throw new Error('Canvas获取渲染上下文失败!');
    }

    this.drawImage(
      colorCanvas,
      Rectangle.create(100, 100, colorCanvas.width, colorCanvas.height),
    );

    let imgData = context.createImageData(size, size);
    const data = imgData.data;
    const rgbaCount = data.length / 4;
    for (let i = 0; i < rgbaCount; i++) {
      data[i * 4 + 0] = 255;
      data[i * 4 + 1] = 0;
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = 255;
    }
    context.putImageData(imgData, size * rColum, size * rRow, 0, 0, size, size);
    imgData = context.getImageData(size * cColumn, size * cRow, size, size);
    let component = 0;
    for (let i = 0; i < imgData.width; i++) {
      for (let j = 0; j < imgData.height; j++) {
        for (let k = 0; k < 4; k++) {
          const idx: number = (i * imgData.height + j) * 4 + k;
          component = data[idx];
          if (idx % 4 !== 3) {
            data[idx] = 255 - component;
          }
        }
      }
    }
    context.putImageData(
      imgData,
      size * cColumn,
      size * cRow,
      0,
      0,
      size,
      size,
    );
    this.drawImage(
      colorCanvas,
      Rectangle.create(300, 100, colorCanvas.width, colorCanvas.height),
    );
  }

  getColorCanvas(amount = 32) {
    const step = 4;
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = amount * step;
    canvas.height = amount * step;
    const context = canvas.getContext('2d');
    if (context === null) {
      throw new Error('离屏Canvas获取上下文失败');
    }

    for (let i = 0; i < step; i++) {
      for (let j = 0; j < step; j++) {
        const idx = step * i + j;
        context.save();
        context.fillStyle = ApplicationTest.Colors[idx];
        context.fillRect(i * amount, j * amount, amount, amount);
        context.restore();
      }
    }
    return canvas;
  }

  drawColorCanvas() {
    const colorCanvas = this.getColorCanvas();
    this.drawImage(
      colorCanvas,
      Rectangle.create(100, 100, colorCanvas.width, colorCanvas.height),
    );
  }

  fillRectangleWithColor(rect: Rectangle, color: string) {
    if (rect.isEmpty()) return;
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.fillStyle = color;
      this.context2D.fillRect(
        rect.origin.x,
        rect.origin.y,
        rect.size.width,
        rect.size.height,
      );
      this.context2D.restore();
    }
  }

  drawImage(
    img: HTMLImageElement | HTMLCanvasElement,
    destRect: Rectangle,
    srcRect = Rectangle.create(0, 0, img.width, img.height),
    fillType = EImageFillType.STRETCH,
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
    } else {
      this.fillRectangleWithColor(destRect, 'grey');
      let rows = Math.ceil(destRect.size.width / srcRect.size.height);
      let columns = Math.ceil(destRect.size.height / srcRect.size.height);
      let left = 0;
      let top = 0;
      let right = 0;
      let bottom = 0;
      let width = 0;
      let height = 0;
      const destRight = destRect.origin.x + destRect.size.width;
      const destBottom = destRect.origin.y + destRect.size.height;
      if (fillType === EImageFillType.REPEAT_X) {
        columns = 1;
      } else if (fillType === EImageFillType.REPEAT_Y) {
        rows = 1;
      }

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          left = destRect.origin.x + i * srcRect.size.width;
          top = destRect.origin.y + j * srcRect.size.height;
          width = srcRect.size.width;
          height = srcRect.size.height;
          right = left + width;
          bottom = top + height;

          if (right > destRight) {
            width = srcRect.size.width - (right - destRight);
          }

          if (bottom > destBottom) {
            height = srcRect.size.height - (bottom - destBottom);
          }

          this.context2D.drawImage(
            img,
            srcRect.origin.x,
            srcRect.origin.y,
            width,
            height,
            left,
            top,
            width,
            height,
          );
        }
      }
    }

    return true;
  }

  fillLocalRectWithTitle(
    width: number,
    height: number,
    title = '',
    referencePt = ELayout.CENTER_MIDDLE,
    layout = ELayout.CENTER_MIDDLE,
    color = 'grey',
    showCoord = false,
  ) {
    if (this.context2D !== null) {
      let x = 0;
      let y = 0;

      switch (referencePt) {
        case ELayout.LEFT_TOP:
          x = 0;
          y = 0;
          break;

        case ELayout.LEFT_MIDDLE:
          x = 0;
          y = -height * 0.5;
          break;

        case ELayout.LEFT_BOTTOM:
          x = 0;
          y = -height;
          break;

        case ELayout.RIGHT_TOP:
          x = -width;
          y = 0;
          break;

        case ELayout.RIGHT_MIDDLE:
          x = -width;
          y = -height * 0.5;
          break;

        case ELayout.RIGHT_BOTTOM:
          x = -width;
          y = -height;
          break;

        case ELayout.CENTER_MIDDLE:
          x = -width * 0.5;
          y = -height * 0.5;
          break;

        case ELayout.CENTER_BOTTOM:
          x = -width * 0.5;
          y = -height;
          break;

        case ELayout.CENTER_TOP:
          x = -width * 0.5;
          y = 0;
          break;
      }

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
          'rgba(0,0,,0,0.5)',
        );
        this.fillCircle(x + rect.origin.x, y + rect.origin.y, 2);

        if (showCoord) {
          this.strokeCoord(0, 0, width + 20, height + 20);
          this.fillCircle(0, 0, 3);
        }
      }
    }
  }

  draw4Quadrant() {
    if (this.context2D === null) return;
    this.context2D.save();
    this.fillText(
      '第一象限',
      this.canvas.width,
      this.canvas.height,
      'rgba(0,0,255,0.5)',
      'right',
      'bottom',
      '20px sans-serif',
    );

    this.fillText(
      '第二象限',
      0,
      this.canvas.height,
      'rgba(0,0,255,0.5)',
      'left',
      'bottom',
      '20px sans-serif',
    );

    this.fillText(
      '第三象限',
      0,
      0,
      'rgba(0,0,255,0.5)',
      'left',
      'top',
      '20px sans-serif',
    );

    this.fillText(
      '第四象限',
      this.canvas.width,
      0,
      'rgba(0,0,255,0.5)',
      'right',
      'top',
      '20px sans-serif',
    );

    this.context2D.restore();
  }

  fillLocalRectWithTitleUV(
    width: number,
    height: number,
    title = '',
    u = 0,
    v = 0,
    layout = ELayout.CENTER_MIDDLE,
    color = 'grey',
    showCoord = true,
  ) {
    if (this.context2D !== null) {
      const x = -width * u;
      const y = -height * v;
    }
  }

  rotateTranslate(
    degree: number,
    layout = ELayout.LEFT_TOP,
    width = 40,
    height = 20,
  ) {
    if (this.context2D === null) return;
    const radians = Math2D.toRadian(degree);
    this.context2D.save();
    this.context2D.rotate(radians);
    this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
    this.fillLocalRectWithTitle(width, height, '', layout);
    this.context2D.restore();
  }

  strokeCircle(
    x: number,
    y: number,
    radius: number,
    color = 'red',
    lineWidth = 1,
  ): void {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.strokeStyle = color;
      this.context2D.lineWidth = lineWidth;
      this.context2D.beginPath();
      this.context2D.arc(x, y, radius, 0, Math.PI * 2);
      this.context2D.stroke();
      this.context2D.restore();
    }
  }

  testFillLocalRectWithTitle() {
    if (this.context2D !== null) {
      this.rotateTranslate(0, ELayout.LEFT_TOP);
      this.rotateTranslate(10, ELayout.LEFT_MIDDLE);
      this.rotateTranslate(20, ELayout.LEFT_BOTTOM);
      this.rotateTranslate(30, ELayout.CENTER_TOP);
      this.rotateTranslate(40, ELayout.CENTER_MIDDLE);
      this.rotateTranslate(-10, ELayout.CENTER_BOTTOM);
      this.rotateTranslate(-20, ELayout.RIGHT_TOP);
      this.rotateTranslate(-30, ELayout.RIGHT_MIDDLE);
      this.rotateTranslate(-40, ELayout.RIGHT_BOTTOM);
      const radius = this.distance(
        0,
        0,
        this.canvas.width * 0.5,
        this.canvas.height * 0.5,
      );
      this.strokeCircle();
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
    layout: ELayout,
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
      case ELayout.LEFT_BOTTOM:
        o.x = left;
        o.y = bottom;
        break;

      case ELayout.LEFT_TOP:
        o.x = left;
        o.y = top;
        break;

      case ELayout.RIGHT_TOP:
        o.x = right;
        o.y = top;
        break;

      case ELayout.RIGHT_BOTTOM:
        o.x = right;
        o.y = bottom;
        break;

      case ELayout.CENTER_MIDDLE:
        o.x = center;
        o.y = middle;
        break;

      case ELayout.CENTER_TOP:
        o.x = center;
        o.y = 0;
        break;

      case ELayout.RIGHT_MIDDLE:
        o.x = right;
        o.y = middle;
        break;

      case ELayout.CENTER_BOTTOM:
        o.x = center;
        o.y = bottom;
        break;

      case ELayout.LEFT_MIDDLE:
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
    layout = ELayout.CENTER_BOTTOM,
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
        ELayout.LEFT_TOP,
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
        ELayout.RIGHT_TOP,
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
        ELayout.RIGHT_BOTTOM,
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
        ELayout.LEFT_BOTTOM,
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
        ELayout.CENTER_MIDDLE,
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
        ELayout.CENTER_TOP,
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
        ELayout.RIGHT_MIDDLE,
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
        ELayout.CENTER_BOTTOM,
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
        ELayout.LEFT_MIDDLE,
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
