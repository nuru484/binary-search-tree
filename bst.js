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
  inOrder() {
    const result = [];
    const traverse = (node) => {
      if (node === null) {
        return;
      }
      if (node.left) traverse(node.left);
      result.push(node.data);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  preOrder() {
    const result = [];
    const traverse = (node) => {
      if (node === null) {
        return;
      }
      result.push(node.data);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  postOrder() {
    const result = [];
    const traverse = (node) => {
      if (node === null) {
        return;
      }
      traverse(node.left);
      traverse(node.right);
      result.push(node.data);
    };
    traverse(this.root);
    return result;
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
        return { balanced: true, height: -1 }; // Return height as -1 for null nodes
      }
      const leftResult = checkBalance(node.left);
      const rightResult = checkBalance(node.right);

      // Calculate height of current node
      const currentHeight = Math.max(leftResult.height, rightResult.height) + 1;

      // Check balance condition
      if (
        Math.abs(leftResult.height - rightResult.height) <= 1 &&
        leftResult.balanced &&
        rightResult.balanced
      ) {
        return { balanced: true, height: currentHeight };
      }
      return { balanced: false, height: currentHeight };
    };
    return checkBalance(this.root).balanced;
  }

  rebalance() {
    const nodes = [];
    this.inOrder((node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }

  findMin(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }
}

// Driver script
const randomNumbers = Array.from({ length: 15 }, () =>
  Math.floor(Math.random() * 100)
);
const tree = new Tree(randomNumbers);

console.log('Is the tree balanced? ', tree.isBalanced());
console.log('Level order traversal:', tree.levelOrder().join(', '));
console.log('Pre-order traversal:', tree.preOrder().join(', '));
console.log('Post-order traversal:', tree.postOrder().join(', '));
console.log('In-order traversal:', tree.inOrder().join(', '));

// Unbalancing the tree
tree.insert(150);
tree.insert(200);
tree.insert(250);

console.log('Is the tree balanced now?', tree.isBalanced());

// Rebalancing the tree
tree.rebalance();

console.log('Is the tree balanced after rebalancing?', tree.isBalanced());
console.log(
  'Level order traversal after rebalancing:',
  tree.levelOrder().join(', ')
);
console.log(
  'Pre-order traversal after rebalancing:',
  tree.preOrder().join(', ')
);
console.log(
  'Post-order traversal after rebalancing:',
  tree.postOrder().join(', ')
);
console.log('In-order traversal after rebalancing:', tree.inOrder().join(', '));
