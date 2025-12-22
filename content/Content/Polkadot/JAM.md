JAM is a technical upgrade to Polkadot that started in early 2024, and at the time of this writing, is being finalized with a [formal specification](https://graypaper.com/). Once enough teams have implemented it, it is intended that the Polkadot L1 will upgrade itself to the JAM protocol, while the L2 and the rest of the ecosystem remains in tact. 

> I have talked in length about JAM in [Demystifying JAM](https://blog.kianenigma.com/posts/tech/demystifying-jam/). This chapter is merely a summary of this article.

## In-Core and On-Chain
To understand the nuanced and motivations of the JAM protocol, we must first take a step back and recall that a standard blockchain, is similar to a single-core CPU, that can only process a single [[Block]] of work every x seconds, as explained in [[Introduction - Why Scaling Matters#Sequential Blockchains]]. Then, recall that [[Polkadot]]'s architecture is quite analogous to a multi-core CPU. This is because in Polkadot, there is in fact two types of execution that the L2 blocks experience: 
- First, they are re-executed by a **subset of the L1 validators** (~30 out of a 1000 set of validators, under normal conditions -- see the ELVES paper for more info).
- Then, **all L1 validators** will perform a small amount of work, that recognizes that a new L1 block has been re-executed enough times and is valid. 

These two types of execution in Polkadot are called **in-core** and **on-chain** execution respectively. Note that what is executed in-core is as secure as what is executed on-chain. This is the main magic of the ELVES protocol.

The first motivation of JAM is to recognize that the in-core/on-chain execution environments are useful primitives for doing broader [[Trustless]] computation towards [[Web3]], not just securing other blockchains. Therefore, in JAM, L2s are given complete freedom to whatever they want in-core and on-chain. 

> In fact, no such thing as L2 exists in JAM and it is instead called a service. We use the word L2 here for simplicity.
## Lean Protocol 
The second motivation for JAM is to cleanup a lot of technical debt from the protocol, and strip it down to its basics. This is a desirable property that is also being pursued in other major blockchains that think about their long term sustainability, such as Ethereum and the [Lean Consensus roadmap](https://leanroadmap.org/), because having a lean, well defined protocol will significantly make the protocol more maintainable and more [[Trustless]] by making sure many teams and people have the knowledge to understand and maintain it. 

While [[Polkadot]] managed to implement a fairly complex protocol, likely the first of its kinds in achieving heterogenous sharding with shared security, it has also accumulated a lot of technical debt and complexity in the protocol.
## [[Data Availability]] Accessible To Users 
As it stands now, the [[Data Availability]] in Polkadot (and likely in Ethereum) is only used to store L2 block information. This is a bit ironic, as we know from [[Content/What/The Bigger Picture#Storage]] that lack of storage primitives other than the blockchain [[State]] is one of the bottlenecks of building more [[Web3]] applications (other than more [[DeFi]] blockchains).

Similar to the on-chain/in-core execution environment, JAM is recognizing that the [[Data Availability]] is another powerful primitive that should not only be used towards serving L2s, but should be accessible to developers as a primitive to store any information that they want in it. We already noted that the analog of an L2 in JAM is called a service. In JAM, service have free access to the [[Data Availability]] layer, to write whatever they want to it, and read whatever they want from it. 

The cost overhead of storing data in [[Data Availability]] is much less than the [[State]], as the history of the data is not kept in the [[Data Availability]].
## Continuous Execution 
Finally, JAM is leveraging two of its assets: 
- A new lean, register-based VM based on RISC-V
- Access to [[Data Availability]] for storing arbitrary information
To allow, likely for the first time, the ability to write continuous code to be written in a blockchain. By _continuous_, we mean a block of code that can take a minute or an hour to complete, and as the developer we don't have to think about splitting this block of code into multiple small chunks that fit in a block. Search for topics like "DOOM on Polkadot JAM" and "Polkadot JAM CoreVM" to learn more and see demos of this new technology in action.

Note that we covered this point in [[Evolution of Blockchain State Machines#Hosting Any Application In Blockchain STF]] before, and we also pointed out that the comparison between how different blockchain protocols host continuous execution is not [[Evolution of Blockchain State Machines#Not Always Apples To Apples]]. To the best my knowledge, JAM is the only protocol that allows arbitrary long workloads to be executed [[Onchain and Offchain|onchain]] (assuming ELVES convinces you that the executed in-core is as [[Trustless]] as on-chain).