---
description: 3 of the most prominent branches of new cryptography used in blockchains.
permalink: appendix/moon-math
---


This chapter gives a very high level overview of the three technologies that are often called "Moon Math" or "Programmable Cryptography". They have all advanced significantly in the last decade thanks to the [[Web3]] space's need for them.

## ZKP - Zero Knowledge Proofs
We are essentially discussing the same technology as in [[Scaling Out - SNARKs]] here. ZKPs allow for some computation to happen, and while being computed, a proof of it can also be generated. These proofs are expensive to compute, but verifying them is much cheaper. Moreover, this proof can optionally choose to not reveal much information about what it was computing upon to the future verifiers. The most intuitive example to understand this is proving that your age is more than 18, without revealing what the actual age is. The same technology can later be used to build a wide class of applications:
- Confidential voting
- Private token transfers[^1]
- Proving that the execution of L2 blocks was valid, as we learned in [[Scaling Out - SNARKs]]
### ZKPs for Privacy or Scaling
As noted before, ZKPs can be used either for scaling due to their asymmetric nature, or for privacy, due to their zero-knowledge nature. A good way to identify if ZKPs are being used for which property is to look for _who is computing the proof_. Because he who computes the proof will know all of the secrets about the computation.

In L2s that use ZKPs for scaling Ethereum, the proof generation often happens by either the [[Sequencer]] network or a prover network. You can then imagine that in this setup, none of the user transactions are actually made private, as the proof generation is happening by these external parties.

In contrast, some private applications that actually hide user information require ZKPs to be generated on the client side by the user. This is when ZKPs are actually being used for privacy.
### SNARKs and STARKs
There are two broad classes of ZKPs: SNARKs and STARKs. We have used the former in [[Scaling Out - SNARKs]], but they both have similar properties. To the best of my knowledge, STARKs have overall the same properties as SNARKs, except they are less asymmetrical (and therefore less desirable for scaling L2s):
- The proof generation takes less time.
- In return:
	- The proof is larger.
	- The proof verification takes more time.
But other than this, STARKs have better security properties, such as being quantum-resistant and not needing a trusted setup: a setup ceremony where many users contribute random inputs to the protocol to establish initial secrets. If this setup is compromised, the whole protocol is flawed irreversibly.
## FHE - Fully Homomorphic Encryption
While the name is not very intuitive, FHE is a set of primitives that allows someone to **perform computation on encrypted data**. Similar to [[#ZKP - Zero Knowledge Proofs]], computing FHEs is many orders of magnitude more expensive than doing the raw public computation.

An idealistic use case of FHEs could be AI inference; suppose I have a model and I want to allow you to use it without revealing the weights. In theory, FHE can be used such that you can use the model and compute your inference, but on an encrypted model and not the plaintext one.

## MPC - (Secure) Multi-Party Computation
Multi-party computation is in some sense a distributed analog of [[#FHE - Fully Homomorphic Encryption]], where instead of pure cryptography, the computation is done collaboratively by a group of MPC nodes. Each node only sees a subset of the data and performs their share of the computation without being able to reconstruct the whole data.

## Programmable Cryptography
Ultimately, the outcome of the 3 is also sometimes called (other than the fancy "moon math"): programmable cryptography. This is because we are seeing a similar trend as to what we saw in [[Evolution of Blockchain State Machines]] in these cryptographic primitives as well.

A decade ago, ZCash already managed to use the very same [[#ZKP - Zero Knowledge Proofs]] to create private token transfers on its blockchains. But neither the blockchain, not the cryptographic primitives were programmable. Today, ZK-VMs like Risc-0 allow you to write any applications, in modern languages like Rust, and generate a proof of it while it is being executed. Similarly, there are ZK-EVMs, that allow the execution of EVM byte-code while generating a proof for it.
## Examples
- [ZAMA Protocol](https://docs.zama.org/) uses all three of the above technologies in their protocol and is a great case study.
- [Ethproofs](https://ethproofs.org/): The race to prove all Ethereum L1 blocks within 12s (in real-time) with consumer GPUs.
- [AZTEC](https://aztec.network/network#role) uses ZKPs both for scaling an L2 and for making user interactions private.
- [NEAR uses MPC](https://docs.near.org/chain-abstraction/chain-signatures) for generating accounts for users on different chains and transacting on behalf of the users by having an MPC network collaboratively sign a transaction. In some sense, the MPC network will generate a deterministic private key for any NEAR account and can sign transactions with that private key, with none of the individual members of the MPC network knowing what it is.

[^1]: At a high level, you prove that you have enough tokens to make a transfer without revealing how much you have and to whom you are sending. This requires you to first convert your tokens into a shielded variant.
