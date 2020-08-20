import { StringNullableChain } from 'lodash';

export interface BookingEntity {
    id?: string;
    freightMethodType?: number;
    freightType?: number;
    shipmentType?: number;
    originPortId?: string;
    cargoReadyDate?: Date;
    originIsRequireTruck?: boolean;
    originAddressId?: string;
    originAddress?: any;
    originPort?: any;
    destinationPort?: any;
    destinationAddress?: any;
    isDeclaration?: boolean;
    isInsurance?: boolean;
    destinationPortId?: string;
    deliveryDate?: string;
    destinationIsRequireTruck?: boolean;
    destinationAddressId?: string;
    isClearance?: boolean;
    isTaxIncluded?: boolean;
    name?: string;
    bookingNo?: string;
    incotermsId?: number;
    tradeType?: number;
    consigneeLocationId?: string;
    consigneeCustomerId?: string;
    consigneeAddress?:any;
    shipperAddress?:any;
    shipperLocationId?: string;
    shipperCustomerId?: string;
    shipperCustomerName?:string;
    consigneeCustomerName?:string;
    cancelReason?: number;
    cancelRemark?: string;
    quantity?: number;
    quantityUnitId?: string;
    quantityUnitString?: string;
    weight?: number;
    weightUnitId?: string;
    weightUnitString?: string;
    volume?: number;
    volumeUnitId?: string;
    volumeUnitString?: string;
    dimensions?: string;
    dimensionsUnitId?: number;
    dimensionsUnitStr?: string;
    unitConvertTypeId?: number;//单位类型
    isContainsSpecialGoods?: boolean;
    unContainsSpecialGoods?: boolean;
    containsSpecialGoodsTypes?: string;
    description?: string;
    specialInstructions?: string;
    containerType?: string;  //箱型规格保存json字符串，如 [ {name:20GP,value:1},{name:40GP,value2} ]
    shipmentNo?: string; //由业务员绑定运输单号
    quoteEnquiryId?: string; //由业务员绑定询价Id
    status?: number; //预订状态(枚举)
    bookingTemplateId?: string; //模板Id
    purchaseOrderIds?: string;  //PO号Id逗号分开
    fbaFreightMethodId?: string;
    fbaFreightMethodString?: string ;
    channelString?: string ;
    deliveryWarehouseId?: string;
    deliveryWarehouse?:any;
    deliveryMethodType?: number;
    contactId?: number;
    contactName?: string;
    contactPhone?: string;
    declareCurrencyId?: string;
    contactPerson?:string;
    deliveryTimeRange?: string;
    pickUpTimeRange?: string;
    channelId?: string;
    fbaAddressId?: string;
    fbmAddressId?: string;
    cusClearanceInvoices?: Array<cusClearanceInvoices>;
    packingLists?: Array<packingLists>;
    isFBAConfirmSubmitted?: boolean;
    customsDeclarationDocumentId?: number;
    incotermsString?: string;
    pickUpAddress?:any;
    isQuoteConfirmed?:boolean;
}

export interface packingLists {
    id: string;
    packageNo?: string;
    fbaNo?: string;
    codeRules?: string;
    startNo?: string;
    endNo?: string;
    grossWeight?: number;
    grossWeightUnitId?: number;
    grossWeightUnitStr?: string;
    netWeight?: number;
    netWeightUnitId?: number;
    netWeightUnitStr?: string;
    dimensions?: string;
    dimensionsUnitId?: number;
    dimensionsUnitStr?: string;
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
    id?: string;
    commodityChineseDesc?: string;
    remainder?: number;
    totalQuantities: number;
}


export interface cusClearanceInvoices {
    bookingId?: string;// 订舱单Id
    cusClearanceProductId?: number   //对应产品Id
    referenceId?: string //参考Id
    fbaNo?: string  //FBA号(联合主键)
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
    id?: string;
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
