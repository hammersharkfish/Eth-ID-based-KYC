require('dotenv').config({ path: "../.env" });
const prompt = require("prompt-sync")({ sigint: true });
var decrypt = require('../helpers/decrypt.js');

var decrypted

const sharedPK = process.env.SHARED_PK

let encryptedText = prompt("Enter encrypted text");

//Decrypts Encrypted text
Decrypt = async function process() {
    decrypted = await decrypt(sharedPK, encryptedText,)
}

Decrypt().then(() => {
    console.log(decrypted)
})

