# The Odin Project Binary Search Tree assignment Implementation

This repository contains an implementation of a binary search tree (BST) in JavaScript. The BST is implemented with the ability to insert, delete, search for nodes, traverse the tree in various orders, calculate height and depth of nodes, check if the tree is balanced, and rebalance it if needed.

## Features

- **Node Class**: Defines the structure of a node in the binary search tree.
- **Tree Class**: Builds a balanced binary search tree from an array of data, and provides methods to interact with the tree.
- **Functionality**:
  - Insertion of nodes
  - Deletion of nodes
  - Searching for nodes by value
  - Traversing the tree in different orders (in-order, pre-order, post-order, level-order)
  - Calculating height and depth of nodes
  - Checking if the tree is balanced
  - Rebalancing the tree if it becomes unbalanced

## Usage

1. **Instantiate Tree**: Create a new instance of the `Tree` class by providing an array of data.
2. **Perform Operations**: Use the provided methods to interact with the tree, such as insertion, deletion, search, traversal, etc.
3. **Rebalancing**: If necessary, call the `rebalance()` method to balance the tree.

## Example

```javascript
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(array);

console.log('Original Tree:');
myTree.prettyPrint();

console.log('Level Order Traversal:');
console.log(myTree.levelOrder());

console.log('Inserting 15:');
myTree.insert(15);
myTree.prettyPrint();

console.log('Deleting 7:');
myTree.delete(7);
myTree.prettyPrint();

console.log('Finding Node with value 23:');
console.log(myTree.find(23));

console.log('Height of the tree:', myTree.height());

console.log('Depth of the Node with value 8:', myTree.depth(myTree.find(8)));

console.log('Is the tree balanced?', myTree.isBalanced());

console.log('Rebalancing the tree:');
myTree.rebalance();
myTree.prettyPrint();
```
