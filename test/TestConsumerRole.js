//Script to test smart contract: ConsumerRole.sol
var SupplyChain = artifacts.require('SupplyChain');

contract('SupplyChain', function(accounts){
	//Declare constants and get dummy accounts
	var ownerID = accounts[0];
	var notYetConsumerID = accounts[1];
	var clearedID = "0x0000000000000000000000000000000000000000";


	/*console.log("ganache-cli accounts used here...")
	console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("A non owner: accounts[1] ", accounts[1])*/
   

   //1st Test - isConsumer()
   it("returns true or false (bool) if consumer or non-consumer calls isConsumer() function", async()=>{
   	//retrieved deployed contract
   	const supplyChain = await SupplyChain.deployed();
   	//ownerID is automatically assigned as a consumer during item purchasing (not buying)
   	var isConsumer = await supplyChain.isConsumer(ownerID);
   	var isNotConsumer = await supplyChain.isConsumer(notYetConsumerID);
   	//Verify results
   	assert.equal(isConsumer, true, "Error: this account is not a Consumer");
   	assert.equal(isNotConsumer, false, "Error: this account IS a Consumer");
   });


   //2nd Test - addConsumer()
   it("adds a non-consumer address as a consumer", async()=>{
   	//retrieve deployed contract
   	const supplyChain = await SupplyChain.deployed();
   	//add a non-consumer as a consumer
   	await supplyChain.addConsumer(notYetConsumerID);
   	//check to see if the new consumer has been added
   	var newConsumerAdded = await supplyChain.isConsumer(notYetConsumerID);
   	//Verify results
   	assert.equal(newConsumerAdded, true, "Error: the new farmer address was not added");
   });


   //3rd Test - renounceConsumer()
   it("removes a consumer", async()=>{
    //retrieve deployed contract
    const supplyChain = await SupplyChain.deployed();
    //checks to see if msg.sender/owner is currently a consumer
    const isConsumer = await supplyChain.isConsumer(ownerID);
    //remove the msg.sender (contract owner here) as a consumer
    await supplyChain.renounceConsumer();
    //check to see if the consumer has been removed
    var isConsumerAfterRemoval = await supplyChain.isConsumer(ownerID);
    //Verify results
    assert.equal(isConsumer, true, "Error: owner is not a consumer prior to removal");
    assert.equal(isConsumerAfterRemoval, false, "Error: the consumer has not been removed");
   });

});