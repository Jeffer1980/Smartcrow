import { useState } from 'react';

const NFTcontract="0x006c4237E2233fc5b3793aD9E200076C9Cf99a0E";
const zillowurl='https://api.bridgedataoutput.com/api/v2/pub/transactions?access_token=d555ec24e3f182c86561b09d0a85c3dc&limit=1&sortBy=recordingDate&order=desc&fields=recordingDate,parcels.apn,parcels.full&documentType=grant&recordingDate.gt=2015-01-01&parcels.apn=';
const zillowurladdress='https://api.bridgedataoutput.com/api/v2/pub/transactions?access_token=d555ec24e3f182c86561b09d0a85c3dc&limit=1&sortBy=recordingDate&order=desc&fields=recordingDate,parcels.apn,parcels.full&parcels.apn=';
const myabi=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_realtor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_sellbydays",
				"type": "uint256"
			}
		],
		"name": "createBonus",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_realtor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_startdate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sellbydays",
				"type": "uint256"
			}
		],
		"name": "createBonusTest",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "parcelid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lastrecordedDate",
				"type": "uint256"
			}
		],
		"name": "realtorwithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "parcelid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lastrecordedDate",
				"type": "uint256"
			}
		],
		"name": "sellerwithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonusActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonusamount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonusrealtor",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonussellbydate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonusseller",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonusstartdate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastapn",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastrequestid",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastselldate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "parcelbonus",
		"outputs": [
			{
				"internalType": "string",
				"name": "parcelid",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "realtor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startdate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sellbydate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "parcellastselldate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "url",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "urlresult",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const {ethers} = require('ethers');
const axios = require('axios');
var provider;
var MyContract;
var MyContractwSigner;

const createbonusfunc = async () => {
	var APN = document.getElementById("parcelid").value;
	var Amount = document.getElementById("bonusamount").value;
	var Realtor = document.getElementById("receiverwallet").value;
	var Sellby = new Date(document.getElementById("sellbydate").value);

	var Selltimestamp = Math.floor(Sellby.getTime()/1000);
	
	console.log('Sellby = '+Selltimestamp);
	
	if (typeof window.ethereum !== 'undefined') {
		console.log('Metamask is installed!');
		
	}
	var myprovider = window.ethereum;
	
	const accounts = await window.ethereum.send(
        "eth_requestAccounts"
      )
      
      const address = accounts.result[0];
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(address);

      MyContract = new ethers.Contract(NFTcontract, myabi, provider);

      MyContractwSigner = await MyContract.connect(signer);
	MyContractwSigner.createBonus(APN,Realtor,Selltimestamp,{value: ethers.utils.parseEther(Amount)}).then(receipt => {
					console.log(receipt);
					
				}).catch(err => {
					console.error(err);
					
				});
}

const MyForm = () => {
    const today = new Date().toISOString().substr(0, 10); // Get today's date in yyyy-mm-dd format
  
    return (
      <div className="bg-blue-500 min-h-screen">
        <nav className="flex justify-between items-center bg-gray-900 p-4">
          <h1 className="text-white font-bold text-lg">Smartcrow</h1>
          <button className="bg-blue-700 text-white px-4 py-2 rounded">Connect Wallet</button>
        </nav>
        <div className="container mx-auto p-6">
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded">
              <label htmlFor="text-input" className="font-bold">
                APN
              </label>
              <input
                type="text"
                id="parcelid"
                className="border-gray-300 border rounded w-full py-2 px-3 mt-1"
              />
            </div>
            <div className="bg-white p-6 rounded">
              
              <textarea
                id="textarea"
                className="border-gray-300 border rounded w-full py-2 px-3 mt-1"
                rows={3}
              />
            </div>
            <div className="bg-white p-6 rounded">
              <label htmlFor="number-input" className="font-bold">
                Amount (ETH)
              </label>
              <input
                type="number"
                id="bonusamount"
                className="border-gray-300 border rounded w-full py-2 px-3 mt-1"
              />
            </div>
            <div className="bg-white p-6 rounded">
              <label htmlFor="date-input" className="font-bold">
                Start Date
              </label>
              <input
                type="date"
                id="startdate"
                className="border-gray-300 border rounded w-full py-2 px-3 mt-1"
                defaultValue={today}
              />
            </div>
            <div className="bg-white p-6 rounded">
              <label htmlFor="date-input2" className="font-bold">
                Sell By
              </label>
              <input
                type="date"
                id="sellbydate"
                className="border-gray-300 border rounded w-full py-2 px-3 mt-1"
              />
            </div>
            <div className="bg-white p-6 rounded">
              <label htmlFor="text-input2" className="font-bold">
                Sender Wallet
              </label>
              <input
                type="text"
                id="senderwallet"
                className="border-gray-300 border rounded w-full py-2 px-3 mt-1"
              />
            </div>
            <div className="bg-white p-6 rounded">
              <label htmlFor="text-input3" className="font-bold">
                Receiver Wallet
              </label>
              <input
                type="text"
                id="receiverwallet"
                className="border-gray-300 border rounded w-full py-2 px-3 mt-1"
              />
            </div>
            <div className="bg-white p-6 rounded">
                <button className="bg-white text-blue-500 font-semibold px-4 py-2 rounded" onClick={createbonusfunc}>
		  	        Create Bonus
		        </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MyForm;