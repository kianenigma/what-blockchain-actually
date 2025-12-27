---
description: Brief description of Polkadot and parts of it that matter in the context of this book.
---

As noted in the [[Introduction]], most of my background knowledge that led to this book comes from working on Polkadot for many years. A large number of blog posts and talks on my [website](https://blog.kianenigma.com/) are about Polkadot. Therefore, I don't feel compelled as much to talk any further about Polkadot in this book. Moreover, the goal of this book is by no means to teach you Polkadot, but rather give you a ground-up understanding of what blockchains are (part 1) and how they scale (part 2), among a few other important topics.

That being said, this brief chapter is my tribute to Polkadot within the context of this book, and the next chapter [[JAM]] explains what is to come for Polkadot in the coming years. While doing so, I will do my best to explain Polkadot in the language of this book to you, making it one useful example to solidify what we have already learned. So, in some sense, this chapter is leveraging Polkadot as a case study to recap many of the things that have been said so far.
## Heterogenous Sharded Execution with Shared Security
Recall that in the case of Ethereum, the L1 validators actually have no direct way to re-execute the L2 blocks. This happens either through:
- Fraud proofs at the instruction level, as explained in [[Scaling Out - Optimistic (Non-)Execution]]
- SNARK proofs, in the case of [[Scaling Out - SNARKs]]

**Sharded Execution With Shared Security**. Polkadot, similar to NEAR, utilizes [[Scaling Out - Shared Economic Security#Stateless Validation]], meaning that the L1 validators have the ability to fully re-execute L2 blocks if they wish to. This happens efficiently, in what is called **sharded execution with shared security**.

**Heterogenous**. If we look at NEAR, it is a sharded blockchain where all of the shards have the same [[STF]]. In other words, the sharding yields more throughput of the same [[STF]]. Therefore, we may call NEAR a homogeneously sharded blockchain. On the contrary, Polkadot is a heterogeneously sharded blockchain, meaning that each of those shards can have their own [[STF]], and Polkadot can still validate them. This is achieved by creating a shared standard for what each of those L2 blockchains are. In the case of Polkadot, each L2's [[STF]] is registered on the L1 as a byte-code (initially WebAssembly, now moving to RISC-V). The L1 validators use this common byte-code to re-execute L2 blocks when they need to.
## [[Weakest Link]] Solved
Another interesting aspect of Polkadot is that, due to its ability to enforce the same degree of (economic) security among all of its L2s, it fully eliminates the risk of the [[Weakest Link]] issue that we see in the Ethereum rollup landscape, where different rollups have differing degrees of security. This is particularly useful for bridged tokens across L2s, where if one is compromised, the economical ripple effect can spread to the entire ecosystem.
## [[STF]] Stored in the [[State]]
Polkadot comes with a blockchain framework called `polkadot-sdk` (formerly `substrate`) which standardizes the fact that the [[STF]] part of a blockchain should be compiled into a standard byte-code (WebAssembly or RISC-V). While it is not mandatory, most L2s in Polkadot, alongside the Polkadot L1 itself, use `polkadot-sdk` and its convention.

One additional assumption of `polkadot-sdk` is that this byte-code is stored as a part of the blockchain [[State]]. This means the blockchain nodes running the network don't actually hardcode what the [[STF]] of the network is, but rather read it from the canonical state that they have, and feed it into an executor of the corresponding byte-code (WebAssembly or RISC-V) to execute a new [[Block]][^1].

This yields a fascinating side effect; to upgrade the [[STF]] of Polkadot (or its L2s), no [[Evolution of Blockchain State Machines#Hard Forks|hard-fork]] is necessary. A transaction, assuming it has the right privilege (e.g. majority of token holders have voted on it, or any other form of [[Governance]]) can update the [[STF]] byte-code in [[State]] in the very same way that a `transfer` transaction updates the balance of two users in the state.

> We already noted this fact in [[Evolution of Blockchain State Machines#Hot Upgrades]], but it can be better understood now.
## Summary
With the above point out of the way, let's now recap some of the concepts explained so far through the lens of Polkadot.
- Polkadot can be seen as a *network of blockchains*, an L1 blockchain holding the secure-but-slow validator set, and a large number of L2 networks interconnected to one another and sharing the [[Economic Security|security]] of the Polkadot L1
	- This L1 is also called the relay-chain.
- Each of these blockchains are themselves a *networks of nodes*, as explained in [[Blockchain Networks]].
	- Note how we can abstract this as two layers of networks here: the *network of blockchains*, and the *network of nodes* in each blockchain (see [[Blockchain Networks#Two Layers of Networks|Two Layers of Networks]]).
- The [[STF]] of the Polkadot L1 allows for
	- Certain L1 operations like transfer of DOT, [[Governance]], and so on
	- Registration of new L2s
	- Validation of the L2 blocks as they happen.

![[Polkadot 2025-12-23-13.56.09.excalidraw]]

[^1]: In some sense, Polkadot treats its [[STF]] as a special [[Smart Contract]].
