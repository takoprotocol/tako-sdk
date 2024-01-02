const peripheralAbi = `
[
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
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "collectModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "collectModuleInitData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "referenceModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleInitData",
						"type": "bytes"
					}
				],
				"internalType": "struct DataTypesLensHub.CommentData",
				"name": "vars",
				"type": "tuple"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "commentWithCall",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pubId",
				"type": "uint256"
			}
		],
		"name": "createWithPub",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "referenceModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleInitData",
						"type": "bytes"
					}
				],
				"internalType": "struct DataTypesLensHub.MirrorData",
				"name": "vars",
				"type": "tuple"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "mirrorWithCall",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "collectModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "collectModuleInitData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "referenceModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleInitData",
						"type": "bytes"
					}
				],
				"internalType": "struct DataTypesLensHub.PostData",
				"name": "vars",
				"type": "tuple"
			},
			{
				"internalType": "address",
				"name": "postAddr",
				"type": "address"
			}
		],
		"name": "postWithCall",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ILensHub",
				"name": "_lensHub",
				"type": "address"
			},
			{
				"internalType": "contract IContentProfile",
				"name": "coreAddr",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
		"inputs": [],
		"name": "lensHub",
		"outputs": [
			{
				"internalType": "contract ILensHub",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
`
export { peripheralAbi }