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

// TODO write this function
// const generateTree = (values: [number]): TreeNode | null => {
//
// }

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
// // Time complexity = O(n)
// // Space complexity = O(1)
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
// // Time complexity = O(n)
// // Space complexity = O(1)
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
// Time complexity = O(n * m)
// Space complexity = O(n)
// }
// b)
// function maximumWealth(accounts: number[][]): number {
//   let maxWealth = 0
//
//   for (let i = 0; i < accounts.length; i++) {
//     let accountWealth = 0
//
//     for (let j = 0; j < accounts[i].length; j++) {
//       accountWealth += accounts[i][j]
//     }
//
//     maxWealth = Math.max(maxWealth, accountWealth)
//   }
//
//   return maxWealth
// // Time complexity = O(n * m)
// // Space complexity = O(1)
// }

// assert.equal(maximumWealth([[1,2,3],[3,2,1]]), 6)
// assert.equal(maximumWealth([[1,5],[7,3],[3,5]]), 10)
// assert.equal(maximumWealth([[2,8,7],[7,1,3],[1,9,5]]), 17)

/**
 * 412. Fizz Buzz
 */
// a)
// function fizzBuzz(n: number): string[] {
//   const results = []
//   for (let i = 1; i <= n; i++) {
//     const isDivisibleBy3 = i % 3 === 0
//     const isDivisibleBy5 = i % 5 === 0
//
//     if (isDivisibleBy3 && isDivisibleBy5) {
//       results.push("FizzBuzz")
//     } else if (isDivisibleBy3) {
//       results.push("Fizz")
//     } else if (isDivisibleBy5) {
//       results.push("Buzz")
//     } else {
//       results.push(i.toString())
//     }
//   }
//
//   return results
// Time complexity = O(n)
// Space complexity = O(1)
// }

// b)
// function fizzBuzz(n: number): string[] {
//   const results = []
//
//   for (let i = 1; i <= n; i++) {
//     const isDivisibleBy3 = i % 3 === 0
//     const isDivisibleBy5 = i % 5 === 0
//     let currStr = ''
//
//     if (isDivisibleBy3) {
//       currStr += "Fizz"
//     }
//     if (isDivisibleBy5) {
//       currStr += "Buzz"
//     }
//     if (!currStr.length) {
//       currStr += i.toString()
//     }
//
//     results.push(currStr)
//   }
//
//   return results
// Time complexity = O(n)
// Space complexity = O(1)
// }

// assert.deepStrictEqual(fizzBuzz(3), ["1","2","Fizz"])
// assert.deepStrictEqual(fizzBuzz(5), ["1","2","Fizz","4","Buzz"])
// assert.deepStrictEqual(fizzBuzz(15), ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"])

/**
 * 1342. Number of Steps to Reduce a Number to Zero
 */
// a)
// function numberOfSteps(num: number): number {
//   let currentNum = num
//   let steps = 0
//
//   while (currentNum !== 0) {
//     if (currentNum % 2 === 0) {
//       currentNum /= 2
//     } else {
//       currentNum -= 1
//     }
//
//     steps += 1
//   }
//
//   return steps
//   // Time complexity = O(logn)
//   // Space complexity = O(1)
// }

// b)
// function numberOfSteps(num: number): number {
//   let currentNum = num
//   let steps = 0
//
//   while (currentNum !== 0) {
//     if ((currentNum & 1) === 0) {
//       currentNum >>= 1
//     } else {
//       currentNum -= 1
//     }
//
//     steps += 1
//   }
//
//   return steps
//   // Time complexity = O(logn)
//   // Space complexity = O(1)
// }

// assert.equal(numberOfSteps(14), 6)
// assert.equal(numberOfSteps(8), 4)
// assert.equal(numberOfSteps(123), 12)

/**
 * 876. Middle of the Linked List
 */
// type ListNode = {
//   val: number;
//   next: ListNode | null;
// };

