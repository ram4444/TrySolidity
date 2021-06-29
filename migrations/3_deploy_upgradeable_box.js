const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Box = artifacts.require('Box');

module.exports = async function (deployer) {
  const instance = await deployProxy(Box, [42], { deployer });
  console.log('Deployed', instance.address);
  //-----------------NEXT time---------------
  const existing = await Box.deployed();
  const instance = await upgradeProxy(existing.address, BoxV2, { deployer });
  console.log("Upgraded", instance.address);
};