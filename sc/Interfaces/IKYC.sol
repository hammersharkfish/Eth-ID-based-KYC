//SPDX-License-Identifier: 	CC-BY-4.0
//Author - rajvardhantakle@gmail.com , https://github.com/hammersharkfish

pragma solidity >= 0.8.17;

interface IKYC {
    event AddedCustomer(bytes32 indexed _AdharHash, address indexed _address);
    event AddedBank(address indexed _address);

    function AddNewBank(string memory _BankName, address _BankAddress, string memory _SharedPublicKey) external;
    function AddNewCustomer (bytes32  AdharHash , string memory _encryptedData ) external;
    function BlockBankFromPerformingKYC(address _BankAddress) external ;
    function BlockBankFromAddingCustomers(address _BankAddress) external ;
    function AllowBankforKYC(address _BankAddress) external ;
    function AllowBankforAddingCustomers(address _BankAddress) external ;
    function UpdateCustomerKyc(bytes32  AdharBankAddrHash ) external ;
    function RetrieveCustomerData(bytes32  AdharBankAddrHash) external returns (string memory, bool , address );
    function RetrieveBankData(address _BankAddress) external view returns (string memory, address, string memory, uint256 , bool , bool  );

}