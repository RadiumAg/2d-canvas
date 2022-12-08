import { CanvasInputEvent, EInputEventType } from './CanvasInputEvent';

export class CanvasMouseEvent extends CanvasInputEvent {
  public button: number;
  public canvasPosition: vec2;
  public canvasPosition: vec2;

  public constructor(
    canvasPos: vec2,
    button: number,
    altKey = false,
    ctrlKey = false,
    shiftKey = false,
  ) {
    super(altKey, ctrlKey, shiftKey);
    this.canvasPosition = canvasPos;
    this.button = button;
    this.localPosition = vec2.react();
  }
}

export class CanvasKeyBoardEvent extends CanvasInputEvent {
  public key: string;
  public keyCode: number;
  public repeat: boolean;

  public constructor(
    key: string,
    keyCode: number,
    repeat = false,
    altKey = false,
    ctrlKey = false,
    shiftKey = false,
  ) {
    super(altKey, ctrlKey, shiftKey, EInputEventType.KEYBOARDEVENT);
    this.key = key;
    this.keyCode = keyCode;
    this.repeat = repeat;
  }
}
