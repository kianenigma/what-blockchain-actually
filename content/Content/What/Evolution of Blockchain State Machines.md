Our chapters so far looked like this: We started with a set of conceptual explanations: 
- [[What Is This All About?]]
- [[Blockchain-based Authorities]]
- [[Execution, Ordering, History and State Machines]]
And then we pivoted for a few chapters to explaining concrete blockchain concepts: 
- [[Blocks, Transactions, And Blockchain Systems]]
- [[Blockchain Networks]]
- [[Blockchains Are Overrated]]

This chapter is essentially a continuation of [[Execution, Ordering, History and State Machines]], but it came with a gap, in order to provide readers with more specific knowledge about blockchains first.

In [[Execution, Ordering, History and State Machines]] we modeled a blockchain as a [[State Machine]] (or a Computer) whose execution is [[Trustless]][^1], fully or partially depending on the implementation. In this chapter, we will look at the evolution of these [[State Machine]]s, and see what applications have so far been encoded in them.

This evolution can be categorized into two different eras:
- [[#Fixed State Machine]]
- [[#Programmable State Machine]].
## Fixed State Machine
A fixed [[State Machine]] blockchain is the simplest one; it has a set of rules that in principle never change. Moreover, this state machine has no way of being extended. 

The most famous example in this category is Bitcoin. Its state is merely the balance of users[^3], and its [[STF]] is a simple digital bank, and it offers no way to execute any further logic as a part of its STF[^2].

> As noted, Bitcoin was a great demonstration that creating [[Trust#Science-based Trust|Science-based Trust]] is possible, and people will use it, but lacks *extensibility*. 
### Custom Blockchains 
An early way to create more custom [[STF]]s was essentially to create a _whole new blockchain_. This worked, and it lead to a number of first-generation chains like ZCash, each being different from their predecessor, Bitcoin. ZCash, for example, has a very custom [[STF]] which allows for private store and transfer of value in the form of their its token, ZEC.

So, in this mindset, if you want to have a different [[STF]], you would have to create a (yet another) new (fixed-state-machine) blockchain[^5]. This approach has a number of downsides: 

- In the absence of a [[Bridge]], each chain would often have its own custom token, fragmenting the overall liquidity
- Building a whole new blockchain is time-consuming, hard, and can go wrong for a number of reasons
	- Blockchains often benefit from the "Economies of Scale", in that the larger the system and the more people who use it, the more [[Trustless]] it is. Therefore, a young custom blockchain with a small ecosystem is more vulnerable.
## Programmable State Machine
What if more blobs of code could be uploaded to the blockchain and stored as a part of its [[State]], and these code blobs could be executed as the part of the [[STF]] upon user [[Transaction]]s? This gave birth to **programmable state machines**.
### Ethereum, EVM and Smart Contracts
Ethereum was the first blockchain to invent such a system. Its [[STF]] was equal to that of Bitcoin (simple value transfer of the ETH token), *and* it allowed blobs of code, called [[Smart Contract]]s, to be uploaded into the blockchain state, and execute as a part of its [[STF]], if a transaction requested to do so. 

These blobs of code had to be in the format of **Ethereum Virtual Machine** (**EVM**) byte-code. The default language that could be compiled to EVM was **Solidity**, yet today more languages can nowadays be compiled to EVM bytecode.

As an example, the transactions of the Bitcoin [[STF]] could only be similar to:
- `transfer(alice, bob, 1 BTC)`: transfer 1 BTC from Alice to Bob

Whereas the Ethereum's transactions could be either of:
- `transfer(alice, bob, 1 ETH)`: transfer 1 ETH from Alice to Bob
- `upload_contract(0x123..)`: upload a new contract with code `0x123..`.
- `call_contract(0x123, foo, bar)` call the (already uploaded) contract with code `0x123`'s method `foo` and pass `bar` as input.

Achieving this in a [[Trustless]] way (especially keeping it accessible) is no easy feat, and similar to Bitcoin, Ethereum is a great demonstration that this is *possible*. The main challenges in achieving this are [[#Metering]] and [[#Determinisms]], discussed further below.

By and large, the majority of the blockchain ecosystem is (*still*, more than a decade after EVM's inception) focused on optimizing EVM as the main virtual machine on top of which the STF can be expanded. Yet, a number of projects have been pioneering new, more general, virtual machines as the extensible part of the STF.
### Polkadot: An STF that can host other blockchains
Polkadot is one such example. Instead of EVM, Polkadot chose a more general virtual machine (initially WebAssembly, later on an alteration of RiscV called PolkaVM) as a more flexible and extensible STF. 

This allowed Polkadot to not only run smart contracts (with relatively limited programmability), but also run/host an entire set blockchains within itself, giving birth to the idea of a multi-chain blockchain network. This ideology was later reinforced by Ethereum and its [rollup-centric-roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) and exists to this day the most accepted way to scale blockchains. A [[Rollup]] is a secondary blockchain that runs on top of Ethereum, helps it scale, and derives it [[Trustless]]ness from Ethereum. 

> This is often called horizontal scaling as is discussed in [[Introduction - Why Scaling Matters]] and further chapters.
### Hosting Any Application In Blockchain [[STF]]
Yet, even hosting another blockchain is still a very limited degree of programmability. This is because a blockchain is still a [[State Machine]], confined to the boundaries of only being able to transition its state when new input (a *block* -- possibly with some transactions) comes in. 

In other words, both a smart contract and a blockchain's code are primarily written as a set of callback functions that are triggered at specific times. 

A typical smart contract and/or blockchain transaction looks like:

```rust
/// A blockchain/smart-contract transaction
fn on_transaction(sender, input) -> Result<_, _> { .. }
```

A blockchain is *slightly* more flexible than a smart contract. Given the high degree of autonomy that a blockchain has, its [[STF]] may include more flexible callbacks that are executed without the need of user [[Transaction]], for example on every block, or every `n-th` block: 

```rust
/// A more generic hook that is only readily possible in a blockchain
fn on_every_block(block_number: u32) -> Result<_, _> { .. }
```

But in both of the above, one can see what we mean by:

> ..confined to the boundaries of only being able to transition its state when new input (a *block* of transactions) comes in..

That is, it is increasingly hard in either of the two to express normal application that has a `fn main() -> { ... }` and runs an execution for a few minutes and then terminates.

This is a fairly novel vertical of the blockchain space, and is still being explored. I will discuss one approach to that I am familiar with, [[JAM]] later. Some other projects that I am aware of and are trying to tackle this are: 
- https://ar.io/
- https://www.eigencloud.xyz/
- https://internetcomputer.org/
#### Web3 Cloud Narrative
Innovation in [[#Hosting Any Application In Blockchain STF]] has sparked the idea of coining the term: **[[Web3]] Could**. In a similar fashion to our existing cloud environment that offer compute and storage, among other primitives, the Web3 cloud would offer similar (although not exactly equal) primitives.

> You can already imagine that a smart-contract blockchain indeed does offer a limited degree of compute and storage to its resident smart-contracts, so the analogy is indeed suitable. 

This is an emerging topic, and to the extent that I know, the question of "*what does [[Web3]] Cloud mean*" is still being discussed. Some of the projects and comapnies 
#### Not Always Apples To Apples
One crucial point to name about the [[#Web3 Cloud Narrative]] is that while on the surface different offerings seem similar, they often vary a lot in their implementation, and, especially when we root them in our [[Trustless]] properties in this writing.

A lot of such offerings use the blockchain, its secure execution of [[STF]] and [[Validator]] set only to *coordinate* the computation/storage being used in the cloud environment, while the actual execution of work happens offchain (see [[Onchain and Offchain]]). Contrary, [[JAM]] is trying to offer as many of these primitives as possible, while keeping it all onchain. 

---
## Appendices 
A number of appendices can be explained in this chapter, but they are kept separate as they not relevant to main flow of reading. 
### Contract Composability
One note about smart contracts that we have not talked about is that they can interact with one another. Imagine a user sends a transaction to smart contract $A$ and and during its execution $A$
 might call into another contract $B$ and so on. This is called [[Composability]] and is discussed further in the linked note.

Contracts' ability to compose with one another is a great feature, yet it has also been the gateway to a lot of bugs and attacks in the blockchain space. Search for re-entrancy attack as an example. 
### Contract Metering and Gas
An interesting side-effect of allowing smart contracts to run on blockchains is that the system starts to resemble the internet cloud companies that we know today; there is a **infrastructure provider**, on top of which you purchase your own little VM, or deploy a server-less code.

In our case, the infrastructure provider is the host blockchain (e.g. Ethereum) and the smart contracts are the VMs.

What if you rent a VM, and start juicing its CPU/GPU to mine cryptocurrencies? how would the cloud provider do to protect themselves? they charge you more money. 

A smart-contract blockchain must have the same measure in place to survive. Moreover, a smart-contract blockchain's measure to protect itself should arguably be a bit more draconian, as, unlike a cloud provider that verifiers its users via email, collects their banking information and so on, a smart-contract blockchain is a fully permissionless system to which anyone can upload any code. After all, accessibility is one of the main pillars of being [[Trustless]]. 

This is why in smart-contract blockchains: 
- No smart-contract can run whenever it wants; it can only run if a user transacts with it[^6].
- Importantly, during this transaction, the user provides something called the _[[Gas|gas]] fee_, a fee payment for the execution of that contract.

This leads us to the next challenge: how should the smart-contract blockchain know how much gas to charge? This is where the concept of metering comes into play. [[Metering]] is a toolkit embedded in smart-contract virtual-machines that allow them to *keep track of the execution cost of smart contracts as they are being executed*. Without going into too much detail, this metering machinery is then used to determine the gas cost of a transaction.

> If you ever interact with an Ethereum wallet, you might see signs of "gas" when you submit transactions. This is the upper-bound on the gas amount that the user "promises" its execution of a contract will take. 
### Determinisms 
Smart contracts, similar to blockchains, can only really work if they are always executed deterministically. This is why no smart contract (or blockchain) can send an HTTP request, read the current time, or inspect the weather during its execution. All of these values are non-deterministic by nature, and would break the blockchain [[Consensus Algorithm]]. Imagine two different nodes of the network and executing a smart-contract at different times, and they get different values, because the weather in Lisbon has changed!

### Upgradability
Since we have discussed the evolution of [[State Machine]]s in this chapter, it is also worth exploring now the [[STF]] of these systems can be upgraded. 
#### Hard Forks
The most standard way to upgrade a blockchain is basically letting it [[Fork]], but in coordinated manner, which is called a "Hard Fork". All nodes of the network upgrade their code to start using a new [[STF]] at a certain block. If the majority do this, the blockchain essentially upgrades after this point. Some nodes might be left behind, which is why this is still called a _fork_.
#### Hot Upgrades
Some networks have implemented more sophisticated ways to upgrade their [[STF]] without the complications of a hard fork. One example is [[Polkadot]], which stores its own [[STF]] as a part of the [[State]]. A privileged transactions (often requiring supermajority of DOT holders to approve of it) can update this part of the state storing the [[STF]] code. Once done, from the next block all nodes will automatically see the new [[STF]] code, without any hard forking coordination needed. See [[Polkadot#STF Stored In The State]] for more information.
#### Smart Contracts
Smart-contracts are designed to be immutable by default. This is a rule that might sounds strange at first, but it makes perfect sense if we remember our grounding in that the ultimate purpose of blockchains is to be [[Trustless]].

Imagine a smart-contract that you use is providing a financial service to you today. You have verified this contract to be correct once, and trust it. Would you continue to trust it if you knew the developer who uploaded it would have the privilege to change the contract's code at any time? Obviously no.

This is why smart contracts are immutable by default. Once uploaded, they can never be re-uploaded. 

Developers are free to use various techniques to retain upgrade-ability to certain parts of the contract, but it is something that has to be done and decided upon explicitly. As a user of a smart contract, you should also always double check which parts of the contract the developers behind them are retaining as upgradeable. 

> Ideally, the simple, core principles of a smart-contract can be made immutable from the first deployment. For example, that the service will not raise its fees more than X%. see [self-guaranteeing promises](https://blog.kianenigma.com/post/tech/self-guaranteeing-promise/). 
## Summary

[^2]: People have tried to extend Bitcoin with Ordinals and Bitcoin scripts, but they both extremely limited and we can set the aside for simplicity. Nowadays, some people are even trying to build Rollups on Bitcoin.
[^3]: Stored in a format known as UTXO
[^4]: More might exist, yet I am not familiar with
[^5]: Nowadays, these new standalone blockchains are called "L1"s, see in [[The Layers Terminology]]
[^6]: It is in theory possible to pre-pay for a contract's execution and have it be executed later, though. But the point is that its execution can never be free for the host.
