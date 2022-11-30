var InsuranceClaim = artifacts.require("./InsuranceClaim.sol");

module.exports = function(deployer) {
  deployer.deploy(InsuranceClaim);
};
