import { Math2D } from './canvas/math2d';
import {
  CanvasKeyBoardEvent,
  CanvasMouseEvent,
} from './canvas/CanvasKeyBoardEvent';
import { ApplicationTest } from './applicationTest';
export class Tank {
  width = 80;
  height = 50;
  x = 100;
  y = 100;
  scaleX = 1.0;
  scaleY = 1.0;
  tankRotation = 0;
  turretRotation = 0;
  initYAxis = true;
  showLine = false;
  showCoord = false;
  targetX = 0;
  turretRotateSpeed = Math2D.toRadian(2);
  targetY = 0;
  linearSpeed = 100.0;
  gunLength = Math.max(this.width, this.height);
  gunMuzzleRadius = 5;

  private _lookAt() {
    const diffX = this.targetX - this.x;
    const diffY = this.targetY - this.y;
    const radian = Math.atan2(diffY, diffX);
    this.tankRotation = radian;
  }

  private _moveTowardTo(intervalSec: number) {
    const diffX = this.targetX - this.x;
    const diffY = this.targetY - this.y;
    const currSpeed = this.linearSpeed * intervalSec;
    if (diffX * diffX + diffY * diffY > currSpeed * currSpeed) {
      this.x = this.x + Math.cos(this.tankRotation) * currSpeed;
      this.y = this.y + Math.sin(this.tankRotation) * currSpeed;
    }
  }

  onKeyPress(evt: CanvasKeyBoardEvent) {
    if (evt.key === 'r') {
      this.turretRotation += this.turretRotateSpeed;
    } else if (evt.key === 't') {
      this.turretRotation = 0;
    } else if (evt.key === 'e') {
      this.tankRotation -= this.turretRotateSpeed;
    }
  }

  update(intervalSrc: number) {
    this._moveTowardTo(intervalSrc);
  }

  onMouseMove(evt: CanvasMouseEvent) {
    this.targetX = evt.canvasPosition.x;
    this.targetY = evt.canvasPosition.y;
    this._lookAt();
  }

  draw(app: ApplicationTest) {
    if (app.context2D === null) return;
    app.context2D.save();
    app.context2D.translate(this.x, this.y);
    app.context2D.rotate(this.tankRotation);
    app.context2D.scale(this.scaleX, this.scaleY);
    app.context2D.save();
    app.context2D.fillStyle = 'grey';
    app.context2D.beginPath();
    app.context2D.rect(
      -this.width * 0.5,
      -this.height * 0.5,
      this.width,
      this.height,
    );
    app.context2D.fill();
    app.context2D.restore();
    app.context2D.save();
    app.context2D.rotate(this.turretRotation);
    app.context2D.fillStyle = 'red';
    app.context2D.beginPath();
    app.context2D.ellipse(0, 0, 15, 10, 0, 0, Math.PI * 2);
    app.context2D.fill();
    app.context2D.strokeStyle = 'blue';
    app.context2D.lineWidth = 5;
    app.context2D.lineCap = 'round';
    app.context2D.beginPath();
    app.context2D.moveTo(0, 0);
    app.context2D.lineTo(this.gunLength, 0);
    app.context2D.stroke();
    app.context2D.translate(this.gunLength, 0);
    app.fillCircle(0, 0, 5, 'black');
    app.context2D.restore();
    app.context2D.save();
    app.context2D.translate(this.width * 0.5, 0);
    app.fillCircle(0, 0, 1, 'green');
    app.context2D.restore();
    if (this.showCoord) {
      app.context2D.save();
      app.context2D.lineWidth = 1;
      app.context2D.lineCap = 'butt';
      app.strokeCoord(0, 0, this.width * 1.2, this.height * 1.2);
      app.context2D.restore();
    }
    app.context2D.restore();
  }
}
