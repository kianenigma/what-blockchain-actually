---
description: Trusted execution environments, and their overlap with blockchains.
draft: false
permalink: appendix/tee
---

TEE stands for **T**rusted **E**xecution **E**nvironment and is a relatively new technology being used in many applications[^1], and has also seen a lot of interest in the Blockchain and Web3 ecosystem.

Before getting started, TEEs are particularly interesting in Blockchains because if they work as intended, and we turn a (momentary) blind eye to some of their shortcomings, they are essentially capable of doing:
- Verifiably correct computation on some data, no matter who owns the hardware and where it is. This is the main pillar of [[Trustless]] applications, and renders one of the main reasons why [[Proof of Work and Proof of Stake]] networks are deployed to achieve [[Economic Security]] obsolete.
- Not only can it perform computation on data verifiably correct, but it can also do so privately. This then renders all of the fancy cryptography primitives in [[Moon Math - ZKP, FHE and MPC]] obsolete.

All of that is not to say we should ditch Blockchain technology and cryptography, as there are shortcomings about TEEs that we will soon learn about. But, it is to say that when properly understood, under certain circumstances, TEEs can be very powerful.

## Definition
More formally, TEEs can be any set of technologies that provide:
- **Data confidentiality**: That once data is loaded in the TEE, it cannot be seen by any unauthorized person. This data can itself be a higher level code (e.g. an AI agent), so we can also achieve some form of **code confidentiality**.
- Data integrity: Once data is loaded in the TEE, it cannot be altered by any unauthorized person.
- Code integrity: Once code is loaded in the TEE, it cannot be altered by any unauthorized person.
- Attestations: (in some cases) The TEE can provide attestations about its operation, which can be verified against the hardware manufacturer.

There are 3 main TEE technologies out there:
- Intel SGX, the most common one and where the word enclave is coming from.
- ARM TrustZone
- Risc-V Keystone

Finally, TEEs can be achieved either through hardware isolation, which is more secure, or through software virtualization.
## Mental Model
TEEs can be best seen as a small black box inside of your CPU, such that the operating system, rest of the processes running on the CPU, and the system administrator (the human having physical access to the machine) all cannot see what is happening inside of it. This black box is often called an **Enclave**. As long as we trust the hardware manufacturer that the enclave, at the hardware level, is doing the right thing, we can be sure that:
- The code that the enclave is running is executed correctly.
- The data and code that is given to this black box, the moment it enters the box, becomes **private**.

You can imagine[^2] that the enclave has a private key inside of it, which, similar to the secret seed of a hardware wallet, never leaves the enclave. The corresponding public key is known and published by the hardware manufacturer. This private key can be used for:
- Encrypt the data and the code that the enclave is meant to execute with the public key, being sure that it can only be decrypted inside the enclave.
- Signs attestations using the private key of the enclave, proving that the right type of enclave was used to execute the code.

## Replacing Everything
This should explain why TEEs, if we take them at face value and ignore the [[#Risks]], can pretty much replace everything that blockchains do in the direction of verifiable and private computation. Recall our example from [[Execution, Ordering and History#Counter Example Running Open Source Code]]. We argued that simply running an open-source code is not enough, because I cannot have any guarantee that someone else will run the correct code on their hardware, and pass the right data to it. Well, it turns out that with TEEs, we can actually do that.

In the example above, one could simply send the code and data to be computed to anyone in the world with a TEE-enabled hardware, have them execute that code, and use the attestation to be sure it was executed correctly. Moreover, if they want to make this interaction private, and only reveal a subset of the outcomes to the world and the person running the TEE-enabled hardware, we can do so.
## Risks
While TEEs so far sound amazing, they have at least two major risks. All of the [[Trustless]] guarantees we get from it are rooted in us trusting that the hardware manufacturers are:
- Not malicious
- Won't make any unintended mistakes that would compromise the system

Whether one wants to trust the former is a personal choice, and based on the risk profile of the application. But the latter is more interesting: I doubt if Intel has ever intended to be malicious and put any backdoors in the SGX technology, yet there have been many mistakes in the technology that have led to vulnerabilities. The latest edition of TEE vulnerabilities at the time of writing is [TEE.fail: Breaking Trusted Execution Environments via DDR5 Memory Bus Interposition](https://tee.fail/), but quick research will reveal more similar ones[^3].
## Recap: Execution, Ordering, History
While this chapter has intentionally hyped-up TEEs to their potential, other than highlighting the shortcomings as we just did, it is also worth emphasizing that TEEs can only replace the **Verifiable Execution** part of [[Trustless]] systems (and optionally making them private, one of the [[The Bigger Picture#Privacy|main issues]] with existing systems) not all of them. A [[Trustless]] application, other than being able to do Verifiable Execution, must also:
- Establish the correct ordering of events, even if they are correct.
- Provide a means to verify the entire history of previous events.
- Optionally, if the [[Consensus Algorithm]] of the chain demands, provide a notion of [[Finality]].

Blockchain systems have a solution to all of these requirements, while TEEs can only do verifiable execution, and make them private.
## Conclusion
To the best of my knowledge, no one is contesting that we should forget about blockchain systems as a whole and build [[Web3]] on the basis of TEEs. Ultimately, the [[Trustless]] properties we get from Blockchains and their [[Consensus Algorithm]] are far superior in terms of quality than TEEs, as they are not vulnerable to the same [[#Risks]]. In return though, it is harder to make blockchains private and scalable. TEEs fall somewhere in the middle of the [[Trust#Human-based Trust|human-based]] and [[Trust#Science-based Trust|science-based]] trust spectrum in terms of providing verifiability of computation.

The best use-case of TEEs that we see out there, and I personally agree with, is therefore not replacing the blockchain for its core computation capabilities, but rather to **enhance the offchain parts of it**. Recall that a blockchain's work can be divided into [[Onchain and Offchain]]. The onchain part should be utmost secure, and relying on TEEs for its correctness is a questionable decision. But blockchain nodes already do a lot of offchain operations as well, and at the moment there is zero guarantee over their correctness. TEEs are only an improvement towards these, and even if they get compromised, the main functions of the blockchain remain secure. The most relevant example of this is using TEEs for more fair and private block-building (the logic around the transaction queues).

Moreover, we have firmly concluded in [[The Bigger Picture]] that blockchain technology is likely not the only key piece of [[Web3]]. While TEEs are not a great fit to replace the blockchain technology, they are likely an important piece of the broader [[Web3]] vision and can be useful.

[^1]: For example, [Signal uses TEEs](https://signal.org/blog/secure-value-recovery/#:~:text=Signal%20uses%20the%20following%20techniques%20to%20limit,incorporate%20this%20recovery%20method%20into%20the%20application.), and many operating systems use TEE for keeping sensitive parts of biometric authentication private and secure.
[^2]: With some simplification here. The actual key structure is a bit different.
[^3]: Moreover, there have been rather catastrophic failures within the [[Polkadot]] ecosystem which I closely follow regarding TEEs. See [Intel SGX seems dead for blockchain applications - Tech Talk - Polkadot Forum](https://forum.polkadot.network/t/intel-sgx-seems-dead-for-blockchain-applications/15186) and [This is the End. Looking Back \| by Integritee Network \| Integritee Network \| Medium](https://medium.com/integritee/this-is-the-end-8fb08e9f6d94)
