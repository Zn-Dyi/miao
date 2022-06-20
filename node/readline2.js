const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output, prompt: 'input > ' });

rl.prompt()
rl.on('line', (line) => {
  console.log(line)
  rl.prompt()
  rl.setPrompt('INPUT > ')
})
