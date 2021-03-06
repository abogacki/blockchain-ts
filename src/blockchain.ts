import deepStrictEqual from "deep-equal";
import moment from "moment";
import Block from "src/block";
import Transaction from "src/transaction";

class Blockchain {
  chain: Array<Block>;
  difficulty: number;
  pendingTransactions: Array<Transaction>;
  miningReward: number;

  constructor(difficulty: number = 3) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock(): Block {
    const genesisBlockData: Array<Transaction> = [];
    const initialTimestamp = moment("22-10-2011", "DD-MM-YYYY")
      .toDate()
      .getTime();
    return new Block(initialTimestamp, genesisBlockData, "0");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress: string) {
    const block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.chain[this.chain.length - 1].hash
    );
    block.mine(this.difficulty);

    console.log("Block successfuly mined!");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  createTransaction(transaction: Transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address: string) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const firstBlock = this.chain[0];
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        throw new Error(
          "Current block's hash propery not equal to result of calculateHash"
        );
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        throw new Error(
          "Current block's previous hash not equal to previous block's hash"
        );
      }

      const isGenesisBlockValid = deepStrictEqual(
        firstBlock,
        this.createGenesisBlock()
      );

      if (!isGenesisBlockValid) {
        throw new Error("First block not equal to genesis block");
      }

      return true;
    }
  }
}

export default Blockchain;
