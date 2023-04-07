import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";




function Transfer({ address, setBalance, privateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [hexMessage, setHex] = useState("");
  const [signature, setSig] = useState("");
  const [rec_bit, setRec] = useState(0);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function hashSign() {
    try{

      const message = {
        address,
        sendAmount,
        recipient,
        nonce: 0
      }

      let hashedMessage = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
      setHex(hashedMessage);

      const signature = await secp.sign(hashedMessage, privateKey, {recovered:true});
      const sig = toHex(signature[0]);

      setSig(sig);

      setRec(signature[1]);

    }catch(er){
      alert(er);
    }
  }




  async function transfer(evt) {
    evt.preventDefault();
    try {
      console.log(hexMessage);
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature,
        rec_bit: rec_bit,
        messageHash: hexMessage

      });
      setBalance(balance);
    } catch (ex) {
      console.log(ex);
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Sign transaction" onClick={hashSign}/>


      <input type="submit" className="button" value="Transfer"/>
    </form>
  );
}

export default Transfer;
