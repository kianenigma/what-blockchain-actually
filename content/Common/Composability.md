Composability is a general term in software engineering, and the analog of it in blockchains can be seen as: The ability for individual units of the system to interact with one another.

The two most common forms of this are:
- **Cross-[[Smart Contract|contract]] composability**: The ability for two contracts to call into each other's code while being executed.
	- Example: Imagine a smart contract that is a [[DEX]] to be able to read the price of an asset from another "price oracle" smart contract. Or, the the [[DEX]] contract to update the price in a price oracle.
	- Within a single smart contract chain, these interactions are often called **synchronous**, as they happen immediately.
- **Cross-chain composability**: The ability for two independent blockchains (either an L1 or L2 -- see [[The Layers Terminology]]) to interact with one another, such as [[Bridges And Cross-Chain Messaging]].
	- Imagine the Ethereum blockchain sending a message to Solana to inform it that some tokens should be moved to Solana.
	- Across different blockchains, these interactions are often called **asynchronous**, as a message is sent and no immediate feedback is given to the sender. It is "fire and forget".



