export interface BookingTemplateEntity {
  //id
  id?: number;
  name?: string;
  incotermsId?: number;
  tradeType?: number;
  freightMethodType?: number;
  shipperPartnerId?: string;
  shipperCustomerId?: string;
  consigneePartnerId?: string;
  consigneeCustomerId?: string;
  destinationAddressId?: number;
  destinationPortId?: number;
  originPortId?: number;
  isContainsSpecialGoods?: boolean;
}
