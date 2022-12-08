export enum EInputEventType {
  MOUSEEVENT, // 鼠标事件
  MOUSEDOWN, //鼠标按下事件
  MOUSEUP, //鼠标弹起事件
  MOUSEDRAG, //鼠标拖动事件
  KEYBOARDEVENT, //总类，表示键盘事件
  KEYUP, // 键弹起事件
  KEYDOWN, // 键按下事件
  KEYPRESS, //按键事件
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
