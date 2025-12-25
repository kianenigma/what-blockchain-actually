First, see [[Commitment Hash]]. Merkel trees can be seen as a special form of a commitment hash, where similar to any form of hashing of data, the root of the tree is a commitment to the entire data.

But, crucially, beyond this commitment, a merkel tree has another property as well that is super useful for blockchains: We can easily prove that a data is part of the tree, by sending only $O(\log{n})$ hashes to someone who only knows the root of the tree.

This mechanism is used in [[Block Header]] to store:
- State root: merkel tree of the entire blockchain state
- Transaction root: merkel tree of all of the transactions in the block.

