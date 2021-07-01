const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const TestUpgradable = artifacts.require('TestUpgradable');
const TestUpgradableV2 = artifacts.require('TestUpgradableV2');

module.exports = async function (deployer) {
  //const instance = await deployProxy(TestUpgradable, [42], { deployer });
  const instance = await deployProxy(TestUpgradable, { deployer });
  console.log('Deployed', instance.address);
  //-----------------NEXT time---------------
  const existing = await TestUpgradable.deployed();
  const instance2 = await upgradeProxy(existing.address, TestUpgradableV2, { deployer });
  console.log("Upgraded", instance2.address);
};