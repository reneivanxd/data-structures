export interface IList<T> {
  add: (value: T) => void;
  insert: (value: T, index: number) => void;
  get: (index: number) => T;
  first: () => T;
  last: () => T;
  delete: (index: number) => void;
  indexOf: (value: T) => number;
  contains: (value: T) => boolean;
  size: () => number;
  isEmpty: () => boolean;
  clear: () => void;
  find: (predicate: (value: T, index: number) => boolean) => T;
  findIndex: (predicate: (value: T, index: number) => boolean) => number;
  forEach: (cb: (value: T, index: number) => void) => void;
}

class ListNode<T> {
  public data: T;
  public next: ListNode<T>;

  constructor(data: T, next: ListNode<T> = null) {
    this.data = data;
    this.next = next;
  }
}

export class LinkedList<T> implements IList<T> {
  private head: ListNode<T>;
  private tail: ListNode<T>;
  private count: number;

  public constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  public size(): number {
    return this.count;
  }

  public isEmpty(): boolean {
    return this.head === null;
  }

  public add(value: T): void {
    const newNode = new ListNode(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.count++;
  }

  public insert(value: T, index: number): void {
    if (index < 0 || index > this.count) {
      throw new Error(`Bad Index!`);
    }

    if (index === 0) {
      this.head = new ListNode(value, this.head);
      if (this.tail === null) {
        this.tail = this.head;
      }

      this.count++;
      return;
    }

    if (index === this.count) {
      return this.add(value);
    }

    const { prev, current } = this.getNodesByIndex(index);

    if (prev !== null) {
      prev.next = new ListNode(value, current);
      this.count++;
    }
  }

  public get(index: number): T {
    if (index < 0 || index >= this.count) {
      throw new Error("Bad Index!");
    }

    if (index === 0) {
      return this.head.data;
    }

    if (index === this.count - 1) {
      return this.tail.data;
    }

    const { current } = this.getNodesByIndex(index);

    if (current !== null) {
      return current.data;
    }

    return null;
  }

  public first(): T {
    return this.isEmpty() ? null : this.get(0);
  }

  public last(): T {
    return this.isEmpty() ? null : this.get(this.size() - 1);
  }

  public delete(index: number): void {
    if (index < 0 || index >= this.count) {
      throw new Error("Bad Index!");
    }

    if (index === 0) {
      if (this.head === this.tail) {
        this.head = this.tail = null;
      } else {
        this.head = this.head.next;
      }

      this.count--;
      return;
    }

    const { prev, current } = this.getNodesByIndex(index);

    if (prev !== null && current !== null) {
      prev.next = current.next;
      if (this.tail === current) {
        this.tail = prev;
      }
      this.count--;
    }
  }

  public indexOf(value: T): number {
    let current = this.head;
    let i = 0;

    while (current !== null) {
      if (current.data === value) {
        return i;
      }

      current = current.next;
      i++;
    }

    return -1;
  }

  public contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  public clear(): void {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  private getNodesByIndex(index: number): {
    prev: ListNode<T>;
    current: ListNode<T>;
  } {
    let current: ListNode<T> = this.head;
    let prev: ListNode<T> = null;

    for (let i = 0; i < index; i++) {
      if (current === null) {
        return { prev: null, current: null };
      }

      prev = current;
      current = current.next;
    }

    return { prev, current };
  }

  public forEach(cb: (value: T, index: number) => void): void {
    if (!cb) return;

    let current = this.head;
    let index = 0;

    while (current !== null) {
      cb(current.data, index);
      current = current.next;
      index++;
    }
  }

  public find(predicate: (value: T, index: number) => boolean): T {
    if (!predicate) return null;

    let current = this.head;
    let index = 0;

    while (current !== null && !predicate(current.data, index)) {
      current = current.next;
      index++;
    }

    return current === null ? null : current.data;
  }

  public findIndex(predicate: (value: T, index: number) => boolean): number {
    if (!predicate) return -1;

    let current = this.head;
    let index = 0;

    while (current !== null && !predicate(current.data, index)) {
      current = current.next;
      index++;
    }

    return current === null ? -1 : index;
  }

  public printList() {
    let list = "";

    let current = this.head;
    while (current !== null) {
      list += `${current.data} -> `;
      current = current.next;
    }

    list += "null";
    console.log(list);
  }
}
