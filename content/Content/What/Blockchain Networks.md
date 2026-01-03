---
description: How a network of nodes come together to form a distributed network, called the blockchain network.
permalink: what/networks
---

[[Blocks, Transactions, And Blockchain Systems]] finished by introducing an important component: blockchain node software. This is because a blockchain is, in fact, a _network_ of entities, each running _node software_ that interconnects wiht other. These nodes then play different roles at different times. In this chapter, we will look at these roles and see what each does at specific times. Notably, we should learn exactly which nodes (and when) execute the [[STF]].

The ultimate purpose of the participants of this network is to come to a consensus about what the final [[State]] of the blockchain is and what the sequence of events (or [[Block]]s, as we learned in the previous chapter) was that led to this particular state. The umbrella term used to define the set of algorithms that dictate the above is the [[Consensus Algorithm]] of a blockchain.
## Authoring Nodes
The first and most important role we look at is _who can author a new block?_. Different networks have different specifications for this, but one common theme among them is as follows: *One node authors a block, everyone else will check it*.

In networks like Bitcoin and early-day Ethereum, all nodes can, *in principle*, be an author, although the chances of actually authoring a block might be near-zero for smaller participants.

In other, more modern networks like current-day Ethereum and Polkadot, a subset of nodes are periodically elected as the *set of authors*, and for a period of time (often called an *epoch*) rotate the authorship role among themselves. Once the epoch is over, a new set is elected, and so on.

> [!Info] Note on [[Proof of Work and Proof of Stake]]
>
> Ultimately, defining the rules of authorship is the role of the [[Consensus Algorithm]] of the said blockchain and varies from protocol to protocol. The above two examples are broadly how [[Proof of Work and Proof of Stake]] work, two of the most popular [[Consensus Algorithm]]s. We will discuss these two in detail in an upcoming chapter.

