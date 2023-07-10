const axios = require('axios');

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = "https://eth-goerli.g.alchemy.com/v2/QwoKZV3w_dynFinFyhXlgJNAn_F3uQGW";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_blockNumber",
  params: [
  ]
}).then((response) => {
  console.log(response.data.result);
});
