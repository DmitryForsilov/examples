/**
 * LEETCODE stuff
 */

import test from 'node:test';
import { strict as assert } from 'node:assert';

/**
 * 226. Invert Binary Tree
 */

type TreeNode = {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

// TODO write this function
// const generateTree = (values: [number]): TreeNode | null => {
//
// }

const invertTree = (root: TreeNode | null): TreeNode | null => {
  if (!root) {
    return root;
  }

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
  // Time complexity = O(n)
  // Space complexity = O(1)
};

/**
 * 1480. Running Sum of 1d Array
 */
function runningSum(nums: number[]): number[] {
  for (let i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];
  }

  return nums;
  // Time complexity = O(n)
  // Space complexity = O(1)
}

test('1480. Running Sum of 1d Array', () => {
  assert.deepEqual(runningSum([1, 2, 3, 4]), [1, 3, 6, 10]);
  assert.deepEqual(runningSum([1, 1, 1, 1, 1]), [1, 2, 3, 4, 5]);
  assert.deepEqual(runningSum([3, 1, 2, 10, 1]), [3, 4, 6, 16, 17]);
});

/**
 * 1672. Richest Customer Wealth
 */
function maximumWealthA(accounts: number[][]): number {
  const hashMap: { [key: number]: number } = {};
  for (let i = 0; i < accounts.length; i++) {
    if (!(i in hashMap)) {
      hashMap[i] = 0;
    }
    for (let j = 0; j < accounts[i].length; j++) {
      hashMap[i] += accounts[i][j];
    }
  }

  const values = Object.values(hashMap);
  let result = 0;
  for (let i = 0; i < values.length; i++) {
    if (result < values[i]) {
      result = values[i];
    }
  }

  return result;
  // Time complexity = O(n * m)
  // Space complexity = O(n)
}

function maximumWealthB(accounts: number[][]): number {
  let maxWealth = 0;

  for (let i = 0; i < accounts.length; i++) {
    let accountWealth = 0;

    for (let j = 0; j < accounts[i].length; j++) {
      accountWealth += accounts[i][j];
    }

    maxWealth = Math.max(maxWealth, accountWealth);
  }

  return maxWealth;
  // Time complexity = O(n * m)
  // Space complexity = O(1)
}

test('1672. Richest Customer Wealth', () => {
  [maximumWealthA, maximumWealthB].forEach((func) => {
    assert.equal(
      func([
        [1, 2, 3],
        [3, 2, 1],
      ]),
      6,
    );
    assert.equal(
      func([
        [1, 5],
        [7, 3],
        [3, 5],
      ]),
      10,
    );
    assert.equal(
      func([
        [2, 8, 7],
        [7, 1, 3],
        [1, 9, 5],
      ]),
      17,
    );
  });
});

/**
 * 412. Fizz Buzz
 */
function fizzBuzzA(n: number): string[] {
  const results = [];
  for (let i = 1; i <= n; i++) {
    const isDivisibleBy3 = i % 3 === 0;
    const isDivisibleBy5 = i % 5 === 0;

    if (isDivisibleBy3 && isDivisibleBy5) {
      results.push('FizzBuzz');
    } else if (isDivisibleBy3) {
      results.push('Fizz');
    } else if (isDivisibleBy5) {
      results.push('Buzz');
    } else {
      results.push(i.toString());
    }
  }

  return results;
  // Time complexity = O(n)
  // Space complexity = O(1)
}

function fizzBuzzB(n: number): string[] {
  const results = [];

  for (let i = 1; i <= n; i++) {
    const isDivisibleBy3 = i % 3 === 0;
    const isDivisibleBy5 = i % 5 === 0;
    let currStr = '';

    if (isDivisibleBy3) {
      currStr += 'Fizz';
    }
    if (isDivisibleBy5) {
      currStr += 'Buzz';
    }
    if (!currStr.length) {
      currStr += i.toString();
    }

    results.push(currStr);
  }

  return results;
  // Time complexity = O(n)
  // Space complexity = O(1)
}

