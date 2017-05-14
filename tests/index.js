import test from 'ava';
import {timeout} from '../dist';

test('timeout should resolve a promise', async t => {
  let promise = new Promise((resolve, reject) => setTimeout(resolve, 1000, true));

  t.is( await timeout({promise}), true);
});

test('timeout should reject if it takes too long', async t => {
  let promise = new Promise((resolve, reject) => setTimeout(resolve, 1000, true));

  try {
    await timeout({ promise, time: 1 });
    t.fail();
  } catch(e) {
    t.pass();
  }
});

test('timeout should reject with message if it takes too long', async t => {
  let promise = new Promise((resolve, reject) => setTimeout(resolve, 1000, true));

  let error = await timeout({ promise, time: 1, error: 'foo' }).catch((e) => e);
  t.is(error, 'foo');
});
