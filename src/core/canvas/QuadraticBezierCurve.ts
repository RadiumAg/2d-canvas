import { ApplicationTest } from '../applicationTest';
import { vec2 } from './math2d';

export class QuadraticBezierCurve {
  protected _startAnchorPoint: vec2;
  protected _endAnchorPoint: vec2;
  protected _controlPoint0: vec2;
  protected _drawLine: boolean;
  protected _lineColor: string;
  protected _lineWidth: number;
  protected _radiusOrLen: number;
  protected _points: Array<vec2>;

  constructor(start: vec2, control: vec2, end: vec2) {
    this._startAnchorPoint = start;
    this._endAnchorPoint = end;
    this._controlPoint0 = control;
    this._drawLine = true;
    this._lineColor = 'black';
    this._lineWidth = 1;
    this._radiusOrLen = 5;
  }

  draw(app: ApplicationTest) {
    if (app.context2D !== null) {
      app.context2D.save();
      app.context2D.lineWidth = this._lineWidth;
      app.context2D.strokeStyle = this._lineColor;

      app.context2D.beginPath();
      app.context2D.moveTo(this._points[0].x, this._points);
    }
  }
}
