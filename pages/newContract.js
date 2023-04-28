import { useState } from 'react';
import { useRouter } from 'next/router';
import Popup from '@/components/popup';
import PopupSuccess from '@/components/popupsuccess';

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
	
	//console.log('Sellby = '+Selltimestamp);
	
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

const formatLongString = (str) => {
	if (str.length > 6) {
	  return str.slice(0, 3) + '...' + str.slice(-3);
	}
	return str;
  };

const MyForm = () => {
    const today = new Date().toISOString().substr(0, 10); // Get today's date in yyyy-mm-dd format
  
	const [buttonText, setButtonText] = useState("Connect Wallet");
	const [verificationfailed, setVerified] = useState(true);
	const [showPopup, setShowPopup] = useState(false);
	const [showPopupSuccess, setShowPopupSuccess] = useState(false);
    const [popupHeader, setPopupHeader] = useState("");
	const [popupHeaderSuccess, setPopupHeaderSuccess] = useState("");
    const [popupText, setPopupText] = useState("");

	const router = useRouter();
	const { SelAPN } = router.query;
	const {Address} = router.query;
  	console.log('APN = '+{SelAPN});

	  const login = async () => {
		//console.log('trying login function');
		
		
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
		  
		  setButtonText(formatLongString(address));
		}
		catch (error) {
			alert('Please Install Metamask Wallet')
			return;
		}
	}

	const handleClosePopup = () => {
        setShowPopup(false);
      };

	  const handleClosePopupSuccess = () => {
        setShowPopupSuccess(false);
      };


	const copyToClipboardseller = async () => {
		// Logic to copy value to clipboard
		//const valueToCopy = "Hello, clipboard!";
		//navigator.clipboard.writeText(valueToCopy);
		let clipboardresult = await navigator.clipboard.readText();
		
		const myInput = document.getElementById("senderwallet");
		//console.log(APN);
		myInput.value=clipboardresult;
		
	  };

	  const copyToClipboardreceiver = async () => {
		// Logic to copy value to clipboard
		//const valueToCopy = "Hello, clipboard!";
		//navigator.clipboard.writeText(valueToCopy);
		let clipboardresult = await navigator.clipboard.readText();
		
		const myInput = document.getElementById("receiverwallet");
		//console.log(APN);
		myInput.value=clipboardresult;
		
	  };

	  //verify input data
	  const verifydata = async() => {
		const verAPN= document.getElementById("parcelid").value;
		const verAmount= document.getElementById("bonusamount").value;
		const verStartdate= document.getElementById("startdate").value;
		const verSellbydate= document.getElementById("sellbydate").value;
		const verSeller= document.getElementById("senderwallet").value;
		const verRealtor= document.getElementById("receiverwallet").value;

		if (verAPN=="" || verAmount==0 || verStartdate=="" || verSellbydate=="" ||verSeller=="" || verRealtor=="") {
			console.log('Verification failed');
			setVerified(true);
			setPopupHeader('Input verification failed');
			setPopupText('Please check input data');
			setShowPopup(true);
		}
		else{
			console.log('Verification ok');
			setVerified(false);
		}

	  }
    return (
      <div className="bg-blue-700 min-h-screen">
        <nav className="flex justify-between items-center bg-blue-700 p-4">
		<a href="/" className="text-white font-bold text-2xl hover:text-gray-300">SmartCrow</a>
		  <h1 className="text-white font-bold text-lg">New Contract</h1>
          <button className="bg-white text-blue-700 px-4 py-2 rounded" onClick={login}>{buttonText}</button>
        </nav>
        <div className="container mx-auto pb-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center flex-row p-2">
              <label for="parcelid" className="font-bold mr-4 w-24">
                APN
              </label>
              <input
                type="text"
                id="parcelid"
                className="border-gray-300 border rounded py-2 px-3 mt-1 max-w-screen-sm flex-grow"
				defaultValue={SelAPN}
              />
            </div>
            <div className="flex items-center flex-row p-2">
			<label for="parcelid" className="font-bold mr-4 w-24">
                
              </label>
              <textarea
                id="addresscheck"
                className="border-gray-300 bg-gray-700 text-white text-center border rounded flex-grow max-w-screen-sm py-2 px-3 mt-1"
				defaultValue={Address}
                rows={2}
              />
            </div>
            <div className="flex items-center flex-row p-2">
              <label for="bonusamount" className="font-bold mr-4 w-24">
                Amount (ETH)
              </label>
              <input
                type="number"
                id="bonusamount"
                className="border-gray-300 border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
              />
            </div>
            <div className="flex items-center flex-row p-2">
              <label for="startdate" className="font-bold mr-4 w-24">
                Start Date
              </label>
              <input
                type="date"
                id="startdate"
                className="border-gray-300 border rounded py-2 px-3 mt-1 max-w-screen-sm flex-grow"
                defaultValue={today}
              />
            </div>
            <div className="flex items-center flex-row p-2">
              <label for="sellbydate" className="font-bold mr-4 w-24">
                Sell By
              </label>
              <input
                type="date"
                id="sellbydate"
                className="border-gray-300 border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
              />
            </div>
            <div className="flex items-center flex-row p-2">
              <label for="senderwallet" className="font-bold mr-4 w-24">
                Sender Wallet
              </label>
              <input
                type="text"
                id="senderwallet"
                className="border-gray-300 border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
              />
			  <button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full m-2" onClick={copyToClipboardseller}>
			  	<img src="/assets/images/paste.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="flex items-center flex-row p-2">
              <label htmlFor="receiverwallet" className="font-bold mr-4 w-24">
                Realtor Wallet
              </label>
              <input
                type="text"
                id="receiverwallet"
                className="border-gray-300 border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
              />
			  <button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full m-2" onClick={copyToClipboardreceiver}>
			  	<img src="/assets/images/paste.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="p-6 flex items-center justify-center">
				<button className="bg-white text-blue-500 font-semibold px-4 py-2 rounded mr-4" onClick={verifydata}>
		  	        Verify data
		        </button>
                <button className={`py-2 px-4 rounded ${
        verificationfailed ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-700 hover:bg-gr-200'
      }`} disabled={verificationfailed} onClick={createbonusfunc}>
		  	        Create Bonus
		        </button>
            </div>
          </div>
        </div>
		{showPopup && (
                <Popup header={popupHeader} text={popupText} closeModal={handleClosePopup} isOpen={showPopup}/>
                )}
		{showPopupSuccess && (
                <PopupSuccess header={popupHeader} text={""} closeModal={handleClosePopupSuccess} isOpen={showPopupSuccess}/>
                )}
      </div>
    );
  };
  
  export default MyForm;