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

/**
 * 1480. Running Sum of 1d Array
 */
function runningSum(nums: number[]): number[] {
  let prev = nums[0]

  for (let i = 1; i < nums.length; i++) {
    const sum = nums[i] + prev
    nums[i] = sum
    prev = sum
  }

  return nums
};
