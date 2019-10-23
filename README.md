# My Dumb Machine

I built a dumb machine.

Try it out:

- `./dumb 3x3.dumb`

Will multiply 3 and 3 and print the result.

- `./dumb linked-list.dumb`

Will iterate through a small linked list and print out each value.

## Syntax

- Instructions are space separated tokens:
  - `instruction-name arg1 arg2 arg3`
  - `set 0x01 300`
- Label identifiers are any text without whitespace characters
  - `this-is-a-label`
  - `THIS_IS_A_LABEL`
- Numbers are any valid digit (regex: /\d+/)
  - `10`
  - `300`
- Memory Addresses are written in `hexidecimal`
  - `0x01`
  - `0xff`
- Pointer Pointers are written as a memory address prefixd with a `*`
  - `*0x07`

It has a limited instruction set:

Writing to memory:
- `set <address> (<value> | *<address>)`
  - Sets the memory address to either a value, or to the resolved value of a memory address.

Printing values from memory:
- `show (<addess> | *<address)`
  - Prints the value of a memory address or the resolved value of a memory address.

Simple maths
- `(add|subtract|multiply|divide) <addressX> <addressY> <writeToAddress>`
  - Uses the values at two addresses as the inputs to a calculation, and stores the result in a third address.

- `incr <address>`
  - Increments a value at a memory address.

Control flow
- `label <name-of-label>`
  - Stores a named label
- `repeatIf <name-of-label> (<address> | *<address>)
  - Returns the program instruction pointer the index where  a label was defined
    IF and ONLY IF the value of a memory address, or resolved value of a pointer is not NULL.
