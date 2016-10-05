const test = require('ava');
const {timeout} = require('../src');

test('timeout should resolve a promise', async t => {
  let promise = new Promise((resolve, reject) => setTimeout(resolve, 1000, true));

  t.is( await timeout({promise}), true);
});

test('timeout should reject if it takes too long', async t => {
  let promise = new Promise((resolve, reject) => setTimeout(resolve, 1000, true));

  t.throws(timeout({
    promise,
    time: 1
  }));
});

test('timeout should reject with message if it takes too long', async t => {
  let promise = new Promise((resolve, reject) => setTimeout(resolve, 1000, true));

  let error = await timeout({
    promise,
    time: 1,
    error: 'foo'
  }).catch((e) => e);

  t.is(error, 'foo');
});
