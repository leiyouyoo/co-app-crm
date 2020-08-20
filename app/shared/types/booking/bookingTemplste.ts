export interface BookingTemplateEntity {
    //id
    id?:number;
    name?:string;
    incoterms?:number;
    tradeType?:number;
    freightMethodType?:number;
    shipperLocationId?:number;
    shipperTenantId?:number;
    consigneeLocationId?:number;
    consigneeTenantId?:number;
}
