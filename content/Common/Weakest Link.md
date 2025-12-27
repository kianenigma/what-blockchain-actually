The strength of any chain is only as strong as its weakest link.

While a useful term in the industries that work with an actual chain[^1], the analogy can also be expanded to composite (digital) systems with interdependent constituents.

```mermaid
graph LR
	classDef smallNode font-size:10px
	C0[Strong Link] --> C1[Weak Link] --> C2[Strong Link]

	C1:::smallNode
```

The argument then is that the overall [[Trustless]]-ness of a composite [[Authority]] is only as good as its weakest component. 

Few examples of this concept that we see in this book: 
- [[Oracle Problem]], especially when bridging real-world information to the blockchain.
- [[Scaling Out - Pure Multi-chain]], where an interconnected set of blockchains with different degrees of [[Economic Security]] exchanges value-bearing messages, and act upon them, not taking into account that the sending chain of a message might be compromised. 

[^1]: Originally appearing in "[Essays on the Intellectual Powers of Man](https://archive.org/details/essaysonintellec02reiduoft)".
