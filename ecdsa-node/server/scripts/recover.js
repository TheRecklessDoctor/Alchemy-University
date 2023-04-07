const {keccak256} = require("ethereum-cryptography/keccak");
const {utf8ToBytes} = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

function hashMessage(message){
    let bytes = utf8ToBytes(message);
    return keccak256(bytes);
}

async function recoverKey(message, signature, recoveryBit){
    let hash = hashMessage(message);
    return secp.recoverPublicKey(hash, signature, recoveryBit);
}