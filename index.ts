/**
 * LEETCODE stuff
 */

import * as assert from 'assert';

/**
 * 226. Invert Binary Tree
 */

// type TreeNode = {
//   val: number
//   left: TreeNode | null
//   right: TreeNode | null
// }
//
// // TODO write this function
// // const generateTree = (values: [number]): TreeNode | null => {
// //
// // }
//
// const invertTree = (root: TreeNode | null): TreeNode | null => {
//   if (!root) {
//     return root
//   }
//
//   const temp = root.left
//   root.left = root.right
//   root.right = temp
//
//   invertTree(root.left)
//   invertTree(root.right)
//
//   return root;
// }

/**
 * 1480. Running Sum of 1d Array
 */
// function runningSum(nums: number[]): number[] {
//   for (let i = 1; i < nums.length; i++) {
//     nums[i] += nums[i - 1];
//   }
//
//   return nums
// }
// assert.deepStrictEqual(runningSum([1,2,3,4]), [1,3,6,10]);
// assert.deepStrictEqual(runningSum([1,1,1,1,1]), [1,2,3,4,5]);
// assert.deepStrictEqual(runningSum([3,1,2,10,1]), [3,4,6,16,17]);


/**
 * 1672. Richest Customer Wealth
 */
// a)
// function maximumWealth(accounts: number[][]): number {
//   const hashMap: { [key: number]: number } = {}
//   for (let i = 0; i < accounts.length; i++) {
//     if (!(i in hashMap)) {
//       hashMap[i] = 0
//     }
//     for (let j = 0; j < accounts[i].length; j++) {
//       hashMap[i] += accounts[i][j]
//     }
//   }
//
//   const values = Object.values(hashMap)
//   let result = 0
//   for (let i = 0; i < values.length; i++) {
//     if (result < values[i]) {
//       result = values[i]
//     }
//   }
//
//   return result
// }
// b)
function maximumWealth(accounts: number[][]): number {
  let maxWealth = 0

  for (let i = 0; i < accounts.length; i++) {
    let accountWealth = 0

    for (let j = 0; j < accounts[i].length; j++) {
      accountWealth += accounts[i][j]
    }

    maxWealth = Math.max(maxWealth, accountWealth)
  }

  return maxWealth
}

assert.equal(maximumWealth([[1,2,3],[3,2,1]]), 6)
assert.equal(maximumWealth([[1,5],[7,3],[3,5]]), 10)
assert.equal(maximumWealth([[2,8,7],[7,1,3],[1,9,5]]), 17)
