import { beforeEach, describe, it } from 'node:test';
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
 * Напишите функцию isPalindrome, которая проверяет, является ли заданная строка палиндромом. Палиндромом считается строка, которая одинаково читается как слева направо, так и справа налево, при этом игнорируются пробелы, знаки препинания и регистр символов.
 *
 * Формат ввода
 * На вход подаётся строка (1≤∣s∣≤200000), которая может содержать буквы английского алфавита, цифры, пробелы и специальные символы
 *
 * Формат вывода
 * Верните true, если строка
 * s
 * s является палиндромом, иначе — false
 */
const checkIsPalindrome = (str: string) => {
  const filteredStr = str.replace(/[^a-zA-Z0-9]/g, '');
  let left = 0;
  let right = filteredStr.length - 1;

  while (left < right) {
    if (filteredStr[left].toLowerCase() !== filteredStr[right].toLowerCase()) {
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
  it('should be equal', () => {
    assert.equal(checkIsPalindrome('Do geese see God?'), true);
  });
  it('should be equal', () => {
    assert.equal(checkIsPalindrome('Hello, world!'), false);
  });
  it('should be equal', () => {
    assert.equal(checkIsPalindrome('Madam, I’m Adam'), true);
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

/**
 * Event loop with variable
 */
const runEventLoopFunc = (writeLog: (data: { msg: string; a: number }) => void) => {
  let a = 5;
  setTimeout(function timeout() {
    writeLog({ msg: '4 log, setTimout invoking', a });

    a = 10;

    writeLog({ msg: '5 log, setTimout invoking, after variable change', a });
  }, 0);

  let p = new Promise(function (resolve) {
    writeLog({ msg: '1 log, Promise defining', a });

    a = 25;
    resolve(a);
  });

  p.then(function () {
    a = 15;

    writeLog({ msg: '3 log, promise resolving', a });
  });

  writeLog({ msg: '2 log, synchronous', a });
};

describe('Test event loop with variable', () => {
  const log: { msg: string; a: number }[] = [];
  const writeLog = (data: { msg: string; a: number }) => {
    log.push(data);
  };

  runEventLoopFunc(writeLog);

  it('should be deep equal', () => {
    setTimeout(() => {
      assert.deepEqual(log, [
        { msg: '1 log, Promise defining', a: 5 },
        { msg: '2 log, synchronous', a: 25 },
        { msg: '3 log, promise resolving', a: 15 },
        { msg: '4 log, setTimout invoking', a: 15 },
        { msg: '5 log, setTimout invoking, after variable change', a: 10 },
      ]);
    }, 0);
  });
});

/**
 * Make string
 * написать функцию, либо последовательность операций, которая вернет результат следующих условий:
 * 1) результат есть строка из сконкатенированных value элементов коллекции, расположенных в обратном порядке символов
 * 2) результат собирается только из непросроченных записей и конкатенируется в порядке возрастания order
 * 3) результат не содержит одинаковых символов
 */

const makeString = (
  input: {
    value: string;
    order: number;
    expired: boolean;
  }[],
) => {
  // a) variant
  // const hashMap: { [key: string]: number } = {};
  //
  // return input
  //   .filter((entry) => !entry.expired)
  //   .map((entry) => ({ ...entry, value: entry.value.split('').reverse().join('') }))
  //   .sort((a, b) => a.order - b.order)
  //   .reduce((acc, entry) => {
  //     acc += entry.value;
  //
  //     return acc;
  //   }, '')
  //   .split('')
  //   .reduce((acc, char) => {
  //     if (!hashMap[char]) {
  //       acc.push(char);
  //       hashMap[char] = 1;
  //     }
  //
  //     return acc;
  //   }, [] as string[])
  //   .join('');

  // b) variant
  const stringWithNotUniqueChars = input
    .filter((entry) => !entry.expired)
    .map((entry) => ({ ...entry, value: entry.value.split('').reverse().join('') }))
    .sort((a, b) => a.order - b.order)
    .reduce((acc, entry) => {
      acc += entry.value;

      return acc;
    }, '');

  return Array.from(new Set(stringWithNotUniqueChars)).join('');
};

describe('Test make string', () => {
  it('should be equal', () => {
    const input = [
      { value: 'abcd', order: 4, expired: true },
      { value: 'qwer', order: 2, expired: false },
      { value: 'xyz1', order: 1, expired: true },
      { value: 'abx2', order: 3, expired: true },
    ];

    const output = makeString(input);

    assert.equal(output, 'rewq');
  });

  it('should be equal', () => {
    const input = [
      { value: 'abcd', order: 4, expired: false },
      { value: 'qwer', order: 2, expired: true },
      { value: 'xyz1', order: 1, expired: false },
      { value: 'abx2', order: 3, expired: false },
    ];

    const output = makeString(input);

    assert.equal(output, '1zyx2badc');
  });

  it('should be equal', () => {
    const input = [
      { value: 'abcd', order: 4, expired: false },
      { value: 'qwer', order: 2, expired: false },
      { value: 'xyz1', order: 1, expired: false },
      { value: 'abx2', order: 3, expired: false },
    ];

    const output = makeString(input);

    assert.equal(output, '1zyxrewq2badc');
  });
});

/**
 * Get value by path
 * Написат функцию get, на вход функция принимает объект и путь до поля.
 * Путь это строка, разделенная точкой. Функция должна вернуть соответствующее поле объекта или null, если поля нет.
 */

const getValueByPath = (object: object, path: string) => {
  return path.split('.').reduce((acc, key) => {
    if (typeof acc === 'object' && acc !== null && acc.hasOwnProperty(key)) {
      return acc[key];
    } else {
      return null;
    }
  }, object as any);

  // более подробный вариант
  // const keys = path.split('.')
  // let currentValue: any = object
  //
  // for (let i = 0; i < keys.length; i++) {
  //   if (typeof currentValue  === 'object' && currentValue !== null && currentValue.hasOwnProperty(keys[i])) {
  //     currentValue = currentValue[keys[i]]
  //   } else {
  //     return null
  //   }
  // }
  //
  // return currentValue
};

describe('Test value by path', () => {
  const input = {
    a: {
      b: {
        c: 'd',
      },
      e: 'f',
    },

    z: null,
  };

  it('should be deep equal', () => {
    assert.deepEqual(getValueByPath(input, 'a.b'), { c: 'd' });
  });
  it('should be equal', () => {
    assert.deepEqual(getValueByPath(input, 'a.b.c'), 'd');
  });
  it('should be equal', () => {
    assert.deepEqual(getValueByPath(input, 'a.e'), 'f');
  });
  it('should be equal', () => {
    assert.equal(getValueByPath(input, 'a.f'), null);
  });
  it('should be equal', () => {
    assert.equal(getValueByPath(input, 'z.x'), null);
  });
});

/**
 * Sort even numbers
 */
const sortEvenNumbers = (nums: number[]) => {
  const evenIndexes: number[] = [];
  const sortedOnlyEven = nums
    .filter((num, index) => {
      if (num % 2 === 0) {
        evenIndexes.push(index);
      }
      return num % 2 === 0;
    })
    .sort((a, b) => a - b);

  evenIndexes.forEach((index, currIndex) => {
    nums[index] = sortedOnlyEven[currIndex];
  });

  return nums;
};

describe('Test sort even numbers', () => {
  it('should be deep equal', () => {
    const input = [3, 8, 2, 1, 5, 6, 4, 9, 7];

    assert.deepEqual(sortEvenNumbers(input), [3, 2, 4, 1, 5, 6, 8, 9, 7]);
  });
});

/**
 * Get ranges
 * Дан список чисел, повторяющихся элементов в списке нет.
 * Нужно преобразовать это множество в строку, сворячивая соседние по числовому ряду числа в диапазоны.
 */

const getRanges = (nums: number[]) => {
  const sortedNums = nums.sort((a, b) => a - b);
  const ranges = [];

  let start: number | null = null;
  let end: number | null = null;

  for (let i = 0; i < sortedNums.length; i++) {
    const currNum = sortedNums[i];
    const nextNum = sortedNums[i + 1];

    if (start === null) {
      start = currNum;
    }

    if (currNum === nextNum - 1) {
      end = nextNum;
    } else {
      end === null ? ranges.push(`${start}`) : ranges.push(`${start}-${end}`);

      start = nextNum;
      end = null;
    }
  }

  return ranges.join(', ');
};

describe('Test get ranges', () => {
  it('should be equal', () => {
    const input = [1, 4, 5, 2, 3, 9, 8, 11, 0];

    assert.deepEqual(getRanges(input), '0-5, 8-9, 11');
  });
  it('should be equal', () => {
    const input = [1, 4, 3, 2];

    assert.deepEqual(getRanges(input), '1-4');
  });
  it('should be equal', () => {
    const input = [1, 4];

    assert.deepEqual(getRanges(input), '1, 4');
  });
});

/**
 * My promise any
 * На входе массив промисов
 * Резолв с первым зарезолвленным промисом.
 * Реджект, если упали все промисы.
 * В случае реджекта, порядок ошибок должен сохраниться.
 * В случае резолва не должен дожидаться выполнения остальных промисов.
 */
const promiseAny = (values: unknown[]) => {
  const errors: any[] = [];

  return new Promise((resolve, reject) => {
    values.forEach((value) => {
      Promise.resolve(value)
        .then(resolve)
        .catch((error: any) => {
          errors.push(error);

          if (errors.length === values.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
};

const runMyPromiseAny = (values: unknown[], writeLog: (msg: any) => void) => {
  promiseAny(values)
    .then((result) => writeLog(result))
    .catch((err) => {
      err.errors.forEach(writeLog);
    });
};

describe('Test my promise any', () => {
  const ORDERS = {
    FIRST: 0,
    SECOND: 1,
    THIRD: 2,
    FORTH: 3,
  };

  const getLogAndWriteLog = () => {
    const log: string[] = [];
    const writeLog = (msg: string) => {
      log.push(msg);
    };

    return { log, writeLog };
  };

  it('get first resolved promise', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const promise1 = new Promise((_, reject) => setTimeout(reject, ORDERS.FIRST, 'error'));
    const promise2 = new Promise((resolve) => setTimeout(resolve, ORDERS.SECOND, 'quick'));
    const promise3 = new Promise((resolve) => setTimeout(resolve, ORDERS.THIRD, 'slow'));

    const promises = [promise1, promise2, promise3];

    runMyPromiseAny(promises, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, ['quick']);
    }, ORDERS.FORTH);
  });

  it('get all rejected promises', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const promise1 = new Promise((_, reject) => setTimeout(reject, ORDERS.FIRST, 'error 1'));
    const promise2 = new Promise((_, reject) => setTimeout(reject, ORDERS.SECOND, 'error 2'));
    const promise3 = new Promise((_, reject) => setTimeout(reject, ORDERS.THIRD, 'error 3'));

    const promises = [promise1, promise2, promise3];

    runMyPromiseAny(promises, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, ['error 1', 'error 2', 'error 3']);
    }, ORDERS.FORTH);
  });

  it('get first resolved non promise value', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const values = [1, 2, 3];

    runMyPromiseAny(values, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, [1]);
    }, ORDERS.FIRST);
  });
});

/**
 * My promise all
 */
const myPromiseAll = (values: unknown[]) => {
  const results: unknown[] = [];

  return new Promise((resolve, reject) => {
    values.forEach((value) => {
      Promise.resolve(value)
        .then((result) => {
          results.push(result);

          if (results.length === values.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

const runMyPromiseAll = (values: unknown[], writeLog: (msg: any) => void) => {
  myPromiseAll(values)
    .then((results) => (results as unknown[]).forEach(writeLog))
    .catch((err) => {
      writeLog(err);
    });
};

describe('Test my promise all', () => {
  const ORDERS = {
    FIRST: 0,
    SECOND: 1,
    THIRD: 2,
    FORTH: 3,
  };

  const getLogAndWriteLog = () => {
    const log: string[] = [];
    const writeLog = (msg: string) => {
      log.push(msg);
    };

    return { log, writeLog };
  };

  it('all resolved promises', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const promise1 = new Promise((resolve) => setTimeout(resolve, ORDERS.FIRST, '1 resolved'));
    const promise2 = new Promise((resolve) => setTimeout(resolve, ORDERS.SECOND, '2 resolved'));
    const promise3 = new Promise((resolve) => setTimeout(resolve, ORDERS.THIRD, '3 resolved'));

    const promises = [promise1, promise2, promise3];

    runMyPromiseAll(promises, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, ['1 resolved', '2 resolved', '3 resolved']);
    }, ORDERS.FORTH);
  });

  it('two of three promises are rejected', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const promise1 = new Promise((resolve) => setTimeout(resolve, ORDERS.FIRST, 'first resolved'));
    const promise2 = new Promise((_, reject) => setTimeout(reject, ORDERS.SECOND, 'error 1'));
    const promise3 = new Promise((_, reject) => setTimeout(reject, ORDERS.THIRD, 'error 2'));

    const promises = [promise1, promise2, promise3];

    runMyPromiseAll(promises, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, ['error 1']);
    }, ORDERS.FORTH);
  });

  it('all resolved non promises', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const values = [1, 2, 3];

    runMyPromiseAll(values, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, [1, 2, 3]);
    }, ORDERS.FIRST);
  });
});

/**
 * My promise allSettled
 */
const myPromiseAllSettled = (values: unknown[]) => {
  const results: { status: string; value?: unknown; reason?: string }[] = [];

  return new Promise((resolve, reject) => {
    values.forEach((value) => {
      Promise.resolve(value)
        .then((result) => {
          results.push({ status: 'fulfilled', value: result });
        })
        .catch((error) => {
          results.push({ status: 'rejected', reason: error });
        })
        .finally(() => {
          if (results.length === values.length) {
            resolve(results);
          }
        });
    });
  });
};

const runMyPromiseAllSettled = (values: unknown[], writeLog: (msg: any) => void) => {
  myPromiseAllSettled(values)
    .then((results) => (results as unknown[]).forEach(writeLog))
    .catch((err) => {
      writeLog(err);
    });
};

describe('Test my promise allSettled', () => {
  const ORDERS = {
    FIRST: 0,
    SECOND: 1,
    THIRD: 2,
    FORTH: 3,
  };

  const getLogAndWriteLog = () => {
    const log: { status: string; value?: unknown; reason?: string }[] = [];
    const writeLog = (data: { status: string; value?: unknown; reason?: string }) => {
      log.push(data);
    };

    return { log, writeLog };
  };

  it('all resolved promises', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const promise1 = new Promise((resolve) => setTimeout(resolve, ORDERS.FIRST, '1 resolved'));
    const promise2 = new Promise((resolve) => setTimeout(resolve, ORDERS.SECOND, '2 resolved'));
    const promise3 = new Promise((resolve) => setTimeout(resolve, ORDERS.THIRD, '3 resolved'));

    const promises = [promise1, promise2, promise3];

    runMyPromiseAllSettled(promises, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, [
        { status: 'fulfilled', value: '1 resolved' },
        { status: 'fulfilled', value: '2 resolved' },
        { status: 'fulfilled', value: '3 resolved' },
      ]);
    }, ORDERS.FORTH);
  });

  it('two of three promises are rejected', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const promise1 = new Promise((resolve) => setTimeout(resolve, ORDERS.FIRST, '1 resolved'));
    const promise2 = new Promise((_, reject) => setTimeout(reject, ORDERS.SECOND, 'error 1'));
    const promise3 = new Promise((_, reject) => setTimeout(reject, ORDERS.THIRD, 'error 2'));

    const promises = [promise1, promise2, promise3];

    runMyPromiseAllSettled(promises, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, [
        { status: 'fulfilled', value: '1 resolved' },
        { status: 'rejected', reason: 'error 1' },
        { status: 'rejected', reason: 'error 2' },
      ]);
    }, ORDERS.FORTH);
  });

  it('all resolved non promises', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const values = [1, 2, 3];

    runMyPromiseAllSettled(values, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, [
        { status: 'fulfilled', value: 1 },
        { status: 'fulfilled', value: 2 },
        { status: 'fulfilled', value: 3 },
      ]);
    }, ORDERS.FIRST);
  });
});

