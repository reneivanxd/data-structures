export interface ITree<T> {
  insert(value: T): void;
  delete(value: T): void;
  get(value: T): T;
  contains(value: T): boolean;
  printInOrder(): void;
}

class TreeNode<T> {
  data: T;
  height: number;
  right: TreeNode<T>;
  left: TreeNode<T>;

  constructor(data: T) {
    this.data = data;
    this.right = this.left = null;
    this.height = 0;
  }

  get isLeaf() {
    return this.right === null && this.left === null;
  }
}

export class BinaryTree<T> implements ITree<T> {
  private root: TreeNode<T>;

  public constructor() {
    this.root = null;
  }

  /**
   * Insert A value into the tree
   *
   * @param value - node's value
   */
  public insert(value: T): void {
    this.root = this.insertRecursive(this.root, value);
  }

  /**
   * Insert node recursive
   *
   * @param node - current node
   * @param value - value to insert
   * @returns inserted node
   */
  private insertRecursive(node: TreeNode<T>, value: T): TreeNode<T> {
    if (node === null) {
      return new TreeNode(value);
    }

    if (node.data === value) {
      return node;
    }

    if (value < node.data) {
      node.left = this.insertRecursive(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertRecursive(node.right, value);
    }

    node.height = this.calculateHeight(node);

    return this.rebalance(node);
  }

  /**
   * Delete a value from the tree
   * @param value - value to delete
   */
  public delete(value: T): void {
    this.root = this.deleteRecursive(this.root, value);
  }

  /**
   *
   * @param node - current node
   * @param value - value to delete
   * @returns new node reference
   */
  private deleteRecursive(node: TreeNode<T>, value: T): TreeNode<T> {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteRecursive(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteRecursive(node.right, value);
    } else {
      // case 1: no children
      if (node.isLeaf) {
        return null;
      }

      //case 2: 1 child
      if (node.right === null) {
        node = node.left;
      } else if (node.left === null) {
        node = node.right;
      } else {
        //case 3 : 2 children
        const s = this.successor(node.right);
        node.data = s.data;
        node.right = this.deleteRecursive(node.right, s.data);
      }
    }

    node.height = this.calculateHeight(node);
    return this.rebalance(node);
  }

  /**
   * Find deleted node succesor
   *
   * @param node - current node
   * @returns node succesor
   */
  private successor(node: TreeNode<T>): TreeNode<T> {
    let current = node;

    while (current.left !== null) {
      current = current.left;
    }

    return current;
  }

  /**
   * get value from the tree
   * @param value - value to lookup
   * @returns the value or null
   */
  public get(value: T): T {
    return this.getRecursive(this.root, value);
  }

  /**
   * get value from the tree recursive
   * @param node - current node
   * @param value - value to lookup
   * @returns the value or null
   */
  private getRecursive(node: TreeNode<T>, value: T): T {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      return this.getRecursive(node.left, value);
    } else if (value > node.data) {
      return this.getRecursive(node.right, value);
    }

    return node.data;
  }

  /**
   * Checks if a value is in the tree
   *
   * @param value - value to lookup
   * @returns true or false
   */
  public contains(value: T): boolean {
    return this.get(value) !== null;
  }

  /**
   * Check and Rebalance Node if required
   *
   * @param node - current node
   * @returns rebalanced node
   */
  private rebalance(node: TreeNode<T>): TreeNode<T> {
    const current_bf = this.getBalanceFactor(node);
    const left_bf = this.getBalanceFactor(node.left);
    const right_bf = this.getBalanceFactor(node.right);

    //case left-left, right rotation
    if (current_bf < -1 && left_bf <= 0) {
      return this.rotateRight(node);
    }

    // case right-right, left rotation
    if (current_bf > 1 && right_bf >= 0) {
      return this.rotateLeft(node);
    }

    // case left-right,
    if (current_bf < -1 && left_bf > 0) {
      return this.rotateLeftRight(node);
    }

    // case right-left
    if (current_bf > 1 && right_bf < 0) {
      return this.rotateRightLeft(node);
    }

    return node;
  }

