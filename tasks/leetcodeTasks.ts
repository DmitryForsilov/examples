/**
 * LEETCODE stuff
 */

import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

/**
 * Collect all nodes in non-binary tree
 */
type Node = {
  val: number;
  children: Node[] | null;
};

const generateTree = (vals: number[]): Node => {
  const root = {
    val: vals[0],
    children: null,
  };

  let currentIndex = 1;

  const inner = (node: Node) => {
    if (currentIndex > vals.length) {
      return root;
    }

    const childrenCount = Math.floor(Math.random() * (5 - 1) + 1);

    if (childrenCount > 0 && currentIndex < vals.length) {
      node.children = [];

      for (let i = 1; i <= childrenCount; i++) {
        if (currentIndex > vals.length - 1) {
          return root;
        }

        node.children.push({
          val: vals[currentIndex],
          children: null,
        });
        currentIndex += 1;
      }

      node.children.forEach((child) => inner(child));
    }

    return root;
  };

  return inner(root);

  // Time complexity = O(n^2)
  // Space complexity = O(n)
};

const collectAllNodesA = (root: Node): number[] => {
  const inner = (node: Node, result: number[]) => {
    result.push(node.val);

    if (node.children) {
      node.children.forEach((child) => inner(child, result));
    }

    return result;
  };

  return inner(root, []);

  // Time complexity = O(n^2)
  // Space complexity = O(1)
};

const collectAllNodesB = (root: Node): number[] => {
  const result = [];
  const nodes = [root];

  while (nodes.length) {
    const currNode = nodes.pop();

    if (currNode) {
      result.push(currNode.val);

      if (currNode.children) {
        currNode.children.forEach((child) => nodes.unshift(child));
      }
    }
  }

  return result;

  // Time complexity = O(n^2)
  // Space complexity = O(n)
};

describe('Collect all nodes in non-binary tree', () => {
  const vals1 = Array(5)
    .fill(0)
    .map((_, i) => i + 1);
  const vals2 = Array(100)
    .fill(0)
    .map((_, i) => i + 1);
  const vals3 = Array(100)
    .fill(0)
    .map((_, i) => -(i + 1));

  const tree1 = generateTree(vals1);
  const tree2 = generateTree(vals2);
  const tree3 = generateTree(vals3);

  it('should be deepEqual; collectAllNodesA', () => {
    assert.deepEqual(
      collectAllNodesA(tree1).sort((a, b) => Math.abs(a) - Math.abs(b)),
      vals1,
    );
    assert.deepEqual(
      collectAllNodesA(tree2).sort((a, b) => Math.abs(a) - Math.abs(b)),
      vals2,
    );
    assert.deepEqual(
      collectAllNodesA(tree3).sort((a, b) => Math.abs(a) - Math.abs(b)),
      vals3,
    );
  });

  it('should be deepEqual; collectAllNodesB', () => {
    assert.deepEqual(collectAllNodesB(tree1), vals1);
    assert.deepEqual(collectAllNodesB(tree2), vals2);
    assert.deepEqual(collectAllNodesB(tree3), vals3);
  });
});

/**
 * Binary search
 */
const binarySearch = (nums: number[], val: number): number | null => {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (nums[mid] === val) {
      return mid;
    }

    if (nums[mid] > val) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return null;
};

describe('Binary search', () => {
  const bigArray = Array(100)
    .fill(0)
    .map((_, i) => i);

  it('should be equal', () => {
    assert.equal(binarySearch([0, 1, 2, 3, 4, 5], 3), 3);
    assert.equal(binarySearch([0, 1, 2, 3, 4, 5], 6), null);
    assert.equal(binarySearch([0, 1, 2, 3, 4], 2), 2);
    assert.equal(binarySearch(bigArray, 73), 73);
  });
});

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

