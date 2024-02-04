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
}
