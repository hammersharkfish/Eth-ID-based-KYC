<img src="https://github.com/RickStrahl/MarkdownMonster/raw/master/Art/MarkdownMonster_Icon_128.png" align="right" style="height: 64px"/>

# ADHAAR BASED KYC REGISTRATION AND VERIFICATION ON A PUBLIC BLOCKCHAIN

### INTRODUCTION 

Banks in India today require KYC ("Know your customer") registration before their clients can carry out any financial transaction. KYC involves submitting identity proof and address proof. The banks then verify the information provided and complete their clients KYC. 

### About the project
This projects aims to promote total transparency in the KYC process while still maintaining clients data privacy. This is achieved using a public blockchain and encryption . Users can track  status of their own KYC without having to rely on centralized authorities(ie RBI and their bank).
  
Key Features-  
1. RBI can add new banks.
2. RBI can allow/revoke bank/s to on board clients.
3. RBI can allow/revoke a bank/s permission to perform KYC. 
4. Only respective bank and RBI can check details of any customer added by that bank . 
5. Client can track his KYC status independent of the RBI and his own bank. 
6. Only the respective bank can update KYC of it's customer.

All actions taken by the bank and RBI will be a public record. This will make the banking system accountable and transparent .

### Overview

The project uses 'two(ECDSA) keys model'. One wallet will be solely owned by the RBI which it will use to make transactions . Another private/public key pair (referred to as sharedPrivateKey/sharedPublicKey here on) will be used purely for encrypting and decrypting data, this private key will be shared between that respective bank and RBI only .Every RBI/Bank pair will have their own sharedKey . In addition every bank will  solely have its own wallet which it will use to make transactions . 

### Example
Example uses ```bsc-testnet``` as a network and ```remix``` as an ```IDE``` for making transactions using ```Injected Metamask Web3```.
1. Generate a ```CENTRAL_BANK_PK``` ```CENTRAL_BANK_PUBLIC``` and ```SHARED_PK``` ```SHARED_PUBLIC``` from ```central_bank_wallet.js``` 

2. Generate bank wallet (for fictitious AXLE bank) ```AXLE_BANK_PK``` ```AXLE_BANK_PUBLIC``` ```AXLE_BANK_ADDRESS``` from ```bank_wallet.js```

3. Put all the env variables above in a ```.env``` in the root folder.

4. Deploy ```KYC.sol``` using ```CENTRAL_BANK_PK```

4. Using Central bank wallet . We will first include a new bank.
```html
function AddNewBank (string calldata _BankName, address _BankAddress, string calldata  _SharedPublicKey )
```  
```(AXLE BANK, 0xc520ef142d30667Cec4Ee8C3464C8a8013c440F4, 36f9391a6019eca9251d27a62a43f3b44440622e0dbb29df43a583454149fd99d6cbb1bacb41e5626c8207659d9b6d98db85626c5ea2017baf8aaff0b9933b0c)```

5. Check if new bank is included 
```html
function RetrieveBankData(address _BankAddress)
``` 
``` (0xc520ef142d30667Cec4Ee8C3464C8a8013c440F4)```   
```returns```   
```0:
string: AXLE BANK
1:
address: 0xc520ef142d30667Cec4Ee8C3464C8a8013c440F4
2:
string: 36f9391a6019eca9251d27a62a43f3b44440622e0dbb29df43a583454149fd99d6cbb1bacb41e5626c8207659d9b6d98db85626c5ea2017baf8aaff0b9933b0c
3:
uint256: 0
4:
bool: true
5:
bool: true  
```  
which is what we had inputted.

