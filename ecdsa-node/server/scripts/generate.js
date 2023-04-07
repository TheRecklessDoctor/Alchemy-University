const secp = require("ethereum-cryptography/secp256k1");
const utils= require("ethereum-cryptography/utils");
const {keccak256} = require("ethereum-cryptography/keccak")

const privateKey = secp.utils.randomPrivateKey();

console.log('Private key: ', utils.toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
const publicKeyHex = utils.toHex(publicKey)
console.log('Public key: ', publicKeyHex );

function generateAddress(publicKey){
    const wFirst = publicKey.slice(1,);
    const hash = keccak256(wFirst);
    return hash.slice(hash.length-20,);
}

const addressHex = utils.toHex(generateAddress(publicKey))

console.log('Address: ', addressHex);