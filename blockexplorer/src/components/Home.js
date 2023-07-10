import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import React from 'react';


const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };


  // In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);


function Home()
{
    const [blockNumber, setBlockNumber] = useState();
    const [blockDetails, setBlockDetails] = useState();
    const [blockTransactions, setBlockTransactions] = useState([]);
  
    useEffect(() => {
  
      async function getBlockNumber() {
        setBlockNumber(await alchemy.core.getBlockNumber());
      }
      getBlockNumber();
  
    }, []);
  
    useEffect(() => {
      async function getBlockDetails(){
        try{
          const data = await alchemy.core.getBlockWithTransactions(blockNumber);
          console.log(data);
          setBlockDetails(data);
          setBlockTransactions(data["transactions"]);
  
        }catch(error){
          setBlockDetails([]);
          setBlockTransactions([]);
        }
      }
  
      getBlockDetails();
  
      // console.log(blockTransactions);
    }, [blockNumber, setBlockDetails, setBlockTransactions, blockTransactions]);
  
  
    function getFee(transaction, decimals){
      const fee = transaction.gasLimit * transaction.gasPrice;
  
      if(fee.toString() === "NAN") return "0";
  
      return parseFloat(Utils.formatEther(fee.toString())).toFixed(decimals);
    }

    return(
        <div>
            <div className="BlockDetails">
                <div className='item'>Block Number: {blockNumber}</div>
                <div className='item'>Time stamp: {!blockDetails ? 'Loading' : blockDetails['timestamp']}</div> 
                <div className='item'>Miner: {!blockDetails ? 'Loading' : blockDetails['miner']}</div>
            </div>
            <div className="TableContainer">
                <table className='TransactionsList'>
                    <thead>
                        <tr key={0}>
                        <th >Transaction Hash</th>
                        <th >Value</th>
                        <th>Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blockTransactions.map((transaction, index) => {
                        return (
                            <tr key={index+1}>
                            <td>{transaction.hash.substring(0, 25)}</td>
                            <td>{parseFloat(transaction.value)}</td>
                            <td>{getFee(transaction, 5)}</td>
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;