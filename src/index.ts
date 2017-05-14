/*
* A timeout helper function resolves the provider promise but rejects if the
* operation takes longer then the provided `timeout`.
*/

export function timeout ({
  action, 
  time = 0,
  error = new Error()
}: {
  action: () => (any | Promise<any>),
  time: number, 
  error: Error
}): Promise<any> {
  let timer = null;

  if (!action) throw new Error('no action provided');

  let sleep = time > 0
    ? new Promise((resolve, reject) => (timer = setTimeout(reject, time, error)))
    : null;
  
  let run = Promise.resolve().then(() => {
    return action instanceof Promise ? action : action();
  }).then((value) => {
    clearTimeout(timer);
    return value;
  });

  return Promise.race(
    [run, sleep].filter(p => !!p)
  ).then((res) => {
    if (res === error) {
      throw error;
    } else {
      return res;
    }
  });
}
