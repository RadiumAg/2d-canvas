export interface IEnumerator<T> {
  reset(): void;
  moveNext(): boolean;
  readonly current: T;
}
