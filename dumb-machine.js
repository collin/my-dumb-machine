#!/usr/bin/env node
class Pointer {
  constructor(address) {
    this.address = address;
  }
}

const pointer = address => new Pointer(address);

const exec = program => {
  let programCounter = 0;

  const memory = {};

  const labels = {};

  const instructions = {
    set(address, value) {
      if (value instanceof Pointer) {
        memory[address] = memory[memory[value.address]];
      } else {
        memory[address] = value;
      }
    },
    add(addressX, addressY, writeToAddress) {
      memory[writeToAddress] = memory[addressX] + memory[addressY];
    },
    subtract(addressX, addressY, writeToAddress) {
      memory[writeToAddress] = memory[addressX] - memory[addressY];
    },
    divide(addressX, addressY, writeToAddress) {
      memory[writeToAddress] = memory[addressX] / memory[addressY];
    },
    multiply(addressX, addressY, writeToAddress) {
      memory[writeToAddress] = memory[addressX] * memory[addressY];
    },
    show(address) {
      if (address instanceof Pointer) {
        console.log(`=> ${memory[memory[address.address]]}`);
      } else {
        console.log(`=> ${memory[address]}`);
      }
    },
    inc(address) {
      memory[address]++;
    },
    label(label) {
      labels[label] = programCounter;
    },
    repeatIf(label, address) {
      if (address instanceof Pointer) {
        if (memory[memory[address.address]] != null) {
          programCounter = labels[label];
        }
      }
      else{
        if (memory[address] !== null) {
          programCounter = labels[label];
        }
      }
    },
  };

  while (programCounter < program.length) {
    const step = program[programCounter];
    const [instruction, ...arguments] = step;
    programCounter++;
    if (instructions.hasOwnProperty(instruction)) {
      instructions[instruction](...arguments);
    } else {
      throw new Error(`
Unknown insruction \`${instruction}\`
  ${JSON.stringify(step)}
`);
    }
  }
  console.log('exit!');
};

function parseArg(arg) {
  if (arg.startsWith('*')) return pointer(Number(arg.slice(1)));
  if (arg.startsWith('0x')) return Number(arg);
  if (arg.match(/^\d+$/)) return Number(arg);
  if (arg === 'null') return null;
  return arg;
}

function parse(source) {
  return source
    .trim()
    .split('\n')
    .map(line => {
      const [instruction, ...arguments] = line.split(/ /);
      return [instruction, ...arguments.map(parseArg)];
    });
}

function run(source) {
  const program = parse(source);
  return exec(program);
}

module.exports.exec = exec;
module.exports.parse = parse;
module.exports.run = run;

if (module === require.main) {
  const fs = require('fs');
  const path = require('path')
  run(fs.readFileSync(process.argv[2], 'utf-8'));
  process.exit();
}
