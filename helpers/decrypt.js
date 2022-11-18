const EthCrypto = require('eth-crypto');

decrypt = async function encryptDecrypt(PK, encryptedText) {
    el = encryptedText.split(";")
    const [iv, ephemPublicKey, ciphertext, mac] = [el[0], el[1], el[2], el[3]]  
    decrypted = await EthCrypto.decryptWithPrivateKey(
        PK, // decrypt with 32-bytes privateKey
        {
            iv: iv,
            ephemPublicKey: ephemPublicKey,
            ciphertext: ciphertext,
            mac: mac
        }
    )
    return decrypted
};
module.exports = decrypt;