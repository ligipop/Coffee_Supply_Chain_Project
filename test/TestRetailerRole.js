//Script to test smart contract: RetailerRole.sol
var SupplyChain = artifacts.require('SupplyChain');

contract('SupplyChain', function(accounts){
	//Declare constants and get dummy accounts
	var ownerID = accounts[0];
	var notYetRetailerID = accounts[1];
	var clearedID = "0x0000000000000000000000000000000000000000";


	/*console.log("ganache-cli accounts used here...")
	console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("A non owner: accounts[1] ", accounts[1])*/
   

   //1st Test - isRetailer()
   it("returns true or false (bool) if retailer or non-retailer calls isRetailer() function", async()=>{
   	//retrieved deployed contract
   	const supplyChain = await SupplyChain.deployed();
   	//ownerID is automatically assigned as a retailer during receiving item
   	var isRetailer = await supplyChain.isRetailer(ownerID);
   	var isNotRetailer = await supplyChain.isRetailer(notYetRetailerID);
   	//Verify results
   	assert.equal(isRetailer, true, "Error: this account is not a Retailer");
   	assert.equal(isNotRetailer, false, "Error: this account IS a Retailer");
   });


   //2nd Test - addRetailer()
   it("adds a non-retailer address as a retailer", async()=>{
   	//retrieve deployed contract
   	const supplyChain = await SupplyChain.deployed();
   	//add a non-retailer as a retailer
   	await supplyChain.addRetailer(notYetRetailerID);
   	//check to see if the new retailer has been added
   	var newRetailerAdded = await supplyChain.isRetailer(notYetRetailerID);
   	//Verify results
   	assert.equal(newRetailerAdded, true, "Error: the new retailer address was not added");
   });


   //3rd Test - renounceRetailer()
   it("removes a retailer", async()=>{
    //retrieve deployed contract
    const supplyChain = await SupplyChain.deployed();
    //checks to see if msg.sender/owner is currently a retailer
    const isRetailer = await supplyChain.isRetailer(ownerID);
    //remove the msg.sender (contract owner here) as a retailer
    await supplyChain.renounceRetailer();
    //check to see if the retailer has been removed
    var isRetailerAfterRemoval = await supplyChain.isRetailer(ownerID);
    //Verify results
    assert.equal(isRetailer, true, "Error: owner is not a retailer prior to removal");
    assert.equal(isRetailerAfterRemoval, false, "Error: the retailer has not been removed");
   });

});