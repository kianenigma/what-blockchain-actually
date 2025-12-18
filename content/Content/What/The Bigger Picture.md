To start this chapter, I will begin with a personal interpretation of the [[Web3]] space. 

I believe the [[Web3]] space started with Bitcoin, which demonstrated that the basis of this technology, [[Trustless]] money, works. And soon after, Ethereum expanded this into a more general trustless [[State Machine]] that allows for more general forms of computation to happen [[Trustless]]ly, aka. [[Onchain and Offchain|onchain]]. 

But, if we look back at the thought process of some of the thinkers of the blockchain space around this time [^1], it was always clear to them that a blockchain [[State Machine]], with its limited abilities (which we just studied in [[Properties Of Blockchain Systems]]) is not enough to deliver [[Web3]]. The [[Trustless]] [[State Machine]] is an important part of the system, and can certainly be useful for some applications, such as [[DeFi]] (which is already thriving without anything else), and *parts of* others', but lacks many primitives that other Web applications that acts as an [[Authority]] use. 

Then, the next decade of the blockchain space was somehow spent around 3 main ideas: 
1. **Scaling**. A correct realization that the [[Trustless]] [[State Machine]] needs to scale, and tremendous amount of resource was put on it. we will cover this to some extent in [[Introduction - Why Scaling Matters]]. 
2. **[[DeFi]]**. It turned out that there is one application with perfect PMF[^2] that can already be implemented with just a [[State Machine]][^3] with limited computation and storage.
3. **Scams**. As noted in the first chapter, [[Web3]] implies [[Commoditization]] of creating certain financial applications (See [[What Is This All About?#Summary]]). Without a doubt, this has led to a lot of fraud and scam. But while this should be combatted, it is not necessarily a bad sign. It is further evidence that the accessibility aspect of being [[Trustless]] is real.

> [!note] Personal Opinion: Money x Technology
> I think the blockchain space is very unique in that the amount of money that flooded into it was radically more and earlier than other emerging technologies, and it fundamentally changed the behavior of the entire industry and the individuals in it. I once heard "The state of [[Web3]] is like the dot-com bubble, except if it had happened in 1980 when internet was still at its infancy". Perhaps this can explain why so much effort was spent on the above 3 verticals: Simply because there was money to be made in all of them, and people are attracted to short term gains.
> 
 I strongly believe that the blockchain space can be subject of future retroactive studies on behavioral economy and similar fields.  

And sadly, all the while, it was fully forgotten that there were other verticals of [[Web3]] other than the core "blockchain" that also deserve attention. And this is where we are, near the end of 2025: 
- The blockchain scalability has improved significantly. It is worth noting that this was not an effort in vein, and it is indeed useful for further experimentation, but evidently not enough.
- [[DeFi]] is still the thriving product of this multi-trillion dollar economy
- But not enough attention was given to adjacent technologies that allows [[Web3]] to manifest. That being said, I believe this is starting to regain attention just now.
## [[Web3]] Beyond DeFi
What are then the adjacent technologies that are needed to build more [[Web3]] products? This, plus what products to build with them, is, **the billion dollar question**. Some of these technologies that are within my imagination, and work has already been done on them, are as follows. 
### Storage 
The blockchain storage (the [[State]]) is only ever useful to store sensitive information on top of which we want to come to a hard consensus. Blockchain [[State]] is not suitable for storing large blobs, Web pages, multimedia files, and less sensitive information.

Moreover, anything stored on a blockchain [[State]] for just one block (as in, uploaded and immediately deleted in the next block) is a permanent overhead, as the entire history of the blockchain is auditable (as a part of being [[Trustless]]) and all intermediate states need to be reconstructed. Often times we want some data to be uploaded, we want it to be available, and perhaps we want to have consensus over *what* it is right now (via a simple hash) but we don't care as much about the entire history of it.

Ideally, we wish to have a storage primitive that allows larger data to be stored cheaply, with the existence to have guarantees but without all the bells and whistles of a [[Trustless]] blockchain [[State]]. This can be then be used next to the main blockchain [[State]] where the sensitive bookkeeping is done [[Onchain and Offchain|onchain]] in the blockchain [[State]] and the rest resides in a secondary storage solution.

Links: 
1. IPFS + Filecoin
2. SUI Walrus
3. Ethereum Flow
### Messaging 
Another primitive that is entirely missing in [[Web3]], and is always a subject of criticism in Web2 is messaging. As it stands now, peer-to-peer communication protocols are ever more rare[^5], and any form of messaging over the internet goes through centralized servers, often leading to [[Trust#Human-based Trust]] and not being [[Trustless]].

Peer-to-peer communication in theory doesn't need a huge amount of new innovation. There already exists many protocols that enable this, such as WebRTC. What is missing in them is:
- A [[Trustless]] mean to establish connections
- A [[Trustless]] place to store historical data such as chat history, which can be a combination of
	- The blockchain [[State]] for the sensitive information
	- Client side storage
	- Encrypted backups in a new [[#Storage]] solution as discussed above

Links: 
- Ethereum Whisper / Waku
- Lisk (legacy)
### Privacy 

### Identity And Personhood

## Anecdote 
Here's one example that I recently came across. This is a talk from 2014 from Gavin Wood, explaining a technology in Ethereum called Whisper, enabling secure and private [[#Messaging]] (and similar mechanism): 

<iframe width="560" height="315" src="https://www.youtube.com/embed/U_nPoBVLPiw?si=hD0oJuAVyOmOMkbJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This is from 9 years ago, highlighting literally in the first 2 minutes of the talk why blockchains are not enough (or needed) for some aspects of [[Trustless]] applications (or "Decentralized applications, as often called"). 

Here is another [talk](https://youtu.be/BWvThjrjTmw?si=xmGpUBSf2tN8g2bV&t=1012) from a few weeks ago, in which the same technologies was mentioned again:

![[Screenshot 2025-12-16 at 23.15.05.png]]

But if we look at the headlines of Ethereum or [[Web3]] in the timeline between these two talks, much less has been said about Whisper[^4] than that of [[DeFi]]. This is just one anecdote to emphasize that these "sister-protocols to blockchain" (as elegantly said by Vitalik Buterin in the above talk) didn't receive their fair share of attention.

## Summary
In [[Blockchains Are Overrated#Summary Means To an End]], we argued that even within creating [[State Machine]]s, blockchain plays a small role in it. In this chapter, we zoomed out a step further and recognized that even the [[State Machine]] is simply another means to an end, and is not enough in themselves.

The goal is to create [[Trustless]] applications that can, at least in the digital world and the internet, remove the need to trust arbitrary intermediaries acting as [[Authority]], because 

> [..absolute power corrupts absolutely](https://www.acton.org/research/lord-acton-quote-archive).

If we accept that [[DeFi]] is the only product that we can build with [[Web3]], thinking about the above is a waste of time. But if you think [[Web3]] can go beyond this and have a larger impact on the world, solving the above is among the most important frontier issues of [[Web3]] (among the [[Oracle Problem]], retaining access to [[The Free Internet]] and more).

[^1]: Most of my resources for this interpretation are old Ethereum talks from Vitalik Buterin and Gavin Wood.
[^2]: Product market fit, as in, people are actually interested in it today.
[^3]: Modulo the the lack of privacy, but as noted, this could also be solved with some added [[Moon Math - ZK, FHE and MPC|cryptography]]
[^4]: Whisper is now [Waku](https://docs.waku.org/)
[^5]: Skype was [peer-to-peer](https://en.wikipedia.org/wiki/Skype) at first, but it eventually moved to a client-server architecture. The name is actually derived from the combination of "sky" and "peer-to-peer".
