"use strict";
/*
* A timeout helper function resolves the provider promise but rejects if the
* operation takes longer then the provided `timeout`.
*/
Object.defineProperty(exports, "__esModule", { value: true });
function timeout({ promise, time = 0, error = new Error() }) {
    let timer = null;
    if (!promise)
        throw new Error('no promise provided');
    let sleep = time > 0
        ? new Promise((resolve, reject) => timer = setTimeout(reject, time, error))
        : null;
    let run = promise.then((value) => {
        clearTimeout(timer);
        return value;
    });
    return Promise.race([run, sleep].filter(p => !!p)).then((res) => {
        if (res === error) {
            throw error;
        }
        else {
            return res;
        }
    });
}
exports.timeout = timeout;
