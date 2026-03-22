---
description: ZK rollups and how they work.
permalink: scaling/snark
---

SNARK stands for **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. It is a branch of cryptography that allows proofs of some computation to be generated, allowing another entity to verify its correctness. Once this is done without leaking any information about *what* that computation was, it is called **Z**ero-**K**nowledge, or ZK-SNARK.

So, there are three properties to SNARKs that are interesting:
- They are a **cryptographic analog of verifiable execution**, one of the pillars of being [[Trustless]]. While non-SNARK blockchains achieve verifiable execution through [[Economic Security]] (which is ultimately a probabilistic property), SNARKs are concrete, absolute proofs of some computation happening correctly.
- Not only can they prove a computation, but they can also prove it privately: without revealing the inputs that were given to the computation, which we named earlier as one of the [[The Bigger Picture#Privacy]] issues of [[Web3]] products.
- Finally, they can make this proof ***succinct***, meaning that verifying the proof is much cheaper than actually doing the computation, although generating the proof itself can be very expensive.

The way that I like to think about it is that, given a computation that takes $x$ seconds to execute on plain hardware:
- Generating the proof $p$ takes $1000x$.
- Verifying $p$ takes only $x/1000$, and $p$ can be made very small.

The ratios in the above are not accurate and are merely a demonstration. A year or two ago, the cost of generating a ZK-proof for a standard computation like hashing was millions of times more expensive than actually doing the hashing. Similar to the general trend in hardware improvement, this computation is only getting more efficient as time goes by, and the ratio is lower nowadays.

In [another talk](https://blog.kianenigma.com/blockchain-reimagined/presentation-tum/), I have named this approach _asymmetric execution_: The prover side (L2) has to do a lot more work for the sake of the verifier (L1) having a faster way to verify it.

And this should explain how SNARKs are used as a scaling method. In this model, the work done by the L2s is not sent back to the L1 for *re-execution*. Instead, a proof of that work is sent, and since this proof is fast enough to be verified by all L1 validators, it does not impose a huge overhead on the L1 validator set. In other words, even if all L1 validators, in the classic [[Introduction - Why Scaling Matters#Sequential Blockchains|sequential]] manner, verify the proof, it is still sufficiently scalable.

![[Scaling Out - SNARKs 2025-12-23-11.50.40.excalidraw]]

## Another Misnomer: ZK-Rollups
Many [[Rollup]]s in Ethereum use this method[^1] and are often labeled as ZK-Rollups. But, ironically, most are not using the zero-knowledge aspect of it. This is another example of a naming glitch in [[Web3]] (similar to [[Blocks, Transactions, And Blockchain Systems#Blockchain Systems != Blockchain]]) where once an inaccurate word is used enough times, it is nearly impossible to undo it. For now, keep in mind that a ZK-Rollup is not necessarily private.

## [[TEE]] Analogy
Earlier in [[Blockchains Are Overrated#Recap Of Blockchains Being Trustless]], we made the analogy that the outcome of a blockchain's validator set is similar to a global TEE, thanks to the rules of [[Consensus Algorithm]] and [[Economic Security]] ensuring correctness of execution. SNARKs can be seen in a similar way, except they are even more similar to TEEs in that a computation can happen privately in them.

[^1]: see https://l2beat.com/scaling/summary.
