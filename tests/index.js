import test from "ava";
import {timeout} from "../dist";

test("timeout should resolve a promise", async t => {
  let action0 = new Promise((resolve, reject) => setTimeout(resolve, 1000, true));
  let action1 = () => {
    return new Promise((resolve, reject) => setTimeout(resolve, 1000, true));
  };

  t.is( await timeout({ action: action0 }), true);
  t.is( await timeout({ action: action1 }), true);
});

test("timeout should reject if it takes too long", async t => {
  let action = new Promise((resolve, reject) => setTimeout(resolve, 1000, true));

  try {
    await timeout({ action, time: 1 });
    t.fail();
  } catch(e) {
    t.pass();
  }
});

test("timeout should resolve when completed quicker", async t => {
  let action = new Promise((resolve, reject) => setTimeout(resolve, 1, true));
  let time = Date.now();

  try {
    await timeout({ action, time: 10000 });
    if (Date.now() - time > 20) {
      t.fail();
    } else {
      t.pass();
    }
  } catch(e) {
    t.fail();
  }
});

test("timeout should reject with message if it takes too long", async t => {
  let action = new Promise((resolve, reject) => setTimeout(resolve, 1000, true));

  let error = await timeout({ action, time: 1, error: "foo" }).catch((e) => e);
  t.is(error, "foo");
});
