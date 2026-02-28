First, see [[Commitment Hash]]. Merkel trees can be seen as a special form of a commitment hash, where similar to any form of hashing of data, the root of the tree is a commitment to the entire data.

In a [[Merkel Tree]], the data is organized in the leafs of the tree, and all intermediate nodes (and the root) are merely the hashes of their children. 

![[Merkel Tree 2025-12-27-11.22.41.excalidraw]]

Merkel trees have two interesting properties for blockchains and their needs. 
- If we update node `J`, only nodes `J`, `F`, `C` and `A` have to be updated to have a fresh new root and [[Commitment Hash]] to the entire data. The complexity of number of hashes is $O(2 + \log_{2}{n})$. This is an overhead compared to hashing `[H, I, J, K]` just once, but the justification of it can be seen in the next point.
- If we want to prove to Alice, who only knows `A` (the [[State Root]]), what the value of `J` is, we could send her: `J`, `G` and `B`, and that's all that she needs to know. 
	- Knowing `J`, she can compute `F = Hash(J)`. Then, having received `G`, she can compute `C = Hash(F|G)`. With `C` and `B`, she can recompute `A`, and if it matches her copy of `A`, she can be sure that data she received was correct. 
	- We hadn't used a merkle tree, we would have to send the entire `[H, I, J, K]`  to Alice to prove to her that `J` is part of the set. This would have a $O(n)$ complexity. With a tree of depth 3 like above, the difference of $O(log_{2}{n})$ and $O(n)$ is not very bold, but rest assured in a database of billions of items, it is a big deal.

This mechanism is used in [[Block Header]] to store:
- State root: Merkel tree of the entire blockchain state.
- Transaction root: merkel tree of all of the transactions in the block.
Moreover, it is a key piece of how [[Blockchain Networks#Light Node]] request [[State Proof]]s and operate. 

