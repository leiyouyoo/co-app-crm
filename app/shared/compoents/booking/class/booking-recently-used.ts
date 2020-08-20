export interface RecentlyUsed {
  recentBooking:     RecentBooking;
  originPorts:       NPort[];
  destinationPorts:  NPort[];
  fbaAddresses:      FbaAddress[];
  recentFbaChannels: RecentFbaChannel[];
}

interface NPort {
  id:          number;
  code:        string;
  name:        string;
  fullName:    string;
  regionId:    number;
  regionName:  string;
  countryName: string;
}

interface FbaAddress {
  id:                number;
  zip:               string;
  streetAddress:     string;
  streetAddress2:    string;
  name:              string;
  country:           string;
  province:          string;
  city:              string;
  viewableType:      number;
  partnerId:         number;
  customerId:        number;
  tenantName:        string;
  unlocode:          string;
  isVerifiedCompany: boolean;
}

interface RecentBooking {
  bookingNo:                     string;
  isQuoteConfirmed:              boolean;
  isShowQuote:                   boolean;
  cancelReason:                  number;
  cancelRemark:                  string;
  shipmentNo:                    string;
  quoteEnquiryId:                number;
  status:                        number;
  customsDeclarationDocumentIds: string[];
  isCustomerUpdate:              boolean;
  customerUpdateLastDataJson:    string;
  lastData:                      LastData;
  bookingTemplateId:             number;
  purchaseOrderIds:              number[];
  incotermsString:               string;
  quantityUnitString:            string;
  weightUnitString:              string;
  volumeUnitString:              string;
  quantityUnitCode:              string;
  weightUnitCode:                string;
  volumeUnitCode:                string;
  originPort:                    NPort;
  destinationPort:               NPort;
  shipperAddress:                Address;
  consigneeAddress:              Address;
  deliveryWarehouse:             FbaAddress;
  pickUpAddress:                 Address;
  originAddress:                 Address;
  destinationAddress:            Address;
  deliveryTimeRange:             string;
  pickUpTimeRange:               string;
  contactName:                   string;
  contactPhone:                  string;
  fbaFreightMethodCode:          string;
  fbaFreightMethodString:        string;
  channelString:                 string;
  cusClearanceInvoices:          CusClearanceInvoice[];
  packingLists:                  PackingList[];
  serviceCompanyId:              number;
  quantity:                      number;
  quantityUnitId:                number;
  weight:                        number;
  weightUnitId:                  number;
  volume:                        number;
  volumeUnitId:                  number;
  unitConvertType:               number;
  isContainsSpecialGoods:        boolean;
  containsSpecialGoodsTypes:     string;
  description:                   string;
  specialInstructions:           string;
  containerType:                 string;
  declareCurrencyId:             number;
  name:                          string;
  consigneeLocationId:           string;
  consigneeCustomerId:           string;
  consigneePartnerId:            string;
  shipperLocationId:             string;
  shipperCustomerId:             string;
  shipperPartnerId:              string;
  cargoReadyDate:                Date;
  incotermsId:                   number;
  tradeType:                     number;
  freightType:                   number;
  freightMethodType:             number;
  shipmentType:                  number;
  originPortId:                  number;
  originIsRequireTruck:          boolean;
  originAddressId:               string;
  isDeclaration:                 boolean;
  isInsurance:                   boolean;
  destinationPortId:             string;
  destinationAddressId:          string;
  deliveryDate:                  Date;
  destinationIsRequireTruck:     boolean;
  isClearance:                   boolean;
  isTaxIncluded:                 boolean;
  contactId:                     number;
  deliveryMethodType:            number;
  deliveryWarehouseId:           number;
  fbaFreightMethodId:            number;
  channelId:                     number;
  customerId:                    number;
  id:                            number;
  creationTime:                  Date;
  creatorUserId:                 number;
  lastModificationTime:          Date;
  lastModifierUserId:            number;
  deletionTime:                  Date;
  deleterUserId:                 number;
  isDeleted:                     boolean;
}

interface Address {
  id:             number;
  country:        string;
  province:       string;
  city:           string;
  streetAddress:  string;
  streetAddress2: string;
  name:           string;
  tenantName:     string;
}

interface CusClearanceInvoice {
  bookingId:             number;
  cusClearanceProductId: number;
  referenceId:           string;
  fbaNo:                 string;
  sku:                   string;
  quantity:              number;
  unitId:                number;
  unitPriceValue:        number;
  unitPriceUnitId:       number;
  totalPriceValue:       number;
  totalPriceUnitId:      number;
  commodityEnglishDesc:  string;
  commodityChineseDesc:  string;
  brand:                 string;
  material:              string;
  uses:                  string;
  hsCode:                string;
  asin:                  string;
  isContainsBattery:     boolean;
  model:                 string;
  imageId:               string;
  id:                    number;
}

interface LastData {
  originPort:          NPort;
  destinationPort:     NPort;
  shipperAddress:      Address;
  consigneeAddress:    Address;
  cargoReadyDate:      Date;
  freightType:         number;
  tradeType:           number;
  incotermsString:     string;
  containerType:       string;
  quantityUnitString:  string;
  weightUnitString:    string;
  volumeUnitString:    string;
  quantity:            number;
  weight:              number;
  volume:              number;
  description:         string;
  specialInstructions: string;
}

interface PackingList {
  packageNo:             string;
  fbaNo:                 string;
  codeRules:             string;
  startNo:               string;
  endNo:                 string;
  grossWeight:           number;
  grossWeightUnitId:     number;
  grossWeightUnitString: string;
  netWeight:             number;
  netWeightUnitId:       number;
  netWeightUnitString:   string;
  dimensions:            string;
  dimensionsUnitId:      number;
  dimensionsUnitString:  string;
  bookingId:             number;
  packingListItems:      PackingListItem[];
  id:                    number;
}

interface PackingListItem {
  packingListId:        number;
  sku:                  string;
  quantities:           number;
  totalQuantities:      number;
  commodityChineseDesc: string;
  id:                   number;
}

interface RecentFbaChannel {
  isTaxIncluded:          boolean;
  fbaFreightMethodString: string;
  fbaFreightMethodId:     number;
  channelId:              number;
  channelString:          string;
}
