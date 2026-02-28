---
description: Zoom out and see the big-picture mission of blockchains.
permalink: what/big-picture
---

To start this chapter, I will begin with a personal interpretation of the [[Web3]] space's history so far.

I believe the space started with Bitcoin, which demonstrated that the basis of this technology, [[Trustless]] money, works. And soon after, Ethereum expanded this into a more general trustless [[State Machine]] that allows for more general forms of computation to happen [[Onchain and Offchain|onchain]] (aka. [[Trustless]]ly).

But, if we look back at the thought process of some of the thinkers of the blockchain space around this time[^1], it was always clear to them that a blockchain [[State Machine]], with its limited abilities (which we just studied in [[Properties Of Blockchain Systems]]) is not enough to deliver [[Web3]] at **scale** and for **all sorts of applications**. The trustless state machine is an important part of the system and can certainly be useful for some applications, such as [[DeFi]] (which is already thriving without anything else), and *parts of* others, but lacks many primitives that other web applications that act as an [[Authority]] use.

Then, the next decade of the blockchain space was somehow spent around three main ideas:
1. **Scaling**. A correct realization that the [[Trustless]] [[State Machine]] needs to scale, and a tremendous amount of resource was put on it. We will cover this to some extent in [[Introduction - Why Scaling Matters]].
2. **[[DeFi]]**. It turned out that there is one application with perfect PMF[^2] that can already be implemented with just a [[State Machine]][^3] and its limited computation and storage[^6].
3. **Scams and Noise**. As noted in the first chapter, [[Web3]] implies [[Commoditization]] of creating certain financial applications (see [[What Is This All About?#Summary]]). Without a doubt, this has led to a lot of scams and noise. But while this should be combated, it is not necessarily a bad sign. It is further evidence that the accessibility aspect of being [[Trustless]] is real.

> [!note]- Personal Opinion: Money x Technology
> I think the blockchain space is very unique in that the amount of money that flooded into it was much **greater** and earlier **than** in other emerging technologies, and it fundamentally changed the behavior of the entire industry and the individuals in it. I once heard "The state of Web3 is like the dot-com bubble, except if it had happened in 1980 when the internet was still at its infancy". Perhaps this can explain why so much effort was spent on the above three verticals: simply because there was money to be made in all of them, and people are rightfully attracted to short-term gains.
>
> I strongly believe that the blockchain space can be the subject of future retroactive studies on behavioral economy and similar fields.

And sadly, all the while, it was forgotten that there were other verticals of Web3 other than the core "blockchain" that also deserve attention. And this is where we are, near the end of 2025:
- The blockchain scalability has improved significantly. It is worth noting that this was not an effort in vain, and it is indeed useful for further experimentation, but evidently not enough.
- DeFi is still the main thriving product of Web3.
- But not enough attention was given to adjacent technologies that allow Web3 to manifest. That being said, I believe this is starting to regain attention just now.
## Web3 Beyond DeFi
What are then the adjacent technologies that are needed to build more Web3 products? This, plus what products to build with them, is the billion-dollar impactful question. Some of these technologies that are within my imagination, and work has already been done on them, are as follows.
### Storage
The blockchain storage (the [[State]]) is only ever useful to store sensitive information on top of which we want to come to a hard consensus and retain its history. Blockchain [[State]] is not suitable for storing large blobs, web pages, multimedia files, and less sensitive information.

Moreover, anything stored on a blockchain state for just one block (as in, uploaded and immediately deleted in the next block) is a permanent overhead, as the entire history of the blockchain is auditable (as a part of being [[Trustless]]) and all intermediate states need to be retained one way or another for future auditing. Oftentimes we want some data to be uploaded, we want it to be available, and perhaps we want to have consensus over *what* it is right now (via a simple hash) but we don't care as much about the entire history of it.

Ideally, we wish to have a storage primitive that allows larger data to be stored cheaply, with existence guarantees but without all the bells and whistles of a blockchain state. This can then be used next to the main blockchain state where the sensitive bookkeeping is done [[Onchain and Offchain|onchain]] in the blockchain state and the rest resides in a secondary storage solution.

Relevant projects:
1. [Swarm - Storage and Communication for a Sovereign Digital Society](https://ethersphere.github.io/swarm-home/)
2. [Walrus \| Enabling Data Markets for the AI Era](https://www.walrus.xyz/)
3. [Filecoin | A Decentralized Storage Network for the World's Information](https://filecoin.io/)
4. [Arweave - A community-driven ecosystem](https://arweave.org/)
### Messaging
Another primitive that is missing in mainstream [[Web3]], and is always a subject of criticism in Web2, is messaging and communication. As it stands now, peer-to-peer communication protocols are ever more rare[^5], and any form of messaging over the internet goes through centralized servers, often leading to [[Trust#Human-based Trust|human-based trust]] and not being [[Trustless]].

Baseline peer-to-peer communication in theory doesn't need a huge amount of innovation. There already exist many protocols that enable this, such as WebRTC. What is missing in them is:
- A trustless means to establish connections or exchange initial messages.
- Baking in further privacy and obfuscation of metadata into the protocol.
- Dealing with a peer going offline for some period of time.
- Broadcast (many-to-many) applications.

Links:
- [Introduction to Waku \| Waku Documentation](https://docs.waku.org/)
- [Status — Make the jump to web3](https://status.app/)
### Privacy
As noted before, the fact that blockchains are public-by-default is a huge barrier for all sorts of applications. Even if the internal contents of [[Transaction]]s are encrypted, it is not desirable that anyone can see _when_ someone is doing something.

We will discuss some of the new cryptography primitives that aim to solve this in [[Moon Math - ZKP, FHE and MPC]].
### Identity and Personhood
Identity and personhood are two disjoint but related missing concepts in both the current Web2 and [[Web3]].
- Identity is the act of identifying who an entity is, be it a person or not. An identity can be an organization, a person, or anything else.
- Personhood is about knowing if an entity is a person or not, without necessarily identifying who they are.

In Web2, both are solved through the virtue of the power of the centralized actor: collecting personal information (government documents, payment details), having the ability to ban you, and combining it with captchas.

Both of these challenges are a bigger threat in [[Web3]] for multiple reasons:
- (specific to Web3) **The system promises accessibility**. Many Web2 platforms liberally protect themselves against the above by significantly lowering their degree of accessibility.
- (specific to Web3) [[Proof of Work and Proof of Stake|Proof of Stake]], which we have not yet discussed in detail, is effectively the only alternative in Web3 for personhood, in which "how many tokens you have and are willing to lock" is a measure of "how vested you are in the system", not whether "you represent the opinion of 1 or 1000 humans". In some sense, proof-of-stake in certain areas suffers from "the rich get richer".
- (not specific to Web3) LLMs and AI. With the advent of these technologies, it is ever more possible for a single human or entity to control many AI agents who seem like a large number of humans, but are in fact controlled by just one.

For further reading, see:
- [What do I think about biometric proof of personhood?](https://vitalik.eth.limo/general/2023/07/24/biometric.html)
- [Polkadot Proof-of-Personhood](https://www.proofofpersonhood.how/#features)
## Anecdote
Here's one example that I recently came across. This is a talk from 2014 from Gavin Wood, explaining a technology in Ethereum called Whisper, enabling secure and private [[#Messaging]] (and similar mechanisms):

<iframe width="560" height="315" src="https://www.youtube.com/embed/U_nPoBVLPiw?si=hD0oJuAVyOmOMkbJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This is from 9 years ago, highlighting literally in the first 2 minutes of the talk why blockchains are not enough (or needed) for some aspects of [[Trustless]] applications (or "[[Decentralized Applications]]", as often called).

Here is another [talk](https://youtu.be/BWvThjrjTmw?si=xmGpUBSf2tN8g2bV&t=1012) from a few weeks ago, in which the same technologies were mentioned again:

![[Screenshot 2025-12-16 at 23.15.05.png]]

But if we look at the headlines of Ethereum or Web3 in the timeline between these two talks, much less has been said about Whisper[^4] than that of DeFi. This is just one anecdote to emphasize that these "sister-protocols to blockchain" (as elegantly said by Vitalik Buterin in the above talk) didn't receive their fair share of attention. The same has been said in [Make Ethereum Cypherpunk Again](https://vitalik.eth.limo/general/2023/12/28/cypherpunk.html).

> [!info]- The Holy Trinity of [[Web3]] Technologies
> In my research for this chapter, I actually learned that the combination of:
> - Ethereum as the computation and state machine
> - Whisper for messaging
> - Flow for storage
>
> were called the holy trinity of Web3 technologies. I think a decade later, the proposition is still correct, and blockchain alone is NOT enough to build [[Web3]] applications.
## Summary
In [[Blockchains Are Overrated#Summary: Means to an End]], we argued that even within creating state machines and yielding their secure computation and storage abilities, **blockchain plays a small role**. This is mostly a misnomer.

In this chapter, we take this a huge step further and recognize that even the blockchain state machine, with all of its discussed [[Properties Of Blockchain Systems|properties]], is simply another means to an end, and is not enough.

The goal is to create [[Trustless]] applications for the web, called [[Web3]], and remove the need to trust arbitrary intermediaries acting as an [[Authority]] with no guarantees other than [[Trust#Human-based Trust|human-based trust]], which will inevitably fail us because:

> [..absolute power corrupts absolutely](https://www.acton.org/research/lord-acton-quote-archive).

And for the full vision of Web3, we need more than just the blockchain technology.

If we accept that [[DeFi]] is the only product that we can build with [[Web3]], thinking about the above is a waste of time. But if you think Web3 can go beyond this and have a larger impact on the world, then solving the above is among the most important frontier issues of Web3 (among the [[Oracle Problem]], retaining access to [[The Free Internet]] and more).

[^1]: Most of my resources for this interpretation are old Ethereum talks from Vitalik Buterin and Gavin Wood.
[^2]: Product market fit, as in, people are actually interested in it today.
[^3]: Modulo the lack of privacy, but as noted, this could also be solved with some added [[Moon Math - ZKP, FHE and MPC|cryptography]].
[^4]: Whisper is now [Waku](https://docs.waku.org/).
[^5]: Skype was [peer-to-peer](https://en.wikipedia.org/wiki/Skype) at first, but it eventually moved to a client-server architecture. The name is actually derived from the combination of "sky" and "peer-to-peer".
[^6]: In fact, [[DeFi]] was also most resilient against high gas fees and lack of scalability, as paying e.g. $10 for a $10k trade is still within reason given the high volatility and profit margins in DeFi.
