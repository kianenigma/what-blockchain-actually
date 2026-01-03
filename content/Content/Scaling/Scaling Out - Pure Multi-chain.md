---
description: Splitting a single blockchain into multiple blockchains naively.
permalink: scaling/pure
---

Then, drawing upon the [[Introduction - Why Scaling Matters#Sequential Blockchains]] analogy of seeing the entire validator set as a single-threaded CPU, we can build our first [[Sharding|sharded]] blockchain design:

> If I have 1000 validators that are securing one blockchain, what if I have 2 blockchains that are each secured by 500 validators?

In a sense, we are [[Sharding]] a single blockchain to be **multiple blockchains**, therefore the name of this chapter.

![[Scaling Out - Pure Multi-chain 2025-12-22-14.29.51.excalidraw]]

In the above diagram, Block N and N+1 are essentially being processed in parallel, as if we have a 2-core CPU.

This would indeed double the throughput of the overall system, but it poses multiple downsides:
- The [[Economic Security]] of each shard is now half, therefore the [[Trustless]] properties are also potentially halved.
- We must in some way ensure that there are no conflicting updates between what happened in Block N and N+1 and deal with them, as they are processed in parallel.
- As noted in [[Introduction - Why Scaling Matters#Overhead]], the communication between these shards will become slow and asynchronous. It is no longer trivial for a smart contract in one shard to communicate with a smart contract in another.
- Then, we might be able to trace the same [[Weakest Link]] issue in this model as well. Imagine we have a multi-chain setup, where the [[Economic Security]] among different [[Sharding|shards]] varies from one another. But, these shards are interconnected, and are sending value-bearing tokens to one another. The likelihood of this system failing is now equal to the likelihood of the *weakest shard* failing.
	- In some sense, this naive way of sharding is lowering the [[Byzantine Threshold]] of the whole network.
