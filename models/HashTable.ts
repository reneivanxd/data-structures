import { IList, LinkedList } from "./List";

export interface IHashTable<TKey, TValue> {
  set(key: TKey, value: TValue): void;
  get(key: TKey): TValue;
  contains(key: TKey): boolean;
  remove(key: TKey): void;
  length(): number;
}

class KeyValuePair<TKey, TValue> {
  public key: TKey;
  public value: TValue;

  public constructor(key: TKey, value: TValue) {
    this.key = key;
    this.value = value;
  }
}

export class HashTable<TKey, TValue> implements IHashTable<TKey, TValue> {
  private static SIZE: number = 37;
  private table: Array<IList<KeyValuePair<TKey, TValue>>>;
  private _length: number;

  public constructor(size: number = HashTable.SIZE) {
    this.table = new Array(size);
    this._length = 0;
  }

  set(key: TKey, value: TValue): void {
    const index = this.getHash(key);

    if (this.table[index] === undefined) {
      this.table[index] = new LinkedList<KeyValuePair<TKey, TValue>>();
      this.table[index].add(new KeyValuePair(key, value));
      this._length++;
      return;
    }

    const existing = this.table[index].find((pair) => pair.key === key);
    if (existing === null) {
      this.table[index].add(new KeyValuePair(key, value));
      this._length++;
      return;
    }

    existing.value = value;
  }

  get(key: TKey): TValue {
    const index = this.getHash(key);

    if (this.table[index] === undefined) {
      return null;
    }

    const existing = this.table[index].find((pair) => pair.key === key);
    if (existing === null) {
      return null;
    }

    return existing.value;
  }

  contains(key: TKey): boolean {
    return this.get(key) !== null;
  }

  remove(key: TKey): void {
    const index = this.getHash(key);

    if (this.table[index] === undefined) {
      return;
    }

    const existing = this.table[index].findIndex((pair) => pair.key === key);
    if (existing === -1) {
      return;
    }

    this.table[index].delete(existing);
    this._length--;
  }

  length(): number {
    return this._length;
  }

  private getHash(key: TKey): number {
    if (key === null || key === undefined) {
      throw new Error(`invalid key (${key})`);
    }

    let hash = 0;

    if ("string" === typeof key) {
      hash = this.stringHash(key);
    } else if ("number" === typeof key) {
      hash = 13 * key;
    } else {
      hash = this.stringHash(JSON.stringify(key));
    }

    return hash % this.table.length;
  }

  private stringHash(key: string): number {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash += 13 * key.charCodeAt(i);
    }

    return hash;
  }

  public print(): void {
    console.log(this.table);
  }
}
