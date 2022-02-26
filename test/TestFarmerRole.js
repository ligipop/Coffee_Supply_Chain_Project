//Script to test smart contract: FarmerRole.sol
var SupplyChain = artifacts.require('SupplyChain');

contract('SupplyChain', function(accounts){
	//Declare constants and get dummy accounts
	var ownerID = accounts[0];
	var notYetFarmerID = accounts[1];
	var clearedID = "0x0000000000000000000000000000000000000000";


	/*console.log("ganache-cli accounts used here...")
	console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("A non owner: accounts[1] ", accounts[1])*/
   

   //1st Test - isFarmer()
   it("returns true or false (bool) if farmer or non-farmer calls isFarmer() function", async()=>{
   	//retrieved deployed contract
   	const supplyChain = await SupplyChain.deployed();
   	//ownerID is automatically assigned as a farmer during contract creation
   	var isFarmer = await supplyChain.isFarmer(ownerID);
   	var isNotFarmer = await supplyChain.isFarmer(notYetFarmerID);
   	//Verify results
   	assert.equal(isFarmer, true, "Error: this account is not a farmer");
   	assert.equal(isNotFarmer, false, "Error: this account IS a farmer");
   });


   //2nd Test - addFarmer()
   it("adds a non-farmer address as a farmer", async()=>{
   	//retrieve deployed contract
   	const supplyChain = await SupplyChain.deployed();
   	//add a non-farmer as a farmer
   	await supplyChain.addFarmer(notYetFarmerID);
   	//check to see if the new farmer has been added
   	var newFarmerAdded = await supplyChain.isFarmer(notYetFarmerID);
   	//Verify results
   	assert.equal(newFarmerAdded, true, "Error: the new farmer address was not added");
   });


   //3rd Test - renounceFarmer()
   it("removes a farmer", async()=>{
   	//retrieve deployed contract
   	const supplyChain = await SupplyChain.deployed();
   	//checks to see if msg.sender/owner is currently a farmer
   	const isFarmer = await supplyChain.isFarmer(ownerID);
   	//remove the msg.sender (contract owner here) as a farmer
   	await supplyChain.renounceFarmer();
   	//check to see if the farmer has been removed
   	var isFarmerAfterRemoval = await supplyChain.isFarmer(ownerID);
   	//Verify results
   	assert.equal(isFarmer, true, "Error: owner is not a farmer prior to removal");
   	assert.equal(isFarmerAfterRemoval, false, "Error: the farmer has not been removed");
   });

});