const TestPayable = artifacts.require('TestPayable');

//npm install chai
//Import Library
const chai = require('chai');
const expect = require('chai').expect; 

contract("TestPayable", (accounts) => {
  let [alice, bob] = accounts;

  let contractInstance3;

  //run automatically for every test
  beforeEach(async () => {
    
      contractInstance3 = await TestPayable.new();

  });

  it("should be able to call TestPayabele contract", async () => {
      console.log(contractInstance3.address);
      //const result = await contractInstance._method1( {from: alice});
      //expect(result.receipt.status).to.equal(true);
      //expect(result.logs[0].args._test).to.equal("abc");
  })
})
