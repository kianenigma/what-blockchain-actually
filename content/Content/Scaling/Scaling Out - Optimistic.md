With the information in [[Scaling Out - Shared Economic Security#Sharding Requirements]] in mind, it is now quite easy to understand this scaling method. In the Ethereum this method is called an Optimistic [[Rollup]]. 

It works in a very similar way as in [[Scaling Out - Shared Economic Security]], where all of the L2 blocks are sent back to the L1 in the [[Data Availability]]. But no re-execution happens by default in the L1. Instead, entities called Fishermen or Fraud Provers are assumed to always monitor the system, and report any wrong computation in the L2 block. 

Only if a fraud prove is raised, then the L1 aims to settle this fraud though some form of re-execution. 

This models works in theory as long as one honest fraud prover is present. But, research has shown that that it is quite possible to censor out the fraud provers, or make it economically infeasible for them to prove any fraud[^1]. 

Another downside of the Optimistic rollups is that, due to their nature, no transaction happening in them can be considered [[Finality|final]] until a long enough window of time has passed. This window of time is the time period where the system has to wait for fraud provers to potentially raise a fraud.

[^1]: https://medium.com/l2beat/fraud-proof-wars-b0cb4d0f452a