  /**
   * Calculate node's height
   * H(n) = max(H(TL), H(TR)) + 1
   *
   * @param node - current node
   * @returns node's height
   */
  private calculateHeight(node: TreeNode<T>): number {
    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  /**
   * Get Node's Height
   * H(null) = -1
   *
   * @param node - current node
   * @returns node's height
   */
  private getHeight(node: TreeNode<T>): number {
    if (node === null) {
      return -1;
    }

    return node.height;
  }

  /**
   * Get Node's Balance Factor
   * BF(null) = 0
   * BF(n) = H(TR) - H(TL)
   *
   * @param node - current node
   * @returns node's BF
   */
  private getBalanceFactor(node: TreeNode<T>): number {
    if (node === null) {
      return 0;
    }

    return this.getHeight(node.right) - this.getHeight(node.left);
  }

  /**
   * Left-Left Case: Right Rotations
   *
   *        3
   *       / \
   *     2
   *    / \
   *   1   x
   *
   * @param root - node to rotate
   * @returns rotated node
   */
  private rotateRight(root: TreeNode<T>): TreeNode<T> {
    if (root === null) {
      return root;
    }

    console.log("rotateRight", root.data);

    const newRoot = root.left;
    root.left = newRoot.right;
    newRoot.right = root;

    root.height = this.calculateHeight(root);
    newRoot.height = this.calculateHeight(newRoot);

    return newRoot;
  }

  /**
   * Right-Right Case: Left Rotations
   *
   *   1
   *  / \
   *    2
   *   / \
   *  x   3
   *
   * @param root - node to rotate
   * @returns rotated node
   */
  private rotateLeft(root: TreeNode<T>): TreeNode<T> {
    if (root === null) {
      return root;
    }

    console.log("rotateLeft", root.data);

    const newRoot = root.right;
    root.right = newRoot.left;
    newRoot.left = root;

    root.height = this.calculateHeight(root);
    newRoot.height = this.calculateHeight(newRoot);

    return newRoot;
  }

  /**
   * Right-Left Case: Right-Left Rotations
   *
   *     2
   *   /  \
   *       3
   *      / \
   *    1
   *
   * @param root - node to rotate
   * @returns rotated node
   */
  private rotateRightLeft(root: TreeNode<T>): TreeNode<T> {
    if (root === null) {
      return root;
    }

    console.log("rotateRightLeft", root.data);

    root.right = this.rotateRight(root.right);
    return this.rotateLeft(root);
  }

  /**
   * Left-Right Case: Left-Right Rotations
   *
   *     3
   *    / \
   *   1
   *  / \
   *     2
   *
   * @param root - node to rotate
   * @returns rotated node
   */
  private rotateLeftRight(root: TreeNode<T>): TreeNode<T> {
    if (root === null) {
      return root;
    }

    console.log("rotateLeftRight", root.data);

    root.left = this.rotateLeft(root.left);
    return this.rotateRight(root);
  }

  /**
   * Iterate over the tree in order
   * @param cb - callback function
   */
  public forEach(cb: (value: T) => void): void {
    if (!cb) {
      return;
    }

    const getNodeValue = (node: TreeNode<T>, cb: (value: T) => void) => {
      if (!node) {
        return;
      }

      getNodeValue(node.left, cb);
      cb(node.data);
      getNodeValue(node.right, cb);
    };

    getNodeValue(this.root, cb);
  }

  /**
   * print in order array
   */
  public printInOrder(): void {
    console.log(`[${this.printRecursive(this.root)}]`);
  }

  private printRecursive(node: TreeNode<T>): string {
    if (node === null) {
      return "";
    }

    let text = "";
    if (node.left !== null) {
      text += `${this.printRecursive(node.left)}, `;
    }

    text += `${node.data}`;

    if (node.right !== null) {
      text += `, ${this.printRecursive(node.right)}`;
    }

    return text;
  }

  /**
   * print a tree representation
   */
  public print(): void {
    const printNode = (
      node: TreeNode<T>,
      index: number = 0,
      side: string = ""
    ) => {
      if (!node) {
        return;
      }

      let space = "";
      if (index > 0) {
        space =
          new Array((index - 1) * 4).map((v) => " ").join(" ") +
          "+" +
          side +
          "--";
      }

      console.log(
        `${space}${node.data}[BF=${this.getBalanceFactor(
          node
        )}, H=${this.getHeight(node)}]`
      );
      printNode(node.left, index + 1, "L");
      printNode(node.right, index + 1, "R");
    };

    printNode(this.root);
  }
}
