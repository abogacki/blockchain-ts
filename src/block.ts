import SHA256 from "crypto-js/sha256";
import Transaction from "src/transaction";

class Block {
  timestamp: number;
  transactions: Array<Transaction>;
  previousHash: string;
  hash: string;
  nonce: number;

  constructor(
    timestamp: number,
    transactions: Array<Transaction>,
    previousHash: string = ""
  ) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mine(difficulty: number) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("BLOCK MINED: " + this.hash);
  }
}

export default Block;
