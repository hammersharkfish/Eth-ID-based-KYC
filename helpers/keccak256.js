var Web3 = require('web3');
var hash = function (inputMsg) {
    const khash = Web3.utils.soliditySha3(inputMsg);
    return khash
}
module.exports = hash;