/**
 * My promise race
 */
const myPromiseRace = (values: unknown[]) => {
  return new Promise((resolve, reject) => {
    values.forEach((value) => {
      Promise.resolve(value).then(resolve).catch(reject);
    });
  });
};

const runMyPromiseRace = (values: unknown[], writeLog: (msg: any) => void) => {
  myPromiseRace(values).then(writeLog).catch(writeLog);
};

describe('Test my promise race', () => {
  const ORDERS = {
    FIRST: 0,
    SECOND: 1,
    THIRD: 2,
    FORTH: 3,
  };

  const getLogAndWriteLog = () => {
    const log: string[] = [];
    const writeLog = (msg: string) => {
      log.push(msg);
    };

    return { log, writeLog };
  };

  it('all resolved promises', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const promise1 = new Promise((resolve) => setTimeout(resolve, ORDERS.FIRST, '1 resolved'));
    const promise2 = new Promise((resolve) => setTimeout(resolve, ORDERS.SECOND, '2 resolved'));
    const promise3 = new Promise((resolve) => setTimeout(resolve, ORDERS.THIRD, '3 resolved'));

    const promises = [promise1, promise2, promise3];

    runMyPromiseRace(promises, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, ['1 resolved']);
    }, ORDERS.FORTH);
  });

  it('fastest promise rejected', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const promise1 = new Promise((_, reject) => setTimeout(reject, ORDERS.FIRST, 'error 1'));
    const promise2 = new Promise((resolve) => setTimeout(resolve, ORDERS.SECOND, '2 resolved'));
    const promise3 = new Promise((resolve) => setTimeout(resolve, ORDERS.THIRD, '3 resolved'));

    const promises = [promise1, promise2, promise3];

    runMyPromiseRace(promises, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, ['error 1']);
    }, ORDERS.FORTH);
  });

  it('all resolved non promises', () => {
    const { log, writeLog } = getLogAndWriteLog();

    const values = [1, 2, 3];

    runMyPromiseRace(values, writeLog);

    setTimeout(() => {
      assert.deepEqual(log, [1]);
    }, ORDERS.FIRST);
  });
});

