import SHA256 from "crypto-js/sha256";

class Block {
  timestamp: number;
  data: unknown;
  previousHash: string;
  hash: string;
  //  transactions: [];
  //  proof: unknown;

  constructor(timestamp: number, data: unknown, previousHash: string = "") {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    // this.transactions = transactions;
    // this.proof = proof;
    // this.previousHash = previousHash;
  }

  calculateHash() {
    return SHA256(
      this.previousHash + this.timestamp + JSON.stringify(this.data)
    ).toString();
  }
}

export default Block;
