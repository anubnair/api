const express = require('express');
const { Web3 } = require('web3');
const fs = require('fs');

const app = express();

// Configure Web3 to connect to an Ethereum provider
const web3 = new Web3('https://rpc-mumbai.maticvigil.com');


// Define the ERC20 contract address and ABI
const tokenAddress = '0xf461ba7cfdFdEf7c3E887144CAcE8D944C4381A4'; // Replace with the ERC20 token contract address

// Define the API endpoint to get the token balance
app.get('/getbalance', async (req, res) => {
  const { address } = req.query; // Ethereum wallet address received from the request query parameter

  try {
     const contractJson = fs.readFileSync('./abi.json')
     const abi = JSON.parse(contractJson)

     const contract = new web3.eth.Contract(abi, tokenAddress)

     const balance = await contract.methods.balanceOf(address).call();

    res.json({ balance: balance.toString() }); 
  
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching balance' });
  }
});

// Start the server
const PORT = 3000; // Set your desired port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
