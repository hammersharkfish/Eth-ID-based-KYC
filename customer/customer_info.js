var Web3 = require('web3');
abijson = require('../abi.json');
var keccak256 = require('../helpers/keccak256.js');
const prompt = require("prompt-sync")({ sigint: true });
const aadhar = prompt("Enter aadhar number ");
const bankAddress = prompt("Enter Bank Address ");

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/")

//Get Adhar Bank Hash 
const adharAddressEncoding = web3.eth.abi.encodeParameters(
    ['bytes32', 'address'], [keccak256(aadhar), bankAddress]
);

console.log("Aadhar Bank Hash - ", keccak256(adharAddressEncoding)) 
