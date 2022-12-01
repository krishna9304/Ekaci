const infuraEndpoint =
  "https://goerli.infura.io/v3/8827e9f4dcc24ba096c1cdf180b7c0a8";
const deployedTo = "0xF66C75e15DB0DDb415B04a744B0bB5156debd53F";

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "_insuranceId",
        type: "string",
      },
    ],
    name: "_getClaim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "_insuranceId",
        type: "string",
      },
    ],
    name: "_setClaim",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_insuranceId",
        type: "string",
      },
    ],
    name: "getClaim",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "insuranceId",
            type: "string",
          },
          {
            internalType: "string",
            name: "claimantId",
            type: "string",
          },
          {
            internalType: "string",
            name: "payment",
            type: "string",
          },
          {
            internalType: "bool[]",
            name: "currStatus",
            type: "bool[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "cropType",
                type: "string",
              },
              {
                internalType: "string",
                name: "cropName",
                type: "string",
              },
              {
                internalType: "string",
                name: "irrigationMethod",
                type: "string",
              },
              {
                internalType: "string",
                name: "season",
                type: "string",
              },
            ],
            internalType: "struct InsuranceClaim.cropDetails",
            name: "currCrop",
            type: "tuple",
          },
          {
            internalType: "string[]",
            name: "imageURL",
            type: "string[]",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "string",
            name: "lossPercent",
            type: "string",
          },
          {
            internalType: "string",
            name: "lossType",
            type: "string",
          },
          {
            internalType: "string",
            name: "dateOfLoss",
            type: "string",
          },
          {
            internalType: "string",
            name: "createdOn",
            type: "string",
          },
          {
            internalType: "string",
            name: "updatedOn",
            type: "string",
          },
        ],
        internalType: "struct InsuranceClaim.individualClaim",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalClaim",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "insuranceId",
            type: "string",
          },
          {
            internalType: "string",
            name: "claimantId",
            type: "string",
          },
          {
            internalType: "string",
            name: "payment",
            type: "string",
          },
          {
            internalType: "bool[]",
            name: "currStatus",
            type: "bool[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "cropType",
                type: "string",
              },
              {
                internalType: "string",
                name: "cropName",
                type: "string",
              },
              {
                internalType: "string",
                name: "irrigationMethod",
                type: "string",
              },
              {
                internalType: "string",
                name: "season",
                type: "string",
              },
            ],
            internalType: "struct InsuranceClaim.cropDetails",
            name: "currCrop",
            type: "tuple",
          },
          {
            internalType: "string[]",
            name: "imageURL",
            type: "string[]",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "string",
            name: "lossPercent",
            type: "string",
          },
          {
            internalType: "string",
            name: "lossType",
            type: "string",
          },
          {
            internalType: "string",
            name: "dateOfLoss",
            type: "string",
          },
          {
            internalType: "string",
            name: "createdOn",
            type: "string",
          },
          {
            internalType: "string",
            name: "updatedOn",
            type: "string",
          },
        ],
        internalType: "struct InsuranceClaim.individualClaim[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuranceId",
        type: "string",
      },
    ],
    name: "isSettled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "insuranceId",
            type: "string",
          },
          {
            internalType: "string",
            name: "claimantId",
            type: "string",
          },
          {
            internalType: "string",
            name: "payment",
            type: "string",
          },
          {
            internalType: "bool[]",
            name: "currStatus",
            type: "bool[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "cropType",
                type: "string",
              },
              {
                internalType: "string",
                name: "cropName",
                type: "string",
              },
              {
                internalType: "string",
                name: "irrigationMethod",
                type: "string",
              },
              {
                internalType: "string",
                name: "season",
                type: "string",
              },
            ],
            internalType: "struct InsuranceClaim.cropDetails",
            name: "currCrop",
            type: "tuple",
          },
          {
            internalType: "string[]",
            name: "imageURL",
            type: "string[]",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "string",
            name: "lossPercent",
            type: "string",
          },
          {
            internalType: "string",
            name: "lossType",
            type: "string",
          },
          {
            internalType: "string",
            name: "dateOfLoss",
            type: "string",
          },
          {
            internalType: "string",
            name: "createdOn",
            type: "string",
          },
          {
            internalType: "string",
            name: "updatedOn",
            type: "string",
          },
        ],
        internalType: "struct InsuranceClaim.individualClaim",
        name: "obj",
        type: "tuple",
      },
    ],
    name: "setClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuranceId",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "cropType",
            type: "string",
          },
          {
            internalType: "string",
            name: "cropName",
            type: "string",
          },
          {
            internalType: "string",
            name: "irrigationMethod",
            type: "string",
          },
          {
            internalType: "string",
            name: "season",
            type: "string",
          },
        ],
        internalType: "struct InsuranceClaim.cropDetails",
        name: "currCrop",
        type: "tuple",
      },
    ],
    name: "updateCurrCrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuranceId",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "imageURL",
        type: "string[]",
      },
    ],
    name: "updateImageURL",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuranceId",
        type: "string",
      },
      {
        internalType: "string",
        name: "payment",
        type: "string",
      },
    ],
    name: "updatePayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuranceId",
        type: "string",
      },
    ],
    name: "updateStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuranceId",
        type: "string",
      },
      {
        internalType: "string",
        name: "createdOn",
        type: "string",
      },
    ],
    name: "updatecreatedOn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuranceId",
        type: "string",
      },
      {
        internalType: "string",
        name: "dateOfLoss",
        type: "string",
      },
    ],
    name: "updatedateOfLoss",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuranceId",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    name: "updateisActive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuranceId",
        type: "string",
      },
      {
        internalType: "string",
        name: "lossPercent",
        type: "string",
      },
    ],
    name: "updatelossPercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuranceId",
        type: "string",
      },
      {
        internalType: "string",
        name: "lossType",
        type: "string",
      },
    ],
    name: "updatelossType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuranceId",
        type: "string",
      },
      {
        internalType: "string",
        name: "updatedOn",
        type: "string",
      },
    ],
    name: "updateupdatedOn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const insuranceClaimContract = (web3) => {
  return new web3.eth.Contract(abi, deployedTo);
};

export default insuranceClaimContract;
