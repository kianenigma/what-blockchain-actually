---
description: More details about how proof of work and stake work and achieve economic security.
---

## Introduction
These two topics did not fit into the overall flow of the writing thus far and therefore have been moved to this separate appendix. Knowing them is useful, as they are an important part of the history of blockchains. Moreover, they shed a bit of light into _how_ blockchains manage to deliver some of their [[Trustless]] properties, namely [[Economic Security]].
## Proof of Work
In an ideal blockchain network, anyone would be able to author new blocks. This poses two challenges:
- Some nodes might execute the wrong [[STF]], or generally do malicious things. Importantly, the cost of doing so is very cheap, so an attacker is highly incentivized.
- Even among honest actors who execute the correct [[STF]], there is a congestion issue, with the likelihood of multiple honest nodes attempting to compete for producing the same block, leading to many [[Fork]]s.

> [!note] 51% Attack
> In proof-of-work networks, in most implementations, the criterion is that if more than 50% of the hashing power of the network agrees on something, the whole network will converge to that. This means an attacker aiming to execute an invalid [[STF]] would need to control more than 50% of the nodes of the network. This threshold of tolerance against attackers in each [[Consensus Algorithm]] is called the Byzantine Threshold.

Proof of work can be seen as a solution to the above problems. It involves appending an extra field to each [[Block Header]], called `nonce`, such that when the block is hashed, there are a number of leading zeros in the final block hash. A few more definitions:
- **Miner**. Finding this correct nonce is called **solving the proof of work puzzle**, and the entity doing it is called a [[Miners|miner]].
- **Hashing Power**. Solving the proof of work can only be done by a random search. A miner's ability to have good hardware to do this search in parallel is called the **hashing power**.
- **Difficulty**. The number of leading zeros that the block hash must have is called the **difficulty** of the proof of work network, and as it increases, more hashing power is required to find it.
- The last Bitcoin block produced at the time of this writing is [this](https://www.blockchain.com/explorer/blocks/btc/928378), with a block hash of `00000000000000000001340c42ac9559f532f1300b5f32c9c235295a88521b67`. Notice the leading zeros.
- Most miners use GPUs or [ASIC](https://en.wikipedia.org/wiki/Application-specific_integrated_circuit) hardware to solve the proof of work as fast as possible.

This mechanism solves both of our issues above:
- Due to the mining difficulty, the likelihood of multiple miners being able to solve the proof of work at the same time decreases, reducing congestion and [[Fork]]s.
- Due to the electricity cost of solving the proof of work, producing invalid blocks will actually become *expensive* (especially with modern-day difficulty of the Bitcoin network). This means that acquiring a [[Byzantine Threshold]] of nodes to misbehave and have them all mine new invalid blocks is ever increasing in its cost.

Proof of work is therefore a mechanism to increase the _cost to attack the network_ such that a rational attacker would realize it is not worth doing it. This concept is also called the [[Economic Security]] of the network. In proof-of-work, the Economic Security is represented as the electricity cost needed to mine new blocks.

Finally, to elaborate a bit more on why we consider Bitcoin to be [[Trustless]] and able to provide verifiable execution of its [[STF]]: it is in part because of its [[Economic Security]]. The cost of doing otherwise, as long as more than 50% of the network is honest, is prohibitively high and would not even lead to a successful attack.

[[Economic Security]] is an extremely important metric to evaluate the [[Trustless]]ness of a blockchain network. Moreover, understanding it will pave the way to [[#Proof of Stake]], as it is essentially the same process, except instead of the cost being in the form of *wasting electricity*, it is in the form of *losing capital*.

## Proof of Stake
[[#Proof of Work]] works well, as we evidently see in Bitcoin and many other proof-of-work networks in operation, but it is fair to call it proof-of-wasted-work, as solving a meaningless hash puzzle has no use and, in fact, wastes a lot of electricity as well. Proof-of-stake, seen from the lens of [[Economic Security]] is very much the same thing, except instead of wasting energy, some tokens are temporarily handed over to the protocol as collateral, and they can be slashed from the owner in case of misbehavior. This leads to the same Economic Security properties, except it doesn't require electricity to be wasted.

In other words, in proof-of-stake:
- Any participant in the network that wishes to author new blocks is asked to lock an amount of capital in a vault inside the protocol.
- In the event that it is known that they misbehaved, this capital is fully or partially **slashed**.
- The tokens in the above condition are said to be [[Staked Token|Staked]].
- Most Proof of Stake networks utilize their own value-bearing tokens (e.g. ETH) to be staked; therefore, the act of "*Staking*" is usually named as one of the utilities of that token. In principle, though, the staked token can be anything that bears value, even USDT.
- Similar to proof-of-work, to attack a proof-of-stake network, an attacker must control a [[Byzantine Threshold]] of the tokens that are staked, or else their attack would only lead to a loss of funds for the attacker.

In a very similar manner to [[Proof of Work and Proof of Stake]], Proof of Stake is a more pure form of achieving verifiable execution through [[Economic Security]], leading to a [[Trustless]] system. Because all authors are asked to lock a (hopefully significant) amount of capital *at stake* (therefore the name Proof of *Stake*), we can be sure that they execute the [[STF]] correctly and do not diverge from the protocol.
## Note on Distribution of New Blocks Among Authors
Many proof of work networks tout the fact that anyone can be a block author in these networks, leading to a more [[Trustless]] system. Yet, note that the likelihood of me being able to produce a block in Bitcoin today from my computer, even though I can try and do it, is practically zero. The likelihood is proportional to the [[Economic Security]] (aka. hash power) that I provide.

Proof of stake networks sometimes choose a similar approach: different validators are assigned to produce new blocks proportional to their [[Staked Token]] amount. This is highly dependent on the implementation, though. For example:
- [[Polkadot]] selects a set of 1000 validators, and within an epoch, they all get to produce blocks.
- Ethereum strives to retain the original Bitcoin property, where any node having a minimum amount of ETH staked can author blocks, but the duration between two blocks that they author might be very long, due to the very large validator set size.
## Combining Resources
A common practice in proof-of-work networks to allow a *large number of entities*, with small hashing power each, to come together and form one strong miner, a process facilitated by [[Mining Pools]].

In proof-of-stake, a similar mechanism exists, and it is often called delegation (see [[Delegators or Nominators]]) where individuals who themselves don't run any hardware can contribute their capital to be [[Staked Token|staked]] behind a [[Validator]].
## Blockspace and Quality Thereof
First, let's introduce a new keyword: [[Blockspace]]. It is a measure of the amount of verifiable computation/storage ([[STF]]/[[State]]) that a blockchain can perform and share with its users.

Having seen how [[Proof of Work and Proof of Stake]] work, we can assert that a blockchain should not be evaluated only by the quantity of its blockspace, but also based on the quality of it.

To be more precise, the quality of [[Blockspace]] is at least proportional to the amount of [[Economic Security]] backing it, because Economic Security is the essence of why that block(space) is verifiable to begin with.
