User provided inputs to the blockchain that instruct what the [[State Transition Function]] should do.

This keyword borrowed from the database industry. A more general form of it is **Signed Extrinsic Data**, borrowed from the [Polkadot](https://polkadot.com) jargon.

The keyword **transaction** is very popular, yet it is mostly used when a user signs some information, sends it to the block authors to be included in a future block (see [[Blockchain Networks#Journey of a User Transaction]]). This jargon is enough for simpler blockchains that only allow this one type of transactions in their [[STF]]. Yet, it is insufficient to describe:
- What if the input was *not* signed by a user? This is mainly why Polkadot chose the broader term *Extrinsic* as opposed to *Transaction*.