6. Enter data in ```customer_encrypt.js``` . This will typically be done at a bank . Customer will input data either online or in-person in a local branch . We have used aadhar number hash for data privacy.  
```html
Enter customers 12 digit aadhar number .123412341234
Enter customers Full name .Rajvardhan Takle
Enter customers mobile number.9999999999
Enter customers physical address.Kohinoor Apartments Cannought Place Delhi 111111
********ENCRYPTED DATA********
0653f583106e4d882a616a8bcc0c4e2d;04302329a96c7dc67d95ce29b9147fc98cd07e1c604cc792a9dda7302dac73b73a04f241241addf86b2c29d93ad375e9007ed8de00da063ed1546d097d0a71656c;5537ecaeb1930bd91efa3a8fc8aa740118be12903fdeedae31d1d99fe39db829c571ed82e82e33a76a5814f39904b005f94a8de657d95f76766bdca88df022903ef32d7c47a0ba21b1acb0f796f00eb09f5f98602cb4bb9f9b1e785bbb727c00;5a1301324e64a3a9f8d0f41fc9d6c3d3a68976814855be21c15ce282b34a44e8
********AADHAR HASH********
0x33dcdee44cc89ea6cf6e0830cac0da20b1e343d62e8585e0447970d6549e75ec
```
7. Switch to ```0xc520ef142d30667Cec4Ee8C3464C8a8013c440F4``` on ```remix```. ```AdharHash``` protects our aadhar number from getting exposed. ```_encryptedData``` encrypts all the private data in previous step . Making it readable for only the RBI and the bank.
```html
AddNewCustomer (bytes32  AdharHash , string memory _encryptedData )
```
```
(0x33dcdee44cc89ea6cf6e0830cac0da20b1e343d62e8585e0447970d6549e75ec,

0653f583106e4d882a616a8bcc0c4e2d;04302329a96c7dc67d95ce29b9147fc98cd07e1c604cc792a9dda7302dac73b73a04f241241addf86b2c29d93ad375e9007ed8de00da063ed1546d097d0a71656c;5537ecaeb1930bd91efa3a8fc8aa740118be12903fdeedae31d1d99fe39db829c571ed82e82e33a76a5814f39904b005f94a8de657d95f76766bdca88df022903ef32d7c47a0ba21b1acb0f796f00eb09f5f98602cb4bb9f9b1e785bbb727c00;5a1301324e64a3a9f8d0f41fc9d6c3d3a68976814855be21c15ce282b34a44e8
)
```
New Customer is added !

8. Let's check and retrieve this customers data (Step 8 to 10) . Enter details in ```customer_info.js``` . This script generates an Aadhar Bank hash which is ```Keccak256(AdharHash+BankAddress)``` . We have mapped customer info in previous step this way so that customer data is retrievable for a specific Aadhar number and a specific bank . 
```html
Enter aadhar number 123412341234
Enter Bank Address 0xc520ef142d30667Cec4Ee8C3464C8a8013c440F4
Aadhar Bank Hash -  0x0166a4912afba08fad158a45a056dbef102c5905fb5424c13224becea28c44bc
``` 
9. Use Aadhar Bank Hash from previous step as a parameter to retrieve encrypted data from smart contract.
```html 
RetrieveCustomerData(bytes32  AdharBankAddrHash)
``` 
```
(0x0166a4912afba08fad158a45a056dbef102c5905fb5424c13224becea28c44bc)
```
```returns```
```
0:
string: 0653f583106e4d882a616a8bcc0c4e2d;04302329a96c7dc67d95ce29b9147fc98cd07e1c604cc792a9dda7302dac73b73a04f241241addf86b2c29d93ad375e9007ed8de00da063ed1546d097d0a71656c;5537ecaeb1930bd91efa3a8fc8aa740118be12903fdeedae31d1d99fe39db829c571ed82e82e33a76a5814f39904b005f94a8de657d95f76766bdca88df022903ef32d7c47a0ba21b1acb0f796f00eb09f5f98602cb4bb9f9b1e785bbb727c00;5a1301324e64a3a9f8d0f41fc9d6c3d3a68976814855be21c15ce282b34a44e8
1:
bool: false
2:
address: 0xc520ef142d30667Cec4Ee8C3464C8a8013c440F
```
10. Enter  index 0 (this is our encrypted data) from previous step after running ```CentralServer_decrypt.js``` . This step will be performed at a centralised bank location(either of RBI or AXEL Bank) which will hold the SharedPrivate key.

```html 
123412341234;Rajvardhan Takle;9999999999;Kohinoor Apartments Cannought Place Delhi 111111
``` 
We have succesfully decryted the data !. AXEL bank will now check veracity of the data offline and update KYC status. 

11. Finally bank will update KYC of the customer.
```html
UpdateCustomerKyc(bytes32  AdharBankAddrHash ) 
```

You will get ```AdharBankAddrHash``` from step 8 
```(0x0166a4912afba08fad158a45a056dbef102c5905fb5424c13224becea28c44bc)``` 
#### Customer KYC  is now Done.  !

### Improvements in the next version
1. Smart contract functions for changing/removing incorrectly inputted customer data is needed . 
2. A more efficient protocol for SharedKey could be explored.
3. A multi-sig implementation of Bank and Central Bank private keys will decentralize decision making and reduce consequences if private key leaks . 
4. A web/desktop application for customers and banks is needed in place of individually running scripts. 
5. Tests 

### Authors Note 
- In case of queries/requests, contact the author - rajvardhantakle@gmail.com or raise an issue .

- *"Alone we can do so little; together we can do so much." – Helen Keller*    
  Contributions are welcome in any area and recognition will be given. 
 










  


