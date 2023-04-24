import { useState, useEffect } from 'react';
import Popup from '@/components/popup';
import { IM_Fell_English_SC } from 'next/font/google';
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
//Test Value
//const APN = "290-15-153";

var provider;
var MyContract;
var MyContractwSigner;

var seller;
var realtor;
var contractamount = 1;
var sellbydate;
var startdate;
var activeflag;


const fetch = async(APN) => {
	
	var resultarray=[];
	    
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

    seller = await MyContract.getBonusseller(APN);
    resultarray[0]=seller;
    console.log('seller = '+seller);
    realtor = await MyContract.getBonusrealtor(APN);
    resultarray[1]=realtor;
    console.log('realtor = '+realtor);

    var result = await MyContract.getBonusstartdate(APN);
    var resultdate = new Date(result*1000);
    startdate = new Date(resultdate.getTime()+36000000);
    resultarray[2]=startdate;
    console.log('Startdate = '+startdate);
    var result4 = await MyContract.getBonussellbydate(APN);
    var resultdate2 = new Date(result4*1000);
    sellbydate = new Date(resultdate2.getTime()+36000000);
    resultarray[3]=sellbydate;
    console.log('Sellby = '+sellbydate);
    contractamount = await MyContract.getBonusamount(APN);
    resultarray[4]=contractamount;
    console.log('Amount = '+contractamount);
    activeflag = await MyContract.getBonusActive(APN);
    console.log('Active flag = '+activeflag);
    resultarray[5] = activeflag;

    return resultarray;
}

const withdrawseller = async(APN) => {
	console.log('Withdraw funds');
	const today = new Date();
	console.log('Today = '+today);
	const todaytimestamp = Math.floor(today.getTime()/1000);
	console.log('Today timestamp = '+todaytimestamp);
	var finalurl=zillowurl+APN;
	var result = await axios.get(finalurl);
	console.log('Total = '+result['data']['total']);
	var resultdate=result['data']['bundle'][0]['recordingDate'];
	
	
	var resultdate2 = new Date(resultdate);
	
	var resulttimestamp = Math.floor(resultdate2.getTime()/1000);
	
	console.log(resulttimestamp);
	
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
	  var myactive = await MyContract.getBonusActive(APN);
	  var mysellbydate = await MyContract.getBonussellbydate(APN);
	  //var myslackdate = mysellbydate + (30*24*3600);
	  var myslackdate = parseInt(mysellbydate, 10) + (30*24*3600);
      console.log('sellbydate = '+mysellbydate);
	  console.log('slackdate = '+myslackdate);
		//Do initial checks
		if (todaytimestamp<myslackdate) {
			console.log('slack time not yet passed');
        
        	return 4;
		}
		else if (myactive==false){
			console.log('contract no longer active');
        
        	return 3;
		}
		else {
			await MyContractwSigner.sellerwithdraw(APN,resulttimestamp).then(receipt => {
				console.log(receipt);
			}).catch(err => {
				console.error(err);
			});;}
}

const withdrawrealtor = async(APN) =>{
	console.log('Withdraw funds');
	
	var finalurl=zillowurl+APN;
	var result = await axios.get(finalurl);
	
	var resultdate=result['data']['bundle'][0]['recordingDate'];
	//resultdate=resultdate.substring(0, resultdate.indexOf('T'))
	var resultdate2 = new Date(resultdate);
	var resulttimestamp = Math.floor(resultdate2.getTime()/1000);
	
	console.log('Timestamp = '+resulttimestamp);
	
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
	  var myactive = await MyContract.getBonusActive(APN);
      var mystartdate = await MyContract.getBonusstartdate(APN);
      console.log('startdate = '+mystartdate);
      var mysellbydate = await MyContract.getBonussellbydate(APN);
      console.log('sellbydate = '+mysellbydate);
        
      if (resulttimestamp < mystartdate) {
        console.log('record date earlier than startdate');
        
        return 1;
      }

      else if (resulttimestamp > mysellbydate) {
        console.log('record date later than sellbydate');
        return 2;
      }
      
	  else if (myactive==false){
			console.log('contract no longer active');
        
        	return 3;
	  }

      else {
	    await MyContractwSigner.realtorwithdraw(APN,resulttimestamp).then(receipt => {
			console.log(receipt);
		}).catch(err => {
			console.error(err);
		});;
        return 3;}
}