test('412. Fizz Buzz', () => {
  [fizzBuzzA, fizzBuzzB].forEach((func) => {
    assert.deepEqual(func(3), ['1', '2', 'Fizz']);
    assert.deepEqual(func(5), ['1', '2', 'Fizz', '4', 'Buzz']);
    assert.deepEqual(func(15), [
      '1',
      '2',
      'Fizz',
      '4',
      'Buzz',
      'Fizz',
      '7',
      '8',
      'Fizz',
      'Buzz',
      '11',
      'Fizz',
      '13',
      '14',
      'FizzBuzz',
    ]);
  });
});

/**
 * 1342. Number of Steps to Reduce a Number to Zero
 */
function numberOfStepsA(num: number): number {
  let currentNum = num;
  let steps = 0;

  while (currentNum !== 0) {
    if (currentNum % 2 === 0) {
      currentNum /= 2;
    } else {
      currentNum -= 1;
    }

    steps += 1;
  }

  return steps;
  // Time complexity = O(logn)
  // Space complexity = O(1)
}

function numberOfStepsB(num: number): number {
  let currentNum = num;
  let steps = 0;

  while (currentNum !== 0) {
    if ((currentNum & 1) === 0) {
      currentNum >>= 1;
    } else {
      currentNum -= 1;
    }

    steps += 1;
  }

  return steps;
  // Time complexity = O(logn)
  // Space complexity = O(1)
}

test('1342. Number of Steps to Reduce a Number to Zero', () => {
  [numberOfStepsA, numberOfStepsB].forEach((func) => {
    assert.equal(func(14), 6);
    assert.equal(func(8), 4);
    assert.equal(func(123), 12);
  });
});

/**
 * 876. Middle of the Linked List
 */
type ListNode = {
  val: number;
  next: ListNode | null;
};

const generateLinkedList = (nums: number[]) => {
  if (!nums.length) {
    return null;
  }

  const root: ListNode = {
    val: nums[0],
    next: null,
  };
  let currentNode = root;

  for (let i = 1; i < nums.length; i++) {
    currentNode.next = {
      val: nums[i],
      next: null,
    };
    currentNode = currentNode.next;
  }

  return root;
};

function middleNodeA(head: ListNode | null): ListNode | null {
  let listLength = 1;
  let currentNode = head;

  while (currentNode?.next) {
    listLength += 1;
    currentNode = currentNode.next;
  }

  const guessStepsToMiddle = listLength / 2;
  const correctStepsToMiddle = guessStepsToMiddle % 1 === 0 ? guessStepsToMiddle + 1 : Math.round(guessStepsToMiddle);

  let steps = 1;
  let middleNode = head;

  while (correctStepsToMiddle > steps) {
    middleNode = middleNode?.next || null;
    steps += 1;
  }

  return middleNode;
  // Time complexity = O(n)
  // Space complexity = O(1)
}

function middleNodeB(head: ListNode | null): ListNode | null {
  const nodes = [];

  let currentNode = head;
  let length = 0;

  while (currentNode) {
    nodes.push(currentNode);
    currentNode = currentNode.next;
    length += 1;
  }

  const middleIndex = (() => {
    const rawIndex = length % 2 === 0 ? length / 2 + 1 : Math.round(length / 2);

    return rawIndex - 1; // length - 1
  })();

  return nodes[middleIndex];
  // Time complexity = O(n)
  // Space complexity = O(n)
}

function middleNodeC(head: ListNode | null): ListNode | null {
  let middle = head;
  let end = head;

  while (middle?.next && end?.next) {
    middle = middle.next;
    end = end.next.next;
  }

  return middle;
  // Time complexity = O(n)
  // Space complexity = O(1)
}

test('876. Middle of the Linked List', () => {
  [middleNodeA, middleNodeB, middleNodeC].forEach((func) => {
    assert.deepEqual(func(generateLinkedList([1, 2, 3, 4, 5])), generateLinkedList([3, 4, 5]));
    assert.deepEqual(func(generateLinkedList([1, 2, 3, 4, 5, 6])), generateLinkedList([4, 5, 6]));
  });
});

