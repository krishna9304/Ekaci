// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

 // ["1234", "20,200", ["to be settled by company", true], ["Rabi", "Rice", "Water logging", "Summer"], ["url1", "url2", "url3"], true, "34.7", "Natural Disaster", "2 Oct", "1 Mar", "3 Dec"]

// Deployed To: 0xe683Bf26C6f5B6577F01e059317be6eeC08C5292

contract InsuranceClaim{
   
mapping (string => individualClaim) private totalClaims;
event _setClaim(string indexed _insuranceId);
event _getClaim(string indexed _insuranceId);

function setClaim( 
     individualClaim memory obj
) public {
    individualClaim memory newObj=individualClaim(
         obj.insuranceId,
         obj.payment,
         obj.arr,
         obj.currCrop,
         obj.imageURL,
         obj.isActive,
         obj.lossPercent,
         obj.loss_type,
         obj.dateOfLoss,
         obj.createdOn, 
         obj.updatedOn);

    totalClaims[obj.insuranceId]=newObj;
   emit _setClaim(newObj.insuranceId); 
}

function getClaim(string memory _insuranceId) public returns (individualClaim memory){
   emit _getClaim(_insuranceId);
   return totalClaims[_insuranceId];
}



   struct individualClaim{
   string insuranceId;
   string payment;
   status arr;   
   cropDetails currCrop;
   string [] imageURL;
   bool isActive;
   string lossPercent; 
   string loss_type;
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



