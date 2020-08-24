import { CreateOrUpdateCustomerInput } from './CreateOrUpdateCustomerInput';

export interface CreateOrUpdatePartnerInput {
    partnerName?:string;
    customerId?:any;
    partnerId?:any;
    partnerCustomer:CreateOrUpdateCustomerInput;
}