/**
 * 383. Ransom Note
 */
function canConstruct(ransomNote: string, magazine: string): boolean {
  const hashTable: { [key: string]: number } = {};

  for (let i = 0; i < magazine.length; i++) {
    const char = magazine[i];

    if (hashTable[char] !== undefined) {
      hashTable[char] += 1;
    } else {
      hashTable[char] = 1;
    }
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const char = ransomNote[i];

    if (!hashTable[char]) {
      return false;
    }

    hashTable[char] -= 1;
  }

  return true;
  // Time complexity = O(m) // magazine is bigger string
  // Space complexity = O(k) // k < 26 in english, could be O(1)
}

test('383. Ransom Note', () => {
  assert.equal(canConstruct('a', 'b'), false);
  assert.equal(canConstruct('aa', 'ab'), false);
  assert.equal(canConstruct('aa', 'aab'), true);
});

/**
 * Max Consecutive Ones
 */
function findMaxConsecutiveOnes(nums: number[]): number {
  let maxConsecutive = 0;
  let currentConsecutive = 0;

  nums.forEach((num, i) => {
    if (num === 1) {
      currentConsecutive += 1;
    }
    if (num === 0 || i === nums.length - 1) {
      maxConsecutive = currentConsecutive > maxConsecutive ? currentConsecutive : maxConsecutive;
      currentConsecutive = 0;
    }
  });

  return maxConsecutive;
  // Time complexity = O(n)
  // Space complexity = O(1)
}

test('Max Consecutive Ones', () => {
  assert.equal(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]), 3);
  assert.equal(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]), 2);
  assert.equal(findMaxConsecutiveOnes([0, 0, 0, 0, 0, 0]), 0);
  assert.equal(findMaxConsecutiveOnes([1, 1, 1, 1, 1, 1]), 6);
});

/**
 * Find Numbers with Even Number of Digits
 */
function findNumbers(nums: number[]): number {
  let count = 0;

  nums.forEach((num) => {
    // Divide the number by 10 again and again to get the number of digits for example
    if (num.toString().length % 2 === 0) {
      count += 1;
    }
  });

  return count;
  // Time complexity = O(n)
  // Space complexity = O(1)
}

test('Find Numbers with Even Number of Digits', () => {
  assert.equal(findNumbers([12, 345, 2, 6, 7896]), 2);
  assert.equal(findNumbers([555, 901, 482, 1771]), 1);
});

/**
 * Squares of a Sorted Array
 */
function sortedSquaresA(nums: number[]): number[] {
  return nums.map((num) => num * num).sort((a, b) => a - b);
  // Time complexity = O(n^2) / O(logn)
  // Space complexity = O(1)
}

function sortedSquaresB(nums: number[]): number[] {
  const sortedSquares = [];

  let start = 0;
  let end = nums.length - 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    if (Math.abs(nums[start]) >= Math.abs(nums[end])) {
      sortedSquares[i] = nums[start] * nums[start];
      start += 1;
    } else {
      sortedSquares[i] = nums[end] * nums[end];
      end -= 1;
    }
  }
  return sortedSquares;
  // Time complexity = O(n)
  // Space complexity = O(n)
}

test('Squares of a Sorted Array', () => {
  [sortedSquaresA, sortedSquaresB].forEach((func) => {
    assert.deepEqual(func([-4, -1, 0, 3, 10]), [0, 1, 9, 16, 100]);
    assert.deepEqual(func([-7, -3, 2, 3, 11]), [4, 9, 9, 49, 121]);
  });
});

/**
 * Duplicate Zeros
 */
function duplicateZerosA(arr: number[]): void {
  let i = 0;

  while (i < arr.length) {
    if (arr[i] === 0) {
      for (let j = arr.length - 1; j >= i; j--) {
        arr[j] = arr[j - 1];
      }

      arr[i] = 0;
      i += 2;
    } else {
      i += 1;
    }
  }
  // Time complexity = O(n * m)
  // Space complexity = O(1)
}