Block authors usually have some sort of a *[[Transaction]] queue* within themselves, which is a queue of all transactions that are pending to be executed (see [[#Journey of a User Transaction]] for more info). When each of them gets a chance to author a block, they execute a subset of transactions (based on their preference, for example, transactions that pay the most fee) using the [[STF]], bundle them in a [[Block]], and share it with the rest of the network.

While authoring a new block, the block author must also decide on three important [[Commitment Hash]]es that end up being in the [[Block Header|header]] of their newly authored block:
- What is the [[State Root]] of the blockchain *after* this block is executed
- What is the parent block on top of which they authored a block. This matters, because two parent blocks would have different states, and therefore the current state root would be different.
- The [[Commitment Hash]] of all transactions that they included in this block
## Checking
A subset or all other nodes might be tasked to actively **check** the work of the authors and report any misbehavior. The checkers will re-execute and check all aspects of the block, but it is most important to understand the subset of it related to checking the [[State Root]]:
- They know the [[STF]] of the blockchain
- They receive a new block $B_n$ (block number $n$) with header $H$ from an author.
- They first inspect the header $H$ and extract the parent hash $p$ from it. $p$ must be the hash of block $n-1$.
- Then, they look up the state associated with block $n-1$ from their database, $S_{n-1}$.
- They import block $B_n$ on top of $S_{n-1}$ and re-create the state associated with the execution of block $B_n$: $S_n$.
	- In other words: $STF(B_n, S_{n-1}) \rightarrow S_n$
- Then they re-calculate the [[State Root]] from their own local $S_{n}$ and ensure that this value matches the state root noted in $H$.
- This, in effect, ensures that the block author executed $STF(B_n, S_{n-1})$ correctly and they noted the correct state root in the header $H$.

Other things checkers typically do that are not mentioned above:
- Ensure the block number is correct and increments the parent by exactly $1$.
- Ensure the block author was eligible to author a block (depending on the [[Consensus Algorithm]])
- Ensure the rest of the [[Commitment Hash]]es in the header are correct.
- Any other checks specific to that blockchain.

> [!tip] Misbehavior
> It is worth adding that the consequence of an author producing an invalid block (among other misbehaviors) is also different depending on the [[Consensus Algorithm]]. Some resort to actively [[Slashing]] some funds from the block author, while others don't have an active means of slashing and assume the social effects of being publicly known to misbehave and other factors are severe enough to prevent such attacks [^1].

> [!note] Validators
> The combination of authors and checkers is often called the [[Validator]] group of the blockchain. Ultimately, the work done by this group of nodes is considered highly [[Trustless]]. Moreover, the work done by this group is called [[Onchain and Offchain|onchain execution]], while anything else is called *offchain*.

![[Blockchain Networks 2025-12-19-17.25.17.excalidraw]]
## Full Node
Full nodes are the ones that are following the work of the authors by re-executing the [[STF]] based on proposed blocks, but don't actively participate in the creation of new blocks and don't play any significant role in the [[Consensus Algorithm]].

For a network to be [[Trustless]], it is of the utmost importance for full node software to be available, not need sophisticated hardware to run on, and be able to successfully sync the entire blockchain from [[Genesis]] all the way to the tip of the chain.

This would consequently allow anyone to verify any (old) state (e.g. *how much BTC I had a year ago, and today?*), which was one of the properties of [[Trust#Science-based Trust]].
## Archive Nodes
Full nodes typically store the entire history of [[Block]]s but discard intermediate [[State]]s. Because, given the correct $STF = F$, the genesis state $S_0$, and the sequence of $[block_1, block_2, ..., block_n]$, they can recreate any of the intermediate states $S_n$ by re-executing the sequence of:
- $F(block_1, S_0) \rightarrow S_1$
- $F(block_2, S_1) \rightarrow S_2$
- $...$
- $F(block_{n}, S_{n-1}) \rightarrow S_n$

If a node decides to store all of the intermediate states, it is typically called an **archive node**.
## RPC Node
Either a full node or an archive node that decides to expose its database (most notably $[block_1, block_2, ..., block_n]$ and $[S_0, S_1, ..., S_n]$) over JSON-RPC (or a similar protocol) is called an **RPC node**. Users of blockchains would frequently then connect to RPC nodes to:
- Read information from the blockchain
	- What is my current BTC balance?
	- What are the latest transactions that I submitted?
- Submit new transactions to the blockchain

Crucially, an RPC node that merely replies to queries into its database with the raw answer is not particularly [[Trustless]]. **This is because there is no easy way for the one asking the query to verify the result.** The recipient would have to trust that the RPC node is being honest.

This is why the theoretically ideal scenario for connecting to a blockchain network is for each user to have their own full node running locally, such that they don't need to rely on an external RPC node. Yet, this is not great for user experience and is generally addressed by using [[#State Proofs]] within a [[#Light Node]], explained next.

Moreover, an RPC node can easily decide to censor certain users and transactions, something that has [already happened](https://www.forbes.com/sites/leeorshimron/2024/01/17/web3s-silent-threat-centralized-rpc-nodes/). Using [[#Light Node]]s is orders of magnitude more resilient towards censorship.
### State Proofs
One way to fix the problem with an [[#RPC Node]] is to use what is known as a [[State Proof]]. State proofs are cryptographic proofs of any given query over the state that are sent alongside the response, allowing the recipient to have an absolute guarantee about the correctness of that response. The only requirement for the recipient is to know the correct [[State Root]], nothing more.

The ability to generate efficient state proofs is the main reason why the [[Merkel Tree]] is used to represent the blockchain state, and the [[Commitment Hash]] of the state ([[State Root]]) is not merely a hash-list of the entire state, but rather the root of the Merkel tree.
## Light Node
Light nodes are similar to full nodes in that they are not actively participating in authoring and are merely following the chain. Yet, to save resources and be able to run with minimum CPU and storage requirements (for example, in a mobile phone or browser extension), they don't re-execute the [[STF]] at every single block.

Instead, **they only follow the *block headers* and verify cryptographic proofs to ensure that the header is correct**. Crucially, if they know the correct header at a given block, they also know the correct [[State Root]] at that block. Then, they request [[State Proof]]s from other RPC/full nodes to receive information. This method is much more [[Trustless]] and secure and allows the light node to identify any false information that it might receive from other nodes.

> The most **secure** connection to a [[Web3]] application would be to connect to a website with the webpage or a browser extension running a light node, verifying all of the data that is being shown to the user.

Similar to what was said in [[Blockchain-based Authorities#Trustless -ness Can Be a Spectrum]], this is also a spectrum and we can be flexible about it. Perhaps an application can initially load with trusted RPC data, but in the background, or upon user request, verify the sensitive information using state proofs or by running a light node.
## Appendix
A number of auxiliary topics related to the above points follow.
### Proposer-Builder Separation (PBS)
Predominantly in Ethereum, the task of finding the most *efficient* block to propose is further decoupled from the [[#Authoring Nodes|authors]] and is given to a market of nodes that are actively searching and bidding for the best block to produce, called **proposers**. This approach is particularly popular in Ethereum given its vibrant [[DeFi]] ecosystem and the possibility of [MEV](https://arxiv.org/abs/2411.03327).

This is an implementation detail and does not alter the role of authors and checkers mentioned above. At the end of the day, authors must *somehow* find a good block to propose. They either do that by looking at their transaction queue themselves, or by delegating this task to a proposer.
### Consortium Blockchains
A blockchain may have a closed set of nodes that perform the [[Consensus Algorithm]] and is known as a [[Consortium Blockchains]]. Such networks only offer a subset of the [[Trustless]] aspects of otherwise public blockchains, mostly skipping the verifiability aspect. But they may still provide other beneficial aspects such as public auditability.

> Imagine if a government of a nation would run a [[Consortium Blockchains]] to trace how tax money is being used. This blockchain would be a closed one, and a user should not be able to send a transaction to it to re-collect their tax money. But they would be able to transparently see how this money is spent.

### Two Layers of Networks
- Notice how a single blockchain is a network of nodes that are interconnecting.
- But we also know that many blockchains exist in the world (Ethereum, Polkadot, NEAR, Bitcoin)[^3].
- This means that an ecosystem of blockchains is itself a broader network of blockchains.
- The common keyword for the technology that allows blockchain A to connect and exchange messages with blockchain B is called, unsurprisingly, a [[Bridges And Cross Chain Messaging|bridge]].

![[Blockchain Networks 2025-12-18-17.59.23.excalidraw]]
### Journey of a User Transaction
A small note about the lifecycle of user transactions and how they get to the transaction queue of nodes. Users can generally submit their transactions to any of the nodes of the network, regardless of their role, except for a [[#Light Node]]. In almost all blockchains, all nodes are constantly gossiping transactions together, meaning that as long as one node receives it, eventually it will be received by all nodes, and eventually a future block author will see and include the transaction in a block.

As noted in the [[#RPC Node]] section, it is useful for users to have the freedom to send their transaction to multiple nodes, or directly to validators. If a [[Web3]] application limits all user transactions to be submitted via a single node, this single node could in theory censor some users.

[^1]: See https://www.iog.io/news/to-slash-or-not-to-slash-that-is-the-blockchain-question.

### Block Times
A small detail worth adding here, which will be useful in future chapters, is to know that most blockchains are constrained by producing blocks at **minimum** time intervals. At a high level, this is because if too many blocks are produced too quickly one after another, the possibility of [[Fork]]s increases. This can happen due to unpredictable network latencies. This is why blockchains often have a fixed [[Block Time]], meaning that new blocks have to come at least this much apart. For example, Polkadot and Ethereum operate on 6s and 12s block times respectively.

> More advanced blockchains, and especially those that inherit their [[Trustless]] properties from a different source (called [[The Layers Terminology|layer 2]]), have more freedom to speed up their block times. Some highly optimized blockchains such as Solana also achieve much faster block times, with some tradeoffs.

## Summary
In this chapter, we explained the roles of different nodes in a blockchain network.

The most important one is the overall flow in which:
- One node decides to author a new block.
- Everyone else receives it and re-verifies it. The verification involves re-execution of the [[STF]] and ensuring that all of the [[Commitment Hash]]es in the [[Block Header]] are valid.

Secondly, we introduced [[#Light Node]]s and their important function in a blockchain network, ensuring that individual users have a way to directly connect to the blockchain network, read data from it, and submit [[Transaction]]s without going through the [[#RPC Node]]s as a gateway that can potentially be centralizing.

Finally, a number of auxiliary topics were discussed, such as the [[#Journey of a User Transaction]].

[^3]: Also, some blockchains have the ability to host other second-[[The Layers Terminology|layer]] (often called a layer-2 or L2) blockchains on top of them, such as [[Rollup]]s in Ethereum, which is discussed in more detail in [[Evolution of Blockchain State Machines#Hosting Other Blockchains]].
