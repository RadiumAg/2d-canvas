import { Application } from './Application';

export class Canvas2DApplication extends Application {
  public context2D: CanvasRenderingContext2D | null;

  public constructor(
    canvas: HTMLCanvasElement,
    contextAttributes?: CanvasRenderingContext2DSettings,
  ) {
    super(canvas);

    this.context2D = this.canvas.getContext('2d', contextAttributes);
  }
}

export class WebGLApplication extends Application {
  public context3D: WebGLRenderingContext | null;

  public constructor(
    canvas: HTMLCanvasElement,
    contextAttributes?: WebGLContextAttributes,
  ) {
    super(canvas);
    this.context3D = this.canvas.getContext('webgl', contextAttributes);
  }
}
