Bridges are the primary way through which blockchains send messages to one another. These messages could also originate from tenants of each blockchain, for example a smart contract in blockchain A sending a message to a smart contract on blockchain B. Considering what we have learned about blockchain in this book, the scenarios that we are familiar with and need a bridge are:
- Two independent L1s with their own validator set and [[Economic Security]] like Ethereum and NEAR exchanging messages.
- Two L2 blockchains connected to the same L1 exchanging messages.
- Two L2 blockchains connected to different L1s exchanging messages.
- And so on

Finally, let's note that while most of the applications of bridge technologies in deployment today (unsurprisingly, given what we have learned in [[The Bigger Picture]]) are serving [[DeFi]] through bridging tokens, the two approaches mentioned below are slightly more general and revolve around exchanging messages. A bridged token is a special case of exchanging messages, where blockchain A sends a message to blockchain B that it has burnt/locked some tokens on its side, and blockchain B should mint the equivalent[^1] on its side.

## The Problem Setup
First, let's understand how blockchains exchange messages, and what challenges this presents. A message originating from the source chain to the destination chain always represents itself as an event that happened on the source chain. For simplicity, we can assume the source chain placing the message somewhere in its [[State]]. To build further on the token example above, the message can be "Alice burnt 1 ETH".

Then the challenge for the receiver chain is as follows:
1. Receive the message. In other words, receive the portion of the source chain's state that contains "Alice burnt 1 ETH".
2. Receive a proof that the piece of the source chain's state is indeed correct (or else anyone can claim anything)
3. Receive a proof that the block in which this message was seen in the source chain is [[Finality|final]] and cannot be reversed

Then, the destination chain is in a position to safely mint 1 ETH to Alice.

![[Bridges And Cross Chain Messaging 2025-12-23-21.10.48.excalidraw]]
### [[Weakest Link]] Issue Revisited
Notice step 3 in the above diagram; when two blockchains exchange messages, even if the bridge technology is perfect (which is the [[#Light Node Based]] approach mentioned below), they are implicitly implying: We trust one another's [[Consensus Algorithm]] and [[Finality]]. This is a big deal, as if one of the blockchains gets compromised, all of the connected chains would also be in trouble.

Imagine if the [[Economic Security]] of the sender chain above is way less, and therefore the blockchain is overtaken by hackers. Then, they can unlock/re-mint the 1 ETH that Alice has bridged to the receiver chain, and spend it again, re-creating the legacy "double-spend" problem in blockchains.

This is a reiteration of the weakest link issue in interconnected blockchains, first described in [[Scaling Out - Pure Multi-chain]].
### Asynchrony
Needless to say, while the above diagram has no notion of time, bridging is often a slow and asynchronous process.
- Slow, as in the receiver chain will most certainly receive the message with at least a few blocks of delay. This is often bottlenecked by the finality time, and also should take into account the time needed for relayers to see and forward the state proofs.
- Asynchronous, as the sender won't receive any immediate feedback if the receiver received and did something about the message or not. The sender's interface is a so-called "fire and forget" one.
## Light Node Based
The most appropriate way to solve the above is using a technology that we are already familiar with: [[Blockchain Networks#Light Node|Light nodes]]. Let's see how the above problems are addressed by
1. Entities called relayers are tasked to monitor different blockchains, and deliver these messages from one blockchain to another.
2. While doing so, they must deliver a [[State Proof]] of the message in the source chain as well, providing hard evidence that the message is legit.
	- For the receiver to be able to process this proof, it needs to know the [[State Root]] of the sender chain at all times. You might already remember the technology that enables this: [[Blockchain Networks#Light Node|Light nodes]].
	- In essence, the receiver chain *must run an [[Onchain and Offchain|onchain]] light node of the sender chain*. The light node of the sender chain gives it access to the [[State Root]] of the sender chain, which means any [[State Proof]] can be verified[^4].
3. Similarly, the relayers send finality proofs[^2] of the source chain to the destination chain. These proofs must be similarly [[Trustless]]ly verifiable at the destination chain, using the onchain light node.

![[Bridges And Cross Chain Messaging 2025-12-23-21.25.20.excalidraw]]

This method is the most secure and [[Trustless]] way of bridging[^3], and we shall see next why its main competitor is not.
## Multisig or Guardian Based
The alternative to the above, which is sometimes used either because a said blockchain is incapable of having a light node, or merely due to deploying a product fast, is replacing the proofs and light nodes with a set of entities/people/organizations (often a multisig) that promise to monitor different chains, and relay correct messages.

This method is obviously not [[Trustless]], and there have been many, many hundreds of millions of dollars lost in this industry so far, due to their shortcomings.

<div>
<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">See how many of <a href="https://t.co/xWz6oT8LfD">https://t.co/xWz6oT8LfD</a> are multisig/guardian bridges if you have doubts. <a href="https://t.co/8uzYJs1Q8O">https://t.co/8uzYJs1Q8O</a></p>&mdash; Kian Paimani (@kianenigma) <a href="https://twitter.com/kianenigma/status/1960737952713064647?ref_src=twsrc%5Etfw">August 27, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

Interestingly, if we look into the history of bridge hacks, I would guess that almost all have not been due to the bridge operators acting maliciously, but rather incompetently, exposing themselves to a hacker taking advantage of them and stealing funds with fraudulent messages.

This is an excellent full circle to a sentence in the very first chapter of part 1, [[What Is This All About?#Cryptography and Military]]:

> Public key cryptography *doesn't work because an employee at a bank branch does their job correctly... **It works because of hard-science determining it works, no matter who or where you are and with whom you are interacting**..

Light clients are not as easily hackable (compared to humans, at least), for the very same reason that large blockchains like Ethereum have never been hacked: They are [[Trustless]], and hacking them requires extremely sophisticated hackers, breaking the crypto-economic games of the [[Consensus Algorithm]] or in some cases, doing the near-impossible task of reversing a hash function.

In contrast, a bridge controlled by a group of humans, even if acting in good faith today, suffers from:
- Those humans (or their predecessors) might in 20 years not have good faith anymore
- Humans are simply much more vulnerable to being hacked and tricked than cryptographic systems


[^1]: often called wrapped tokens
[^2]: when applicable, as different blockchains have different notions of finality
[^3]: A few honorable, and certainly non-exhaustive, mentions to projects that use this technology: Snowbridge and Hyperbridge in Polkadot, NEAR Rainbow bridge, and many more.
[^4]: In most EVM chains, this light node is implemented as a [[Smart Contract]].
