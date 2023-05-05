const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const merkelTree = new MerkleTree(niceList);
  const name = "Dayan Perera";
  const index = niceList.findIndex(n => n===name);
  const proof = merkelTree.getProof(index);
  console.log(merkelTree.getRoot());

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof:proof,
    name:name
  });

  console.log({ gift });
}

main();