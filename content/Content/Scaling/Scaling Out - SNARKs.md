SNARK stands for **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. It is a branch of cryptography that allows proves of some computation to be generated, allowing another entity to verify its correctness. Once this is done without leaking any information about *what* that computation was, it is called **Z**ero-**K**nowledge, or ZK-SNARK. 

So, there are two properties to SNARKs that are interesting: 
- They can make the computation private, which we named earlier as one of the [[The Bigger Picture#Privacy]] issues of [[Web3]] products.
- They can make the proof of some computation ***Succinct***, meaning that verifying the proof is much cheaper than actually doing the computation, although generating the proof itself can be very expensive.

The way that I like to think about is that, given a computation that takes $x$ seconds to execute on plain hardware:
- Generating the proof $p$ takes $1000x$
- Verify $p$ takes only $x/1000$, and $p$ can be made very small (why it is called **Succinct**)

The ratios in the above is not accurate and is merely a demonstration. A year or two ago, the cost of generating a ZK-proof for a standard computation like hashing was millions of times more expensive than actually doing the hashing. Similar to the general trend in hardware improvement, this computation is only getting efficient as time goes by. and the ratio is less nowadays. 

> In another talk, I have named this approach asymmetric execution_: The prover side (L2) has to do a lot more work, for the sake of the verifier (L1) having a faster way to verify it.

And this should explain how SNARKs are used as a scaling method. In this model, the work done by the L2s is not sent back to the L1 for *re-execution*. Instead, a proof of that work is sent, and since this proof is small enough to be re-executed, it does not impose a huge overhead on the L1 validator set. This overhead is small enough that the L1 does not need to have any form of sharded execution, and even if all L1 validators, in the classic [[Introduction - Why Scaling Matters#Sequential Blockchains|sequential]] manner re-execute it, it is still sufficiently scalable.

> [!Warn]- Another Misnomer: ZK-Rollups
> 
> Many [[Rollup]]s in Ethereum use this method[^1], and are often labeled as ZK-Rollups. But, ironically, most are not using the zero-knowledge aspect of it. This is another example of a naming glitch in [[Web3]] (similar to [[Blocks, Transactions, And Blockchain Systems#Blockchain Systems != Blockchain]]) where once an inaccurate word is used enough times, it is nearly impossible to undo it. For now, keep in mind that a ZK-Rollup is not necessarily private.

[^1]: see https://l2beat.com/scaling/summary.
