var generateWallet = require('../helpers/generate_wallet.js');

wallet = generateWallet()

console.log("*************************")
console.log("PRIVATE KEY(32 bytes): ", wallet.privateKey.substring(2))
console.log("PUBLIC KEY(64 bytes): ", wallet.publicKey)
console.log("ADDRESS(20 bytes): ", wallet.address)
console.log("*************************")