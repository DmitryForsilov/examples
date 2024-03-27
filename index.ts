/**
 * LEETCODE stuff
 */

import * as assert from 'assert';

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
  for (let i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];
  }

  return nums
}
assert.deepStrictEqual(runningSum([1,2,3,4]), [1,3,6,10]);
assert.deepStrictEqual(runningSum([1,1,1,1,1]), [1,2,3,4,5]);
assert.deepStrictEqual(runningSum([3,1,2,10,1]), [3,4,6,16,17]);
