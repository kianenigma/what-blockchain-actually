---
description: How the blockchain state machine has evolved over time and has become more developer friendly and extensible.
permalink: what/evolution-stm
---

Our chapters so far have looked like this: we started with a set of conceptual explanations:
- [[What Is This All About?]]
- [[Blockchain-based Authorities]]
- [[Execution, Ordering and History]]

And then we pivoted for a few chapters to explaining concrete blockchain concepts:
- [[Blocks, Transactions, And Blockchain Systems]]
- [[Blockchain Networks]]
- [[Blockchains Are Overrated]]

This chapter is essentially a continuation of [[Execution, Ordering and History]], but it came with a gap, in order to provide readers with more specific knowledge about blockchains first.

In [[Execution, Ordering and History]], we modeled a blockchain as a [[State Machine]] (or a computer) whose execution is [[Trustless]], fully or partially depending on the implementation. In this chapter, we will look at the evolution of these state machines and see what applications have been encoded in them so far.

This evolution can be categorized into two different eras:
- [[#Fixed State Machine]]
- [[#Programmable State Machine]].
## Fixed State Machine
A fixed [[State Machine]] blockchain is the simplest one; it has a set of rules that never change in principle. Moreover, this state machine has no way of being extended, specifically by users.

The most famous example in this category is Bitcoin. Its state is merely the balance of users[^3], its [[STF]] is a simple digital bank, and it offers no way to execute any further logic as a part of its STF[^2].

> As noted, Bitcoin was a great demonstration that creating [[Trust#Science-based Trust|science-based trust]] is possible and people will use it, but it lacks *extensibility* as a first-class citizen.
### Custom Blockchains
An early way to create more custom [[STF]]s was essentially to create a _whole new blockchain_. This worked, and it led to a number of first-generation chains like ZCash, each being different from its predecessor, Bitcoin. ZCash, for example, has a very custom STF which allows for private storage and transfer of value in the form of its token, ZEC.

So, in this mindset, **if you want to have a different STF, you would have to create a (yet another) new (fixed-state-machine) blockchain[^5]**. This approach has a number of downsides:
- Each of these chains becomes a small island of its own, fragmenting the ecosystem further.
- Creation of a new blockchain (for various reasons) almost always implies creating a new token, which is itself another form of fragmentation of capital[^7].
	- A [[Bridges And Cross-Chain Messaging|bridge]] is the technology that tries to connect these isolated blockchains, which is discussed later.
- Building a whole new blockchain is time-consuming, hard, and can go wrong for a number of reasons.
	- Blockchains often benefit from "[economies of scale](https://en.wikipedia.org/wiki/Economies_of_scale)", in that the larger the system and the more people who use it, the more [[Trustless]] it is. Therefore, a young custom blockchain with a small ecosystem is more vulnerable.

This idea was also previously illustrated in [[Blockchain Networks#Two Layers of Networks]].
## Programmable State Machine
What if, instead of the blockchain beautifully executing its own [[STF]] in a [[Trustless]] manner, we would see the blockchain technology as a platform and allow anyone in the world to upload their own code to it and have it be executed? In other words, allowing users to extend the STF. This gave birth to **programmable state machine** blockchains.
### Hosting Smart Contracts
Ethereum was the first blockchain to invent such a system. Its [[STF]] was equivalent to that of Bitcoin (simple value transfer of the ETH token) and allowed blobs of code, called [[Smart Contract]]s, to be uploaded into the blockchain state and executed as a part of its STF, if a transaction requested to do so.

As an example, the transactions of the Bitcoin STF could *only* be similar to:
- `transfer(alice, bob, 1 BTC)`: transfer 1 BTC from Alice to Bob

Whereas Ethereum's transactions could be any of:
- `transfer(alice, bob, 1 ETH)`: transfer 1 ETH from Alice to Bob
- `upload_contract(0x123..)`: upload a new contract with code `0x123..`. The contract code is uploaded to the Ethereum [[State]]
- `call_contract(0x123, foo, bar)`: call the (already uploaded) contract with code `0x123`'s method `foo` and pass `bar` as input.

Achieving this in a [[Trustless]] way (especially keeping it *accessible*) is no easy feat, and similar to Bitcoin, Ethereum is a great demonstration that this is *possible*. The main challenges in achieving this are [[#Metering]] and [[#Determinisms]], discussed further below.
#### Smart Contract Languages and Virtual Machines
Smart contracts are written in various languages and are compiled to bytecode. Then, any blockchain that wants to execute these smart contracts needs to have a way to execute this bytecode. One technology that enables this is a [Virtual Machine](https://en.wikipedia.org/wiki/Virtual_machine), or VM.

In Ethereum, the **Ethereum Virtual Machine** (**EVM**) bytecode is used. The default language that could be compiled to EVM was **Solidity**, yet more languages can now be compiled to EVM bytecode.

> [!note]- First Mover Advantage of Solidity
> By and large, the majority of the blockchain ecosystem is focused on using Solidity as the main programming language for extending blockchains[^9]. Yet, a lot of interesting effort has also been put into allowing other programming languages to be used to write smart contracts. In some sense, Solidity is the JavaScript of Web3; it is not perfect, but being first made it almost impossible to fully replace.

#### Anatomy of Smart Contracts
[[Smart Contract]]s can be seen as their own mini [[State Machine]]s:
- Having a program code that defines what they are (the bytecode)
- Having their own state, that is stored as a part of the broader blockchain [[State]]
- While an implementation detail, in Ethereum and most smart contract blockchains, each *uploaded contract* is assigned an account (an address), which similar to user accounts, can hold tokens and transact programmatically.

Conceptually, we can summarize a smart-contract blockchain's overall state as follows:

![[Evolution of Blockchain State Machines 2025-12-20-09.40.30.excalidraw]]
### Hosting Other Blockchains
Instead of EVM, Polkadot chose a more general virtual machine (initially WebAssembly, later on an alteration of RISC-V called [PolkaVM](https://github.com/paritytech/polkavm)) as a more flexible and extensible [[STF]].

This allowed Polkadot to not only host smart contracts (with relatively limited programmability) but also host an entire set of blockchains within itself, giving birth to the idea of interconnected multi-chain blockchain networks. This ideology was later reinforced by Ethereum and its [rollup-centric roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) and exists to this day as the most accepted way to **scale** blockchains. A [[Rollup]] is a secondary blockchain that runs on top of Ethereum, helps it scale, and derives its [[Trustless]]ness in part from Ethereum. [[Polkadot]] and Ethereum do this in different ways, with different consequences about how secure the rollup is, which we will discuss in the [[Introduction - Why Scaling Matters|scaling]] chapters.

> In this context, the *hosting blockchain* is often called the Layer-1 or L1 blockchain, and the blockchains being *hosted* (the rollups) are called Layer-2 or L2 blockchains. See [[The Layers Terminology]].
#### Multi-chain Blockchain Ecosystems
In some sense, multi-chain designs are a middle-ground between [[#Smart Contracts]] and [[#Custom Blockchains]]. A multi-chain ecosystem (such as Polkadot or Ethereum) offers solutions to the aforementioned problems associated with [[#Custom Blockchains]], and in return offers greater flexibility and scalability to the entire ecosystem. The solutions being:
- SDKs and standards to make building L2s easier (such as the OP-Stack and `polkadot-sdk` for Ethereum and Polkadot respectively)
- The L2s derive parts of their [[Trustless]] properties from the much more secure L1.
- The L2s have standardized way to communicate with one another, reducing fragmentation.
- Ideally, the L2s would have options to not create their own custom tokens and instead use the L1 tokens.
### Hosting Any Application (with Any Runtime Duration)
Yet, even hosting another blockchain is still a very limited degree of programmability because:
1. First, a blockchain is still a [[State Machine]], confined to the boundaries of only being able to transition its state when new input (a *block* -- possibly with some transactions) comes in.
2. Second, the maximum amount of computation that can happen must at the end of the day fit in the [[Block Time]] constraints.

A typical smart contract and/or blockchain transaction looks like:
```rust
/// A blockchain/smart-contract transaction
fn on_transaction(sender, input) -> Result<_, _> {
	// can do stuff here..
	// but limited to what can fit in a block :(
}
```

A blockchain is *slightly* more flexible than a smart contract. Given the high degree of autonomy that a blockchain has, its [[STF]] may include more flexible callbacks that are executed without the need for a user [[Transaction]], for example on every block, or every `n-th` block:
```rust
/// A more generic hook that is only possible in a blockchain
fn on_every_block(block_number: u32) -> Result<_, _> {
	// can do stuff here..
	// but STILL limited to what can fit in a block :(
}
```

But in both of the above, one can see what we mean by:

> ..confined to the boundaries of only being able to transition its state when new input (a *block* of transactions) comes in..

That is, it is increasingly hard[^8] in either of the two to express a normal application that is:
```rust
fn main() -> () {
	// Compute the outcome of a long-running algorithm, and store
	// its outcome in the blockchain state, no matter how many
	// blocks it takes to compute it PLEASE.
}
```

This is a fairly novel vertical of the blockchain space and is still being explored. We will discuss one approach that I am familiar with ([[JAM]]) later.
#### Web3 Cloud Narrative
Innovation in [[#Hosting Any Application (with Any Runtime Duration)]] has sparked the **[[Web3]] Cloud** narrative. If blockchains manage to make their offerings, such as computation and storage, more and more flexible, it will start to look quite similar to how the cloud industry works today, except the primitives offered in the Web3 cloud would likely have differing properties.

> You can already imagine that a smart-contract blockchain indeed does offer a limited degree of compute and storage to its resident smart contracts, so the smart-contract blockchain is indeed like a Web3 cloud hosting the smart contract.

This is an emerging topic, and to the extent that I know, the question of "*what does [[Web3]] Cloud mean*" is still being discovered and defined. Other than the [[JAM]] approach, a few of the projects that I know are exploring this are:
- [AR.IO - The First Permanent Cloud Network](https://ar.io/)
- [EigenCloud - Verifiable AI & Compute Infrastructure \| EigenLayer](https://www.eigencloud.xyz/)
- [Internet Computer](https://internetcomputer.org/)
- [Cartesi \| Any Code. Ethereum’s Security.](https://cartesi.io/)
#### Not Always Apples to Apples
One crucial point to name about the [[#Web3 Cloud Narrative]] is that while on the surface different offerings seem similar, they often vary a lot in their implementation, especially when we root them in our [[Trustless]] properties in this writing.

A lot of such offerings use the blockchain and its [[Trustless]] properties only to *coordinate* the computation/storage being offered in the Web3-esque cloud, while the execution of the computation that the cloud user wants to do happens (mostly) offchain (see [[Onchain and Offchain]]). In contrast, [[JAM]] is trying to offer as many of these primitives as possible, while keeping it all onchain.
## Appendices
A number of appendices can be explained in this chapter, but they are kept separate as they are not relevant to the main flow of reading.
### Contract Composability
One note about smart contracts that we have not talked about is that they can interact with one another. Imagine a user sends a transaction to smart contract $A$, and during its execution $A$ might call into another contract $B$ and so on. This is called [[Composability]] and is discussed further in the linked note.

Contracts' ability to compose with one another is a great feature, yet it has also been the gateway to a lot of bugs and attacks in the blockchain space. Search for re-entrancy attack as an example.
### Metering and Gas
As mentioned in the [[#Web3 Cloud Narrative]], an interesting side-effect of allowing smart contracts to run on blockchains is that the system starts to resemble the internet cloud companies that we know today; there is an **infrastructure provider**, on top of which you purchase your own VM or deploy a server-less code.

In our case, the infrastructure provider is the host blockchain (e.g., Ethereum) and the smart contracts are the server-less code that can be autonomously executed.

What if your server-less code starts maxing out the CPU/GPU to mine cryptocurrencies? What would the cloud provider do to protect themselves? They charge you more money.

A smart-contract blockchain must have the same measure in place to survive abuse. Moreover, a smart-contract blockchain's measure to protect itself should arguably be a bit more draconian, because it intends to be a fully permissionless (one of the pillars of being [[Trustless]]) system to which anyone can upload any code. This is unlike a traditional cloud provider that verifies its users via email, collects their banking information, and so on.

This is why in smart-contract blockchains:
- No smart contract can run whenever it wants; it can only run if a user transacts with it[^6].
- Importantly, during this transaction, the user provides something called the _[[Gas|gas]] fee_, a fee payment for the execution of that contract.

If you ever interact with an Ethereum wallet, you might see signs of "gas" when you submit transactions. This is the upper bound on the gas amount that the user "promises" their execution of a contract will take and is willing to pay for it. The gas amount is then converted to an ETH equivalent and is charged from the user in return for the execution.

> [!note]- Sponsored Transactions
> Gas fees have been a major hurdle for [[Web3]] adoption so far. Imagine if you had to pay 10 cents every time you send a message to your friends, no one would use such a messenger. There are two paths forward for this, both being explored by various blockchains:
>
> 1. **Sponsored Transactions**: An ability for an application to pay on behalf of users, under certain criteria. For example, if a user has been verified to not be a bot, and has interacted with an application long enough, they would get a number of free transactions per day. See [EIP-3074](https://olympixai.medium.com/demystifying-eip-3074-sponsored-transactions-and-the-path-to-enhanced-ethereum-eoas-6eb0c60b7f35) as an example of this in Ethereum.
> 2. **Scaling to the Extreme**: If blockchains take a number of exponential scaling steps forward, such that the [[Gas]] cost of even thousands of transactions per day and per user becomes negligible, then we can consider this issue solved. Even today, to send a message on a messenger, even though the messenger application is "free", we are paying an implicit cost by purchasing access to the internet, and often our private data is fee payment.

> [!warn]- Gas Fees and [[DeFi]]
> One of the reasons that [[DeFi]] has been a successful product of [[Web3]] is that financial applications are a class of applications where users can accept to pay small fees for every interaction. Even today, when we trade anything on a stock broker, or make transfers within our banks, we are often charged a small amount.

This leads us to the next challenge: How should the smart-contract blockchain know *how much* gas to charge? This is where the concept of metering comes into play. [[Metering]] is a toolkit embedded in smart-contract virtual machines that allows them to *keep track of the execution cost of smart contracts as they are being executed*. Without going into too much detail, this metering machinery is then used to determine the gas cost of a transaction.
### Determinism
Smart contracts, similar to blockchains, can only really work if they are always executed deterministically. This is why no smart contract (or blockchain) can send an HTTP request as part of its [[STF]], read the current time, or store the weather in Lisbon during its execution. All of these values are non-deterministic by nature and would break the blockchain [[Consensus Algorithm]]. Imagine two different nodes of the network executing a smart contract at different times getting different values because the weather in Lisbon has changed!
### Upgradability
Since we have discussed the evolution of [[State Machine]]s in this chapter, it is also worth exploring how the [[STF]] of these systems can be upgraded.
#### Hard Forks
The most standard way to upgrade a blockchain is basically letting it [[Fork]], but in a coordinated manner, which is called a "hard fork". Network nodes upgrade their code to start using a new [[STF]] at a certain future block. If the majority do this, the blockchain essentially upgrades after this point. Some nodes might be left behind and form a minority fork, which is why this is still called a _fork_.
#### Hot Upgrades
Some networks have implemented more sophisticated ways to upgrade their [[STF]] without the coordination needed to do a hard fork. One example is [[Polkadot]], which stores its own STF as a part of the [[State]]. A privileged transaction (often requiring supermajority of DOT holders to approve of it) can update this part of the state storing the STF code. Once done, from the next block, all nodes will automatically see the new STF code without any hard forking coordination needed. See [[Polkadot#STF Stored In The State|this section about Polkadot]] for more information.
#### Smart Contracts
Smart contracts are designed to be immutable by default. This is a rule that might sound strange at first, but it makes perfect sense if we remember our grounding in that the ultimate purpose of blockchains is to be [[Trustless]].

Imagine a smart contract that you use is providing a financial service to you today. You have verified this contract to be correct once, and knowing it runs on a secure smart-contract blockchain like Ethereum, you have all the reasons to have your [[Trust#Science-based Trust|science-based trust]] in it. Would you continue to trust it if you knew the developer who uploaded the contract had the privilege to change the contract's code at any time? Obviously no.

This is why smart contracts are immutable by default. Once uploaded, they can never be re-uploaded or even taken down again.

Developers are free to use various techniques[^10] to retain upgradability to certain parts of the contract, but it is something that has to be done and decided upon explicitly. As a user of a smart contract, you should also always double-check which parts of the contract the developers behind them are retaining as upgradeable.

> Ideally, the simple, core principles of a smart contract are immutable from the first deployment. For example, that the service will not raise its commissions more than a limit. See [self-guaranteeing promises](https://blog.kianenigma.com/post/tech/self-guaranteeing-promise/).
## Summary
This is likely the longest chapter of this book, and it explored the different types of blockchain [[STF]]s that we have so far seen. Recall that the STF of a blockchain is the code that defines how the blockchain should execute a new incoming [[Block]], and potentially update its [[State]] based on it.

Early blockchains were fully custom to a specific use case, and their STF did just that one use case. Ethereum was the first blockchain that introduced [[Smart Contract]]s, a way to extend the STF with custom code from the users. This led to the idea that a blockchain can be seen as an infrastructure-provider, similar to the cloud services we have today.

Both Polkadot and Ethereum also have means to host other entire blockchains as a part of their STF, and with varying degrees, secure them using their [[Consensus Algorithm]]. This led to the [[The Layers Terminology|L1/L2]] analogy.

[^2]: People have tried to extend Bitcoin with Ordinals and Bitcoin scripts, but they are both extremely limited and we can set them aside for simplicity. Nowadays, some people are even trying to build Rollups on Bitcoin.
[^3]: Stored in a format known as UTXO.
[^4]: More might exist, yet I am not familiar with them.
[^5]: Nowadays, these new standalone blockchains are called "L1"s; see [[The Layers Terminology]].
[^6]: It is in theory possible to pre-pay for a contract's execution and have it be executed later, though. But the point is that its execution can never be free for the host.
[^7]: While tokens are a great use case of blockchain technology, it is not unfair to argue that we have created already too many tokens, compared to actual innovation.
[^8]: Though not impossible, to be fair.
[^9]: [[Blocks, Transactions, And Blockchain Systems#Node Software / Client|Blockchain node software]] is often written in high-performant, low-level languages such as Rust and C++.
[^10]: Such as [proxy contracts and `delegatecall`](https://rareskills.io/post/proxy-contract)
