const express = require("express");
const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require('ethereum-cryptography/utils');
const {keccak256} = require("ethereum-cryptography/keccak");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "bce019cd1f1c383d0ede5ea7cc6d69cd10c5e3f9": 100,
  "6510b36b837e8f08b00ccd820f82931e8f1545f6": 50,
  "8f40ba8b246f5eaa7b6548cab64d4f345a548002": 75,
};

const addressPrivate = {
  "bce019cd1f1c383d0ede5ea7cc6d69cd10c5e3f9": "c9e0022b70e5eca2f8718a9c165855005515c938da4596eabe6dcd1d339e5d1a",
  "6510b36b837e8f08b00ccd820f82931e8f1545f6": "6743e223d05958d0a198aca2349b424ff2828a46f78d617af1802a914fd8332c",
  "8f40ba8b246f5eaa7b6548cab64d4f345a548002": "a14c949f8b57b1068e03d1e1f0f66f5fb6905b3bd148ac18370cbe67d497f55f",
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  console.log(address)
  const privateKey = addressPrivate[address];
  res.send({ balance, privateKey });
});

app.post("/send", (req, res) => {

  try{
    const { sender, amount, recipient, signature, rec_bit, messageHash} = req.body;

    setInitialBalance(sender);
    setInitialBalance(recipient);
    console.log(messageHash)
    console.log(signature)
    console.log(rec_bit)
    let publicKey = secp.recoverPublicKey(messageHash, signature, rec_bit);
    let wFirst = publicKey.slice(1,);
    const hashKey = keccak256(wFirst);
    let address = toHex(hashKey.slice(hashKey.length-20, ));
  
  
  
    if(address != sender){
      res.status(400).send({message: "Verification failed!"});
    }
    else if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } 
    else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }catch(err){
    console.log(err)
  }

});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
