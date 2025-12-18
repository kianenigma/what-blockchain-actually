We should generally see hashes as a **commitment** to some data. Imagine we have a huge table of data. If we hash all of this data together (in any format), this hash is essentially a fingerprint for the entire data. 

Now this commitment can be used to be shared across a network. Anyone who knows and trusts that the commitment hash is correct, and quickly verify if their copy of the data (possibly coming from an unknown source) is valid or not.

[[Block Header]] contains this very same system, except it uses a [[]]