const MyPage = () => {
    const [aseller, setSeller] = useState("");
    const [arealtor, setRealtor] = useState("");
    const [acontractamount, setAmount] = useState("");
    const [asellbydate, setSellbydate] = useState("");
    const [astartdate, setStartdate] = useState("");
    const [aactiveflag, setActiveFlag] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupHeader, setPopupHeader] = useState("");
    const [popupText, setPopupText] = useState("");
	const [buttonText, setButtonText] = useState("Connect Wallet");

	const router = useRouter();
  	const { SelAPN } = router.query;

	console.log('APN = '+{SelAPN});
	const APN = SelAPN;
	console.log('APN = '+APN);
	const {Address} = router.query;
	

    /*useEffect(()=>{
        const fetchdata = async() => {fetch();}
        setAmount(1000);
        
    })*/

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
		  
		  setButtonText(address);
		}
		catch (error) {
			alert('Please Install Metamask Wallet')
			return;
		}
	}

    const handleClosePopup = () => {
        setShowPopup(false);
      };

    const handleWithdrawRealtor = async() => {
        var result = await withdrawrealtor(APN);
        console.log(result);
        if (result==1){
            setPopupHeader('Unable to withdraw');
            setPopupText('Last record date before bonus start date');
            setShowPopup(true);
        }

		else if (result==2){
            setPopupHeader('Unable to withdraw');
            setPopupText('Last record date later than sell by date');
            setShowPopup(true);
        }

		else if (result==3){
            setPopupHeader('Unable to withdraw');
            setPopupText('Bonus no longer active');
            setShowPopup(true);
        }

		else if (result==4){
            setPopupHeader('Unable to withdraw');
            setPopupText('Earliest withdraw date is 30 days after sell by date');
            setShowPopup(true);
        }
    }

	const handleWithdrawSeller = async() => {
        var result = await withdrawseller(APN);
        console.log(result);
        if (result==1){
            setPopupHeader('Unable to withdraw');
            setPopupText('Last record date before bonus start date');
            setShowPopup(true);
        }

		else if (result==2){
            setPopupHeader('Unable to withdraw');
            setPopupText('Last record date later than sell by date');
            setShowPopup(true);
        }

		else if (result==3){
            setPopupHeader('Unable to withdraw');
            setPopupText('Bonus no longer active');
            setShowPopup(true);
        }

		else if (result==4){
            setPopupHeader('Unable to withdraw');
            setPopupText('Earliest withdraw date is 30 days after sell by date');
            setShowPopup(true);
        }
    }

    const handleUpdate = async() =>{
        var resultarray = await fetch(APN);
        console.log('returned amount'+resultarray[4]);
        var amountstring = ethers.utils.formatEther( contractamount);
        setAmount(amountstring);
        console.log('Updated amount = '+acontractamount);

        var startdate = resultarray[2].toLocaleString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
        console.log('startdate = '+startdate);
        setStartdate(startdate);
        console.log('Updated startdate = '+astartdate);

        var sellbydate = resultarray[3].toLocaleString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
        console.log('sellbydate = '+sellbydate);
        setSellbydate(sellbydate);
        console.log('Updated sellbydate = '+asellbydate);

        var activeflag = resultarray[5];
        console.log('Active flag = '+activeflag);
        if (activeflag){
            setActiveFlag('YES');
        }
        else {
            setActiveFlag('NO');
        }
        //setActiveFlag(activeflag);
        console.log(aactiveflag);

        var seller = resultarray[0];
        setSeller(seller);
        var realtor = resultarray[1];
        setRealtor(realtor);
    }
    

   //fetch();
    return (
      <div className="bg-blue-700 min-h-screen">
        <nav className="bg-blue-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white font-bold text-lg">SmartCrow</h1>
            <button className="bg-white text-blue-700 px-4 py-2 rounded" onClick={login}>
              {buttonText}
            </button>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col gap-4">
		  	<div className="flex justify-between items-center">
            	<h2 className="text-white text-2xl font-bold">APN# {APN}</h2>
				<button className="bg-white text-blue-700 px-4 py-2 rounded w-32" onClick={handleUpdate}>
              		Get bonus info
            	</button>
			</div>
			<textarea
                id="addresscheck"
                className="border-gray-300 bg-gray-700 text-white text-center border rounded w-full py-2 px-3 mt-1"
				defaultValue={Address}
                rows={2}
              />
			
            <div className="p-6 rounded">
              <div className="flex">
                <div className="w-1/2">
                 
                  <ul className="list-inside text-white">
                    <li>Amount</li>
                    <li>Start date</li>
                    <li>Sell by</li>
                    <li>Seller Wallet</li>
                    <li>Receiver Wallet</li>
                    <li>Still active</li>
                  </ul>
                </div>
                <div className="w-1/2 text-right text-white">
                  
                  <ul className="list-inside">
                    <li id="contractamount">{acontractamount}</li>
                    <li>{astartdate}</li>
                    <li>{asellbydate}</li>
                    <li>{aseller}</li>
                    <li>{arealtor}</li>
                    <li>{aactiveflag}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-6 rounded flex justify-between">
				<div className="w-full sm:w-1/2 text-center mr-10">
    				<button class="bg-white hover:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg mb-4" onClick={handleWithdrawSeller}>
						<img src="/assets/images/sender.png" alt="New File Image" className="h-12 w-12" />
    				</button>
    				<p className="text-white">Withdraw as Seller</p>
  				</div>
				<div className="w-full sm:w-1/2 text-center mr-10">
    				<button class="bg-white hover:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg mb-4" onClick={handleWithdrawRealtor}>
						<img src="/assets/images/receiver.png" alt="New File Image" className="h-12 w-12" />
    				</button>
    				<p className="text-white">Withdraw as Receiver</p>
  				</div>
              
            </div>
          </div>
        </div>
        {showPopup && (
                <Popup header={popupHeader} text={popupText} closeModal={handleClosePopup} isOpen={showPopup}/>
                )}
      </div>
    );
  };
  
  export default MyPage;