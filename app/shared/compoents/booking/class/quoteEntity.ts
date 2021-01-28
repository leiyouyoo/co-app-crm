export interface QuoteEnquiry {
  quoteNo?: string;
  bookngId?: string;
  id?: string;
  name?: string;
  freightMethodType?: number;
  shipmentType?: number;
  originPortId?: string;
  cargoReadyDate?: Date;
  originIsRequireTruck?: boolean;
  originAddress?: any;
  originAddressId?: string;
  originCityId?:string;
  desinationCityId?:string;
  originAddressName?: string;
  truckOriginAddress?: string;
  originPort?: any;
  destinationPort?: any;
  truckDestinationAddress?: string;
  destinationAddress?: any;
  isDeclaration?: boolean;
  isInsurance?: boolean;
  destinationPortId?: string;
  deliveryDate?: string;
  destinationIsRequireTruck?: boolean;
  destinationAddressId?: string;
  destinationAddressName?: string;
  isClearance?: boolean;
  tradeType?: number;
  quantity?: number;
  quantityUnitCode?: string;
  quantityUnitId?: string;
  quantityUnitStr?: string;
  weightUnitCode?: string;
  weight?: number;
  weightUnitId?: string;
  totalWeightUnitStr?: string;
  volumeUnitCode?: string;
  volume?: number;
  volumeUnitId?: string;
  totalVolumeUnitStr?: string;
  unitConvertType?: number; //单位类型
  isContainsSpecialGoods?: boolean;
  unContainsSpecialGoods?: boolean;
  containsSpecialGoodsTypes?: string;
  description?: string;
  specialInstructions?: string;
  containerType?: string; //箱型规格保存json字符串，如 [ {name:20GP,value:1},{name:40GP,value2} ]
  status?: number; //预订状态(枚举)
  fbaAddressId?: string;
  fbmAddressId?: string;
  incotermsDisplay?: string;
  isTaxIncluded?: boolean;
  quoteReplys?: Array<quoteReplys>;
  customerid?: number;
  customerName?: string;
  containTypeText?: string;
  carriageTerms?: number;
  carriageTermsName?: string;
  freightType?: number;
  totalWeightDisplay?: string;
  totalVolumeDisplay?: string;
  quantityDisplay?: string;
  ownerCustomerId?: string;
  ownerUserId?: number;
  channel?: number;
  originPlaceId?:string;
  desinationPlaceId?:string;
}
export interface quoteReplys {
  replyNo?: string;
  //报价业务号
  carrierId?: string;
  sailSchedule?: string;
  // 承运公司
  transitTime?: string;
  // 航程
  expiresDate?: Date;
  // 过期时间
  validStartDate?: Date;
  // 有效起始时间
  validEndDate?: Date;
  creationTime?:Date;
  // 有效结束时间
  status?: number;
  // 状态
  quoteEnquiryId?: string;
  // 询价Id
  id?: string;
  carrierName?: string;
  totalCharge?: any;
  isShowButton?: boolean;
  freightList?: any[];
  OriginList?: any[];
  OriginRemarklist?: any[];
  DestinationList?: any[];
  DestinationRemarkList?: any[];
  totalChargelist?: any[];
  //船名
  quoteReplyItems?: Array<QuoteReplyItem>;
}
export interface QuoteReplyItem {
  chargingCodeId?: number;
  // 费用类型Id(运输费用时没有)
  unitPrice?: number;
  chargingCodeName?: string;
  // 费用类型名称
  // 单价
  currencyId?: string;
  currencyName?: string;
  // 币种Id
  quantity?: number;
  // 数量
  unitType?: number;
  //单位类型
  containerCode?: string;
  // 箱型Code
  priceProduceNode?: number;
  totalPrice?: number;
  computeMode?: number;
  computeFormula?: number;
  //费用分类
  remark?: string;
  sailSchedule?: string;
  // 备注
  quoteReplyId?: number;
  // 对应报价Id
  id?: string;
}
