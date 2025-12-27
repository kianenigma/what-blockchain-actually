A collection a of [[Transaction]]s and a [[Block Header]], bundled together to be processed by the blockchain.

The summary of a block is as follows, in which: 
- [[State Root]] is a [[Commitment Hash]] to the [[State]] of the blockchain all the way from [[Genesis]] block up to block N.
- parent hash is linking this block to the previous one.
- Block body is a list of [[Transaction]]s. 

```mermaid
graph TB

    subgraph Block["Block #N"]
        direction TB
        subgraph Header["Block Header"]
            direction TB
            BlockHash["Block Hash<br/>0x7f9a...3e2d"]
            ParentHash["Parent Hash<br/>0x4b8c...91f6"]
            StateRoot["State Root Hash<br/>0xa1d5...7c4b"]
        end

        Header --> Body

        subgraph Body["Block Body"]
            direction LR
            Tx1["Transaction 1<br/>Alice → Bob: 2.5 ETH"]
            Tx2["Transaction 2<br/>Carol → Dave: 1.0 ETH"]
            Tx3["Transaction 3<br/>Eve → Frank: 0.75 ETH"]
            TxN["... more transactions"]
        end
    end
    
    PrevBlock["Previous Block<br/>#N-1"]

    ParentHash -.->|links to| PrevBlock
```
