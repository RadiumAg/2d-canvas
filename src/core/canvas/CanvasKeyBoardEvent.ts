import { vec2 } from './math2d';
import { CanvasInputEvent, EInputEventType } from './CanvasInputEvent';

export class CanvasMouseEvent extends CanvasInputEvent {
  public button: number;
  public canvasPosition: vec2;
  public localPosition: vec2;
  public hasLocalPosition: boolean;

  public constructor(
    type: EInputEventType,
    canvasPos: vec2,
    button: number,
    altKey = false,
    ctrlKey = false,
    shiftKey = false,
  ) {
    super(altKey, ctrlKey, shiftKey);
    this.canvasPosition = canvasPos;
    this.button = button;
    this.localPosition = vec2.create();
    this.hasLocalPosition = false;
  }
}

export class CanvasKeyBoardEvent extends CanvasInputEvent {
  public key: string;
  public keyCode: number;
  public repeat: boolean;

  public constructor(
    type: EInputEventType,
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
