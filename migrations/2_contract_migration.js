//var ContractClass = artifacts.require("./ContractClass.sol");
var CrossContractCaller = artifacts.require("./CrossContractCaller.sol");
var CrossContractCallBase = artifacts.require("./CrossContractCallBase.sol");

module.exports = function(deployer) {
  //deployer.deploy(ContractClass);

  
  deployer.deploy(CrossContractCallBase).then(function() {
    return deployer.deploy(CrossContractCaller, CrossContractCallBase.address);
  });
  
};
