export interface BookingEntity {
  id?: string;
  freightMethodType?: number;
  shipmentType?: number;
  originPortId?: string;
  cargoReadyDate?: Date;
  originIsRequireTruck?: boolean;
  originAddressId?: string;
  originAddress?: ShipperAddress;
  originPort?: any;
  destinationPort?: any;
  destinationAddress?: ShipperAddress;
  deliveryWarehouse?: ShipperAddress;
  isDeclaration?: boolean;
  isInsurance?: boolean;
  icpDownloaded?: boolean;
  destinationPortId?: string;
  deliveryDate?: string;
  destinationIsRequireTruck?: boolean;
  destinationAddressId?: string;
  isClearance?: boolean;
  isTaxIncluded?: boolean;
  name?: string;
  bookingNo?: string;
  serviceCompanyId?: string;
  incotermsId?: number;
  tradeType?: 0 | 1 | 2 | 3;
  consigneeLocationId?: string;
  consigneeCustomerId?: string;
  consigneeCustomerName?: string;
  shipperLocationId?: string;
  shipperCustomerId?: string;
  shipperCustomerName?: string;
  cancelReason?: number;
  cancelRemark?: string;
  quantity?: number;
  quantityUnitCode?: string;
  quantityUnitString?: string;
  weight?: number;
  weightUnitCode?: string;
  weightUnitString?: string;
  volume?: number;
  volumeUnitCode?: string;
  volumeUnitString?: string;
  dimensions?: string;
  dimensionsUnitId?: number;
  dimensionsUnitString?: string;
  unitConvertType?: number; //单位类型
  isContainsSpecialGoods?: boolean;
  unContainsSpecialGoods?: boolean;
  containsSpecialGoodsTypes?: string;
  description?: string;
  specialInstructions?: string;
  containerType?: string; //箱型规格保存json字符串，如 [ {name:20GP,value:1},{name:40GP,value2} ]
  shipmentNo?: string; //由业务员绑定运输单号
  quoteEnquiryId?: string; //由业务员绑定询价Id
  status?: number; //预订状态(枚举)
  bookingTemplateId?: string; //模板Id
  purchaseOrderIds?: Array<number>; //PO号Id逗号分开
  fbaFreightMethodId?: string;
  deliveryWarehouseId?: number;
  deliveryMethodType?: number;
  contactId?: number;
  declareCurrencyId?: number;
  contactPerson?: any;
  deliveryTimeRange?: string;
  pickUpTimeRange?: string;
  channelId?: number;
  cusClearanceInvoices?: Array<cusClearanceInvoices>;
  packingLists?: Array<packingLists>;
  customsDeclarationDocumentId?: number;
  incotermsString?: string;
  customsDeclarationDocumentIds?: string[];
  shipperAddress?: ShipperAddress;
  consigneeAddress?: ShipperAddress;
  isShowQuote?: boolean;
  shipperPartnerId?: string;
  consigneePartnerId?: string;
}

export interface packingLists {
  id: number;
  packageNo?: string;
  fbaNo?: string;
  codeRules?: string;
  startNo?: string;
  endNo?: string;
  grossWeight?: number;
  grossWeightUnitId?: number;
  grossWeightUnitString?: string;
  netWeight?: number;
  netWeightUnitId?: number;
  netWeightUnitString?: string;
  dimensions?: string;
  dimensionsUnitId?: number;
  dimensionsUnitString?: string;
  bookingId?: number;
  packingListItems?: Array<packingListItems>;
  NO?: number;
  long?: number;
  width?: number;
  height?: number;
}

export interface packingListItems {
  packingListId?: number;
  sku?: string;
  quantities?: number;
  id?: number;
  commodityChineseDesc?: string;
  remainder?: number;
  totalQuantities: number;
}

export interface cusClearanceInvoices {
  bookingId?: number; // 订舱单Id
  cusClearanceProductId?: number; //对应产品Id
  referenceId?: string; //参考Id
  fbaNo?: string; //FBA号(联合主键)
  sku?: string;
  quantity?: number;
  unitId?: number;
  unitPriceValue?: number;
  unitPriceUnitId?: number;
  totalPriceValue?: number;
  totalPriceUnitId?: number;
  commodityEnglishDesc?: string;
  commodityChineseDesc?: string;
  brand?: string;
  material?: string;
  uses?: string;
  hsCode?: string;
  asin?: string;
  isContainsBattery?: boolean;
  model?: string;
  imageId?: number;
  id?: number;
  NO?: number;
  isShow?: boolean;
}

export interface cargo {
  grossWeight?: number;
  grossWeightUnitId?: number;
  grossWeightUnitStr?: string;
  netWeight?: number;
  netWeightUnitId?: number;
  netWeightUnitStr?: string;
  dimensions?: string;
  dimensionsUnitId?: number;
  dimensionsUnitStr?: number;
  long?: number;
  width?: number;
  height?: number;
}

interface ShipperAddress {
  id: number;
  country: string;
  province: string;
  city?: any;
  streetAddress: string;
  streetAddress2?: any;
  name: string;
  tenantName?: any;
}