/**
 * Go all
 */
const goAll = (...funcs: Array<(...args: any[]) => any>) => {
  return (...initialArgs: unknown[]) => {
    const initialResult = funcs[funcs.length - 1](...initialArgs);

    return funcs.reduceRight((acc, currFunc, currentIndex) => {
      if (currentIndex === funcs.length - 1) {
        return acc;
      }

      return currFunc(acc);
    }, initialResult);
  };
};

describe('Test go all', () => {
  it('should be equal', () => {
    const multiply = (a: number, b: number) => a * b;
    const sqr = (a: number) => a ** 2;
    const plusThree = (a: number) => a + 3;

    const actual = goAll(plusThree, sqr, multiply)(2, 5);

    assert.equal(actual, 103);
  });
});

/**
 * CounterObject
 * Реализуйте функцию createCounter(init), которая создаёт объект счётчика с методами для увеличения, уменьшения и сброса значения.
 *
 * Формат ввода
 * Вы должны экспортировать функцию createCounter, которая принимает один аргумент:
 *
 * init — начальное значение счётчика (число).
 * Формат вывода
 * Функция должна вернуть объект со следующими методами:
 *
 * increment() — увеличивает значение счётчика на 1 и возвращает новое значение
 * decrement() — уменьшает значение счётчика на 1 и возвращает новое значение
 * reset() — сбрасывает значение счётчика до начального и возвращает его
 */

