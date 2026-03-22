A subset of the [[Consensus Algorithm]] that dictates when a work done by a blockchain can be considered **irreversible**.

Initial blockchains like Bitcoin have no finality mechanism, and by convention, people assume that once a transaction is $x$ blocks deep in the canonical chain, it can be considered final. This is called "probabilistic finality".

Many modern blockchains deploy a separate finality mechanism, which forces validators to vote and sign-off on blocks, and once enough subset of validators have voted, a block is considered final.

Finality has a number of useful use-cases: 
- When two blockchains send messages to one another (see [[Bridges and Cross Chain Messaging]]), assuming they trust each other's [[Consensus Algorithm]] and finality, they can consider the message as "sent and not reversible", and act upon it.
- Centralized exchanges can use it to settle user deposits. 

> [!note]- Note on Centralized Exchanges Ignoring Finality
> An ironic note is that many blockchains have invested a lot of research and development into implementing strong and fast finality measures, yet no centralized exchanges that I know of uses it. Instead, even for blockchains with [[Finality]] mechanisms, they rely on "6 blocks confirmation" model from Bitcoin-style blockchains with probabilistic finality.  
