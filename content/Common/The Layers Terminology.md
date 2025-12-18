The whole conversation in the blockchain space in calling something L0, L1, L2, L3 and so on is rather interesting. To the best of my knowledge, it goes like this: 

- A [[Evolution of Blockchain State Machines#Custom Blockchains|custom blockchain]] that has its own validator set and therefore [[Consensus Algorithm]] is usually called an L1. An L1 should not rely on any other chain for any part of its [[Consensus Algorithm]].
- Contrary, a chain that uses an L1 for parts of [[Consensus Algorithm]] is called an L2.
- At some point, [[Polkadot]] started to position itself as an L0, being one of the first systems that allowed other L1 chains to be built and secured on top of it. 
- This terminology broke apart once Ethereum doubled down on the rollup-centric roadmap. In this model, Ethereum was the L1, and the **Rollups** that are built on top of it are called an L2.
	- L2s are new blockchains that take the heavy lifting off of the shoulders of the L1 (see [[Scaling Out - Shared Economic Security#Sharding Requirements]]), but gain their security from the L1. 
- I don't know much about L3+, but supposedly people have tried to build *a rollup on top of another rollup* and so on.