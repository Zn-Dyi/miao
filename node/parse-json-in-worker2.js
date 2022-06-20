const {
  parentPort, workerData
} = require('worker_threads');

const { parse } = JSON;
const jsonString = workerData;
const result = parse(jsonString)

setTimeout(() => {
  parentPort.postMessage(   result   );
}, 20000)
