![Build Status](https://travis-ci.org/xpepermint/promised-timeout.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/promised-timeout.svg)](https://badge.fury.io/js/promised-timeout)&nbsp;[![Dependency Status](https://gemnasium.com/xpepermint/promised-timeout.svg)](https://gemnasium.com/xpepermint/promised-timeout)

# promised-timeout

> For limiting the time to resolve a promise.

This is an open source [npm](http://npmjs.com) package from [Node.js](http://nodejs.org). The source code is available on [GitHub](https://github.com/xpepermint/promised-timeout) where you can also find our [issue tracker](https://github.com/xpepermint/promised-timeout/issues).

## Motivation

Using the native `Promise.race` method for implementing the `Promise.timeout` function is not sufficient. The `Promise.race` doesn't clear the timer of the timeout promise after the actual promise resolves thus the process will wait until the timeout promise is also complete. This means that if you set the timeout to 1h and our promise completes after 1min, the process will wait for another 59min before it exits.

## Install

```
$ npm install --save promised-timeout
```

## Example

```js
import {timeout} from 'promised-timeout';

let promise = new Promise((resolve, reject) => setTimeout(resolve, 1000, true));
let error = await timeout({
  promise,
  time: 1,
  error: new Error('operation timeout')
}).catch((e) => e);

t.is(error, 'foo');
```

## API

**timeout({promise, timeout, error})**:Promise

> A timeout helper function resolves the provider promise but rejects if the operation takes too long.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| promise | Promise | Yes | - | A Promise object to resolve.
| time | Integer | No | 0 | A time in milliseconds after the operation automatically rejects (`0` disables the timeout).
| error | Error | No | new Error() | A custom error object to pass to the `reject` handler.

## License (MIT)

```
Copyright (c) 2016 Kristijan Sedlak <xpepermint@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
