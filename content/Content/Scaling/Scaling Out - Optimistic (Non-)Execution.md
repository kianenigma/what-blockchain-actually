---
description: Optimistic rollups and how they work.
permalink: scaling/optimistic
---

With the information in [[Scaling Out - Shared Economic Security#Sharding Requirements]] in mind, it is quite easy to understand this scaling method. In Ethereum, this method is called an Optimistic [[Rollup]].

It works in a very similar way as in [[Scaling Out - Shared Economic Security]], where all of the L2 blocks are sent back to the L1 in the [[Data Availability]]. But no re-execution happens by default in the L1, with an **optimistic** assumption that the work must be correct, unless stated otherwise. Instead, entities called **Fishermen** or **Fraud Provers** are assumed to always monitor the system and report any wrong computation in the L2 blocks.

![[Scaling Out - Optimistic 2025-12-22-18.15.46.excalidraw]]

Only if a fraud proof is raised, then the L1 *aims* to settle this fraud through some form of re-execution.

This model works in theory as long as one honest fraud prover is present. But, research has shown that it is quite possible to censor out the fraud provers, or make it economically infeasible for them to prove any fraud[^1].

Another downside of Optimistic Rollups is that, due to their nature, no transaction happening in them can be considered [[Finality|final]] until a long enough window of time has passed. This window of time is the time period where the system has to wait for fraud provers to potentially raise a fraud, usually 7 to 14 days.

Notice how in this model, there is no notion of sharding the execution of L2s. In fact, this model is much more similar to [[Scaling Out - Pure Multi-chain]], except frauds can be eventually settled on an L1 blockchain. In the absence of fraud, only the ordering of the L2 blocks is recorded in the L1 (via [[Commitment Hash]]es), with no re-execution.

Finally, at least in the way implemented in Ethereum, settling any fraud actually doesn't happen by re-executing the full L2 block in the L1. Instead, it happens through a multi-round bisection process, whereby the fishermen prove that a certain EVM instruction was incorrect. This is, to the best of my knowledge, a suboptimal implementation of fraud-proving because the Ethereum L1 at the time was not ready to host L2s due to VM and [[Gas]] limitations. Even today, Ethereum doesn't aim to resolve this, but instead doubles down on cryptography to ensure the correct execution, which we will discuss next in [[Scaling Out - SNARKs]].

[^1]: https://medium.com/l2beat/fraud-proof-wars-b0cb4d0f452a
