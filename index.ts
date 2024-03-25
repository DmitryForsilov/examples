/**
 * LEETCODE stuff
 */

/**
 * 226. Invert Binary Tree
 */

type TreeNode = {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

// TODO write this function
// const generateTree = (values: [number]): TreeNode | null => {
//
// }

const invertTree = (root: TreeNode | null): TreeNode | null => {
  if (!root) {
    return root
  }

  const temp = root.left
  root.left = root.right
  root.right = temp

  invertTree(root.left)
  invertTree(root.right)

  return root;
}
