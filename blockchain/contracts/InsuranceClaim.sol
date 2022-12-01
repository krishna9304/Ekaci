// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

/*
1. ["1234","claimantID", "20,200", [true,false,false], ["Rabi", "Rice", "Water logging", "Summer"], ["url1", "url2", "url3"], true, "34.7", "Natural Disaster", "2 Oct", "1 Mar", "3 Dec"]
2. 1234,20,200,to be settled by company,true,Rabi,Rice,Water logging,Summer,url1,url2,url3,true,34.7,Natural Disaster,2 Oct,1 Mar,3 Dec
3. 1234,0x,0x,true,0x,0x,0x,0x,0x,true,0x,0x,0x,0x,0x
*/

contract InsuranceClaim{
   
mapping (string => individualClaim) private totalClaims;

individualClaim [] private claimArray;

event _setClaim(string indexed _insuranceId);
event _getClaim(string indexed _insuranceId);

function setClaim( 
     individualClaim memory obj
) public {
    individualClaim memory newObj=individualClaim(
         obj.insuranceId,
         obj.claimantId,
         obj.payment,
         obj.currStatus,
         obj.currCrop,
         obj.imageURL,
         obj.isActive,
         obj.lossPercent,
         obj.lossType,
         obj.dateOfLoss,
         obj.createdOn, 
         obj.updatedOn);

    totalClaims[obj.insuranceId]=newObj;
    claimArray.push(newObj);
   emit _setClaim(newObj.insuranceId); 
}

function getClaim(string memory _insuranceId) public returns (individualClaim memory){
   emit _getClaim(_insuranceId);
   return totalClaims[_insuranceId];
}


function getTotalClaim() public view returns (individualClaim [] memory){
   return claimArray;
}


function isSettled(string memory insuranceId) public {
 
 totalClaims[insuranceId].isActive = false;

for(uint i=0; i<claimArray.length;i++){
    string memory currId=claimArray[i].insuranceId;
  
  if (keccak256(abi.encodePacked(currId)) == keccak256(abi.encodePacked(insuranceId))) {
   claimArray[i].isActive=false;
    break;
   } }
}



// ---------------------- UPDATE FUNCTIONS ----------------------


function updatePayment(string memory insuranceId, string memory payment) public {
   
   totalClaims[insuranceId].payment=payment;

   uint n = claimArray.length;

for(uint i=0; i<n;i++){
   string memory currId=claimArray[i].insuranceId;
  
  if (keccak256(abi.encodePacked(currId)) == keccak256(abi.encodePacked(insuranceId))) {
    claimArray[i].payment=payment;
    break;
   }
} }


function updateStatus(string memory insuranceId) public {
   
   bool [] memory tempArray = totalClaims[insuranceId].currStatus;

  for(uint i=0;i<tempArray.length;i++){
     if(tempArray[i]==false){
        tempArray[i]=true;
        break;
     }
  }

totalClaims[insuranceId].currStatus=tempArray;

uint n = claimArray.length;

for(uint i=0; i<n;i++){
   string memory currId=claimArray[i].insuranceId;
 
  if (keccak256(abi.encodePacked(currId)) == keccak256(abi.encodePacked(insuranceId))) {
    claimArray[i].currStatus=tempArray;
    break;
   }
}}



function updateCurrCrop(string memory insuranceId, cropDetails memory currCrop) public {
   
   totalClaims[insuranceId].currCrop=currCrop;
   uint n = claimArray.length;

for(uint i=0; i<n;i++){
   string memory currId=claimArray[i].insuranceId;
 
  if (keccak256(abi.encodePacked(currId)) == keccak256(abi.encodePacked(insuranceId))) {
    claimArray[i].currCrop=currCrop;
    break;
   }
}}


function updateImageURL(string memory insuranceId, string[] memory imageURL) public {
   
   totalClaims[insuranceId].imageURL=imageURL;
   uint n = claimArray.length;

for(uint i=0; i<n;i++){
   string memory currId=claimArray[i].insuranceId;
 
  if (keccak256(abi.encodePacked(currId)) == keccak256(abi.encodePacked(insuranceId))) {
    claimArray[i].imageURL=imageURL;
    break;
   } 
} }


function updateisActive(string memory insuranceId, bool isActive) public {
   
   totalClaims[insuranceId].isActive=isActive;
   uint n = claimArray.length;

for(uint i=0; i<n;i++){
   string memory currId=claimArray[i].insuranceId;
 
  if (keccak256(abi.encodePacked(currId)) == keccak256(abi.encodePacked(insuranceId))) {
    claimArray[i].isActive=isActive;
    break;
   } 
} }


function updatelossPercent(string memory insuranceId, string memory lossPercent) public {
   
   totalClaims[insuranceId].lossPercent=lossPercent;
   uint n = claimArray.length;

for(uint i=0; i<n;i++){
   string memory currId=claimArray[i].insuranceId;
 
  if (keccak256(abi.encodePacked(currId)) == keccak256(abi.encodePacked(insuranceId))) {
    claimArray[i].lossPercent=lossPercent;
    break;
   } 
} }


function updatelossType(string memory insuranceId, string memory lossType) public {
   
   totalClaims[insuranceId].lossType=lossType;
   uint n = claimArray.length;

for(uint i=0; i<n;i++){
   string memory currId=claimArray[i].insuranceId;
 
  if (keccak256(abi.encodePacked(currId)) == keccak256(abi.encodePacked(insuranceId))) {
    claimArray[i].lossType=lossType;
    break;
   } 
} }


function updatedateOfLoss(string memory insuranceId, string memory dateOfLoss) public {
   
   totalClaims[insuranceId].dateOfLoss=dateOfLoss;
   uint n = claimArray.length;

for(uint i=0; i<n;i++){
   string memory currId=claimArray[i].insuranceId;
 
  if (keccak256(abi.encodePacked(currId)) == keccak256(abi.encodePacked(insuranceId))) {
    claimArray[i].dateOfLoss=dateOfLoss;
    break;
   } 
} }

function updatecreatedOn(string memory insuranceId, string memory createdOn) public {
   
   totalClaims[insuranceId].createdOn=createdOn;
   uint n = claimArray.length;

for(uint i=0; i<n;i++){
   string memory currId=claimArray[i].insuranceId;
 
  if (keccak256(abi.encodePacked(currId)) == keccak256(abi.encodePacked(insuranceId))) {
    claimArray[i].createdOn=createdOn;
    break;
   } 
} }


function updateupdatedOn(string memory insuranceId, string memory updatedOn) public {
   
   totalClaims[insuranceId].updatedOn=updatedOn;
   uint n = claimArray.length;

for(uint i=0; i<n;i++){
   string memory currId=claimArray[i].insuranceId;
 
  if (keccak256(abi.encodePacked(currId)) == keccak256(abi.encodePacked(insuranceId))) {
    claimArray[i].updatedOn=updatedOn;
    break;
   } 
} }


//   ----------------- STRUCTS ----------------------

   struct individualClaim{

   string insuranceId;
   string claimantId;
   string payment;
   bool [] currStatus;   
   cropDetails currCrop;
   string [] imageURL;
   bool isActive;
   string lossPercent; 
   string lossType;
   string dateOfLoss;
   string createdOn;
   string updatedOn;

   }

   struct status{
      string stage_name;
      bool passed;
   }
  
  struct cropDetails{
      string cropType;
      string cropName;
      string irrigationMethod;
      string season;
  }

}