const createCounterObject = (init: number) => {
  // Ваше решение
  let value = init;

  const increment = () => {
    value += 1;
    return value;
  };

  const decrement = () => {
    value -= 1;
    return value;
  };

  const reset = () => {
    value = init;
    return value;
  };

  return {
    increment,
    decrement,
    reset,
  };
};

describe('Test CounterObject', () => {
  it('Should be equal', () => {
    const counter = createCounterObject(5);

    assert.strictEqual(counter.increment(), 6);
    assert.strictEqual(counter.reset(), 5);
    assert.strictEqual(counter.decrement(), 4);
  });

  it('Should be equal', () => {
    const counter = createCounterObject(0);

    assert.strictEqual(counter.increment(), 1);
    assert.strictEqual(counter.increment(), 2);
    assert.strictEqual(counter.increment(), 3);
    assert.strictEqual(counter.decrement(), 2);
    assert.strictEqual(counter.reset(), 0);
    assert.strictEqual(counter.decrement(), -1);
  });

  it('Should be equal', () => {
    const counter = createCounterObject(100);

    assert.strictEqual(counter.decrement(), 99);
    assert.strictEqual(counter.decrement(), 98);
    assert.strictEqual(counter.reset(), 100);
    assert.strictEqual(counter.increment(), 101);
    assert.strictEqual(counter.increment(), 102);
  });
});

