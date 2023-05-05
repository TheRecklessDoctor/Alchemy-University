const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require("../utils/MerkleTree");
const niceList = require('../utils/niceList.json');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
const merkelTree = new MerkleTree(niceList);
const root = merkelTree.getRoot();

// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = root;

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  // console.log(proof)
  const {proof, name} = req.body;

  // TODO: prove that a name is in the list 
  let isInTheList = false;
  console.log("proof")
  isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