function duplicateZerosB(arr: number[]): void {
  let zerosCount = 0;

  // [1, 0, 2, 3, 0, 4, 5, 0]
  arr.forEach((num) => {
    if (num === 0) {
      zerosCount += 1;
    }
  });

  let currentIndex = arr.length - 1;
  let indexToWrite = arr.length - 1 + zerosCount;

  while (currentIndex >= 0 && indexToWrite >= 0) {
    if (arr[currentIndex] === 0) {
      // Zero found, write it in twice if we can
      if (indexToWrite < arr.length) {
        arr[indexToWrite] = arr[currentIndex];
      }

      indexToWrite -= 1;

      if (indexToWrite < arr.length) {
        arr[indexToWrite] = arr[currentIndex];
      }
    } else {
      // Non-zero, just write it in
      if (indexToWrite < arr.length) {
        arr[indexToWrite] = arr[currentIndex];
      }
    }

    currentIndex -= 1;
    indexToWrite -= 1;
  }
  // Time complexity = O(n)
  // Space complexity = O(1)
}

test('Duplicate Zeros', () => {
  [duplicateZerosA, duplicateZerosB].forEach((func) => {
    const arr1 = [1, 0, 2, 3, 0, 4, 5, 0];
    func(arr1);
    assert.deepEqual(arr1, [1, 0, 0, 2, 3, 0, 0, 4]);

    const arr2 = [1, 2, 3];
    func(arr2);
    assert.deepEqual(arr2, [1, 2, 3]);

    const arr3 = [0, 0, 0];
    func(arr3);
    assert.deepEqual(arr3, [0, 0, 0]);
  });
});

/**
 * Merge Sorted Array
 */
function mergeA(nums1: number[], m: number, nums2: number[], n: number): void {
  let index1 = m - 1;
  let index2 = n - 1;

  for (let i = m + n - 1; i >= 0; i--) {
    if (nums1[index1] === undefined) {
      nums1[i] = nums2[index2];
      index2 -= 1;
    } else if (nums2[index2] === undefined) {
      nums1[i] = nums1[index1];
      index1 -= 1;
    } else if (nums1[index1] > nums2[index2]) {
      nums1[i] = nums1[index1];
      index1 -= 1;
    } else {
      nums1[i] = nums2[index2];
      index2 -= 1;
    }
  }
  // Time complexity = O(n)
  // Space complexity = O(1)
}

test('Merge Sorted Array', () => {
  [mergeA].forEach((func) => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    func(nums1, 3, [2, 5, 6], 3);
    assert.deepEqual(nums1, [1, 2, 2, 3, 5, 6]);

    const nums2 = [1];
    func(nums2, 1, [], 0);
    assert.deepEqual(nums2, [1]);

    const nums3 = [0];
    func(nums3, 0, [1], 1);
    assert.deepEqual(nums3, [1]);
  });
});

/**
 * Remove Element
 */
function removeElement(nums: number[], val: number): number {
  let i = 0;
  let count = 0;

  while (i < nums.length) {
    if (nums[i] === val) {
      for (let j = i; j < nums.length; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      if (nums[i] !== undefined) {
        count += 1;
      }
      i += 1;
    }
  }

  return count;
  // Time complexity = O(n^2)
  // Space complexity = O(1)
}

test('Remove Element', () => {
  [removeElement].forEach((func) => {
    const arr1 = [3, 2, 2, 3];
    assert.equal(func(arr1, 3), 2);
    assert.deepEqual(arr1, [2, 2, undefined, undefined]);

    const arr2 = [0, 1, 2, 2, 3, 0, 4, 2];
    assert.equal(func(arr2, 2), 5);
    assert.deepEqual(arr2, [0, 1, 3, 0, 4, undefined, undefined, undefined]);

    const arr3 = [2];
    assert.equal(func(arr3, 3), 1);
    assert.deepEqual(arr3, [2]);
  });
});