/**
 * splitWordsBySeparator
 * Необходимо написать функцию, которая разделит каждую строку в массиве words по строке separator. Необходимо вернуть массив получившихся после разделения строк, исключая пустые строки
 *
 * Формат ввода
 * Вы должны экспортировать функцию splitWordsBySeparator, которая принимает на вход два аргумента:
 *
 * words — массив строк, которые нужно разбить. Длина массива не превышает 3 x 10^5 элементов. Длина каждой строки в массиве не превышает 10^7 символов.
 *
 * separator — строка-разделитель, может иметь произвольную длину
 *
 * Формат вывода
 * Функция должна возвращать массив строк, который является результатом выполнения "разделения". Он не должен содержать пустых строк
 */

const splitWordsBySeparator = (words: string[], separator: string) => {
  // Ваше решение
  return words.reduce((acc, word) => {
    const splitWords = word.split(separator).filter(Boolean);

    splitWords.forEach((splitWord) => {
      acc.push(splitWord);
    });

    return acc;
  }, [] as string[]);
};

describe('splitWordsBySeparator', () => {
  it('Should be deep equal', () => {
    const result = splitWordsBySeparator(['one.two.three', 'four.five', 'six'], '.');
    assert.deepEqual(result, ['one', 'two', 'three', 'four', 'five', 'six']);
  });

  it('Should be deep equal', () => {
    const result = splitWordsBySeparator(['1/', '/2', '/'], '/');
    assert.deepEqual(result, ['1', '2']);
  });

  it('Should be deep equal', () => {
    const result = splitWordsBySeparator(['', 'a.b', ''], '.');
    assert.deepEqual(result, ['a', 'b']);
  });
});

