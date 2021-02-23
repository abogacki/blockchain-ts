import moment from "moment";
import Blockchain from "src/blockchain";
import Block from "./block";

const data = [
  {
    timestamp: moment().add("2", "days").toDate().getTime(),
    data: { transaction: "some-transaction", amount: 5 },
  },
  {
    timestamp: moment().add("3", "days").toDate().getTime(),
    data: { transaction: "next-transaction", amount: 30 },
  },
  {
    timestamp: moment().add("4", "days").toDate().getTime(),
    data: { transaction: "third-transaction", amount: 12.5 },
  },
];

const blockchain = new Blockchain(5);

data.forEach(({ timestamp, data }, index) => {
  console.log(`Mining block ${index}`);
  blockchain.addBlock(new Block(timestamp, data));
});

console.log(JSON.stringify({ blockchain }, null, 4));

console.log("Blockchain valid? " + blockchain.isChainValid());
