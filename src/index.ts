import moment from "moment";
import Blockchain from "src/blockchain";
import Transaction from "./transaction";

const blockchain = new Blockchain();

blockchain.createTransaction(new Transaction("user2", "user3", 100));
blockchain.createTransaction(new Transaction("user1", "user3", 50));
blockchain.createTransaction(new Transaction("user3", "user2", 100));

console.log("Starting the miner...");
blockchain.minePendingTransactions("andrzej");

console.log(
  "Balance of andrzej address",
  blockchain.getBalanceOfAddress("andrzej")
);

console.log("Starting the miner again...");
blockchain.minePendingTransactions("andrzej");

console.log(
  "Balance of andrzej address",
  blockchain.getBalanceOfAddress("andrzej")
);

console.log(JSON.stringify({ blockchain }, null, 4));

console.log("Blockchain valid? " + blockchain.isChainValid());
