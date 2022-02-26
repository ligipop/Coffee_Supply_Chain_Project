//Script to test smart contract: DistributorRole.sol
var SupplyChain = artifacts.require('SupplyChain');

contract('SupplyChain', function(accounts){
	//Declare constants and get dummy accounts
	var ownerID = accounts[0];
	var notYetDistributorID = accounts[1];
	var clearedID = "0x0000000000000000000000000000000000000000";


	/*console.log("ganache-cli accounts used here...")
	console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("A non owner: accounts[1] ", accounts[1])*/
   

   //1st Test - isDistributor()
   it("returns true or false (bool) if distributor or non-distributor calls isDistributor() function", async()=>{
   	//retrieved deployed contract
   	const supplyChain = await SupplyChain.deployed();
   	//ownerID is automatically assigned as a distributor during item buying (not purchasing)
   	var isDistributor = await supplyChain.isDistributor(ownerID);
   	var isNotDistributor = await supplyChain.isDistributor(notYetDistributorID);
   	//Verify results
   	assert.equal(isDistributor, true, "Error: this account is not a Distributor");
   	assert.equal(isNotDistributor, false, "Error: this account IS a Distributor");
   });


   //2nd Test - addDistributor()
   it("adds a non-distributor address as a distributor", async()=>{
   	//retrieve deployed contract
   	const supplyChain = await SupplyChain.deployed();
   	//add a non-distributor as a distributor
   	await supplyChain.addDistributor(notYetDistributorID);
   	//check to see if the new distributor has been added
   	var newDistributorAdded = await supplyChain.isDistributor(notYetDistributorID);
   	//Verify results
   	assert.equal(newDistributorAdded, true, "Error: the new distributor address was not added");
   });


   //3rd Test - renounceDistributor()
   it("removes a distributor", async()=>{
    //retrieve deployed contract
    const supplyChain = await SupplyChain.deployed();
    //checks to see if msg.sender/owner is currently a distributor
    const isDistributor = await supplyChain.isDistributor(ownerID);
    //remove the msg.sender (contract owner here) as a distributor
    await supplyChain.renounceDistributor();
    //check to see if the distributor has been removed
    var isDistributorAfterRemoval = await supplyChain.isDistributor(ownerID);
    //Verify results
    assert.equal(isDistributor, true, "Error: owner is not a distributor prior to removal");
    assert.equal(isDistributorAfterRemoval, false, "Error: the distributor has not been removed");
   });

});