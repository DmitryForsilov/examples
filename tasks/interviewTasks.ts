import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

/**
 * Find value by keys sequence
 */
type Tree = {
  [key: string]: Tree | number;
};
const findValueByKeysSequence = (tree: Tree, sequence: string): Tree | number | null => {
  const keys = sequence.split('.');
  let currentValue: Tree | number = tree;

  for (let i = 0; i < keys.length; i++) {
    if (typeof currentValue === 'number') {
      return null;
    }

    const newValue: Tree | number = currentValue[keys[i]];

    if (newValue === undefined) {
      return null;
    }

    currentValue = newValue;
  }

  return currentValue;
};

describe('Find value by keys sequence', () => {
  const tree = {
    a: {
      b: {
        c: {
          d: 1,
        },
      },
    },
  };

  it('should be deep equal', () => {
    assert.deepEqual(findValueByKeysSequence(tree, 'a.b.c'), { d: 1 });
  });
  it('should be equal', () => {
    assert.equal(findValueByKeysSequence(tree, 'a.b.c.d'), 1);
  });
  it('should be equal', () => {
    assert.equal(findValueByKeysSequence(tree, 'b'), null);
  });
  it('should be equal', () => {
    assert.equal(findValueByKeysSequence(tree, 'a.b.c.d.e'), null);
  });
});

/**
 * Test event loop
 */
const testEventLoop = (writeLog: (message: string) => void) => {
  writeLog('--- synchronous 1');

  setTimeout(() => {
    writeLog('--- setTimeout 1');
  });

  setTimeout(() => {
    writeLog('--- setTimeout 2');
  });

  Promise.resolve().then(() => {
    writeLog('--- Promise 1');
  });

  Promise.resolve().then(() => {
    writeLog('--- Promise 2');
  });

  Promise.resolve().then(() => {
    writeLog('--- Promise 3');
  });

  setTimeout(() => {
    writeLog('--- setTimeout 3');

    Promise.resolve().then(() => {
      writeLog('--- Promise 4');
    });
  });

  writeLog('--- synchronous 2');

  Promise.resolve().then(() => {
    writeLog('--- Promise 5');
  });

  Promise.resolve().then(() => {
    writeLog('--- Promise 6');

    setTimeout(() => {
      writeLog('--- setTimeout 4');
    });
  });

  new Promise((resolve) => {
    writeLog('--- Promise 7');
    resolve(1);
  });

  writeLog('--- synchronous 3');
};

describe('Test event loop', () => {
  const log: string[] = [];
  const writeLog = (message: string) => {
    log.push(message);
  };

  testEventLoop(writeLog);

  it('should be deep equal', () => {
    setTimeout(() => {
      assert.deepEqual(log, [
        '--- synchronous 1',
        '--- synchronous 2',
        '--- Promise 7',
        '--- synchronous 3',
        '--- Promise 1',
        '--- Promise 2',
        '--- Promise 3',
        '--- Promise 5',
        '--- Promise 6',
        '--- setTimeout 1',
        '--- setTimeout 2',
        '--- setTimeout 3',
        '--- Promise 4',
        '--- setTimeout 4',
      ]);
    }, 0);
  });
});

/**
 * Calculate Sum of integers in string
 */
const calculateSumOfIntegers = (str: string) => {
  let sum = 0;
  let currentNumStr = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (typeof +char === 'number' && !Number.isNaN(+char)) {
      if (str[i - 1] === '-') {
        currentNumStr += '-';
      }

      currentNumStr += char;

      if (i === str.length - 1) {
        sum += +currentNumStr;
        currentNumStr = '';
      }
    } else if (currentNumStr) {
      sum += +currentNumStr;
      currentNumStr = '';
    }
  }

  return sum;
  // Time complexity = O(n)
  // Space complexity = O(1)
};

describe('calculateSumOfIntegers', () => {
  it('should be equal', () => {
    assert.equal(calculateSumOfIntegers('The30quick20brown10f0x1203jumps914ov3r1349the102l4zy dog'), 3635);
  });
  it('should be equal', () => {
    assert.equal(calculateSumOfIntegers('1  a-1b-20c-c-10-10'), -40);
  });
  it('should be equal', () => {
    assert.equal(calculateSumOfIntegers(''), 0);
  });
});

/**
 * Calculate factorial
 */
const calculateFactorial = (n: number) => {
  if (n === 0) {
    return 1;
  }

  let factorial = 1;

  for (let i = 1; i <= n; i++) {
    factorial *= i;
  }

  return factorial;

  // Time complexity = O(n)
  // Space complexity = O(1)
};

describe('calculateFactorial', () => {
  it('should be equal', () => {
    assert.equal(calculateFactorial(5), 120);
  });
  it('should be equal', () => {
    assert.equal(calculateFactorial(0), 1);
  });
  it('should be equal', () => {
    assert.equal(calculateFactorial(10), 3628800);
  });
});

/**
 * Generate Fibonacci Sequence
 */
const generateFibonacciSequence = (count: number) => {
  if (count === 0) {
    return [];
  }
  if (count === 1) {
    return [0];
  }
  if (count === 2) {
    return [0, 1];
  }

  const sequence = [0, 1];
  let firstNum = 0;
  let secondNum = 1;

  for (let i = 3; i <= count; i++) {
    const nextNum = firstNum + secondNum;

    firstNum = secondNum;
    secondNum = nextNum;
    sequence.push(nextNum);
  }

  return sequence;

  // Time complexity = O(n)
  // Space complexity = O(n)
};

