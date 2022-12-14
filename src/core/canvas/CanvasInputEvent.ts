export enum EInputEventType {
  MOUSEEVENT,
  MOUSEDOWN,
  MOUSEUP,
  MOUSEMOVE,
  MOUSEDRAG,
  KEYBOARDEVENT,
  KEYUP,
  KEYDOWN,
  KEYPRESS,
}

export class CanvasInputEvent {
  public altKey: boolean;
  public ctrlKey: boolean;
  public shiftKey: boolean;
  public type: EInputEventType;

  public constructor(
    altKey = false,
    ctrlKey = false,
    shiftKey = false,
    type = EInputEventType.MOUSEEVENT,
  ) {
    this.altKey = altKey;
    this.ctrlKey = ctrlKey;
    this.shiftKey = shiftKey;
    this.type = type;
  }
}