/**
 * addTwoPromises
 * еализуйте функцию addTwoPromises, которая принимает на вход два объекта Promise с типом number и возвращает Promise с их суммой.
 *
 * Формат ввода
 * Функция addTwoPromises принимает два аргумента:
 *
 * promise1: Promise<number> — первый Promise, который разрешается в число
 * promise2: Promise<number> — второй Promise, который разрешается в число
 * Оба аргумента являются объектами Promise, которые должны разрешаться (resolve) или отклоняться (reject) с числовыми значениями.
 *
 * Формат вывода
 * Функция возвращает Promise<number>, который разрешается в сумму значений двух входных Promise. Если Promise отклоняется, его значение все равно используется в сумме.
 */

const addTwoPromises = async function (promise1: Promise<number>, promise2: Promise<number>) {
  // Ваше решение
  const promises = [promise1, promise2];
  const nums: number[] = [];

  return new Promise((resolve) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((num) => num)
        .catch((num) => num)
        .then((num) => {
          nums.push(num);

          if (nums.length === promises.length) {
            resolve(
              nums.reduce((acc, num) => {
                acc += num;
                return acc;
              }, 0),
            );
          }
        });
    });
  });
};

describe('addTwoPromises', () => {
  it('Should be equal', async () => {
    const result = await addTwoPromises(Promise.resolve(2), Promise.resolve(2));
    assert.equal(result, 4);
  });

  it('Should be equal', async () => {
    const result = await addTwoPromises(Promise.reject(3), Promise.resolve(2));
    assert.equal(result, 5);
  });

  it('Should be equal', async () => {
    const result = await addTwoPromises(Promise.reject(5), Promise.reject(7));
    assert.equal(result, 12);
  });
});

