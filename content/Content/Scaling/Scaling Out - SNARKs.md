SNARK stands for **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. It is a branch of cryptography that allows proves of some computation to be generated, allowing another entity to verify its correctness. Once this is done without leaking any information about what that computation was, it is called **Z**ero-**K**nowledge, or ZK-SNARK. 

So, there are two properties to SNARKs that are interesting: 
- They can make the computation private, which we named earlier as one of the [[The Bigger Picture#Privacy]] issues of [[Web3]] products.
- They can make the proof of some computation Succinct, meaning that verifying the proof is much cheaper than actually doing the computation, although generating the proof itself can be very expensive.

The way that I like to think about is that, given a computation that takes $x$ seconds to execute on plain hardware:
- Generating the proof $p$ takes $100x$
- Verify $p$ takes only $x/100$, and $p$ can be made very small (why it is called **Succinct**)

> The ratio 100 in the above is not accurate and is merely a demonstration. A year or two ago, the cost of generating a SNARK proof for a standard computation like hashing was millions of times more expensive than actually doing the hashing. Similar to the general trend in hardware improvement, this computation is only getting efficient as time goes by. 

And this should explain how SNARKs are used as a scaling method. In this model, the work done by the L2s is not sent back to the L1 for *re-execution*. Instead, a proof of that work is sent, and since this proof is small enough to be re-executed, it does not impose a huge overhead on the L1 validator set.

Many [[Rollup]]s in Ethereum use this method[^1], and are often labeled as ZK-Rollups. But, ironically, most are not using the ZK aspect of it. This is another example of a naming glitch in [[Web3]] (similar to [[Blocks, Transactions, And Blockchain Systems#Blockchain Systems != Blockchain]]) where once an inaccurate word is used enough times, it is nearly impossible to undo it. For now, keep in mind that a ZK-Rollup is not necessarily private. 

A more general abstraction that we can use for such rollups is asymmetric rollups. Because we are imposing ever more work to the [[Sequencer]]s of L2, to offload work from the L1 [[Validator]], ergo asymmetric. Note that in this model, note only the L2 [[Sequencer]]s must do the work of producing blocks and executing user transactions, they also have to do the extremely compute heavy task of generating the proof of that execution.

[^1]: see https://l2beat.com/scaling/summary.
