require('dotenv').config({ path: "../.env"});
const prompt = require("prompt-sync")({ sigint: true });
var encrypt = require('../helpers/encrypt.js');
var keccak256 = require('../helpers/keccak256.js');

const sharedPublic = process.env.SHARED_PUBLIC

// customer details
const aadhar = prompt("Enter customers 12 digit aadhar number .");
const name = prompt("Enter customers Full name .");
const mobileNo = prompt("Enter customers mobile number.");
const physicalAddress = prompt("Enter customers physical address.");

if (aadhar.length != 12 || ! /^\d+$/.test(aadhar)) {
    throw "Invalid Aadhar number. Aadhar is a 12 digit unique number. Please retry"
}
else {
    if (aadhar.concat(name, mobileNo, physicalAddress).includes(";")){
        throw "Illegal character- ;"
    }
    {
        encrypted = async function process() {
            //Customer details are encrypted 
            encryptedText = await encrypt(sharedPublic, aadhar.concat(";", name, ";", mobileNo, ";", physicalAddress))
        }
    }
    encrypted().then(() => {
        console.log("********ENCRYPTED DATA********")
        console.log(encryptedText)
        console.log("********AADHAR HASH********")
        console.log(keccak256(aadhar))

    })
}

