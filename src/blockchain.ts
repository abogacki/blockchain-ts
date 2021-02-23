import moment from "moment";
import shallowequal from "shallowequal";
import Block from "src/block";

class Blockchain {
  chain: Array<Block>;
  difficulty: number;

  constructor(difficulty: number = 3) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
  }

  createGenesisBlock(): Block {
    const genesisBlockData = "Genesis Block";
    const initialTimestamp = moment("22-10-2011", "DD-MM-YYYY")
      .toDate()
      .getTime();
    return new Block(initialTimestamp, genesisBlockData, "0");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mine(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const firstBlock = this.chain[0];
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        throw new Error("currentBlock.hash !== currentBlock.calculateHash()");
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        throw new Error("currentBlock.previousHash !== previousBlock.hash");
      }

      const isGenesisBlockValid = shallowequal(
        firstBlock,
        this.createGenesisBlock()
      );
      if (!isGenesisBlockValid) {
        throw new Error("firstBlock !== this.createGenesisBlock()");
      }

      return true;
    }
  }
}

export default Blockchain;