// const generateLinkedList = (nums: number[]) => {
//   if (!nums.length) {
//     return null;
//   }
//
//   const root: ListNode = {
//     val: nums[0],
//     next: null,
//   };
//   let currentNode = root;
//
//   for (let i = 1; i < nums.length; i++) {
//     currentNode.next = {
//       val: nums[i],
//       next: null,
//     };
//     currentNode = currentNode.next;
//   }
//
//   return root;
// };
// a)
// function middleNode(head: ListNode | null): ListNode | null {
//   let listLength = 1;
//   let currentNode = head;
//
//   while (currentNode?.next) {
//     listLength += 1;
//     currentNode = currentNode.next;
//   }
//
//   const guessStepsToMiddle = listLength / 2;
//   const correctStepsToMiddle =
//     guessStepsToMiddle % 1 === 0
//       ? guessStepsToMiddle + 1
//       : Math.round(guessStepsToMiddle);
//
//   let steps = 1;
//   let middleNode = head;
//
//   while (correctStepsToMiddle > steps) {
//     middleNode = middleNode?.next || null;
//     steps += 1;
//   }
//
//   return middleNode;
//   // Time complexity = O(n)
//   // Space complexity = O(1)
// }

// b)
// function middleNode(head: ListNode | null): ListNode | null {
//   const nodes = [];
//
//   let currentNode = head;
//   let length = 0;
//
//   while (currentNode) {
//     nodes.push(currentNode);
//     currentNode = currentNode.next;
//     length += 1;
//   }
//
//   const middleIndex = (() => {
//     const rawIndex = length % 2 === 0
//       ? length / 2 + 1
//       : Math.round(length / 2)
//
//     return rawIndex - 1; // length - 1
//   })();
//
//   return nodes[middleIndex];
//   // Time complexity = O(n)
//   // Space complexity = O(n)
// }

// c)
// function middleNode(head: ListNode | null): ListNode | null {
//   let middle = head;
//   let end = head;
//
//   while (middle?.next && end?.next) {
//     middle = middle.next;
//     end = end.next.next;
//   }
//
//   return middle;
//   // Time complexity = O(n)
//   // Space complexity = O(1)
// }

// assert.deepStrictEqual(
//   middleNode(generateLinkedList([1, 2, 3, 4, 5])),
//   generateLinkedList([3, 4, 5]),
// );
// assert.deepStrictEqual(
//   middleNode(generateLinkedList([1, 2, 3, 4, 5, 6])),
//   generateLinkedList([4, 5, 6]),
// );

/**
 * 383. Ransom Note
 */
// function canConstruct(ransomNote: string, magazine: string): boolean {
//   const hashTable: { [key: string]: number } = {};
//
//   for (let i = 0; i < magazine.length; i++) {
//     const char = magazine[i];
//
//     if (hashTable[char] !== undefined) {
//       hashTable[char] += 1;
//     } else {
//       hashTable[char] = 1;
//     }
//   }
//
//   for (let i = 0; i < ransomNote.length; i++) {
//     const char = ransomNote[i];
//
//     if (!hashTable[char]) {
//       return false;
//     }
//
//     hashTable[char] -= 1;
//   }
//
//   return true;
//   // Time complexity = O(m) // magazine is bigger string
//   // Space complexity = O(k) // k < 26 in english, could be O(1)
// }

// assert.strictEqual(canConstruct('a', 'b'), false);
// assert.strictEqual(canConstruct('aa', 'ab'), false);
// assert.strictEqual(canConstruct('aa', 'aab'), true);

/**
 * Max Consecutive Ones
 */
// function findMaxConsecutiveOnes(nums: number[]): number {
//   let maxConsecutive = 0;
//   let currentConsecutive = 0;
//
//   nums.forEach((num, i) => {
//     if (num === 1) {
//       currentConsecutive += 1;
//     }
//     if (num === 0 || i === nums.length - 1) {
//       maxConsecutive =
//         currentConsecutive > maxConsecutive
//           ? currentConsecutive
//           : maxConsecutive;
//       currentConsecutive = 0;
//     }
//   });
//
//   return maxConsecutive;
//   // Time complexity = O(n)
//   // Space complexity = O(1)
// }

// assert.equal(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]), 3);
// assert.equal(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]), 2);
// assert.equal(findMaxConsecutiveOnes([0, 0, 0, 0, 0, 0]), 0);
// assert.equal(findMaxConsecutiveOnes([1, 1, 1, 1, 1, 1]), 6);

/**
 * Find Numbers with Even Number of Digits
 */
// function findNumbers(nums: number[]): number {
//   let count = 0;
//
//   nums.forEach((num) => {
//     // Divide the number by 10 again and again to get the number of digits for example
//     if (num.toString().length % 2 === 0) {
//       count += 1;
//     }
//   });
//
//   return count;
//   // Time complexity = O(n)
//   // Space complexity = O(1)
// }

// assert.equal(findNumbers([12, 345, 2, 6, 7896]), 2);
// assert.equal(findNumbers([555, 901, 482, 1771]), 1);
