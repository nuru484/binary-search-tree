class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(this.removeDuplicates(this.sortArray(array)));
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    const middleIndex = Math.floor(array.length / 2);
    const root = new Node(array[middleIndex]);
    root.left = this.buildTree(array.slice(0, middleIndex));
    root.right = this.buildTree(array.slice(middleIndex + 1));
    return root;
  }

  removeDuplicates(array) {
    return Array.from(new Set(array));
  }

  sortArray(array) {
    return array.sort((a, b) => a - b);
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insert(value) {
    const insertHelper = (node, value) => {
      if (node === null) {
        return new Node(value);
      }
      if (value < node.data) {
        node.left = insertHelper(node.left, value);
      } else if (value > node.data) {
        node.right = insertHelper(node.right, value);
      }
      return node;
    };
    this.root = insertHelper(this.root, value);
  }

  delete(value) {
    const deleteHelper = (node, value) => {
      if (node === null) {
        return null;
      }
      if (value < node.data) {
        node.left = deleteHelper(node.left, value);
      } else if (value > node.data) {
        node.right = deleteHelper(node.right, value);
      } else {
        if (node.left === null && node.right === null) {
          return null;
        }
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
        const temp = this.findMin(node.right);
        node.data = temp.data;
        node.right = deleteHelper(node.right, temp.data);
      }
      return node;
    };
    this.root = deleteHelper(this.root, value);
  }

  find(value) {
    const findHelper = (node, value) => {
      if (node === null) {
        return null;
      }
      if (value === node.data) {
        return node;
      } else if (value < node.data) {
        return findHelper(node.left, value);
      } else {
        return findHelper(node.right, value);
      }
    };
    return findHelper(this.root, value);
  }

  levelOrder(callback) {
    const queue = [];
    if (!this.root) {
      return [];
    }
    queue.push(this.root);
    const result = [];
    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.data);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
      if (callback) {
        callback(current);
      }
    }
    return result;
  }

  inOrder(callback) {
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      callback(node);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
  }

  preOrder(callback) {
    const traverse = (node) => {
      callback(node);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
  }

  postOrder(callback) {
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      callback(node);
    };
    traverse(this.root);
  }

  height(node) {
    if (node === null) {
      return -1;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    const traverse = (current, depth) => {
      if (current === null) {
        return -1;
      }
      if (current === node) {
        return depth;
      }
      const left = traverse(current.left, depth + 1);
      const right = traverse(current.right, depth + 1);
      return Math.max(left, right);
    };
    return traverse(this.root, 0);
  }

  isBalanced() {
    const checkBalance = (node) => {
      if (node === null) {
        return true;
      }
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      if (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        this.isBalanced(node.left) &&
        this.isBalanced(node.right)
      ) {
        return true;
      }
      return false;
    };
    return checkBalance(this.root);
  }
}
