//SPDX-License-Identifier: 	CC-BY-4.0
//Author - rajvardhantakle@gmail.com , https://github.com/hammersharkfish

pragma solidity >= 0.8.17;

import "./Interfaces/IKYC.sol";

contract KYC is IKYC{

struct CustomerInfo{
    string EncryptedData;
    bool KYCstatus;
    address BankAddress;
}

struct BankInfo{
    string BankName;
    address BankAddress;
    string SharedPublicKey;
    uint256 KYCcount;
    bool CanAddCustomers;
    bool CanDoKYC;
}

mapping(address => BankInfo) Bank;
mapping(bytes32 => CustomerInfo) Customer;

address owner;


constructor() { 
owner = msg.sender;
}

modifier onlyCentralBank(){
    require(msg.sender == owner, "Unauthorised: Access only for Central Bank");
    _;
}

modifier onlyBank(bytes32 AdharBankAddrHash){
    require(msg.sender == Customer[AdharBankAddrHash].BankAddress, "Unauthorised: Access only for Central Bank " );
    _;
}


modifier verifyKYCPermission(){
    require(Bank[msg.sender].CanDoKYC == true, "Unauthorised: KYC Access only for permissioned banks." );
    _;
}

modifier verifyEnrollmentPermission(){
    require(Bank[msg.sender].CanAddCustomers == true, "Unauthorised: KYC Access only for permissioned banks." );
    _;
}

modifier checkIfBankExists(address _BankAddress){
    require(Bank[_BankAddress].BankAddress == address(0), "Forbidden: Bank already exists " );
    _;
}


function AddNewBank (string calldata _BankName, address _BankAddress, string calldata  _SharedPublicKey ) external 
onlyCentralBank checkIfBankExists(_BankAddress){
    require(_BankAddress != address(0), "Forbidden: Bank address can't be address(0).");
    Bank[_BankAddress] = BankInfo(_BankName, _BankAddress, _SharedPublicKey, 0, true, true );
    emit AddedBank(_BankAddress);

}

function AddNewCustomer (bytes32  AdharHash , string calldata _encryptedData ) external 
verifyEnrollmentPermission {
    bytes32 _AdharBankHash = keccak256(abi.encode(AdharHash, msg.sender));
    require(Customer[_AdharBankHash].BankAddress == address(0), "Forbidden: Customer already exists");
    Customer[_AdharBankHash] = CustomerInfo( _encryptedData, false, msg.sender);
    Bank[msg.sender].KYCcount += 1;
    emit AddedCustomer(AdharHash, msg.sender);

}

function BlockBankFromPerformingKYC(address _BankAddress) external onlyCentralBank{
    Bank[_BankAddress].CanDoKYC=false;
}

function BlockBankFromAddingCustomers(address _BankAddress) external onlyCentralBank{
    Bank[_BankAddress].CanAddCustomers = false;
}

function AllowBankforKYC(address _BankAddress) external onlyCentralBank{ 
    Bank[_BankAddress].CanDoKYC = true;
}

function AllowBankforAddingCustomers(address _BankAddress) external onlyCentralBank{ 
    Bank[_BankAddress].CanAddCustomers = true;
}


function UpdateCustomerKyc(bytes32  AdharBankAddrHash ) external verifyKYCPermission onlyBank(AdharBankAddrHash) { 
    Customer[AdharBankAddrHash].KYCstatus = true;
} 

function RetrieveCustomerData(bytes32  AdharBankAddrHash) external view returns (string memory, bool, address) {
    return  (Customer[AdharBankAddrHash].EncryptedData,
             Customer[AdharBankAddrHash].KYCstatus,
             Customer[AdharBankAddrHash].BankAddress);

}

function RetrieveBankData(address _BankAddress) external view returns (string memory, address, string memory, uint256, bool, bool ){
    return (Bank[_BankAddress].BankName, 
            Bank[_BankAddress].BankAddress,
            Bank[_BankAddress].SharedPublicKey, 
            Bank[_BankAddress].KYCcount,
            Bank[_BankAddress].CanAddCustomers,
            Bank[_BankAddress].CanDoKYC);
}

}

