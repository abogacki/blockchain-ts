import moment from "moment";
import Blockchain from "src/blockchain";
import Transaction from "./transaction";

const blockchain = new Blockchain();

const data = [
  {
    transactions: [
      new Transaction("user1", "user2", 500),
      new Transaction("user2", "user3", 250),
    ],
  },
  {
    transactions: [
      new Transaction("user2", "user4", 500),
      new Transaction("user1", "user3", 250),
    ],
  },
];

data.forEach(({ transactions }) => {
  transactions.forEach((transaction) =>
    blockchain.createTransaction(transaction)
  );
});

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
