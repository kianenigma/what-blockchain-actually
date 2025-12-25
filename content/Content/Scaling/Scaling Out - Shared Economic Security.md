Then, [[Polkadot]] drew upon the limitations of [[Scaling Out - Pure Multi-chain]] and proposed a new solution:

> To not **shard** the validator set among different blockchains, but **share** the validator set among different blockchains, while sharding the execution of blocks as much as possible.

In this model, [[Polkadot]] is able to secure different blockchains that run on top of it in parallel (therefore each of these blockchains is called a Parachain -- parallel blockchain), without compromising the [[Economic Security]]. The details of how this is achieved are described in the [ELVES](https://medium.com/web3foundation/elves-the-fairy-dust-that-makes-polkadot-scalable-2acff1a22280) research paper[^1]. In short, this model is called "**Sharded execution, with shared security**".

![[Scaling Out - Shared Economic Security 2025-12-22-14.35.02.excalidraw]]

This is why [[Polkadot]] has been touting the idea that its architecture is analogous to a **multi-core CPU**: The same validator set is used to secure different blockchains at the same time.

> [!warn]- Few Details on Polkadot and ELVES.
>
> How Polkadot and ELVES achieve this is by deploying a mix of a sequential blockchain and a [[Scaling Out - Pure Multi-chain]] system: At first, each shard is managed by a smaller group of validators (currently 5), much like a [[Scaling Out - Pure Multi-chain]] system. Then, the system progressively moves towards a sequential model, where a randomized group of validators from the broad validator set re-check this work. In the absence of any detection of fraud, this process terminates with as few as 30 other validators re-checking the work of the first 5. In the presence of fraud, the system quickly escalates into a fully sequential model.
>
> With the current implementation, Polkadot is estimated to be able to support up to 100 shards with 1000 validators, and in [[JAM]] this number is estimated to be 341.

NEAR, especially with its [Nightshade 2.0](https://pages.near.org/blog/nightshade-2-launches-on-near-mainnet-introducing-stateless-validation/) upgrade, is another blockchain that uses a similar approach to scaling.

## [[The Layers Terminology|Layer-2]] Blockchains
We have introduced the idea of sovereign and individual blockchains being able to run on top of another, more secure blockchain previously in [[Evolution of Blockchain State Machines#Hosting Other Blockchains]], and we can finally clarify it further.

A good mental model for this is to consider the above diagram, but with one major difference: each of those shards is a different blockchain. These blockchains are then called Layer-2s/L2s in the Ethereum terminology, or Parachains in Polkadot's.

![[Scaling Out - Shared Economic Security 2025-12-22-17.54.37.excalidraw]]

Notice how we have clearly identified that the L1 is its own blockchain, having its own sequence of blocks. Consequently, each L2 also has its own sequence of blocks, and one way or another, these blocks are being linked back to L1 blocks.

The above is almost identical to the current [[Polkadot]] architecture, which is why it is called a heterogeneously sharded blockchain, meaning that each _shard_ is a different blockchain.
## Sharding Requirements
A sharded blockchain, as explained above, would have some requirements in order to work correctly. First, note that in [[Scaling Out - Pure Multi-chain]] we don't need any special means; each blockchain in this model is its own island, and there is no extra infrastructure needed. This is mainly because the validator set of each shard is fully isolated from one another. But, for:
- [[Scaling Out - Shared Economic Security]]
- [[Scaling Out - Optimistic (Non-)Execution]]
- [[Scaling Out - SNARKs]]
We do need extra requirements, which are explained next.

All of the above three scaling methods rely more or less on the same flow, as follows:
- First, recall that the base-blockchain and its secure validator set is called the L1.
- We acknowledge that we cannot have the classical [[Introduction - Why Scaling Matters#Sequential Blockchains|sequential model]] where a single validator in L1 produces a block with all of the work done in it, and all other validators re-execute it.
- Instead, we rely on a new model where some work (e.g. producing a new L2 [[Block]]) is performed by an entity outside of the validator set of L1.
	- These entities can often be seen as managing their own secondary blockchain, and are called [[The Layers Terminology|L2s]][^4].
	- In the Ethereum realm, these entities that produce the L2 blocks are called [[Sequencer]]s, while in [[Polkadot]] they are called [[Collator]]s.
- The purpose of the L2s is to do as much of the computation on their side to help the L1 scale, but still derive their security (being [[Trustless]] and having [[Economic Security]]) from the L1.

Crucially, for the L2s to be able to achieve the last point above, it must:
1. The L1 validators need to be able to reconstruct the data to inspect the work done by the L2 for some period of time, and potentially re-execute it or settle any issues in it. This is solved by a system called the [[Data Availability]] layer that all L1 blockchains have to provide.
2. The L1 validators need to establish the correct order of the L2 blocks, and its state. This is done by recording only a [[Commitment Hash]] of the L2 blocks and state in L1.
3. If necessary, actually re-execute the L2 block in some way (another main pillar of a [[Trustless]] system).
4. Ideally, the system retains the third [[Trustless]] property, remaining accessible. For simplicity, we don't dive into this aspect for now[^2].

All blockchains and scaling methods implement [[Data Availability]] with more or less the same underlying approach, using [erasure coding](https://en.wikipedia.org/wiki/Erasure_code) and splitting the data among validators, ensuring that a subset can reconstruct it.

The main differentiating factor between this chapter's scaling method and upcoming ones is how they handle the re-verification part. We will discuss how [[Polkadot]] and NEAR do this next, and then move on to the next chapter to see how they happen in [[Scaling Out - Optimistic (Non-)Execution]] and [[Scaling Out - SNARKs]].
## Full Re-Execution
In this model, used in [[Polkadot]] and NEAR, the work done by the L2s is always re-executed by a subset of the L1 validators to ensure its correctness. To do so, two things must happen:
1. The L1 validators need to be able to reconstruct the L2 [[Block]] (or blocks, if multiple are being re-executed at the same time). This is done by the [[Data Availability]] system.
2. The L1 validators need to have access to a subset of the L2 state, because the verification of the L2 block being re-executed depends on it. This is done by attaching a subset of the [[Merkel Tree]] of the L2 [[State]] and spreading it alongside the block. This is what was formerly called a [[State Proof]].

## Summary
In the [[Scaling Out - Shared Economic Security]] model, the verification of the L2 work happens by the virtue of literally re-executing it enough times and by a subset of L1 validators, such that the probability of fraud is effectively 0.

Next, we will see how [[Scaling Out - Optimistic (Non-)Execution]] and [[Scaling Out - SNARKs]] use different approaches instead of this re-execution.

[^1]: full paper [here](https://eprint.iacr.org/2024/961).
[^2]: Search "L1 direct inclusion in Ethereum" to learn more.
[^4]: Or [[Rollup]]s in certain cases in the Ethereum context.
