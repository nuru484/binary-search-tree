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
}
