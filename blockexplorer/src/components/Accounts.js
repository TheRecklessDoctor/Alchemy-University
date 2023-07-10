import { Alchemy, Network} from 'alchemy-sdk';
import { useState } from 'react';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material'
import "./Accounts.css"

const { Utils } = require("alchemy-sdk");

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function Accounts()
{
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);

    async function handleSubmit(event)
    {
        event.preventDefault();
        console.log(address);
        const balance = await alchemy.core.getBalance(address, "latest");
        console.log(balance);
        setBalance(Utils.formatEther(balance));
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <FormLabel>Enter Address</FormLabel>
                <TextField value={address} onChange={(e)=>setAddress(e.target.value)}></TextField>
                <Button type="submit">Submit</Button>
            </form>

            <p>Balance for address:{address} is: {balance}.</p>
        </div>
    )

}

export default Accounts;