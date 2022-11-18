require('dotenv').config({ path: "../.env" });
const prompt = require("prompt-sync")({ sigint: true });
var decrypt = require('../helpers/decrypt.js');

var decrypted

const sharedPK = process.env.SHARED_PK

let encryptedText = prompt("Enter encrypted text _CustomerData. You will get it from  RetrieveCustomerData()");
//Decrypt encrypted text
Decrypt = async function process() {
    decrypted = await decrypt(sharedPK, encryptedText,)
}

Decrypt().then(() => {
    console.log(decrypted)
})