describe('1480. Running Sum of 1d Array', () => {
  it('should be deep equal', () => {
    assert.deepEqual(runningSum([1, 2, 3, 4]), [1, 3, 6, 10]);
    assert.deepEqual(runningSum([1, 1, 1, 1, 1]), [1, 2, 3, 4, 5]);
    assert.deepEqual(runningSum([3, 1, 2, 10, 1]), [3, 4, 6, 16, 17]);
  });
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

describe('1672. Richest Customer Wealth', () => {
  const arr1 = [
    [1, 2, 3],
    [3, 2, 1],
  ];
  const arr2 = [
    [1, 5],
    [7, 3],
    [3, 5],
  ];
  const arr3 = [
    [2, 8, 7],
    [7, 1, 3],
    [1, 9, 5],
  ];

  it('should be equal; maximumWealthA', () => {
    assert.equal(maximumWealthA(arr1), 6);
    assert.equal(maximumWealthA(arr2), 10);
    assert.equal(maximumWealthA(arr3), 17);
  });

  it('should be equal; maximumWealthB', () => {
    assert.equal(maximumWealthB(arr1), 6);
    assert.equal(maximumWealthB(arr2), 10);
    assert.equal(maximumWealthB(arr3), 17);
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

describe('412. Fizz Buzz', () => {
  it('should be deep equal; fizzBuzzA', () => {
    assert.deepEqual(fizzBuzzA(3), ['1', '2', 'Fizz']);
    assert.deepEqual(fizzBuzzA(5), ['1', '2', 'Fizz', '4', 'Buzz']);
    assert.deepEqual(fizzBuzzA(15), [
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

  it('should be deep equal; fizzBuzzB', () => {
    assert.deepEqual(fizzBuzzB(3), ['1', '2', 'Fizz']);
    assert.deepEqual(fizzBuzzB(5), ['1', '2', 'Fizz', '4', 'Buzz']);
    assert.deepEqual(fizzBuzzB(15), [
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

describe('1342. Number of Steps to Reduce a Number to Zero', () => {
  it('should be equal; numberOfStepsA', () => {
    assert.equal(numberOfStepsA(14), 6);
    assert.equal(numberOfStepsA(8), 4);
    assert.equal(numberOfStepsA(123), 12);
  });

  it('should be equal; numberOfStepsB', () => {
    assert.equal(numberOfStepsB(14), 6);
    assert.equal(numberOfStepsB(8), 4);
    assert.equal(numberOfStepsB(123), 12);
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

describe('876. Middle of the Linked List', () => {
  it('should be deep equal; middleNodeA', () => {
    assert.deepEqual(middleNodeA(generateLinkedList([1, 2, 3, 4, 5])), generateLinkedList([3, 4, 5]));
    assert.deepEqual(middleNodeA(generateLinkedList([1, 2, 3, 4, 5, 6])), generateLinkedList([4, 5, 6]));
  });

  it('should be deep equal; middleNodeB', () => {
    assert.deepEqual(middleNodeB(generateLinkedList([1, 2, 3, 4, 5])), generateLinkedList([3, 4, 5]));
    assert.deepEqual(middleNodeB(generateLinkedList([1, 2, 3, 4, 5, 6])), generateLinkedList([4, 5, 6]));
  });

  it('should be deep equal; middleNodeC', () => {
    assert.deepEqual(middleNodeC(generateLinkedList([1, 2, 3, 4, 5])), generateLinkedList([3, 4, 5]));
    assert.deepEqual(middleNodeC(generateLinkedList([1, 2, 3, 4, 5, 6])), generateLinkedList([4, 5, 6]));
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

describe('383. Ransom Note', () => {
  it('should be equal', () => {
    assert.equal(canConstruct('a', 'b'), false);
    assert.equal(canConstruct('aa', 'ab'), false);
    assert.equal(canConstruct('aa', 'aab'), true);
  });
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

describe('Max Consecutive Ones', () => {
  it('should be equal', () => {
    assert.equal(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]), 3);
    assert.equal(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]), 2);
    assert.equal(findMaxConsecutiveOnes([0, 0, 0, 0, 0, 0]), 0);
    assert.equal(findMaxConsecutiveOnes([1, 1, 1, 1, 1, 1]), 6);
  });
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

describe('Find Numbers with Even Number of Digits', () => {
  it('should be equal', () => {
    assert.equal(findNumbers([12, 345, 2, 6, 7896]), 2);
    assert.equal(findNumbers([555, 901, 482, 1771]), 1);
  });
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

describe('Squares of a Sorted Array', () => {
  it('should be deep equal; sortedSquaresA', () => {
    assert.deepEqual(sortedSquaresA([-4, -1, 0, 3, 10]), [0, 1, 9, 16, 100]);
    assert.deepEqual(sortedSquaresA([-7, -3, 2, 3, 11]), [4, 9, 9, 49, 121]);
  });

  it('should be deep equal; sortedSquaresB', () => {
    assert.deepEqual(sortedSquaresB([-4, -1, 0, 3, 10]), [0, 1, 9, 16, 100]);
    assert.deepEqual(sortedSquaresB([-7, -3, 2, 3, 11]), [4, 9, 9, 49, 121]);
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

describe('Duplicate Zeros', () => {
  it('should be deep equal; duplicateZerosA', () => {
    const arr1 = [1, 0, 2, 3, 0, 4, 5, 0];
    duplicateZerosA(arr1);
    assert.deepEqual(arr1, [1, 0, 0, 2, 3, 0, 0, 4]);

    const arr2 = [1, 2, 3];
    duplicateZerosA(arr2);
    assert.deepEqual(arr2, [1, 2, 3]);

    const arr3 = [0, 0, 0];
    duplicateZerosA(arr3);
    assert.deepEqual(arr3, [0, 0, 0]);
  });

  it('should be deep equal; duplicateZerosB', () => {
    const arr1 = [1, 0, 2, 3, 0, 4, 5, 0];
    duplicateZerosB(arr1);
    assert.deepEqual(arr1, [1, 0, 0, 2, 3, 0, 0, 4]);

    const arr2 = [1, 2, 3];
    duplicateZerosB(arr2);
    assert.deepEqual(arr2, [1, 2, 3]);

    const arr3 = [0, 0, 0];
    duplicateZerosB(arr3);
    assert.deepEqual(arr3, [0, 0, 0]);
  });
});

/**
 * Merge Sorted Array
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
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

describe('Merge Sorted Array', () => {
  it('should be deep equal', () => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    merge(nums1, 3, [2, 5, 6], 3);
    assert.deepEqual(nums1, [1, 2, 2, 3, 5, 6]);

    const nums2 = [1];
    merge(nums2, 1, [], 0);
    assert.deepEqual(nums2, [1]);

    const nums3 = [0];
    merge(nums3, 0, [1], 1);
    assert.deepEqual(nums3, [1]);
  });
});

/**
 * Remove Element
 */
function removeElementA(nums: number[], val: number): number {
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

function removeElementB(nums: number[], val: number): number {
  let nonTargetIndex = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[nonTargetIndex] = nums[i];
      nonTargetIndex += 1;
    }
  }

  return nonTargetIndex;
  // Time complexity = O(n)
  // Space complexity = O(1)
}

function removeElementC(nums: number[], val: number): number {
  let writePointer = 0;

  for (let readPointer = 0; readPointer < nums.length; readPointer++) {
    if (nums[readPointer] !== val) {
      [nums[writePointer], nums[readPointer]] = [nums[readPointer], nums[writePointer]];
      writePointer += 1;
    }
  }

  return writePointer;
  // Time complexity = O(n)
  // Space complexity = O(1)
}

describe('Remove Element', () => {
  let arr1: number[];
  let arr2: number[];
  let arr3: number[];

  beforeEach(() => {
    arr1 = [3, 2, 2, 3];
    arr2 = [0, 1, 2, 2, 3, 0, 4, 2];
    arr3 = [2];
  });

  it('removeElementA', () => {
    assert.equal(removeElementA(arr1, 3), 2);
    assert.deepEqual(arr1, [2, 2, undefined, undefined]);

    assert.equal(removeElementA(arr2, 2), 5);
    assert.deepEqual(arr2, [0, 1, 3, 0, 4, undefined, undefined, undefined]);

    assert.equal(removeElementA(arr3, 3), 1);
    assert.deepEqual(arr3, [2]);
  });

  it('removeElementB', () => {
    assert.equal(removeElementB(arr1, 3), 2);
    assert.deepEqual(arr1, [2, 2, 2, 3]);

    assert.equal(removeElementB(arr2, 2), 5);
    assert.deepEqual(arr2, [0, 1, 3, 0, 4, 0, 4, 2]);

    assert.equal(removeElementB(arr3, 3), 1);
    assert.deepEqual(arr3, [2]);
  });

  it('removeElementC', () => {
    assert.equal(removeElementC(arr1, 3), 2);
    assert.deepEqual(arr1, [2, 2, 3, 3]);

    assert.equal(removeElementC(arr2, 2), 5);
    assert.deepEqual(arr2, [0, 1, 3, 0, 4, 2, 2, 2]);

    assert.equal(removeElementC(arr3, 3), 1);
    assert.deepEqual(arr3, [2]);
  });
});

/**
 * Remove Duplicates from Sorted Array
 */
function removeDuplicatesA(nums: number[]): number {
  let indexOfUnique = 0;
  let prevElement = null;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== prevElement) {
      nums[indexOfUnique] = nums[i];
      indexOfUnique += 1;
    }

    prevElement = nums[i];
  }

  // Time complexity = O(n)
  // Space complexity = O(1)
  return indexOfUnique;
}

function removeDuplicatesB(nums: number[]): number {
  if (!nums.length) {
    return 0;
  }

  let writePointer = 1;

  for (let readPointer = 1; readPointer < nums.length; readPointer++) {
    if (nums[readPointer] !== nums[readPointer - 1]) {
      nums[writePointer] = nums[readPointer];
      writePointer += 1;
    }
  }

  // Time complexity = O(n)
  // Space complexity = O(1)
  return writePointer;
}

describe('Remove Duplicates from Sorted Array', () => {
  it('should be equal and deep equal; removeDuplicatesA', () => {
    const arr1 = [1, 1, 2];
    assert.equal(removeDuplicatesA(arr1), 2);
    assert.deepEqual(arr1, [1, 2, 2]);

    const arr2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    assert.equal(removeDuplicatesA(arr2), 5);
    assert.deepEqual(arr2, [0, 1, 2, 3, 4, 2, 2, 3, 3, 4]);

    const arr3 = [] as number[];
    assert.equal(removeDuplicatesA(arr3), 0);
    assert.deepEqual(arr3, []);
  });

  it('should be equal and deep equal; removeDuplicatesB', () => {
    const arr1 = [1, 1, 2];
    assert.equal(removeDuplicatesB(arr1), 2);
    assert.deepEqual(arr1, [1, 2, 2]);

    const arr2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    assert.equal(removeDuplicatesB(arr2), 5);
    assert.deepEqual(arr2, [0, 1, 2, 3, 4, 2, 2, 3, 3, 4]);

    const arr3 = [] as number[];
    assert.equal(removeDuplicatesB(arr3), 0);
    assert.deepEqual(arr3, []);
  });
});

/**
 * Check If N and Its Double Exist
 */
function checkIfExistA(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === 2 * arr[j] || 2 * arr[i] === arr[j]) {
        return true;
      }
    }
  }

  return false;
  // Time complexity = O(n ^ 2)
  // Space complexity = O(1)
}

function checkIfExistB(arr: number[]): boolean {
  const hashMap: { [key: number]: number } = {};

  for (let i = 0; i < arr.length; i++) {
    hashMap[arr[i]] = i;
  }

  for (let i = 0; i < arr.length; i++) {
    if (hashMap[arr[i] * 2] !== undefined && hashMap[arr[i] * 2] !== i) {
      return true;
    }
  }

  return false;
  // Time complexity = O(n)
  // Space complexity = O(n)
}

describe('Check If N and Its Double Exist', () => {
  it('should be equal; checkIfExistA', () => {
    assert.equal(checkIfExistA([10, 2, 5, 3]), true);
    assert.equal(checkIfExistA([3, 1, 7, 11]), false);
    assert.equal(checkIfExistA([7, 1, 14, 11]), true);
    assert.equal(checkIfExistA([-2, 0, 10, -19, 4, 6, -8]), false);
  });

  it('should be equal; checkIfExistB', () => {
    assert.equal(checkIfExistB([10, 2, 5, 3]), true);
    assert.equal(checkIfExistB([3, 1, 7, 11]), false);
    assert.equal(checkIfExistB([7, 1, 14, 11]), true);
    assert.equal(checkIfExistB([-2, 0, 10, -19, 4, 6, -8]), false);
  });
});

/**
 * Valid Mountain Array
 */
function validMountainArrayA(arr: number[]): boolean {
  if (arr.length < 3) {
    return false;
  }

  const mods = {
    increasing: 'increasing',
    decreasing: 'decreasing',
    default: 'default',
  };

  let mode = mods.default;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      return false;
    }

    if (mode === mods.default) {
      if (arr[i] < arr[i - 1]) {
        return false;
      }

      if (arr[i] > arr[i - 1]) {
        mode = mods.increasing;
      }
    } else if (mode === mods.increasing) {
      if (arr[i] < arr[i - 1]) {
        mode = mods.decreasing;
      }
    } else if (mode === mods.decreasing) {
      if (arr[i] > arr[i - 1]) {
        return false;
      }
    }
  }

  return mode === mods.decreasing;
  // Time complexity = O(n)
  // Space complexity = O(1)
}

function validMountainArrayB(arr: number[]): boolean {
  if (arr.length < 3) {
    return false;
  }

  let left = 0;
  let right = arr.length - 1;

  while (left + 1 < arr.length - 1 && arr[left] < arr[left + 1]) {
    left += 1;
  }
  while (right - 1 > 0 && arr[right] < arr[right - 1]) {
    right -= 1;
  }

  return left === right;
  // Time complexity = O(n)
  // Space complexity = O(1)
}

describe('Valid Mountain Array', () => {
  it('should be equal; validMountainArrayA', () => {
    assert.equal(validMountainArrayA([2, 1]), false);
    assert.equal(validMountainArrayA([3, 5, 5]), false);
    assert.equal(validMountainArrayA([0, 3, 2, 1]), true);
    assert.equal(validMountainArrayA([0, 1, 2, 3, 4]), false);
    assert.equal(validMountainArrayA([5, 6, 7, 8, 9]), false);
    assert.equal(validMountainArrayA([2, 1, 2, 3, 5, 7, 9, 10, 12, 14, 15, 16, 18, 14, 13]), false);
  });

  it('should be equal; validMountainArrayB', () => {
    assert.equal(validMountainArrayB([2, 1]), false);
    assert.equal(validMountainArrayB([3, 5, 5]), false);
    assert.equal(validMountainArrayB([0, 3, 2, 1]), true);
    assert.equal(validMountainArrayB([0, 1, 2, 3, 4]), false);
    assert.equal(validMountainArrayB([5, 6, 7, 8, 9]), false);
    assert.equal(validMountainArrayB([2, 1, 2, 3, 5, 7, 9, 10, 12, 14, 15, 16, 18, 14, 13]), false);
  });
});

/**
 * Replace Elements with Greatest Element on Right Side
 */
function replaceElements(arr: number[]): number[] {
  let max = -1;

  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];

    arr[i] = max;
    max = Math.max(max, num);
  }

  return arr;

  // Time complexity = O(n)
  // Space complexity = O(1)
}

describe('Replace Elements with Greatest Element on Right Side', () => {
  it('should be deep equal', () => {
    assert.deepEqual(replaceElements([17, 18, 5, 4, 6, 1]), [18, 6, 6, 6, 1, -1]);
    assert.deepEqual(replaceElements([400]), [-1]);
  });
});

/**
 * Move Zeroes
 */
function moveZeroesA(nums: number[]): void {
  let writePointer = 0;

  for (let readPointer = 0; readPointer < nums.length; readPointer++) {
    if (nums[readPointer] !== 0) {
      const temp = nums[writePointer];

      nums[writePointer] = nums[readPointer];

      if (temp === 0) {
        nums[readPointer] = 0;
      }
      writePointer += 1;
    }
  }

  // Time complexity = O(n)
  // Space complexity = O(1)
}

function moveZeroesB(nums: number[]): void {
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] !== 0) {
      // shorthand of
      // const temp = nums[left];
      // nums[left] = nums[right];
      // nums[right] = temp;
      [nums[left], nums[right]] = [nums[right], nums[left]];

      left += 1;
    }
  }

  // Time complexity = O(n)
  // Space complexity = O(1)
}

describe('Move Zeroes', () => {
  it('should be deep equal; moveZeroesA', () => {
    const arr1 = [0, 1, 0, 3, 12];
    const arr2 = [1, 0];
    const arr3 = [2, 1];
    const arr4 = [0];
    const arr5 = [1];

    moveZeroesA(arr1);
    assert.deepEqual(arr1, [1, 3, 12, 0, 0]);

    moveZeroesA(arr2);
    assert.deepEqual(arr2, [1, 0]);

    moveZeroesA(arr3);
    assert.deepEqual(arr3, [2, 1]);

    moveZeroesA(arr4);
    assert.deepEqual(arr4, [0]);

    moveZeroesA(arr5);
    assert.deepEqual(arr5, [1]);
  });

  it('should be deep equal; moveZeroesB', () => {
    const arr1 = [0, 1, 0, 3, 12];
    const arr2 = [1, 0];
    const arr3 = [2, 1];
    const arr4 = [0];
    const arr5 = [1];

    moveZeroesB(arr1);
    assert.deepEqual(arr1, [1, 3, 12, 0, 0]);

    moveZeroesB(arr2);
    assert.deepEqual(arr2, [1, 0]);

    moveZeroesB(arr3);
    assert.deepEqual(arr3, [2, 1]);

    moveZeroesB(arr4);
    assert.deepEqual(arr4, [0]);

    moveZeroesB(arr5);
    assert.deepEqual(arr5, [1]);
  });
});

/**
 * Sort Array By Parity
 */
function sortArrayByParity(nums: number[]): number[] {
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] % 2 === 0) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left += 1;
    }
  }

  return nums;

  // Time complexity = O(n)
  // Space complexity = O(1)
}

describe('Sort Array By Parity', () => {
  it('should be deep equal', () => {
    const arr1 = [3, 1, 2, 4];
    const arr2 = [0];

    sortArrayByParity(arr1);
    assert.deepEqual(arr1, [2, 4, 3, 1]);

    sortArrayByParity(arr2);
    assert.deepEqual(arr2, [0]);
  });
});

/**
 * Height Checker
 */
function heightChecker(heights: number[]): number {
  const expectedHeights = [...heights].sort((a, b) => a - b);
  let result = 0;

  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== expectedHeights[i]) {
      result += 1;
    }
  }

  return result;

  // Time complexity = O(n^2 | logn)
  // Space complexity = O(n)
}

describe('Height Checker', () => {
  it('should be equal', () => {
    // heights:  [1,1,4,2,1,3]
    // expected: [1,1,1,2,3,4]
    assert.equal(heightChecker([1, 1, 4, 2, 1, 3]), 3);

    // heights:  [5,1,2,3,4]
    // expected: [1,2,3,4,5]
    assert.equal(heightChecker([5, 1, 2, 3, 4]), 5);

    // heights:  [1,2,3,4,5]
    // expected: [1,2,3,4,5]
    assert.equal(heightChecker([1, 2, 3, 4, 5]), 0);
  });
});

/**
 * Third Maximum Number
 */
function thirdMax(nums: number[]): number {
  let firstMax = null;

  for (let i = 0; i < nums.length; i++) {
    firstMax = firstMax === null ? nums[i] : Math.max(firstMax, nums[i]);
  }

  let secondMax = null;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== firstMax) {
      secondMax = secondMax === null ? nums[i] : Math.max(secondMax, nums[i]);
    }
  }

  let thirdMax = null;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== firstMax && nums[i] !== secondMax) {
      thirdMax = thirdMax === null ? nums[i] : Math.max(thirdMax, nums[i]);
    }
  }

  return thirdMax !== null ? (thirdMax as number) : (firstMax as number);
  // Time complexity = O(n)
  // Space complexity = O(1)
}

describe('Third Maximum Number', () => {
  it('should be equal', () => {
    // The first distinct maximum is 3.
    // The second distinct maximum is 2.
    // The third distinct maximum is 1.
    assert.equal(thirdMax([3, 2, 1]), 1);

    // The first distinct maximum is 2.
    // The second distinct maximum is 1.
    // The third distinct maximum does not exist, so the maximum (2) is returned instead.
    assert.equal(thirdMax([1, 2]), 2);

    // The first distinct maximum is 3.
    // The second distinct maximum is 2 (both 2's are counted together since they have the same value).
    // The third distinct maximum is 1.
    assert.equal(thirdMax([2, 2, 3, 1]), 1);
  });
});

/**
 * Find All Numbers Disappeared in an Array
 */
function findDisappearedNumbersA(nums: number[]): number[] {
  const expectedNums = [];
  const hashMap: { [key: number]: number } = {};
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    expectedNums[i] = i + 1;
    hashMap[nums[i]] = nums[i];
  }

  for (let i = 0; i < expectedNums.length; i++) {
    const expectedNum = expectedNums[i];

    if (hashMap[expectedNum] === undefined) {
      result.push(expectedNum);
    }
  }

  return result;

  // Time complexity = O(n)
  // Space complexity = O(n)
}

function findDisappearedNumbersB(nums: number[]): number[] {
  const hashSet = new Set(nums);
  const result = [];

  for (let i = 1; i <= nums.length; i++) {
    if (!hashSet.has(i)) {
      result.push(i);
    }
  }

  return result;

  // Time complexity = O(n)
  // Space complexity = O(n)
}

function findDisappearedNumbersC(nums: number[]): number[] {
  const arrayOfExist = Array(nums.length).fill(false);
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    arrayOfExist[num] = true;
  }

  for (let i = 1; i <= nums.length; i++) {
    if (!arrayOfExist[i]) {
      result.push(i);
    }
  }

  return result;
  // Time complexity = O(n)
  // Space complexity = O(n)
}

describe('Find All Numbers Disappeared in an Array', () => {
  // Given an array nums of n integers where nums[i] is in the range [1, n],
  // return an array of all the integers in the range [1, n] that do not appear in nums.
  it('should be deep equal; findDisappearedNumbersA', () => {
    assert.deepEqual(findDisappearedNumbersA([4, 3, 2, 7, 8, 2, 3, 1]), [5, 6]);
    assert.deepEqual(findDisappearedNumbersA([1, 1]), [2]);
  });

  it('should be deep equal; findDisappearedNumbersB', () => {
    assert.deepEqual(findDisappearedNumbersB([4, 3, 2, 7, 8, 2, 3, 1]), [5, 6]);
    assert.deepEqual(findDisappearedNumbersB([1, 1]), [2]);
  });

  it('should be deep equal; findDisappearedNumbersC', () => {
    assert.deepEqual(findDisappearedNumbersC([4, 3, 2, 7, 8, 2, 3, 1]), [5, 6]);
    assert.deepEqual(findDisappearedNumbersC([1, 1]), [2]);
  });
});

/**
 * Sort By Bubble
 */
const sortByBubble = (nums: number[]) => {
  let isSwapped = false;
  for (let i = 0; i < nums.length; i++) {
    isSwapped = false;

    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        isSwapped = true;
      }
    }

    if (!isSwapped) {
      return;
    }
  }
  // Time complexity = O(n^2)
  // Space complexity = O(1)
};

describe('Sort By Bubble', () => {
  it('should be deep equal', () => {
    const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

    sortByBubble(arr);
    assert.deepEqual(arr, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  it('should be deep equal', () => {
    const arr = [6, 1, 2, 2, 0];

    sortByBubble(arr);
    assert.deepEqual(arr, [0, 1, 2, 2, 6]);
  });
  it('should be deep equal', () => {
    const arr = [1, 2, 3, 4];

    sortByBubble(arr);
    assert.deepEqual(arr, [1, 2, 3, 4]);
  });
  it('should be deep equal', () => {
    const arr = [4, 3, -2, -1, 0];

    sortByBubble(arr);
    assert.deepEqual(arr, [-2, -1, 0, 3, 4]);
  });
});
