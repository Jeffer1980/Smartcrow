import Image from 'next/image'
import { Inter } from 'next/font/google'
//import ethers from ethers
import { useState } from 'react';
import { useRouter } from 'next/router';


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

const checkseller = async() => {
	
	var APN = '290-15-153';
	
	if (typeof window.ethereum !== 'undefined') {
		console.log('MetaMask is installed!');
		
	}
	console.log('Metamask enabled');
	const accounts = await window.ethereum.send(
    "eth_requestAccounts"
  )
  //console.log('accounts', accounts.result[0]);
  const address = accounts.result[0];
  provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(address);
  //console.log(signer);
  //var blockNumber = await provider.getBlockNumber();
  //console.log('Block number = '+ blockNumber);
  MyContract = new ethers.Contract(NFTcontract, myabi, provider);
  //console.log(MyContract);
  MyContractwSigner = await MyContract.connect(signer);
	var result = await MyContract.getBonusseller(APN);
	//document.getElementById("myresponse").value=result;
  console.log(result);
}

const formatLongString = (str) => {
	if (str.length > 6) {
	  return str.slice(0, 3) + '...' + str.slice(-3);
	}
	return str;
  };



const HomePage = () => {
	
	const [isLoggedin, setLoggedin] = useState(false);
	const [APN, setAPN] = useState("APN number");
  	const [buttonText, setButtonText] = useState("Connect Wallet");
	const [APNaddress, setAPNAddress] = useState("Address to be checked");
	const [APNaddresscheck, setAPNAddresscheck] = useState("");

	const router = useRouter();

	  const login = async () => {
		console.log('trying login function');
		
		
		try {
		  const accounts = await window.ethereum.send(
			"eth_requestAccounts"
		  )
		  //console.log('accounts', accounts.result[0]);
		  const address = accounts.result[0];
		  provider = new ethers.providers.Web3Provider(window.ethereum);
		  //var blockNumber = await provider.getBlockNumber();
		  //console.log('Block number = '+ blockNumber);
		  MyContract = new ethers.Contract(NFTcontract, myabi, provider);
		  //buttontext = address;
		  setButtonText(formatLongString(address));
		}
		catch (error) {
			alert('Please Install Metamask Wallet')
			return;
		}
	}
	
	const checkaddress = async()=>{
		var myAPN = document.getElementById("myAPNInput").value; 
		setAPN(myAPN);
		var finalurl=zillowurladdress+myAPN;
		console.log(finalurl);
		var result = await axios.get(finalurl);
		console.log(result);
		var resultdate2 = await result['data']['bundle'][0]['parcels'][0]['full'];
		console.log(resultdate2);
		
		setAPNAddress(resultdate2);
		console.log(APNaddress);
		const myText = document.getElementById("addresscheck");
		myText.value = resultdate2;
		
	} 

	const copyToClipboard = async () => {
	  // Logic to copy value to clipboard
	  //const valueToCopy = "Hello, clipboard!";
	  //navigator.clipboard.writeText(valueToCopy);
	  let clipboardresult = await navigator.clipboard.readText();
	  setAPN(clipboardresult);
	  const myInput = document.getElementById("myAPNInput");
	  console.log(APN);
	  myInput.value=APN;
	  
	};

	const handleExistingContract = () => {
		const data = document.getElementById("myAPNInput").value;
		const data2 = document.getElementById("addresscheck").value;
		if (data=='Paste clipboard value here...'){
			return 1;
		}
		else {router.push(`/existingContract?SelAPN=${data}&Address=${data2}`);}
	};

	const handleNewContract = () => {
		const data = document.getElementById("myAPNInput").value;
		const data2 = document.getElementById("addresscheck").value;
		if (data=='Paste clipboard value here...'){
			return 1;
		}
		else {router.push(`/newContract?SelAPN=${data}&Address=${data2}`);}
	};
  
	return (
	  <div className="bg-blue-700 min-h-screen">
		<header className="flex items-center justify-between px-8 py-4">
		  <h1 className="text-white text-xl font-bold">SmartCrow</h1>
		  <button className="bg-white text-blue-500 font-semibold px-4 py-2 rounded" onClick={login}>
		  	{buttonText}
		  </button>
		</header>
		<main className="flex flex-col items-center justify-center py-16">
		  <section className="text-white text-center mb-8">
			
			<h1 className="text-white text-xl font-bold">Please enter your APN</h1>
		  </section>
		  <section className="flex items-center mb-8">
			<input
			  type="text"
			  id="myAPNInput"
			  className="w-60 bg-white rounded px-4 py-2 focus:outline-none m-2"
			  placeholder="Paste APN here..."
			/>
			<button
			  className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full m-2"
			  onClick={copyToClipboard}>
			  <img src="/assets/images/paste.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
			</section>
			<section className="flex items-center mb-8">
			<button
			  className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-full"
			  onClick={checkaddress}
			>
			  Check Address
			</button>
		  </section>
		  <section className="flex items-center mb-6">
		  	<textarea id="addresscheck" className="resize-none sm:w-96 h-15 px-4 py-4 text-white bg-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"></textarea>
		  </section>
		  <section className="flex justify-center">
		  	<div className="w-full sm:w-1/2 text-center mr-10">
    			<button class="bg-white hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4" onClick={handleNewContract}>
					<img src="/assets/images/newfile.png" alt="New File Image" className="h-12 w-12" />
    			</button>
    			<p className="text-white">New Contract</p>
  			</div>
  			<div className="w-full sm:w-1/2 text-center">
    			<button className="bg-white hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4" onClick={handleExistingContract}>
					<img src="/assets/images/existingfile.png" alt="Existing File Image" className="h-12 w-12" />
    			</button>
    			<p className="text-white">Existing Contract</p>
  			</div>
		  </section>
		</main>
	  </div>
	);
  };
  
  export default HomePage;

  

