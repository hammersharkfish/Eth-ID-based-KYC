var generateWallet = require('../helpers/generate_wallet.js');

wallet = generateWallet()
sharedWallet = generateWallet()

console.log("*************************")
console.log("PRIVATE KEY(32 bytes): ", wallet.privateKey.substring(2))
console.log("PUBLIC KEY(64 bytes): ", wallet.publicKey)
console.log("\nSHARED PRIVATE KEY(32 bytes): ", sharedWallet.privateKey.substring(2))
console.log("SHARED PUBLIC KEY(64 bytes): ", sharedWallet.publicKey)
console.log("*************************")