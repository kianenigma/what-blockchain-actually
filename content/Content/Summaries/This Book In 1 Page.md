
## Blockchains
Blockchains are overrated. In literal terms, they are just a data structure. If combined with other technologies, they can together provide a [[Trustless]] [[State Machine]]. This final system can be [[Blockchain Models|modeled]] as a global computer:
- In which the `code` of that computer dictates the rules $\rightarrow$ *what* that blockchain system is (also called the [[STF]])
- Inputs are given to the `code` when it executes $\rightarrow$ [[Block]]s, containing user [[Transaction]]s.
- The execution of this `code` alters the memory of the computer $\rightarrow$ the blockchain [[State]], the main piece of information on which the system forms a consensus, and is the main purpose of blockchain systems.

What do we mean by [[Trustless]]? The system works not because well-intended [[Trust#Human-based Trust|humans]] whom we trust are in charge of it, but rather because the rules of [[Trust#Science-based Trust|science and technologies]] used within it say so, in the very same way that 2 plus 2 is always 4. [[Trustless]] describes a fuzzy set of properties; in some contexts, it is called "decentralized." But in this book, we have settled on the word "Trustless," meaning it eliminates the need to trust humans. The main properties that we have focused on are:
- Verifiably correct execution
- Auditability of a canonical history
- Accessibility to everyone in the world
## Money All the Way
Blockchains have so far been tremendously successful in a vertical that revolves around finance:
- Tokenization of value, with trillions of dollars of market capitalization
- Exchange, borrowing, and lending of these tokens (primarily called [[DeFi]])
- Gambling and other forms of monetary games
	- With prediction markets being a notable subset, which is essentially betting on future outcomes of events.

We then speculated that this limited success has been understandable in retrospect and can be attributed to a few factors:
- Monetary applications don't suffer from the lack of scaling as much as non-monetary ones and can attract users even if transaction fees are relatively expensive.
- Monetary applications offer the opportunity to make money, which attracts a lot of people.
## Forgotten Goal
And most importantly, it was all the while overlooked that blockchains were never the goal but rather a means to an end. The goal was to build digital systems and internet applications that benefit[^2] their users by being [[Trustless]]. This new envisioned web was called [[Web3]]. As it stands, it seems like the blockchain industry has ever more forgotten about this original goal, and instead sees the blockchain [[State Machine]] and its properties as the goal itself. In this unambitious view, we would be satisfied with [[DeFi]] being the ultimate product of blockchains and changing the wheels of the *existing* financial system (as opposed to replacing it) is enough.
## The Future
> The most reliable way to predict the future is to create it.

To finish on a brighter note, let's remember that within the chapters of this book so far, we have learned many of the tools necessary to reverse this trend:
- We have learned what blockchains do, and while doing so we have emphasized greatly that a blockchain system is only meaningful when it is fully [[Trustless]].
- By learning exactly what blockchains do, we can start looking into the world around us, in our day-to-day daily online and real-life interactions, and find other areas where a system with the above description can be useful.
- We have learned what other technologies are needed alongside blockchains to materialize the full [[Web3]] potential.

[^1]: In some sense, betting on the future.
[^2]: Or if we dare say, "liberate humans by being [[Trustless]]"