describe('generateFibonacciSequence', () => {
  it('should be deep equal', () => {
    assert.deepEqual(generateFibonacciSequence(0), []);
  });
  it('should be deep equal', () => {
    assert.deepEqual(generateFibonacciSequence(1), [0]);
  });
  it('should be deep equal', () => {
    assert.deepEqual(generateFibonacciSequence(2), [0, 1]);
  });
  it('should be deep equal', () => {
    assert.deepEqual(generateFibonacciSequence(3), [0, 1, 1]);
  });
  it('should be deep equal', () => {
    assert.deepEqual(generateFibonacciSequence(6), [0, 1, 1, 2, 3, 5]);
  });
  it('should be deep equal', () => {
    assert.deepEqual(generateFibonacciSequence(11), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});

/**
 * Add num infinity times
 */

const addNumInfinityTimes = (num?: number) => {
  if (num === undefined) {
    return 0;
  }

  let sum = num;

  const addNextNum = (nextNum?: number) => {
    if (nextNum === undefined) {
      return sum;
    }

    sum += nextNum;

    return addNextNum;
  };

  return addNextNum;
};

describe('addNumInfinityTimes', () => {
  it('should be equal', () => {
    assert.deepEqual(addNumInfinityTimes(), 0);
  });
  it('should be equal', () => {
    const firstCall = addNumInfinityTimes(9) as (nextNum?: number) => {};

    assert.deepEqual(firstCall(), 9);
  });
  it('should be equal', () => {
    const firstCall = addNumInfinityTimes(9) as (nextNum?: number) => {};
    const secondCall = firstCall(10) as (nextNum?: number) => {};

    assert.deepEqual(secondCall(), 19);
  });
});

/**
 * Check Is palindrome
 */
const checkIsPalindrome = (str: string) => {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }

    left += 1;
    right -= 1;
  }

  return true;
};

describe('checkIsPalindrome', () => {
  it('should be equal', () => {
    assert.equal(checkIsPalindrome('aabaa'), true);
  });
  it('should be equal', () => {
    assert.equal(checkIsPalindrome('aabaas'), false);
  });
});

/**
 * Check is deep equal
 */
type Obj = { [key: string]: any };
const checkIsDeepEqual = (obj1: Obj, obj2: Obj): boolean => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (let i = 0; i < obj1Keys.length; i++) {
    const firstValue = obj1[obj1Keys[i]];
    const secondValue = obj2[obj1Keys[i]];

    if (
      typeof firstValue === 'object' &&
      firstValue !== null &&
      typeof secondValue === 'object' &&
      secondValue !== null
    ) {
      return checkIsDeepEqual(firstValue, secondValue);
    }

    if (firstValue !== secondValue) {
      return false;
    }
  }

  return true;
};

describe('checkIsDeepEqual', () => {
  const car1 = {
    wheels: 4,
    brake: 4,
    speed: 200,
    options: [{ key: '1', value: 'color' }],
  };

  it('should be equal', () => {
    const car2 = {
      wheels: 4,
      brake: 4,
      speed: 200,
    };

    assert.equal(checkIsDeepEqual(car1, car2), false);
  });
  it('should be equal', () => {
    const car2 = {
      wheels: null,
      brake: 4,
      speed: 200,
      options: [{ key: '1', value: 'color' }],
    };

    assert.equal(checkIsDeepEqual(car1, car2), false);
  });
  it('should be equal', () => {
    const car2 = {
      wheels: 1,
      brake: 4,
      speed: 200,
      options: [{ key: '1', value: 'color' }],
    };

    assert.equal(checkIsDeepEqual(car1, car2), false);
  });
  it('should be equal', () => {
    const car2 = {
      wheels: 4,
      brake: 4,
      speed: 200,
      options: [{ key: '2', value: 'color' }],
    };

    assert.equal(checkIsDeepEqual(car1, car2), false);
  });
  it('should be equal', () => {
    const car2 = {
      wheels: 4,
      brake: 4,
      speed: 200,
      options: [{ key: '2', value: null }],
    };

    assert.equal(checkIsDeepEqual(car1, car2), false);
  });
  it('should be equal', () => {
    const car2 = {
      wheels: 4,
      brake: 4,
      speed: 200,
      options: [{ key: '2', value: 'color' }, { key: '2' }],
    };

    assert.equal(checkIsDeepEqual(car1, car2), false);
  });
  it('should be equal', () => {
    const car2 = {
      wheels: 4,
      brake: 4,
      speed: 200,
      options: [{ key: '1', value: 'color' }],
    };

    assert.equal(checkIsDeepEqual(car1, car2), true);
  });
  it('should be equal', () => {
    const car1 = {
      wheels: null,
      brake: 4,
      speed: 200,
      options: [{ key: '1', value: 'color' }],
    };
    const car2 = {
      wheels: null,
      brake: 4,
      speed: 20,
      options: [{ key: '1', value: 'color' }],
    };

    assert.equal(checkIsDeepEqual(car1, car2), false);
  });
});

/**
 * Sort Odd Numbers
 */
const sortOddNumbers = (nums: number[]) => {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    if (nums[left] % 2 !== 0 && nums[right] % 2 !== 0) {
      if (nums[left] > nums[right]) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        right -= 1;
      } else {
        left += 1;
      }
    } else {
      if (nums[left] % 2 === 0) {
        left += 1;
      } else if (nums[right] % 2 === 0) {
        right -= 1;
      }
    }
  }

  return nums;
};

describe('sortOddNumbers', () => {
  it('should be deep equal', () => {
    const nums = [5, 4, 1, 6, 3, 8];

    assert.deepEqual(sortOddNumbers(nums), [1, 4, 3, 6, 5, 8]);
  });
  it('should be deep equal', () => {
    const nums = [3, 4, 7, 11, 9, 10];

    assert.deepEqual(sortOddNumbers(nums), [3, 4, 7, 9, 11, 10]);
  });
});
