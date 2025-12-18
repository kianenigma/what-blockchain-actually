User provided inputs to the blockchain that instruct what the state-transition-function should do. 

This keyword borrowed from the database industry, or **Extrinsic Data**, borrowed from the [Polkadot](https://polkadot.com) jargon.

The keyword **transaction** is very popular, yet it is mostly used when a user signs some information and inputs it to the blockchain. This jargon is enough for simpler blockchains that only allow this one type of transition in their STF. Yet, it is insufficient to describe: 
- What if the input was *not* signed by a user? This is mainly why Polkadot chose the broader term *Extrinsic Data* as opposed to *Transaction*. 
	- An example of this is extrinsics that are placed in the block by the block author, but they are not signed in the same fashion as rest of the external transactions.
- What if transition happened as an *automatic* mutation, and not as a consequence of any external data? This is why Transition or Mutation are more general terms. 