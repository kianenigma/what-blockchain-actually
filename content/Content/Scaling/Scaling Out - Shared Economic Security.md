Then, [[Polkadot]] draw upon the limitation of the [[Scaling Out - Pure Multi-chain]] and proposed a new solution: 

> To not **shard** the validator set among different blockchain, but **share** the validator set among different blockchains. 

In this model, [[Polkadot]] is able to secure different blockchains that run on top of it in parallel (therefore each of these blockchains are called a Parachain -- parallel blockchain), without compromising the [[Economic Security]]. The details of how this is achieved is described in the [ELVES](https://medium.com/web3foundation/elves-the-fairy-dust-that-makes-polkadot-scalable-2acff1a22280) research paper[^1]. 

Another way to describe this is:

> Sharded execution, with shared security. 

This is why [[Polkadot]] has been touting the idea that its architecture is analogous to a **multi-core CPU**: The same validator set is used to secure different blockchains at the same time. 

NEAR, especially with its [Nightshade 2.0](https://pages.near.org/blog/nightshade-2-launches-on-near-mainnet-introducing-stateless-validation/) upgrade, is another blockchain that uses a similar approach to sharding.

## Sharding Requirements
The above description is not going to the details of how Polkadot achieves sharded execution with shared security intentionally, as the research paper will do it better than we can do here. But, it is necessary to talk about some of the requirements that certain sharded blockchains need to have, in order to retain their security. This will be useful in understanding the upcoming chapters too.

First, note that in [[Scaling Out - Pure Multi-chain]] we don't need any special means; each blockchain in this model is its own island, and there is no extra infrastructure needed. But, for: 
- [[Scaling Out - Shared Economic Security]]
- [[Scaling Out - Optimistic]]
- [[Scaling Out - SNARKs]]
We do need extra requirements and definitions, which are explained next.

All of the above 3 scaling methods rely more or less on the same flow, as follows: 
- To simplify the terminology, the base blockchain, with its secure-but-slow validator set is called the [[The Layers Terminology|L1]] (Layer 1).
- We acknowledge that we cannot have the classical [[Introduction - Why Scaling Matters#Sequential Blockchains]] model where a single validator in L1 produces a block with all of the work done in it, and all other validators re-execute it.
- Instead, we rely on a new model where the work (e.g. producing a new [[Block]]) is happening by an entity outside of the validators set of L1.
	- These entities can often be seen as managing their own secondary blockchain. These are the blockchains that we have formerly called [[The Layers Terminology|L2s]]. Also, in the Ethereum context, the L2s are often called a [[Rollup]], because they roll multiple L2 blocks into a single L1 block.
	- In the Ethereum realm, these entities are called [[Sequencer]]s, while in [[Polkadot]] they are called [[Collator]].
	- The purpose of the L2s is to do as much of the computation on their side to help the L1 scale, but still derive their security (being [[Trustless]] and having [[Economic Security]]) from the L1
- After some arbitrary time period, the L2s will send the results of their work back to the validators set of the L1 blockchain. 

Then, the concrete requirements of this scaling method is: 
	1. The L1 validators need be able to re-construct the data to inspect the work done by L2, and establish its canonical ordering (one of the key pillars of a [[Trustless]] system). This aspect of the network is often called **[[Data Availability]]**. 
	2. If necessary, actually re-execute or re-verify it in some way (another main pillar of a [[Trustless]] system).
	3. Ideally, the system retains the third [[Trustless]] property, remaining accessible. For simplicity, we don't dive into this aspect for now[^2].

All blockchains and scaling methods implement Data Availability schemes with more or less the same underlying approach, using [erasure coding](https://en.wikipedia.org/wiki/Erasure_code) and splitting the data among validator sets, ensuring that a subset can reconstruct it.

The main differentiating factor among the chapter's scaling method, and upcoming ones is how the handle the re-verification part. We will discuss how [[Polkadot]] and NEAR do this next, and then move on to the next chapter to see how they happen in [[Scaling Out - Optimistic]] and [[Scaling Out - SNARKs]]. 
## Stateless Validation
In this model, used in [[Polkadot]] and NEAR, the work done by the L2s is always re-executed by a subset of the L1 validators to ensure its correctness. To do so, two things must happen: 
1. The L1 validators need to be able to reconstruct the L2 [[Block]] (or blocks, if multiple are being re-executed at the same time). This is done by the [[Data Availability]] system.
2. The L1 validators need to have access to a subset of the L2 state, because the execution of the block being re-executed depends on it. This is done by attaching a subset of the [[Merkel Tree]] of the L2 [[State]] and spreading it alongside the block. This is what was formerly called a [[State Proof]]. 

So, to summarize, in the [[Scaling Out - Shared Economic Security]] model, the verification of the L2 work happens by the virtue of literally re-executing it enough times and by enough L1 validators. 

[^1]: full paper [here](https://eprint.iacr.org/2024/961).
[^2]: Search "L1 direct inclusion in Ethereum" to learn more.
[^3]: Using some form of Erasure Coding, splitting the data among 
