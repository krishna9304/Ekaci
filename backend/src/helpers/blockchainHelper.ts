import { ClaimInterface } from "../database/models/claim.model";

export const claimObjTranslation = (claim:ClaimInterface)=>{
     
    let boolArr = [true, false, false, false, false,false,false];

    let arr = [ claim.insurance_id, 
         claim.claimant_id, 
         claim.payments,
         boolArr,
         claim.crop_details, 
         claim.site_images,
         claim.is_active,
         claim.loss_percent,
         claim.loss_type, 
         claim.date_of_loss,
         claim.created_on,
         claim.updated_on];




}