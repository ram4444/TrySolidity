const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const TestUpgradable = artifacts.require('TestUpgradable');
const TestUpgradableV2 = artifacts.require('TestUpgradableV2');

describe('Testing upgradable Contract', () => {
  it('works', async () => {
    const testUpgradable = await deployProxy(TestUpgradable, [42]);
    const valueV1X = await testUpgradable.x();
    const valueV1Y = await testUpgradable.y();
    // z is not defined before upgrade
    //const valueV1Z = await testUpgradable.z();

    assert.equal(valueV1X.toString(), '42');
    assert.equal(valueV1Y.toString(), '52');
    
    const testUpgradable2 = await upgradeProxy(testUpgradable.address, TestUpgradableV2, [49]);
    const valueV2X = await testUpgradable2.x();
    const valueV2Y = await testUpgradable2.y();
    const valueV2Z = await testUpgradable2.z();
    //The following is verify as incorrect for following reason
    //assert.equal(valueV2X.toString(), '49'); // upgrade will not call the initialze(), even it is provided
    //assert.equal(valueV2Y.toString(), '55'); // even V2 define y as 55, the original value remains unchanged
    //assert.equal(valueV2Z.toString(), '77'); // initialize() is not called
    
    //testUpgradable2.initialize(47); //Your cannot initialize again
    testUpgradable2.assign();
    const valueV2X_after = await testUpgradable2.x();
    const valueV2Y_after = await testUpgradable2.y();
    const valueV2Z_after = await testUpgradable2.z();
    assert.equal(valueV2X_after.toString(), '47'); 
    assert.equal(valueV2Y_after.toString(), '59'); 
    assert.equal(valueV2Z_after.toString(), '77'); 
  });
});