The most basic primitive that allow a blockchain based system to become programmable with arbitrary code from the users.

The most common language to write smart contracts is the Solidity language, invented by Ethereum, which compiles to EVM, Ethereum Virtual Machine.

Smart contracts are in some sense _mini [[State Machine]]s_. They have their own:
- Code; the contract code uploaded by some user. It has specified entry-points that other users can call into via [[Transaction]]s.
- [[State]]; each contract has its own dedicated storage that remains private to the contract.
- An address, identifying where the contract is and how it can be found.
- Like any other address, the smart contract can hold some balance in the native token of the chain on which it lives.
