// import { IStack, Stack } from "./models/Stack";

// import { IQueue, Queue } from "./models/Queue";

// import { LinkedList } from "./models/List";

// import { BinaryTree } from "./models/BinaryTree";

// import { HashTable } from "./models/HashTable";

// const table = new HashTable<number, string>();

// for (let i = 1; i <= 20; i++) {
//   table.set(i, `VALUE_${i}`);
// }

// console.log(table.length());
// table.print();

// console.log(table.get(0));

// console.log(table.get(15));

// console.log(table.get(25));

// table.remove(13);

// console.log(table.get(13));
// console.log(table.length());
// table.print();

// const tree = new BinaryTree<number>();

// tree.insert(8);
// tree.insert(3);
// tree.insert(10);
// tree.insert(6);
// tree.insert(1);
// tree.insert(14);
// tree.insert(4);
// tree.insert(7);
// tree.insert(11);
// tree.insert(9);
// tree.insert(15);
// tree.insert(0);

// for (let i = 1; i < 20; i++) {
//   tree.insert(i);
// }

// tree.printInOrder();
// tree.print();

// for (let i = 1; i < 10; i++) {
//   tree.delete(i);
// }

// tree.printInOrder();
// tree.print();
// tree.forEach((value) => {
//   console.log(value);
// });
// console.log(tree);

// tree.delete(10);

// tree.printInOrder();
// console.log(tree);

// tree.delete(8);

// tree.printInOrder();
// console.log(tree);

// const stack = new Stack<number>(10);

// stack.push(10);
// stack.push(15);
// stack.push(80);

// stack.printStack();

// console.log(stack.peek());

// stack.printStack();

// console.log(stack.pop());

// stack.printStack();

// console.log(stack.pop());

// stack.printStack();

// const queue = new Queue<string>(5);

// console.log([queue.isEmpty(), queue.isFull()]);

// queue.enqueue("A");
// queue.enqueue("B");
// queue.enqueue("C");
// queue.enqueue("D");

// console.log([queue.isEmpty(), queue.isFull(), queue.size()]);

// queue.printQueue();

// console.log(queue.peek());

// queue.printQueue();
// console.log([queue.isEmpty(), queue.isFull(), queue.size()]);

// console.log(queue.dequeue());

// queue.printQueue();
// console.log([queue.isEmpty(), queue.isFull(), queue.size()]);

// console.log(queue.dequeue());

// queue.printQueue();
// console.log([queue.isEmpty(), queue.isFull(), queue.size()]);

// queue.enqueue("E");
// queue.enqueue("F");

// queue.printQueue();
// console.log([queue.isEmpty(), queue.isFull(), queue.size()]);

// queue.enqueue("G");

// const list = new LinkedList<number>();

// list.add(155);
// list.add(250);
// list.add(111);
// list.add(78);

// console.log([list.isEmpty(), list.size()]);
// list.printList();

// list.insert(22, 2);

// console.log([list.isEmpty(), list.size()]);
// list.printList();

// list.insert(10, 0);

// console.log([list.isEmpty(), list.size()]);
// list.printList();

// list.insert(7, 6);

// console.log([list.isEmpty(), list.size()]);
// list.printList();

// list.delete(3);

// console.log([list.isEmpty(), list.size()]);
// list.printList();

// list.delete(0);

// console.log([list.isEmpty(), list.size()]);
// list.printList();

// list.delete(0);
// list.delete(0);
// list.delete(0);
// list.delete(0);
// list.delete(0);

// console.log([list.isEmpty(), list.size()]);
// list.printList();

// console.log("get(0)", list.get(0));
// console.log("get.last", list.get(list.size() - 1));
// console.log("get(3)", list.get(3));

// console.log("indexOf(250)", list.indexOf(250));
// console.log("contains(250)", list.contains(250));
// console.log("indexOf(2500)", list.indexOf(2500));
// console.log("contains(2500)", list.contains(2500));
