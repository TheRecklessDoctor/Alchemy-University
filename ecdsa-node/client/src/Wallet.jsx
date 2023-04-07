import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import {keccak256} from "ethereum-cryptography/keccak";
import * as utils from "ethereum-cryptography/utils";
import { useState } from "react";




function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey}) {

  

  async function onChange(evt) {
    const address = evt.target.value;

    setAddress(address);
    if (address) {
      console.log(address)
      const {
        data: { balance, privateKey },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
      setPrivateKey(privateKey);
    } else {
      setBalance(0);
    }
  }


  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

{/* complete adding the public key and add an onchange for this*/}
      <label>
        Address
        <input placeholder="Type in your Address" value={address} onChange={onChange}></input>
      </label>



      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
