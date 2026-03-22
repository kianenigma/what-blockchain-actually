We should generally see hashes as a **commitment** to some data. 

Imagine we have a huge table of data. If we hash all of this data together (in any format), this hash is essentially a fingerprint for the entire data.

![[Commitment Hash 2025-12-27-11.18.06.excalidraw]]

Now this commitment can be used to be shared across a network. Anyone who knows and trusts that the commitment hash is correct, and quickly verify if their copy of the data (possibly coming from an unknown source) is valid or not. They would simply re-hash the data and see if it matches the trusted and known hash. 

[[Block Header]] contains this very same system in the form of the [[State Root]], with one note that the hash is not computed arbitrarily, but as a [[Merkle Tree]] root.
