const farcasterPeripheralAbi = `
[
	{
		"inputs": [
			{
				"internalType": "contract IContentProfile",
				"name": "_coreContractAddress",
				"type": "address"
			},
			{
				"internalType": "contract IIdRegistry",
				"name": "_farcasterIdRegistry",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "basePrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "priceFactor",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "priceIndex",
				"type": "uint256"
			}
		],
		"name": "BIND_EVENT",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "basePrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "priceFactor",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "priceIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "contentId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "contentIdHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "contentProfileId",
				"type": "uint256"
			}
		],
		"name": "CREATE_EVENT",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "basePrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "priceFactor",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "priceIndex",
				"type": "uint256"
			}
		],
		"name": "bind",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contentAssetCore",
		"outputs": [
			{
				"internalType": "contract IContentProfile",
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
				"components": [
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "v",
								"type": "uint8"
							},
							{
								"internalType": "bytes32",
								"name": "r",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "s",
								"type": "bytes32"
							},
							{
								"internalType": "uint256",
								"name": "deadline",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.EIP712Signature",
						"name": "sig",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "contentId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contentUrl",
						"type": "string"
					}
				],
				"internalType": "struct DataTypes.CreateWithSig",
				"name": "vars",
				"type": "tuple"
			},
			{
				"internalType": "address",
				"name": "relayer",
				"type": "address"
			}
		],
		"name": "createWithSig",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "farcasterIdRegistry",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getNonce",
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
				"name": "addr",
				"type": "address"
			}
		],
		"name": "isRelayer",
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
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "removeRelayer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "setRelayer",
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
	}
]
`
export { farcasterPeripheralAbi }