This part of the book is entirely dedicated to giving you a high level understanding of the different methods used to scale blockchains. As noted in [[The Bigger Picture]], this topic was on the hot seat of [[Web3]] for many years, and lot has been done about it. 

We did argue that scaling is likely no longer the frontier issue of [[Web3]], but nonetheless it is very useful to understand how blockchains scale their computational and storage capacities.

Scaling is also particularly important as it allows for more **Innovation** and **entropy** to happen at a low cost. In 2017, it was very hard to innovate further on Ethereum as doing anything on Ethereum incurred very high [[Gas]] fees, so very few people dared to even try. Today, because blockchains have scale further, we might not need to worry about e.g. the expensive cost of [[State]] as much and at least build *prototypes* of of new products that use the blockchain [[State]] for all of their data, and do more of their computation [[Onchain and Offchain|onchain]], while we await for more low-cost solutions to this, as noted in [[The Bigger Picture#Storage]].

## Sequential Blockchains
The foundation for all blockchain scaling methods hinges on understanding how a *non-performant* (or not scaled) blockchain works. I tend to call these **sequential blockchains**, as they work in a purely sequential manner, much like the old single core CPUs.

To understand these systems, it is useful to see the entire [[Validator]] (or [[Miners]]) set of the network **as one CPU core**. This is because, under normal circumstances, this entire validator group must do the following for any computation to be correct: 
- One of the [[Validator]]s in the network decides to [[Blockchain Networks#Authoring Nodes|author]] a new block. Which nodes does this, is decided by the [[Consensus Algorithm]]. 
- All other [[Validator]]s of the network re-execute and re-check the the same block
	- This re-execution is the essence of the networks verifiable execution
- A lot of time is wasted in between to account of network propagation. This is why the block time of many blockchains with large validator sets is in the order of handful of seconds, not less. For example, Ethereum uses 12s [[Block Time]] as of now. 
- The same cycle repeats.

![[Introduction - Why Scaling Matters 2025-12-22-13.46.54.excalidraw]]

So, we can see this entire validator set as one single-threaded CPU core, executing a single package of instructions (a [[Block]]) every x seconds. It has to do so slowly and sequentially, because it needs to leave enough time for the newly created block to be propagated and re-executed by all other validators, before we move on to the next block.

![[Introduction - Why Scaling Matters 2025-12-22-13.55.43.excalidraw]]

The following chapters will explain how this single threaded CPU model can be made more performant. Note that this is not necessarily an exhaustive list, but rather the ways that I am familiar with and are popular.
## Vertical and Horizontal Scaling
Before going further, a brief note about vertical scaling vs. horizontal scaling. Suppose we have a machine that is running some computation.
- Vertical scaling is where we simply buy a faster machine. This is the equivalent of you upgrading your cloud VPS to have more CPU, RAM and so on. Vertical scaling is also called "**Scaling Up ⬆️**".
- Horizontal scaling is where we add a second machine next to it (that is *not necessarily faster*), and have the two share the work. This is when you buy a second instance of your VPS. Horizontal scaling is also called "**Scaling Out ➡️**" or [[Sharding]], as we are sharding the data/computation among different machines.
### Limitations Of Vertical Scaling
For vertical scaling to grow indefinitely, we can only rely on Moore's law, noting that hardware speed seem to double every 2 years. As it stands, there is a debate about whether this law is still valid or not, but we can certainly say a few points about it: 
- We have already reached certain physical limits that make further speed gains in future chips not as easy and cheap to achieve as the previous ones.
- Modern interpretations of the Moore's law indicate that the *cost of the same hardware would halve every two years*, not its speed doubling. This necessitates some use of horizontal scaling, as it implies that to get the same output from a hardware, we can buy multiple instances of it for the same cost.
- Even if Moore's law has been correct thus far and continues to remain so, we cannot turn a blind eye to the fact that today, **almost all global-sale software in the world is working on the basis of horizontal scaling**. No Google-sized company is putting their bets on building one mega-super-computer, and are instead building clusters of multiple machines to scale their business to a global scale.

> Vertical scaling simply doesn't seem to be the right approach for global-scale applications as it stands.

For horizontal scaling to grow indefinitely, there is no limitation, as we can always build more machines of the same speed as the past. Ideally, the cost of hardware gets less, so scaling can happen only cheaper as times goes by.
### Overhead Of Horizontal Scaling
While horizontal scaling is certainly more promising in terms of its [[#Limits]], it is true that it introduces more overhead. in our scenario above, imagine if we split a single machine into two different machines, the work is not done: 
- We need to connect the two machines via a high speed network connection
- We need to potentially split the data among them, or have them each own a copy of the data on top of which they operate
- The two machines need to know how to coordinate with one another to know who does what.

> The details of the above is usually discussed under the topic of **distributed systems/algorithms**. 

What we discussed in [[Evolution of Blockchain State Machines#Contract Composability]] is in fact a different aspect of the same problem, but at different level of abstraction. Instead of physical machines, each machine is a smart-contract blockchain that can host workloads on it in the form of smart-contracts. As long as all of the smart-contracts, with their data and computation, are in the same environment (e.g. a single smart-contract blockchain), communication and coordination is much simpler. The moment we split them into different environments (a sharded smart-contract blockchain with 2 shards), it becomes harder. We will discuss this further in all chapters about Scaling out and [[Sharding]].

## Preview
Before going to the next chapters and discussing different approaches, it is worth noting which blockchains are associated with each approach.
- [[Scaling Up - Hyper Optimized Super Chains]]: Solana, Hyperliquid, and other fast, high throughput L1s
- [[Scaling Out - Pure Multi-chain]]: Cosmos, before the introduction of Interchain Security
- [[Scaling Out - Shared Economic Security]]: Polkadot
- [[Scaling Out - Optimistic (Non-)Execution]] and [[Scaling Out - SNARKs]]: Primarily in Ethereum
## Summary
Sequential blockchains operate as such: Entire validators set must work in coordination for a period of time known as [[Block Time]] to process one package of work, a [[Block]]. Different scaling methods discussed in the upcoming chapters are ways to extract more work out of this group of validators.

The main two ways to scale any digital system is either vertically or horizontally. Vertical scaling is more limited, but is simpler and has less architectural overhead. Horizontal scaling is exactly the opposite.