/**
 * fetchWithAutoRetry
 * Напишите функцию fetchWithAutoRetry(fetcher, count), которая делает запрос с помощью переданной функции fetcher и автоматически повторяет его в случае ошибки.
 *
 * Формат ввода
 * Вы должны экспортировать асинхронную функцию fetchWithAutoRetry, которая принимает на вход два аргумента:
 *
 * fetcher — асинхронная функция, которую нужно использовать для выполнения запроса;
 * count — количество дополнительных запросов, которое нужно сделать, если fetcher вернёт ошибку.
 * Требования:
 *
 * Если все запросы завершились ошибкой, необходимо выбросить последнюю ошибку, в противном случае — первое успешное значение.
 * Запросы должны выполняться последовательно, запуск нескольких параллельных запросов запрещён.
 * Нельзя вызывать fetcher больше, чем count+1 раз.
 * Нельзя вызывать fetcher, если уже был получен успешный ответ.
 * Формат вывода
 * Функция должна возвращать Promise, который:
 *
 * или разрешается с результатом первого успешного вызова fetcher,
 * или выбрасывает последнюю полученную ошибку, если все попытки завершились неудачей.
 */

/**
 * Создаёт мок функции fetcher,
 * который по порядку возвращает
 * ответы из массива responses
 */
const createFetcherMock = (responses: Array<{ error?: string; data?: string }>) => {
  let counter = 0;
  let isLoading = false;

  return async () => {
    if (isLoading) {
      throw new Error('429 Too Many Requests');
    }

    const response = responses[counter % responses.length];
    isLoading = true;

    await new Promise((resolve) => setTimeout(resolve, 10 * Math.random()));

    isLoading = false;
    counter++;

    return response.error ? Promise.reject(response.error) : Promise.resolve(response.data);
  };
};

const fetchWithAutoRetry = async (fetcher: ReturnType<typeof createFetcherMock>, count: number) => {
  // Ваше решение
  let requestsCount = 0;

  const fetchData = async () => {
    requestsCount += 1;

    try {
      const data = await fetcher();
      return data;
    } catch (error) {
      if (requestsCount === count + 1) {
        throw error;
      }

      return fetchData();
    }
  };

  return fetchData();
};

describe('fetchWithAutoRetry', () => {
  it('Should return first successful data when enough retries are allowed', async () => {
    const fetcher = createFetcherMock([
      { error: '504 Gateway Timeout' },
      { error: '503 Service Unavailable' },
      { error: '502 Bad Gateway' },
      { error: '500 Internal Server Error' },
      { data: 'Hello, world!' },
      { data: 'Yandex' },
    ]);

    const result = await fetchWithAutoRetry(fetcher, 5);
    assert.equal(result, 'Hello, world!');
  });

  it('Should throw last error if retries are not enough', async () => {
    const fetcher = createFetcherMock([
      { error: '504 Gateway Timeout' },
      { error: '503 Service Unavailable' },
      { error: '502 Bad Gateway' },
      { error: '500 Internal Server Error' },
      { data: 'Hello, world!' },
      { data: 'Yandex' },
    ]);

    try {
      await fetchWithAutoRetry(fetcher, 3);
      assert.fail('Expected function to throw');
    } catch (error: any) {
      assert.equal(error, '500 Internal Server Error');
    }
  });

  it('Should return first success immediately if it appears early', async () => {
    const fetcher = createFetcherMock([
      { error: '504 Gateway Timeout' },
      { data: 'Hello, world!' },
      { error: '503 Service Unavailable' },
      { error: '502 Bad Gateway' },
      { error: '500 Internal Server Error' },
      { data: 'Yandex' },
    ]);

    const result = await fetchWithAutoRetry(fetcher, 5);
    assert.equal(result, 'Hello, world!');
  });
});

