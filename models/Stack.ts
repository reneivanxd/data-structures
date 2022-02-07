export interface IStack<T> {
  push: (value: T) => void;
  pop: () => T | null;
  peek: () => T | null;
  size: () => number;
  isEmpty: () => boolean;
  isFull: () => boolean;
}

export class Stack<T> implements IStack<T> {
  private static DEFAULT_SIZE = 50;

  private stack: T[];
  private count: number;
  private top: number;

  public constructor(size: number = Stack.DEFAULT_SIZE) {
    this.stack = new Array(size);
    this.count = 0;
    this.top = -1;
  }

  public size(): number {
    return this.count;
  }

  public isEmpty(): boolean {
    return this.count === 0;
  }

  public isFull(): boolean {
    return this.count === this.stack.length;
  }

  public push(value: T): void {
    if (this.isFull()) {
      throw new Error("stack is full");
    }

    this.stack[++this.top] = value;
    this.count++;
  }

  public pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const temp = this.stack[this.top];
    delete this.stack[this.top];
    this.top--;
    this.count--;

    return temp;
  }

  public peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    return this.stack[this.top];
  }

  public printStack(): void {
    console.log(this.stack);
  }
}
