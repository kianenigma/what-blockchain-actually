As noted in the the [[Introduction]], most my background knowledge that led to this book comes from working on Polkadot for many years. A large number of blog posts and talks in my website are about Polkadot. Therefore, I don't feel compelled as much to talk any further about Polkadot in this book. Moreover, the goal of this book is by no means to teach you Polkadot, but rather give you a ground-up understanding of what blockchains are (part 1) and how the scale (part 2), among a few other important topics. 

That being said, this brief chapter is my tribute to Polkadot within this context of this book, and the next chapter [[JAM]] explains what is to come for Polkadot in the coming years. While doing so,  I will do my best to explain Polkadot in the language of this book to you, making it one useful example to solidity what we have already learned. So, in some sense, this chapter is leveraging Polkadot as a case study to recap many of things that have been said so far.
## *Heterogenous* Sharded Execution With Shared Security
Recall that in the case of Ethereum, the L1 validators actually have no direct way to re-execute the L2 blocks. This happens either through: 
- Fraud proofs at the instruction level, as explained in [[Scaling Out - Optimistic]]
- SNARK proofs, in the case of [[Scaling Out - SNARKs]]

Polkadot, similar to NEAR, utilizes [[Scaling Out - Shared Economic Security#Stateless Validation]], meaning that the L1 validators have the ability to fully re-execute L2 blocks if they wish to. If we look at NEAR, it is a sharded blockchain where all of the shards have the same [[STF]]. In other words, the sharding yields more throughput of the same [[STF]]. Therefore, we may call NEAR a homogeneously sharded blockchain. 

To the contrary, Polkadot is a heterogeneously sharded blockchain, meaning that each of those shards can have their own [[STF]], and Polkadot can still validate them. This is achieved by creating a shared standard for what each of those L2 blockchains are. In the case of Polkadot, each L2's [[STF]] is registered on the L1 as a byte-code (initially WebAssembly, now moving to RiscV).
## [[Weakest Link]] Solved
Another interesting aspect of Polkadot is that, due to its ability to enforce the same degree of security among all of its L2s, it fully eliminates the risk of [[Weakest Link]] issue that we see in the Ethereum rollup landscape, where different rollups have differing degrees of security. 

## [[STF]] Stored In The [[State]]
Polkadot comes with a blockchain framework called `polkadot-sdk` (formerly `substrate`) which standardizes the fact that the [[STF]] part of a blockchain should be compiled into a standard byte-code (WebAssembly or RiscV). While it is not mandatory, most L2s in Polkadot, alongside the Polkadot L1 itself, use `polkadot-sdk` and its convention.

One additional assumption of the `polkadot-sdk` is that this byte-code is stored as a part of the blockchain [[State]]. This means, the blockchain nodes running the network don't actually hardcode what the [[STF]] of the network is, but rather read it from the canonical [[State]] that they have, and feed it into an executor of the corresponding byte-code (WebAssembly or RiscV) to execute a new [[Block]]. 

This yields a fascinating side effect; To upgrade the [[STF]] of the blockchain, no [[Evolution of Blockchain State Machines#Hard Forks|hard-fork]] is no longer necessary. A transaction, assuming it has the right privilege (e.g. majority of token holders have voted on it, or any other form of [[Governance]]) can update the [[STF]] byte-code in [[State]] in the very same way that a `transfer` transaction updates the balance of 2 users in the state. 

> We already noted this fact in [[Evolution of Blockchain State Machines#Hot Upgrades]], but it can be better understood now.
## Recap 
With the above point out of the way, let's now recap some of the concepts explained so far through the lens of Polkadot. 
- Polkadot can be seen as a *network of blockchains*, an L1 blockchain holding the secure-but-slow validator set, and a large number of L2 networks interconnected to another and sharing the security (aka [[Trustless]]ness) of the L1
	- Each of these blockchains are themselves a *networks of nodes*, as explained in [[Blockchain Networks]]. 
	- Note have we can abstract this as a 2 layers of networks here. The *network of blockchains*, and the *network of nodes* in each blockchain (see [[Blockchain Networks#Two Layers of Networks]]). 
- The [[STF]] of the Polkadot L1 allows for
	- Certain L1 operations like transfer of DOT, [[Governance]], and so on
	- Registration of new L2s
	- Validation of the L2 blocks as they happen.

