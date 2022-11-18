const EthCrypto = require('eth-crypto');

// Generates an ethereum wallet
var generateWallet = function () {
    const wallet = EthCrypto.createIdentity();
    return wallet
}
module.exports = generateWallet;
