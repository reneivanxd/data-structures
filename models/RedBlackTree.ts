enum NodeColor {
  BLACK,
  RED,
}

class RBNode<T> {
  public value: T;
  public parent: RBNode<T>;
  public left: RBNode<T>;
  public right: RBNode<T>;
  public color: NodeColor;

  constructor(value: T, parent: RBNode<T> = null) {
    this.value = value;
    this.parent = parent;
    this.color = NodeColor.RED;
    this.left = this.right = null;
  }

  get uncle(): RBNode<T> {
    if (this.parent === null || this.grandParent === null) {
      return;
    }

    if (this.parent.isLeft) {
      return this.grandParent.right;
    }

    if (this.parent.isRight) {
      return this.grandParent.right;
    }

    return null;
  }

  get grandParent(): RBNode<T> {
    if (this.parent === null) {
      return;
    }

    return this.parent.parent;
  }

  get isRed(): boolean {
    return this.color === NodeColor.RED;
  }

  get isBlack(): boolean {
    return this.color === NodeColor.BLACK;
  }

  get isLeft(): boolean {
    if (this.parent === null) {
      return false;
    }
    return this === this.parent.left;
  }

  get isRight(): boolean {
    if (this.parent === null) {
      return false;
    }
    return this === this.parent.right;
  }
}

class RBTree<T> {
  private root: RBNode<T>;

  constructor() {
    this.root = null;
  }

  /**
   * Insert A value into the tree
   *
   * @param value - node's value
   */
  public insert(value: T): void {
    if (this.root === null) {
      this.root = new RBNode(value);
      this.root.color = NodeColor.BLACK;
    } else {
      this.insert_recursive(value, this.root);
    }
  }

  /**
   * Insert node recursive
   *
   * @param value - value to insert
   * @param node - current node
   */
  private insert_recursive(value: T, node: RBNode<T>): void {
    if (node.value === value) {
      return;
    }

    if (value < node.value) {
      if (node.left === null) {
        node.left = new RBNode(value, node);
        this.rebalance(node.left);
      } else {
        this.insert_recursive(value, node.left);
      }
    } else {
      if (node.right === null) {
        node.right = new RBNode(value, node);
        this.rebalance(node.right);
      } else {
        this.insert_recursive(value, node.right);
      }
    }
  }

  /**
   * Check and Rebalance Node if required
   *
   * @param node - current node
   */
  private rebalance(node: RBNode<T>): void {
    if (node === null) {
      return;
    }

    // Case 1: node is the root
    if (node.parent === null) {
      node.color = NodeColor.BLACK;
      return;
    }

    const parent = node.parent;
    const grandParent = node.grandParent;
    const uncle = node.uncle;

    // if parent is black do nothing
    if (this.isBlack(parent)) {
      return;
    }

    // Case 2: node uncle is red
    if (this.isRed(uncle)) {
      this.recolor(node);
      this.rebalance(grandParent);
      return;
    }

    // Case 3: node uncle is black
    let rotated = false;
    if (node.parent.isLeft && node.isLeft) {
      this.rotateRight(grandParent);
      rotated = true;
    } else if (node.parent.isRight && node.isRight) {
      this.rotateLeft(grandParent);
      rotated = true;
    } else if (node.parent.isLeft && node.isRight) {
      this.rotateLeftRight(grandParent);
      rotated = true;
    } else if (node.parent.isRight && node.left) {
      this.rotateRightLeft(grandParent);
      rotated = true;
    }

    if (rotated) {
      this.toggleColor(parent);
      this.toggleColor(grandParent);
      this.rebalance(node.parent);
    }
  }

  /**
   * Checks if the current node is red
   *
   * @param node current node
   * @returns true or false
   */
  private isRed(node: RBNode<T>): boolean {
    if (node === null) {
      return false;
    }

    return node.isRed;
  }

  /**
   * Checks if the current node is black
   *
   * @param node current node
   * @returns true or false
   */
  private isBlack(node: RBNode<T>): boolean {
    if (node === null) {
      return true;
    }

    return node.isBlack;
  }

  /**
   * Re colors current node parent, grand parent and uncle
   *
   * @param node - curent node
   */
  private recolor(node: RBNode<T>): void {
    console.log("recolor", node.value);

    if (node.parent !== null) {
      node.parent.color = NodeColor.BLACK;
    }

    if (node.grandParent !== null) {
      node.grandParent.color = NodeColor.RED;
    }

    if (node.uncle !== null) {
      node.uncle.color = NodeColor.BLACK;
    }
  }

  /**
   * Toggles nodes color
   *
   * @param node current node
   */
  private toggleColor(node: RBNode<T>): void {
    if (node === null) {
      return;
    }

    console.log("toggleColor", node.value);

    if (this.isRed(node)) {
      node.color = NodeColor.BLACK;
    } else {
      node.color = NodeColor.RED;
    }
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
  private rotateRight(root: RBNode<T>): void {
    if (root === null || root.left === null) {
      return;
    }

    console.log("rotateRight", root.value);

    const newRoot = root.left;
    root.left = newRoot.right;
    newRoot.right = root;

    this.updateParent(root, newRoot);
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
  private rotateLeft(root: RBNode<T>): void {
    if (root === null || root.right === null) {
      return;
    }

    console.log("rotateLeft", root.value);

    const newRoot = root.right;
    root.right = newRoot.left;
    newRoot.left = root;

    this.updateParent(root, newRoot);
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
   */
  private rotateRightLeft(root: RBNode<T>): void {
    if (root === null || root.right === null) {
      return;
    }

    console.log("rotateRightLeft", root.value);

    this.rotateRight(root.right);
    this.rotateLeft(root);
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
   */
  private rotateLeftRight(root: RBNode<T>): void {
    if (root === null || root.left === null) {
      return;
    }

    console.log("rotateLeftRight", root.value);

    this.rotateLeft(root.left);
    this.rotateRight(root);
  }

  /**
   * Updates root parent after rotation
   *
   * @param root - old root
   * @param newRoot - new root
   */
  private updateParent(root: RBNode<T>, newRoot: RBNode<T>): void {
    if (root.parent === null) {
      root.parent = newRoot;
      newRoot.parent = null;
      this.root = newRoot;
      return;
    }

    newRoot.parent = root.parent;
    if (root.isLeft) {
      root.parent.left = newRoot;
    } else {
      root.parent.right = newRoot;
    }

    root.parent = newRoot;

    if (root.left !== null && root !== root.left.parent) {
      root.left.parent = root;
    }

    if (root.right !== null && root !== root.right.parent) {
      root.right.parent = root;
    }
  }

  /**
   * Print the Tree in the format
   *
   * 3[0]
   * +L--2[-1]
   *   +L--1[0]
   * +R--5[0]
   *   +L--4[0]
   *   +R--6[0]
   */
  public print(): void {
    const printNode = (
      node?: RBNode<T>,
      index: number = 0,
      side: string = ""
    ) => {
      if (node === null) {
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

      console.log(`${space}${node.value}[${node.color}]`);
      printNode(node.left, index + 1, "L");
      printNode(node.right, index + 1, "R");
    };

    printNode(this.root);
  }
}
