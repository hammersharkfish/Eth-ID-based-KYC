const EthCrypto = require('eth-crypto');

encrypt = async function encryptDecrypt(publicKey, secretMessage ) {
    encrypted = await EthCrypto.encryptWithPublicKey(
        publicKey, // encrypt with 64-bytes publicKey
        secretMessage
    )
    const { iv, ephemPublicKey, ciphertext, mac } = encrypted
    return iv.concat(";", ephemPublicKey, ";", ciphertext, ";", mac)
}; 
module.exports = encrypt;