/**
 * memoizeFn
 * Реализуйте функцию memoize, которая принимает функцию fn и возвращает её мемоизированную версию. Мемоизированная функция никогда не должна вызывать fn дважды для одного и того же набора аргументов — она запоминает результат первого вызова и возвращает его из кеша для всех последующих.
 *
 * Два объекта с разной ссылкой, но одним и тем же набором полей и значений считаются одинаковыми.
 *
 * Формат ввода
 * Вы должны экспортировать функцию memoize, которая в качестве аргумента принимает функцию fn.
 *
 * Функция fn в качестве аргументов может принимать примитивы (строки, числа, булевы значения), массивы и объекты.
 * Значения, которые нельзя сериализовать через JSON.stringify (например, функции, undefined, Symbol, BigInt, циклические ссылки и т. п.), передаваться не будут.
 * Два массива с одинаковыми элементами, расположенными в разном порядке, считаются разными. Например, [1, 2] и [2, 1] — это разные массивы.
 * В тестах не будет случаев, когда объекты отличаются только порядком полей. Например, объекты {a: 1, b: 2} и {b: 2, a: 1} не будут встречаться в рамках одного и того же теста.
 * Формат вывода
 * Вывод тестирующей системы будет содержать блоки с информацией о каждом вызове memoizedFn: переданные аргументы, вернувшийся результат и флаг Invoked, который указывает, была ли вызвана исходная функция.
 */

const memoizeFn = <Args extends unknown[], Return extends unknown>(fn: (...args: Args) => Return) => {
  // Ваше решение
  const cache: Record<string, Return> = {};

  return (...args: Args) => {
    const key = args.map((arg) => JSON.stringify(arg)).join('');

    if (key in cache) {
      return cache[key];
    }

    const value = fn(...args);
    cache[key] = value;

    return value;
  };
};

describe('memoizeFn', () => {
  let calls: Array<{ args: string; result: number; invoked: boolean }>;
  let cache: Record<string, number>;

  beforeEach(() => {
    calls = [];
    cache = {};
  });

  const stringifyArgs = (args: unknown[]) => args.map((arg) => JSON.stringify(arg)).join('');

  it('Should be deep equal', () => {
    function fn(a: number, b: number) {
      const result = a + b;

      const key = stringifyArgs([a, b]);
      cache[key] = result;

      return result;
    }

    const memoizedFn = memoizeFn(fn);

    const wrapper = (...args: Parameters<typeof fn>) => {
      const key = stringifyArgs(args);

      if (key in cache) {
        calls.push({
          args: stringifyArgs(args),
          result: memoizedFn(...args),
          invoked: false,
        });
      }

      calls.push({
        args: stringifyArgs(args),
        result: memoizedFn(...args),
        invoked: true,
      });
    };

    wrapper(1, 2);
    wrapper(1, 2);

    assert.deepEqual(calls[0], { args: stringifyArgs([1, 2]), result: 3, invoked: true });
    assert.deepEqual(calls[1], { args: stringifyArgs([1, 2]), result: 3, invoked: false });
  });
});

/**
 * Curry
 */
const curry = <Args extends unknown[], Return extends unknown>(fn: (...args: Args) => Return) => {
  // @ts-ignore
  const allArgs: Args = [];

  const inner = (...args: Args) => {
    allArgs.push(...args);

    if (allArgs.length === fn.length) {
      // @ts-ignore
      return fn(...allArgs);
    }
    return inner;
  };

  return inner;
};

describe('Test Curry', () => {
  const sum = (a: number, b: number, c: number) => {
    return a + b + c;
  };

  it('Should be equal', () => {
    assert.equal(curry(sum)(1, 2, 3), 6);
    // @ts-ignore
    assert.equal(curry(sum)(1, 2)(3), 6);
    // @ts-ignore
    assert.equal(curry(sum)(1)(2)(3), 6);
  });
});
