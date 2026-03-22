A collection a of [[Transaction]]s and a [[Block Header]], bundled together to be processed by the blockchain.

The summary of a block is as follows, in which: 
- [[State Root]] is a [[Commitment Hash]] to the [[State]] of the blockchain all the way from [[Genesis]] block up to block N.
- parent hash is linking this block to the previous one.
- Block body is a list of [[Transaction]]s. 

## Example Block Diagram

```mermaid
graph LR
	PrevBlock["Block #N-1"]
	PrevPrevBlock["Block #N-2"]
      subgraph Block["Block #N"]
          direction TB
          subgraph Header["Block Header"]
              direction TB
              BlockHash["Block Hash: 0x7f9a...3e2d"]
              StateRoot["State Root: 0xa1d5...7c4b"]
              ParentHash["Parent Hash: 0x4b8c...91f6"]
          end

          subgraph Body["Block Body"]
              direction TB
              Tx1["Tx 1: Alice → Bob 2.5 ETH"]
              Tx2["Tx 2: Carol → Dave 1.0 ETH"]
              Tx3["Tx 3: Eve → Frank 0.75 ETH"]
          end
      end

	
	  Block -->|Links to| PrevBlock -->|Links to| PrevPrevBlock
```
