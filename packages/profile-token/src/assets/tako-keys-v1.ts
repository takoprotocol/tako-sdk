const takoKeysV1abi = `
[
	{
		"inputs": [
			{
				"internalType": "contract IIdRegistry",
				"name": "_farcasterHub",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fee",
				"type": "uint256"
			}
		],
		"name": "ClaimEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "creatorId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idoPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "idoAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sharesAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "a",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "b",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "k",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isCreated",
						"type": "bool"
					}
				],
				"indexed": false,
				"internalType": "struct ITakoKeysV1.poolParams",
				"name": "info",
				"type": "tuple"
			}
		],
		"name": "CreateShares",
		"type": "event"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "creatorBuyFeePercent",
				"type": "uint256"
			}
		],
		"name": "SetCreatorBuyFee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "creatorSellFeePercent",
				"type": "uint256"
			}
		],
		"name": "SetCreatorSellFee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "feeTo",
				"type": "address"
			}
		],
		"name": "SetFeeTo",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isOpenInit",
				"type": "bool"
			}
		],
		"name": "SetOpenInit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "protocolBuyFeePercent",
				"type": "uint256"
			}
		],
		"name": "SetProtocolBuyFee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "protocolSellFeePercent",
				"type": "uint256"
			}
		],
		"name": "SetProtocolSellFee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "trader",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "creatorId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isBuy",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "shareAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "protocolFee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "creatorFee",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct ITakoKeysV1.fees",
				"name": "fees",
				"type": "tuple"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "supply",
				"type": "uint256"
			}
		],
		"name": "TradeEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "MAX_FEE_PERCENT",
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
				"internalType": "uint256",
				"name": "creatorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "buyShares",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "creatorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "initialSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "k",
				"type": "uint256"
			}
		],
		"name": "createSharesForPiecewise",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "creatorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "initialSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "k",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "shareNumber",
				"type": "uint256"
			}
		],
		"name": "createSharesWithInitialBuy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "creatorBuyFeePercent",
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
		"name": "creatorSellFeePercent",
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
		"name": "farcasterHub",
		"outputs": [
			{
				"internalType": "contract IIdRegistry",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "farcasterKey",
		"outputs": [
			{
				"internalType": "contract IFarcasterKey",
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
				"internalType": "uint256",
				"name": "creatorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "getBuyPrice",
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
				"internalType": "uint256",
				"name": "creatorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "getBuyPriceAfterFee",
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
				"internalType": "uint256",
				"name": "creatorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "getSellPrice",
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
				"internalType": "uint256",
				"name": "creatorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "getSellPriceAfterFee",
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
		"name": "isOpenInit",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "pure",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "poolInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "idoPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "idoAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sharesAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "k",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isCreated",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "protocolBuyFeePercent",
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
		"name": "protocolFeeDestination",
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
		"inputs": [],
		"name": "protocolSellFeePercent",
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
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "priceLimit",
				"type": "uint256"
			}
		],
		"name": "sellShare",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "priceLimit",
				"type": "uint256"
			}
		],
		"name": "sellShares",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_feePercent",
				"type": "uint256"
			}
		],
		"name": "setCreatorBuyFeePercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_feePercent",
				"type": "uint256"
			}
		],
		"name": "setCreatorSellFeePercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_feeDestination",
				"type": "address"
			}
		],
		"name": "setFeeDestination",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "isOpen",
				"type": "bool"
			}
		],
		"name": "setOpenInit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_feePercent",
				"type": "uint256"
			}
		],
		"name": "setProtocolBuyFeePercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_feePercent",
				"type": "uint256"
			}
		],
		"name": "setProtocolSellFeePercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sharesSupply",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userClaimable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
`

export { takoKeysV1abi }