export interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => T | null;
  peek: () => T | null;
  size: () => number;
  isEmpty: () => boolean;
  isFull: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private static DEFAULT_SIZE = 50;

  private queue: T[];
  private count: number;
  private front: number;
  private rear: number;

  public constructor(size: number = Queue.DEFAULT_SIZE) {
    this.queue = new Array<T>(size);
    this.count = 0;
    this.front = 0;
    this.rear = 0;
  }

  public size(): number {
    return this.count;
  }

  public isEmpty(): boolean {
    return this.front === this.rear;
  }

  public isFull(): boolean {
    return (
      (this.front === 0 && this.rear === this.queue.length - 1) ||
      this.rear === this.front - 1
    );
  }

  public peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    return this.queue[this.front];
  }

  public enqueue(value: T): void {
    if (this.isFull()) {
      throw new Error("Queue is Full");
    }

    this.queue[this.rear] = value;
    this.rear++;
    this.count++;

    if (this.rear >= this.queue.length) {
      this.rear = 0;
    }
  }

  public dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const temp = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    this.count--;

    if (this.front >= this.queue.length) {
      this.front = 0;
    }

    return temp;
  }

  public printQueue(): void {
    console.log({ queue: this.queue, front: this.front, rear: this.rear });
  }
}
