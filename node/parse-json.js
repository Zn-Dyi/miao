const {
  Worker
} = require('worker_threads');

module.exports = function parseJSAsync(script) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./parse-json-in-worker2.js', {
      workerData: script
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};
