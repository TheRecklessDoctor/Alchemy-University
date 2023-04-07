const {sign} = require("ethereum-cryptography/secp256k1");
const {keccak256} = require("ethereum-cryptography/keccak")
const {utf8ToBytes} = require("ethereum-cryptography/utils")


function hashMessage(message){
    let bytes = utf8ToBytes(message);
    return keccak256(bytes);
}

function signMessage(message, privateKey){
    let hash = hashMessage(message);
    return sign(hash, privateKey, {recovered:true});
}

export {signMessage};