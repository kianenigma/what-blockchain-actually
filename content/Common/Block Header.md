The header of any block, which usually contain at least the following (might differ per implementation):
- $n$: The current block number.
- $p$: the hash of the header of the parent block.
- $s$: the [[Merkel Tree]] root of the state of the blockchain, after this block has been executed
- $t$: the [[Merkel Tree]] root of all of the transactions that are in this block

How $p, s$ and $t$ are used to ensure interesting properties in blockchains are discussed in [[Blockchain Networks]] and [[Blocks, Transactions, And Blockchain Systems]].
