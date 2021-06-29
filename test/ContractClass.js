const ContractClass = artifacts.require("ContractClass");

//Import Library
var expect = require('chai').expect; //npm install chai

//Import js
const utils = require("./helpers/utils");
const time = require("./helpers/time");

const zombieNames = ["Zombie 1", "Zombie 2"];

//Run 
//truffle test
//to show the test result
contract("ContractClass", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    
    //run automatically for every test
    beforeEach(async () => {
        contractInstance = await ContractClass.new();
    });

    //Test Functions
    /* 
    it("should be able to create a new zombie", async () => {
        //Output is stored in result
        const result = await contractInstance.functionName(para, {from: <msg.sender>});
        //result.tx
        //result.receipt
        
        const zombieId = result.logs[0].args.zombieId.toNumber();

        //Chai validation
        expect(result.logs[0].args.name).to.equal("something");
        something.should.be.a("string");
        // https://www.chaijs.com/guide/

        //By assert
        assert.typeOf(lessonTitle, "string");



        // Force Time to elapse
        await time.increase(time.duration.days(1));
    })
    //Add x to skip
    xcontext("with the single-step transfer scenario", async () => {
    
    })
        */
    it("should be able to create a new zombie", async () => {
        const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        expect(result.receipt.status).to.equal(true);
        expect(result.logs[0].args.name).to.equal(zombieNames[0]);
    })
    it("should not allow two zombies", async () => {
        await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        await utils.shouldThrow(contractInstance.createRandomZombie(zombieNames[1], {from: alice}));
    })
    context("with the single-step transfer scenario", async () => {
        it("should transfer a zombie", async () => {
            const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
            const zombieId = result.logs[0].args.zombieId.toNumber();
            await contractInstance.transferFrom(alice, bob, zombieId, {from: alice});
            const newOwner = await contractInstance.ownerOf(zombieId);
            expect(newOwner).to.equal(bob);
        })
    })
    context("with the two-step transfer scenario", async () => {
        it("should approve and then transfer a zombie when the approved address calls transferFrom", async () => {
            const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
            const zombieId = result.logs[0].args.zombieId.toNumber();
            await contractInstance.approve(bob, zombieId, {from: alice});
            await contractInstance.transferFrom(alice, bob, zombieId, {from: bob});
            const newOwner = await contractInstance.ownerOf(zombieId);
            expect(newOwner).to.equal(bob);
        })
        it("should approve and then transfer a zombie when the owner calls transferFrom", async () => {
            const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
            const zombieId = result.logs[0].args.zombieId.toNumber();
            await contractInstance.approve(bob, zombieId, {from: alice});
            await contractInstance.transferFrom(alice, bob, zombieId, {from: alice});
            const newOwner = await contractInstance.ownerOf(zombieId);
            expect(newOwner).to.equal(bob);
         })
    })
    it("zombies should be able to attack another zombie", async () => {
        let result;
        result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        const firstZombieId = result.logs[0].args.zombieId.toNumber();
        result = await contractInstance.createRandomZombie(zombieNames[1], {from: bob});
        const secondZombieId = result.logs[0].args.zombieId.toNumber();
        await time.increase(time.duration.days(1));
        await contractInstance.attack(firstZombieId, secondZombieId, {from: alice});
        expect(result.receipt.status).to.equal(true);
    })
})
