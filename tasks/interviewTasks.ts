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
