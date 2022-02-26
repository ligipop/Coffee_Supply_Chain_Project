//Script to test smart contract: Ownable.sol

var SupplyChain = artifacts.require('SupplyChain');

contract('SupplyChain', function(accounts){
	//Declare constants and get dummy accounts
	var ownerID = accounts[0];
	var nonOwnerID = accounts[1];
	var clearedID = "0x0000000000000000000000000000000000000000";
   


   //1st Test
   it("returns the original owner from the owner() function", async()=>{
   	const supplyChain = await SupplyChain.deployed();
   	var retrievedOwner = await supplyChain.owner();
   	//Verify results
   	assert.equal(retrievedOwner, ownerID, "Error: this account is not the contract creator");

   });


   //2nd Test
   it("returns true (bool) if isOwner() function caller is the contract owner", async()=>{
   	const supplyChain = await SupplyChain.deployed();
   	var isOwner = await supplyChain.isOwner();
   	//Verify results
   	assert.equal(isOwner, true, "Error: the contract owner did not call this function");
   });


   //3rd Test - test transferOwnership() function
   it("transfers the contract ownership", async()=>{
   	const supplyChain = await SupplyChain.deployed();
   	//Transfer ownership to a non-current owner address
   	await supplyChain.transferOwnership(nonOwnerID);
   	//Get the new owner
   	var newOwner = await supplyChain.owner();
   	//Verify results
   	assert.equal(newOwner, nonOwnerID, "Error: the contract ownership was not transferred");
   });


   //4th Test - test renounceOwnership() function
   it("renounces contract ownership of current owner", async()=>{
   	const supplyChain = await SupplyChain.deployed();
   	//Sending from 'nonOwnerID' because that is the new contract owner after transferOwnership() test:
   	await supplyChain.renounceOwnership({from: nonOwnerID});
   	var retrievedClearedOwner = await supplyChain.owner();
   	//Verify results
   	assert.equal(retrievedClearedOwner, clearedID, "Error: the contract owner was not renounced");
   });


});