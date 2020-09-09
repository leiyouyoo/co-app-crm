/**
 *  No Remark
 */
export class CSPTestDtoValidateInput {
  requiredText: string;

  range0_10?: number;

  customValidateText?: string;
}

/**
 *  No Remark
 */
export class CSPVersion {
  major?: number;

  minor?: number;

  build?: number;

  revision?: number;

  majorRevision?: number;

  minorRevision?: number;
}

/**
 *  No Remark
 */
export class CSPHttpContent {
  headers?: any[];
}

/**
 *  No Remark
 */
export class CSPHttpMethod {
  method?: string;
}

/**
 *  No Remark
 */
export class CSPHttpRequestMessage {
  version?: CSPVersion;

  content?: CSPHttpContent;

  method?: CSPHttpMethod;

  requestUri?: string;

  headers?: any[];

  properties?: object;
}

/**
 *  No Remark
 */
export class CSPHttpResponseMessage {
  version?: CSPVersion;

  content?: CSPHttpContent;

  /* 
100 = Continue
101 = SwitchingProtocols
102 = Processing
103 = EarlyHints
200 = OK
201 = Created
202 = Accepted
203 = NonAuthoritativeInformation
204 = NoContent
205 = ResetContent
206 = PartialContent
207 = MultiStatus
208 = AlreadyReported
226 = IMUsed
300 = Ambiguous
300 = Ambiguous
301 = Moved
301 = Moved
302 = Redirect
302 = Redirect
303 = RedirectMethod
303 = RedirectMethod
304 = NotModified
305 = UseProxy
306 = Unused
307 = TemporaryRedirect
307 = TemporaryRedirect
308 = PermanentRedirect
400 = BadRequest
401 = Unauthorized
402 = PaymentRequired
403 = Forbidden
404 = NotFound
405 = MethodNotAllowed
406 = NotAcceptable
407 = ProxyAuthenticationRequired
408 = RequestTimeout
409 = Conflict
410 = Gone
411 = LengthRequired
412 = PreconditionFailed
413 = RequestEntityTooLarge
414 = RequestUriTooLong
415 = UnsupportedMediaType
416 = RequestedRangeNotSatisfiable
417 = ExpectationFailed
421 = MisdirectedRequest
422 = UnprocessableEntity
423 = Locked
424 = FailedDependency
426 = UpgradeRequired
428 = PreconditionRequired
429 = TooManyRequests
431 = RequestHeaderFieldsTooLarge
451 = UnavailableForLegalReasons
500 = InternalServerError
501 = NotImplemented
502 = BadGateway
503 = ServiceUnavailable
504 = GatewayTimeout
505 = HttpVersionNotSupported
506 = VariantAlsoNegotiates
507 = InsufficientStorage
508 = LoopDetected
510 = NotExtended
511 = NetworkAuthenticationRequired */

  statusCode?: number;

  reasonPhrase?: string;

  headers?: any[];

  requestMessage?: CSPHttpRequestMessage;

  isSuccessStatusCode?: boolean;
}

/**
 * 用于附件列表显示的 Dto
 */
export class CSPAttachmentListDto {
  /* 附件类型 */

  attachmentType?: string;

  /* 上传人 */

  uploadBy?: string;

  /* 上传时间 */

  creationTime?: string;

  /* Gets or sets the sharing items. */

  sharingItems?: any[];

  /* Id */

  id?: string;

  /* 业务id（如是booking，则传booking的id） */

  businessId?: string;

  /* 业务类型
0 = Quote
1 = Booking
2 = Shipment
3 = Order
4 = Product
5 = Billing */

  businessType?: number;

  /* 文件id(上传到文件服务器后返回) */

  fileId?: string;

  /* 文件名称(上传到文件服务器后返回) */

  fileName?: string;

  /* 文件扩展名(上传到文件服务器后返回) */

  extensionName?: string;
}

/**
 *  No Remark
 */
export class CSPListResultDto<T> {
  items: T[];
}

/**
 *  No Remark
 */
export class CSPGetAllAttachmentListInput {
  /* 业务Id集合 */

  businessIds?: any[];

  /* 附件类型
0 = Other
1 = OSO
2 = TRK
3 = CF
4 = SI
5 = ARR
6 = MBL
7 = HBL
8 = SID
9 = ISF
11 = AR
12 = AP
13 = DC
14 = ASO
15 = BKG
16 = LGTLX
17 = LGPKG
18 = LGDC
19 = LGPBL
20 = LGABL
21 = LGMBL
22 = LGPKG1
23 = LGDC1
24 = LGABL1
25 = LGMBL1
26 = LGTLX1
27 = AMS
28 = AN
29 = SIMBL
30 = SIHBL
31 = AN_C
32 = NRAS
33 = QuotedPrice
34 = POD
35 = AC
36 = BR
37 = WFF
38 = CI
39 = PL
40 = PO
41 = DM
43 = SideMarks
44 = WarehouseRecipt
45 = TaxBill
46 = SignReceipt */

  attachmentType?: number;
}

/**
 * 附件基本信息 Dto
 */
export class CSPAttachmentDto {
  /* Id */

  id?: string;

  /* 业务id（如是booking，则传booking的id） */

  businessId?: string;

  /* 业务类型
0 = Quote
1 = Booking
2 = Shipment
3 = Order
4 = Product
5 = Billing */

  businessType?: number;

  /* 附件类型
0 = Other
1 = OSO
2 = TRK
3 = CF
4 = SI
5 = ARR
6 = MBL
7 = HBL
8 = SID
9 = ISF
11 = AR
12 = AP
13 = DC
14 = ASO
15 = BKG
16 = LGTLX
17 = LGPKG
18 = LGDC
19 = LGPBL
20 = LGABL
21 = LGMBL
22 = LGPKG1
23 = LGDC1
24 = LGABL1
25 = LGMBL1
26 = LGTLX1
27 = AMS
28 = AN
29 = SIMBL
30 = SIHBL
31 = AN_C
32 = NRAS
33 = QuotedPrice
34 = POD
35 = AC
36 = BR
37 = WFF
38 = CI
39 = PL
40 = PO
41 = DM
43 = SideMarks
44 = WarehouseRecipt
45 = TaxBill
46 = SignReceipt */

  attachmentType?: number;

  /* 文件id(上传到文件服务器后返回) */

  fileId?: string;

  /* 文件名称(上传到文件服务器后返回) */

  fileName?: string;

  /* 文件扩展名(上传到文件服务器后返回) */

  extensionName?: string;
}

/**
 * 用于批量创建附件的 Dto
 */
export class CSPBatchCreateAttachmentInput {
  /* Gets or sets the items. */

  items?: any[];
}

/**
 * 创建附件输入
 */
export class CSPCreateAttachmentInput {
  /* 是否来自ICP，如果 true 则不必再调用同步文档到 ICP 的接口 */

  isFromIcp?: boolean;

  /* 是否上传到ICP，如果 true 则需要调用同步文档到 ICP 的接口 */

  isToIcp?: boolean;

  /* 共享配置信息 */

  sharingItems?: any[];

  /* Id */

  id?: string;

  /* 业务id（如是booking，则传booking的id） */

  businessId?: string;

  /* 业务类型
0 = Quote
1 = Booking
2 = Shipment
3 = Order
4 = Product
5 = Billing */

  businessType?: number;

  /* 附件类型
0 = Other
1 = OSO
2 = TRK
3 = CF
4 = SI
5 = ARR
6 = MBL
7 = HBL
8 = SID
9 = ISF
11 = AR
12 = AP
13 = DC
14 = ASO
15 = BKG
16 = LGTLX
17 = LGPKG
18 = LGDC
19 = LGPBL
20 = LGABL
21 = LGMBL
22 = LGPKG1
23 = LGDC1
24 = LGABL1
25 = LGMBL1
26 = LGTLX1
27 = AMS
28 = AN
29 = SIMBL
30 = SIHBL
31 = AN_C
32 = NRAS
33 = QuotedPrice
34 = POD
35 = AC
36 = BR
37 = WFF
38 = CI
39 = PL
40 = PO
41 = DM
43 = SideMarks
44 = WarehouseRecipt
45 = TaxBill
46 = SignReceipt */

  attachmentType?: number;

  /* 文件id(上传到文件服务器后返回) */

  fileId?: string;

  /* 文件名称(上传到文件服务器后返回) */

  fileName?: string;

  /* 文件扩展名(上传到文件服务器后返回) */

  extensionName?: string;
}

/**
 *  No Remark
 */
export class CSPShareableContactModel {
  userId?: number;

  contactId?: string;

  userFullName?: string;

  customerId?: string;

  partnerId?: string;

  positionId?: string;

  positionName?: string;

  companyName?: string;
}

/**
 * 文档模型
 */
export class CSPAttachmentForIcpDto {
  /* 上传人 */

  uploadBy?: string;

  /* 上传时间 */

  creationTime?: string;

  /* Gets or sets the current token. */

  currentToken?: string;

  /* Id */

  id?: string;

  /* 业务id（如是booking，则传booking的id） */

  businessId?: string;

  /* 业务类型
0 = Quote
1 = Booking
2 = Shipment
3 = Order
4 = Product
5 = Billing */

  businessType?: number;

  /* 附件类型
0 = Other
1 = OSO
2 = TRK
3 = CF
4 = SI
5 = ARR
6 = MBL
7 = HBL
8 = SID
9 = ISF
11 = AR
12 = AP
13 = DC
14 = ASO
15 = BKG
16 = LGTLX
17 = LGPKG
18 = LGDC
19 = LGPBL
20 = LGABL
21 = LGMBL
22 = LGPKG1
23 = LGDC1
24 = LGABL1
25 = LGMBL1
26 = LGTLX1
27 = AMS
28 = AN
29 = SIMBL
30 = SIHBL
31 = AN_C
32 = NRAS
33 = QuotedPrice
34 = POD
35 = AC
36 = BR
37 = WFF
38 = CI
39 = PL
40 = PO
41 = DM
43 = SideMarks
44 = WarehouseRecipt
45 = TaxBill
46 = SignReceipt */

  attachmentType?: number;

  /* 文件id(上传到文件服务器后返回) */

  fileId?: string;

  /* 文件名称(上传到文件服务器后返回) */

  fileName?: string;

  /* 文件扩展名(上传到文件服务器后返回) */

  extensionName?: string;
}

/**
 *  No Remark
 */
export class CSPUserIdentifier {
  tenantId?: number;

  userId?: number;
}

/**
 * 获取账单列表的输入
 */
export class CSPGetBillListInput {
  /* 运单Id */

  shipmentId?: string;

  /* 状态 */

  status?: any[];

  /* 搜索关键字 */

  searchKey?: string;

  /* 起始时间 */

  startTime?: string;

  /* 结束时间 */

  endTime?: string;

  /* 排序 */

  sorting?: string;

  /* 页大小 */

  maxResultCount?: number;

  /* 跳过指定条数 */

  skipCount?: number;
}

/**
 *  No Remark
 */
export class CSPNameValueDto {
  name?: string;

  value?: string;
}

/**
 * 账单详情
 */
export class CSPBillOutput {
  /* 关联的运单业务Id */

  shipmentId: string;

  /* Gets or sets the shipment no. */

  shipmentNo?: string;

  /* 账单收件人信息 */

  recipient?: CSPNameValueDto;

  /* 总额 */

  amount?: any[];

  /* 待支付金额 */

  balance?: any[];

  /* 收费条目集合 */

  chargeItems?: any[];

  /* 支付历史 */

  paymentRecords?: any[];

  /* 客户 Id */

  customerId?: string;

  /* 账单号 */

  billNo?: string;

  /* 运单下具体业务的Id（如提单Id） */

  businessId?: string;

  /* 出票时间 */

  issuedDate?: string;

  /* 逾期时间 */

  dueDate?: string;

  /* 账单状态
0 = Unknown
1 = Outstanding
2 = Paid
3 = Overdue
4 = Voided
5 = PartialPaid */

  status?: number;

  /* 客户是否已经确认账单 */

  isConfirmed?: boolean;

  /* 备注说明 */

  description?: string;

  /* 创建人 */

  creatorUserId?: number;

  id?: string;
}

/**
 *  No Remark
 */
export class CSPPagedResultDto<T> {
  totalCount: number;

  items: T[];
}

/**
 * Bill Dto
 */
export class CSPBillDto {
  /* 关联的运单业务Id */

  shipmentId: string;

  /* 客户 Id */

  customerId?: string;

  /* 账单号 */

  billNo?: string;

  /* 运单下具体业务的Id（如提单Id） */

  businessId?: string;

  /* 出票时间 */

  issuedDate?: string;

  /* 逾期时间 */

  dueDate?: string;

  /* 账单状态
0 = Unknown
1 = Outstanding
2 = Paid
3 = Overdue
4 = Voided
5 = PartialPaid */

  status?: number;

  /* 客户是否已经确认账单 */

  isConfirmed?: boolean;

  /* 备注说明 */

  description?: string;

  /* 创建人 */

  creatorUserId?: number;

  id?: string;
}

/**
 * 指定主键类型的数据传输对象基类
 */
export class CSPCoEntityDto<T> {
  id?: string;
}

/**
 * Class ChangeBillStatusInput.
 */
export class CSPChangeBillStatusInput {
  /* Creates new status.
0 = Unknown
1 = Outstanding
2 = Paid
3 = Overdue
4 = Voided
5 = PartialPaid */

  newStatus?: number;

  /* Gets or sets the customer identifier. */

  customerId?: string;

  id?: string;
}

/**
 * 确认账单输入
 */
export class CSPConfirmBillsInput {
  /* 选中的确认账单 */

  idList?: any[];
}

/**
 * 导出账单输入
 */
export class CSPExportBillInput {
  /* 账单Id */

  id?: string;
}

/**
 * 导出账单输出
 */
export class CSPExportBillOutput {
  /* Gets or sets the token. */

  token?: string;
}

/**
 *  No Remark
 */
export class CSPSynchronizeBillsInput {
  bills?: any[];

  chargeItems?: any[];

  paymentRecords?: any[];
}

/**
 * 用于创建或更新收费记录
 */
export class CSPCreateOrUpdatePaymentRecordsInput {
  /* 支付记录条目集合 */

  items?: any[];
}

/**
 * 付款历史
 */
export class CSPPaymentRecordDto {
  /* ICP 销账记录Id */

  checkItemId?: string;

  /* 付款单号 */

  paymentRecordNo?: string;

  /* 账单Id */

  billId?: string;

  /* 收费条目 Id */

  chargeItemId?: string;

  /* 关联的币种 */

  currencyId?: string;

  /* 币种显示 */

  currencyString?: string;

  /* 支付金额 */

  payAmount?: number;

  /* 确认人 */

  checkerId?: number;

  /* 确认人姓名显示 */

  checkerName?: string;

  /* 入账日期 */

  bankDate?: string;

  /* 备注说明 */

  description?: string;

  /* 收费项目显示 */

  chargingCodeString?: string;

  id?: string;
}

/**
 * 用户创建或更新收费项的输入参数
 */
export class CSPCreateOrUpdateChargeItemsInput {
  /* 收费项集合 */

  items?: any[];
}

/**
 * 收费条目
 */
export class CSPChargeItemDto {
  /* 关联的账单Id */

  billId?: string;

  /* 关联的费用项目 */

  chargingCodeId?: string;

  /* 费用项目显示 */

  chargingCodeString?: string;

  /* 关联的币种 */

  currencyId?: string;

  /* 币种显示 */

  currencyString?: string;

  /* 关联的计量单位 */

  unitId?: string;

  /* 单位显示 */

  unitString?: string;

  /* 单价 */

  unitPrice?: number;

  /* 数量 */

  quantity?: number;

  /* 收费金额 */

  payAmount?: number;

  /* 备注说明 */

  description?: string;

  /* 收费方向类型
1 = Receivable
2 = Payable */

  chargeType?: number;

  id?: string;
}

/**
 * Class BankAccountDto.
 */
export class CSPBankAccountDto {
  /* 户名 */

  accountName?: string;

  /* 银行名称 */

  bankBranchName?: string;

  /* 银行地址 */

  bankAddress?: string;

  /* 银行代码 */

  bankCode?: string;

  /* 各币种账户 */

  accounts?: any[];
}

/**
 * 获取Billings统计信息
 */
export class CSPBillingStatisticsOutput {
  /* 按状态统计 */

  models?: any[];
}

/**
 * 为CRM获取全部分页列表输入条件组
 */
export class CSPSearchModel {
  /* 类型
0 = NotSet
1 = BookingNo
2 = BookingName
3 = Customer
4 = Contact */

  searchKeyType?: number;

  /* 内容 */

  searchContent?: string;

  /* Id、没有为空 */

  searchId?: string;
}

/**
 * 为CRM获取全部分页列表输入
 */
export class CSPGetAllListForCRMInput {
  /* 订舱单业务号或订舱单名称 */

  bookingNoOrName?: CSPSearchModel;

  /* 委托客户或联系人 */

  customerOrContact?: CSPSearchModel;

  /* 预订状态(枚举)
0 = BookingDraft
1 = WaitingForCancelling
2 = BookingSubmitted
3 = ShippingDone
4 = WaitingForPricing
5 = WaitingForBuyer
6 = WaitingForSeller
7 = BookingCancelled
8 = ShippingCancelled
9 = PriceConfirmedByCustomer
10 = ShippingSubmittedToCarrier
11 = SoNumberNotifiedToCustomer */

  status?: number;

  /* 是否分配出货口岸 */

  isDistributeServiceCompany?: boolean;

  /* 排序 */

  sorting?: string;

  /* 页大小 */

  maxResultCount?: number;

  /* 跳过指定条数 */

  skipCount?: number;
}

/**
 *  No Remark
 */
export class CSPNetWorkLocationModel {
  country?: string;

  province?: string;

  city?: string;

  streetAddress?: string;

  streetAddress2?: string;

  name?: string;

  longitude?: string;

  latitude?: string;

  customerName?: string;

  id?: string;
}

/**
 * 为CRM获取全部分页列表输出
 */
export class CSPGetAllListForCRMOutput {
  /* 创建人Id */

  creatorUserId?: number;

  /* 订舱单业务号 */

  bookingNo?: string;

  /* Booking名称（PO号可多个/自定义） */

  name?: string;

  /* 货号日期 */

  cargoReadyDate?: string;

  /* 运输方式
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 预订状态(枚举)
0 = BookingDraft
1 = WaitingForCancelling
2 = BookingSubmitted
3 = ShippingDone
4 = WaitingForPricing
5 = WaitingForBuyer
6 = WaitingForSeller
7 = BookingCancelled
8 = ShippingCancelled
9 = PriceConfirmedByCustomer
10 = ShippingSubmittedToCarrier
11 = SoNumberNotifiedToCustomer */

  status?: number;

  /* 起始港Id */

  originPortId?: string;

  /* 服务商存储电商货物的国内仓库地址 */

  deliveryWarehouseId?: string;

  /* 提交后用户修改标志属性:当用户提交之后订舱单之后，订舱成功之前，且用户未申请取消订舱单时，可以修改订舱申请，并通知到业务员（一旦出现一直存在）。 */

  isCustomerUpdate?: boolean;

  /* 出货口岸 */

  serviceCompanyId?: string;

  /* 起始地址 */

  originAddress?: CSPNetWorkLocationModel;

  /* 目的地址 */

  destinationAddress?: CSPNetWorkLocationModel;

  /* 重量 */

  totalWeightDisplay?: string;

  /* 体积 */

  totalVolumeDisplay?: string;

  /* 出货口岸 */

  serviceCompanyDisplay?: string;

  id?: string;
}

/**
 * CRM补全路线
 */
export class CSPUpdateRoutesForCRMInput {
  /* 服务商存储电商货物的国内仓库地址
<remarks>来源：CRM FBALocations</remarks> */

  deliveryWarehouseId: string;

  /* FBA地址/FBM客户提供的目的港送货仓库地址
<remarks>FBA来源：亚马逊仓库基础数据（CRM FBALocations）/FBM来源：客户自己创建的【network-MY-organization-location】</remarks> */

  destinationAddressId: string;

  /* 起始港Id */

  originPortId: string;

  /* 目的港口Id */

  destinationPortId: string;

  id?: string;
}

/**
 * 确定出货口岸请求体
 */
export class CSPSureServiceCompanyInput {
  /* 出货口岸 */

  serviceCompanyId: string;

  creationTime?: string;

  creatorUserId?: number;

  id?: string;
}

/**
 *  No Remark
 */
export class CSPPubLocation {
  code?: string;

  name?: string;

  fullName?: string;

  regionId?: string;

  regionName?: string;

  countryName?: string;

  countryId?: string;

  longitude?: string;

  latitude?: string;

  isOcean?: boolean;

  isAir?: boolean;

  id?: string;
}

/**
 * 变化前数据
 */
export class CSPBookingOldData {
  /* 发货港 */

  originPort?: CSPPubLocation;

  /* 目的港 */

  destinationPort?: CSPPubLocation;

  /* 起始地址 */

  originAddress?: CSPNetWorkLocationModel;

  /* 目的地址 */

  destinationAddress?: CSPNetWorkLocationModel;

  /* 货好日期 */

  cargoReadyDate?: string;

  /* 运输条款
0 = NotSet
1 = CY_CY
2 = CY_DOOR
3 = DOOR_CY
4 = DOOR_DOOR */

  freightType?: number;

  /* 贸易类型(单选取字典)
0 = NotSet
1 = General
2 = FBA
3 = FBM */

  tradeType?: number;

  /* 贸易条款显示字符 */

  incotermsString?: string;

  /* 箱型规格保存json字符串，如 [ {name:20GP,value:1},{name:40GP,value2} ] */

  containerType?: string;

  /* 数量单位 */

  quantityUnitString?: string;

  /* 重量单位 */

  weightUnitString?: string;

  /* 体积条件 */

  volumeUnitString?: string;

  /* 数量 */

  quantity?: number;

  /* 总重量 */

  weight?: number;

  /* 总体积 */

  volume?: number;

  /* 产品描述 */

  description?: string;

  /* 特殊介绍 */

  specialInstructions?: string;
}

/**
 *  No Remark
 */
export class CSPFBALocationModel {
  zip?: string;

  streetAddress?: string;

  streetAddress2?: string;

  name?: string;

  country?: string;

  province?: string;

  city?: string;

  /* 
0 = OnlyMyOrganization
1 = MyConnections
2 = SpecificConnections */

  viewableType?: number;

  partnerId?: string;

  customerId?: string;

  unlocode?: string;

  isVerifiedCompany?: boolean;

  longitude?: string;

  latitude?: string;

  id?: string;
}

/**
 * 订舱单Dto模型
 */
export class CSPBookingDto {
  /* 订舱单号 */

  bookingNo?: string;

  /* 是否业务员关联已确认的报价 */

  isQuoteConfirmed?: boolean;

  /* 是否 ICP 端已下载 */

  icpDownloaded?: boolean;

  /* 是否显示报价 */

  isShowQuote?: boolean;

  /* 取消原因
0 = TransitTime
1 = CargoReadyTime
2 = SlowBookingResponse
3 = Other */

  cancelReason?: number;

  /* 取消备注 */

  cancelRemark?: string;

  /* 由业务员绑定运输单号 */

  shipmentNo?: string;

  /* 由业务员绑定询价Id */

  quoteEnquiryId?: string;

  /* 预订状态(枚举)
0 = BookingDraft
1 = WaitingForCancelling
2 = BookingSubmitted
3 = ShippingDone
4 = WaitingForPricing
5 = WaitingForBuyer
6 = WaitingForSeller
7 = BookingCancelled
8 = ShippingCancelled
9 = PriceConfirmedByCustomer
10 = ShippingSubmittedToCarrier
11 = SoNumberNotifiedToCustomer */

  status?: number;

  /* FBA报关文件Id */

  customsDeclarationDocumentIds?: any[];

  /* 提交后用户修改标志属性:当用户提交之后订舱单之后，订舱成功之前，且用户未申请取消订舱单时，可以修改订舱申请，并通知到业务员（一旦出现一直存在）。 */

  isCustomerUpdate?: boolean;

  /* 提交后用户修改的上一次属性json */

  customerUpdateLastDataJson?: string;

  /* 是否包含特殊品 */

  isContainsSpecialGoods?: boolean;

  /* CRM查看变更属性历史值（仅显示上一次的） */

  lastData?: CSPBookingOldData;

  /* 模板Id */

  bookingTemplateId?: string;

  /* 关联的 PO id */

  purchaseOrderIds?: any[];

  /* 贸易条款显示字符 */

  incotermsString?: string;

  /* 数量单位 */

  quantityUnitString?: string;

  /* 重量单位 */

  weightUnitString?: string;

  /* 体积单位 */

  volumeUnitString?: string;

  /* 数量单位代码 */

  quantityUnitCode?: string;

  /* 重量单位代码 */

  weightUnitCode?: string;

  /* 体积单位代码 */

  volumeUnitCode?: string;

  /* 发货港 */

  originPort?: CSPPubLocation;

  /* 目的港 */

  destinationPort?: CSPPubLocation;

  /* 起始仓库 */

  deliveryWarehouse?: CSPFBALocationModel;

  /* 起始地址 */

  originAddress?: CSPNetWorkLocationModel;

  /* 目的地址 */

  destinationAddress?: CSPNetWorkLocationModel;

  /* Delivery  goods by myself 时间范围 */

  deliveryTimeRange?: string;

  /* 上门提货时间范围 */

  pickUpTimeRange?: string;

  /* 联系人姓名 */

  contactName?: string;

  /* 联系人电话 */

  contactPhone?: string;

  /* FBA运输方式代码 */

  fbaFreightMethodCode?: string;

  /* FBA运输方式 */

  fbaFreightMethodString?: string;

  /* 渠道 */

  channelString?: string;

  /* 映射 */

  cusClearanceInvoices?: any[];

  /* 映射 */

  packingLists?: any[];

  /* Gets or sets the name of the consignee customer. */

  consigneeCustomerName?: string;

  /* Gets or sets the name of the shipper customer. */

  shipperCustomerName?: string;

  serviceCompanyId?: string;

  quantity?: number;

  quantityUnitId?: string;

  weight?: number;

  weightUnitId?: string;

  volume?: number;

  volumeUnitId?: string;

  /* 
0 = Imperial
1 = Metric */

  unitConvertType?: number;

  containsSpecialGoodsTypes?: string;

  description?: string;

  specialInstructions?: string;

  containerType?: string;

  name?: string;

  consigneeCustomerId?: string;

  consigneePartnerId?: string;

  shipperCustomerId?: string;

  shipperPartnerId?: string;

  cargoReadyDate?: string;

  incotermsId?: string;

  /* 
0 = NotSet
1 = General
2 = FBA
3 = FBM */

  tradeType?: number;

  /* 
0 = NotSet
1 = CY_CY
2 = CY_DOOR
3 = DOOR_CY
4 = DOOR_DOOR */

  freightType?: number;

  /* 
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 
0 = FCL
1 = LCL */

  shipmentType?: number;

  originPortId?: string;

  originIsRequireTruck?: boolean;

  originAddressId?: string;

  isDeclaration?: boolean;

  isInsurance?: boolean;

  destinationPortId?: string;

  destinationAddressId?: string;

  deliveryDate?: string;

  destinationIsRequireTruck?: boolean;

  isClearance?: boolean;

  isTaxIncluded?: boolean;

  declareCurrencyId?: string;

  contactId?: string;

  contactUserId?: string;

  /* 
0 = DeliveryGoodsByMyself
1 = PickUpByCityocean */

  deliveryMethodType?: number;

  deliveryWarehouseId?: string;

  fbaFreightMethodId?: string;

  channelId?: string;

  customerId?: string;

  tenantId?: number;

  extensionData?: string;

  /* 主键 */

  id?: string;

  /* 创建时间 */

  creationTime?: string;

  /* 创建人ID */

  creatorUserId?: number;

  /* 最后一次修改时间 */

  lastModificationTime?: string;

  /* 最后一次修改人 */

  lastModifierUserId?: number;

  /* 删除时间 */

  deletionTime?: string;

  /* 删除用户 */

  deleterUserId?: number;

  isDeleted?: boolean;

  flightNo?: string;

  hsCode?: string;
  originalOrTelex?: string;
  airOwnerName?: string;
  shipOwnerName?: string;
  ContractNo?: string;
  quoteNo?: string;
  estDelivery?: string;
  requestHBL?: string;
  requestMBL?: string;
  remark?: string;
}

/**
 * CRM订舱绑定报价入口获取报价接受客户与用户联动关系
 */
export class CSPGetCustomerBindUserForCRMOutput {
  /* 客户联动数据源 */

  list?: any[];

  /* 默认的客户Id */

  customerId?: string;

  /* 默认的用户Id */

  userId?: number;
}

/**
 * CRM订舱绑定报价
 */
export class CSPCRMBookingBindQuoteInput {
  /* 订舱单Id */

  bookingId: string;

  /* 询价Id */

  quoteEnquiryId: string;

  /* 关联报价是否是已经确认的 */

  isCustomerReceive: boolean;
}

/**
 * 重复校验传输模型
 */
export class CSPBookingCheckIsExistsInputDto {
  /* 采购单Id */

  purchaseOrderIds?: any[];

  /* Booking中Name */

  name?: string;

  /* Booking 归属的客户Id，如果为空则会根据贸易条款判断 */

  customerId?: string;

  /* 发货人客户Id */

  shipperCustomerId?: string;

  /* 收货人客户Id，如果是电商业务则传空 */

  consigneeCustomerId?: string;

  /* 贸易条款Id，如果是业务创建的则需要此协助判断Booking归属的客户 */

  incotermsId?: string;

  id?: string;
}

/**
 * Class UpdateBookingForIcpInput.
 */
export class CSPUpdateBookingForIcpInput {
  /* BookingId */

  id?: string;

  /* 数量 */

  quantity?: number;

  /* 数量单位 */

  quantityUnitId?: string;

  /* 总重量 */

  weight?: number;

  /* 总重量单位 */

  weightUnitId?: string;

  /* 总体积 */

  volume?: number;

  /* 总体积单位 */

  volumeUnitId?: string;

  /* 业务服务人员列表 */

  serviceUsers?: any[];
}

/**
 * Class PurchaseOrderItemForIcpDto.
 */
export class CSPPurchaseOrderItemForIcpDto {
  /* Gets or sets the po no. */

  orderNumber?: string;

  /* PO Id */

  orderId?: string;

  /* 关联的供应商客户Id */

  venderCustomerId?: string;

  /* 关联的采购商客户Id */

  buyerCustomerId?: string;

  /* PO ItemId */

  orderItemId?: string;

  /* Product Id */

  productId?: string;

  /* Gets or sets the name of the product. */

  productName?: string;

  /* Gets or sets the MPN. */

  mpn?: string;

  /* Gets or sets the sku. */

  sku?: string;

  /* 数量 */

  units?: number;

  /* 单价 */

  unitCost?: number;

  /* 体积 */

  volume?: number;

  /* 箱数 */

  cartons?: number;

  /* 毛重 */

  grossWeight?: number;

  /* 净重 */

  netWeight?: number;
}

/**
 * Class BookingForIcpDto.
 */
export class CSPBookingForIcpDto {
  /* 客户名称 */

  customerName?: string;

  /* 申报币种 */

  declareCurrencyString?: string;

  /* 运输类型（门到门港 到 港等） */

  freightTypeString?: string;

  /* 发货港 */

  originPort?: string;

  /* 港前拖车出发地 */

  originAddress?: string;

  /* 目的港 */

  destinationPort?: string;

  /* 目的地址 */

  destinationAddress?: string;

  /* FBA起始仓库 */

  deliveryWarehouse?: string;

  /* 服务商默认业务员用户Id */

  serviceBusinessUserId?: number;

  /* 服务商默认业务员用户全名 */

  serviceBusinessUserFullName?: string;

  /* CreatorUserFullName */

  creatorUserFullName?: string;

  /* 附件 */

  attachments?: any[];

  /* 订舱单号 */

  bookingNo?: string;

  /* 是否业务员关联已确认的报价 */

  isQuoteConfirmed?: boolean;

  /* 是否 ICP 端已下载 */

  icpDownloaded?: boolean;

  /* 是否显示报价 */

  isShowQuote?: boolean;

  /* 取消原因
0 = TransitTime
1 = CargoReadyTime
2 = SlowBookingResponse
3 = Other */

  cancelReason?: number;

  /* 取消备注 */

  cancelRemark?: string;

  /* 由业务员绑定运输单号 */

  shipmentNo?: string;

  /* 由业务员绑定询价Id */

  quoteEnquiryId?: string;

  /* 预订状态(枚举)
0 = BookingDraft
1 = WaitingForCancelling
2 = BookingSubmitted
3 = ShippingDone
4 = WaitingForPricing
5 = WaitingForBuyer
6 = WaitingForSeller
7 = BookingCancelled
8 = ShippingCancelled
9 = PriceConfirmedByCustomer
10 = ShippingSubmittedToCarrier
11 = SoNumberNotifiedToCustomer */

  status?: number;

  /* FBA报关文件Id */

  customsDeclarationDocumentIds?: any[];

  /* 提交后用户修改标志属性:当用户提交之后订舱单之后，订舱成功之前，且用户未申请取消订舱单时，可以修改订舱申请，并通知到业务员（一旦出现一直存在）。 */

  isCustomerUpdate?: boolean;

  /* 提交后用户修改的上一次属性json */

  customerUpdateLastDataJson?: string;

  /* 是否包含特殊品 */

  isContainsSpecialGoods?: boolean;

  /* CRM查看变更属性历史值（仅显示上一次的） */

  lastData?: CSPBookingOldData;

  /* 模板Id */

  bookingTemplateId?: string;

  /* 关联的 PO id */

  purchaseOrderIds?: any[];

  /* 贸易条款显示字符 */

  incotermsString?: string;

  /* 数量单位 */

  quantityUnitString?: string;

  /* 重量单位 */

  weightUnitString?: string;

  /* 体积单位 */

  volumeUnitString?: string;

  /* 数量单位代码 */

  quantityUnitCode?: string;

  /* 重量单位代码 */

  weightUnitCode?: string;

  /* 体积单位代码 */

  volumeUnitCode?: string;

  /* Delivery  goods by myself 时间范围 */

  deliveryTimeRange?: string;

  /* 上门提货时间范围 */

  pickUpTimeRange?: string;

  /* 联系人姓名 */

  contactName?: string;

  /* 联系人电话 */

  contactPhone?: string;

  /* FBA运输方式代码 */

  fbaFreightMethodCode?: string;

  /* FBA运输方式 */

  fbaFreightMethodString?: string;

  /* 渠道 */

  channelString?: string;

  /* 映射 */

  cusClearanceInvoices?: any[];

  /* 映射 */

  packingLists?: any[];

  /* Gets or sets the name of the consignee customer. */

  consigneeCustomerName?: string;

  /* Gets or sets the name of the shipper customer. */

  shipperCustomerName?: string;

  serviceCompanyId?: string;

  quantity?: number;

  quantityUnitId?: string;

  weight?: number;

  weightUnitId?: string;

  volume?: number;

  volumeUnitId?: string;

  /* 
0 = Imperial
1 = Metric */

  unitConvertType?: number;

  containsSpecialGoodsTypes?: string;

  description?: string;

  specialInstructions?: string;

  containerType?: string;

  name?: string;

  consigneeCustomerId?: string;

  consigneePartnerId?: string;

  shipperCustomerId?: string;

  shipperPartnerId?: string;

  cargoReadyDate?: string;

  incotermsId?: string;

  /* 
0 = NotSet
1 = General
2 = FBA
3 = FBM */

  tradeType?: number;

  /* 
0 = NotSet
1 = CY_CY
2 = CY_DOOR
3 = DOOR_CY
4 = DOOR_DOOR */

  freightType?: number;

  /* 
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 
0 = FCL
1 = LCL */

  shipmentType?: number;

  originPortId?: string;

  originIsRequireTruck?: boolean;

  originAddressId?: string;

  isDeclaration?: boolean;

  isInsurance?: boolean;

  destinationPortId?: string;

  destinationAddressId?: string;

  deliveryDate?: string;

  destinationIsRequireTruck?: boolean;

  isClearance?: boolean;

  isTaxIncluded?: boolean;

  declareCurrencyId?: string;

  contactId?: string;

  contactUserId?: string;

  /* 
0 = DeliveryGoodsByMyself
1 = PickUpByCityocean */

  deliveryMethodType?: number;

  deliveryWarehouseId?: string;

  fbaFreightMethodId?: string;

  channelId?: string;

  customerId?: string;

  tenantId?: number;

  extensionData?: string;

  /* 主键 */

  id?: string;

  /* 创建时间 */

  creationTime?: string;

  /* 创建人ID */

  creatorUserId?: number;

  /* 最后一次修改时间 */

  lastModificationTime?: string;

  /* 最后一次修改人 */

  lastModifierUserId?: number;

  /* 删除时间 */

  deletionTime?: string;

  /* 删除用户 */

  deleterUserId?: number;

  isDeleted?: boolean;
}

/**
 * 清关发票上传解析返回
 */
export class CSPClearanceInviocesUploadOutput {
  /* 映射 */

  cusClearanceInvoices?: any[];

  /* 映射 */

  packingLists?: any[];
}

/**
 * 生成导出数据
 */
export class CSPClearanceInviocesDownloadOutput {
  items?: any[];
}

/**
 * Booking 最近使用一条记录
 */
export class CSPBookingRecentlyUsedOutput {
  /* 客户的上一个 （常规或电商）Booking
Shipper：显示最近一次选中的信息；
FBM Address：默认显示最近一次选中的信息；
Destination location：默认显示最近一次选中的信息； */

  recentBooking?: CSPBookingDto;

  /* 显示最近使用过的起始港口数据(5条)； */

  originPorts?: any[];

  /* 显示最近使用过的目的港口数据(5条)； */

  destinationPorts?: any[];

  /* 列表显示最新使用的10条数据； */

  fbaAddresses?: any[];

  /* 最近使用的 Fba 渠道组合 （3条） */

  recentFbaChannels?: any[];
}

/**
 * 获取Booking统计信息
 */
export class CSPBookingStatisticsOutput {
  /* 按状态统计 */

  models?: any[];
}

/**
 * Class ChangeBookingStatusInput.
 */
export class CSPChangeBookingStatusInput {
  /* Creates new status.
0 = BookingDraft
1 = WaitingForCancelling
2 = BookingSubmitted
3 = ShippingDone
4 = WaitingForPricing
5 = WaitingForBuyer
6 = WaitingForSeller
7 = BookingCancelled
8 = ShippingCancelled
9 = PriceConfirmedByCustomer
10 = ShippingSubmittedToCarrier
11 = SoNumberNotifiedToCustomer */

  newStatus?: number;

  /* 为true 时 ，所传Id是询价Id否则为BookingId */

  isQuoteId?: boolean;

  /* 存在值为 true 则表示 ICP 端已经下载 Booking */

  icpDownloaded?: boolean;

  id?: string;
}

/**
 *  No Remark
 */
export class CSPCancelBookingInput {
  /* 
0 = TransitTime
1 = CargoReadyTime
2 = SlowBookingResponse
3 = Other */

  cancelReason?: number;

  cancelRemark?: string;

  id?: string;
}

/**
 * 获取Booking关联业务Id
 */
export class CSPGetRelatedBusinessOutput {
  /* ShipmentId */

  shipmentId?: string;

  /* EnquiryQuoteIds */

  enquiryQuoteId?: string;
}

/**
 *  No Remark
 */
export class CSPGetChannelListOutput {
  /* 
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 组合字符串 */

  channelGroupStr?: string;

  /* 快递、卡车 */

  fbaFreightMethodId?: string;

  /* 是否含税 */

  isTaxIncluded?: boolean;

  /* 渠道公司 */

  channelId?: string;
}

/**
 * 预报单列表查询入口参数
 */
export class CSPGetBookingListInputForFcm {
  /* 操作进度
0 = BookingDraft
1 = WaitingForCancelling
2 = BookingSubmitted
3 = ShippingDone
4 = WaitingForPricing
5 = WaitingForBuyer
6 = WaitingForSeller
7 = BookingCancelled
8 = ShippingCancelled
9 = PriceConfirmedByCustomer
10 = ShippingSubmittedToCarrier
11 = SoNumberNotifiedToCustomer */

  status?: number;

  /* 运输方式
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 订舱单业务号 */

  bookingNo?: string;

  /* 下单日期,支持搜索输入值当天即00：00：00至23：59：59 */

  creationDate?: string;

  /* 业务员Id */

  serviceUserId?: string;

  /* 客户Id */

  customerId?: string;

  /* 联系人Id */

  contactId?: string;

  /* 送货地址 */

  deliveryAddress?: string;

  /* 交货方式 */

  fbaPickUpMethodType?: string;

  /* 交货位置 */

  destinationAddr?: string;

  /* 目的仓库地址（交货仓库） */

  destinationWarehouseId?: string;

  /* 目的国家（交货） */

  destinationCountry?: string;

  /* 操作口岸 */

  serviceCompanyId?: string;

  /* FBA  NO. */

  fbaNo?: string;

  /* 排序 */

  sorting?: string;

  /* 页大小 */

  maxResultCount?: number;

  /* 跳过指定条数 */

  skipCount?: number;
}

/**
 * 列表返回的单条记录
 */
export class CSPBookingForFcmDto {
  /* 创建人Id */

  creatorUserId?: number;

  /* 创建人 */

  creatorUserFullName?: string;

  /* 预订状态(枚举)
0 = BookingDraft
1 = WaitingForCancelling
2 = BookingSubmitted
3 = ShippingDone
4 = WaitingForPricing
5 = WaitingForBuyer
6 = WaitingForSeller
7 = BookingCancelled
8 = ShippingCancelled
9 = PriceConfirmedByCustomer
10 = ShippingSubmittedToCarrier
11 = SoNumberNotifiedToCustomer */

  status?: number;

  /* 订舱单业务号 */

  bookingNo?: string;

  /* 运单号（frm下获取） */

  name?: string;

  /* 下单时间（创建时间） */

  creationTime?: string;

  /* TODO 业务员 */

  customerId?: string;

  /* 客户名称 */

  customerName?: string;

  /* 货号日期 */

  cargoReadyDate?: string;

  /* 运输方式
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 起始港Id */

  originPortId?: string;

  /* 服务商存储电商货物的国内仓库地址 */

  deliveryWarehouseId?: string;

  /* 出货口岸 */

  serviceCompanyId?: string;

  /* 渠道ID */

  channelId?: string;

  /* 渠道 */

  channel?: string;

  /* 交货方式 */

  fbaPickUpMethodType?: string;

  /* 联系人id */

  contactId?: string;

  /* 目的仓库地址（交货仓库） */

  destinationWarehouseId?: string;

  /* 关联的目的地址 */

  destinationAddressId?: string;

  /* 预估交货日期，指必须交付货物的日期。 */

  deliveryDate?: string;

  /* 品名 */

  commodity?: string;

  /* 重量 */

  weight?: number;

  /* 体积 */

  volume?: string;

  /* 数量 */

  quantity?: string;

  /* CO.CSP.Application.Bookings.Bookings.Dto.FCM.BookingForFcmDto.ContactId 绑定的用户Id */

  contactUserId?: string;

  /* 运送方式
0 = DeliveryGoodsByMyself
1 = PickUpByCityocean */

  deliveryMethodType?: number;

  /* 送货地址 */

  destinationAddress?: CSPNetWorkLocationModel;

  /* 起始地址 */

  originAddress?: CSPNetWorkLocationModel;

  /* FBA No，可能存在多个 */

  fbaNos?: any[];

  /* 是否由 FCM 端创建 */

  isFcmCreated?: boolean;

  id?: string;
}

/**
 * 设置 Bookings 为已受理状态
 */
export class CSPSetBookingAcceptedInput {
  bookingIds?: any[];
}

/**
 * 更新状态后的返回值
 */
export class CSPSetBookingAcceptedOutput {}

/**
 *  No Remark
 */
export class CSPGetClearanceInvoicesForFcmOutput {
  cusClearanceInvoices?: any[];

  packingLists?: any[];
}

/**
 * 由 FCM端 操作创建或更新 Booking 的输入参数
 */
export class CSPCreateOrUpdateForFcmInput {
  /* Id */

  id?: string;

  /* FCM 对应的 ShipmentNo */

  shipmentNo?: string;

  /* 主客户Id */

  customerId?: string;

  /* 业务员id */

  serviceUserId?: number;

  /* 操作客服 */

  customerServiceUserId?: number;

  /* 业务类型（运输方式）
0 = Unknown
1 = Ocean
2 = Air */

  transportationMode?: number;

  /* 贸易类型
0 = NotSet
1 = General
2 = FBA
3 = FBM */

  tradeType?: number;

  /* 运输条款，port_to_door、port_to_port、door_to_door、door_to_port ... */

  freightType?: string;

  /* 贸易条款，可以是 EXW, FCA, FAS, FOB, CPT, CFR, CIF, CIP, DAT, DAP, DDP, or DPU. */

  incoterm?: string;

  /* 出货口岸 */

  serviceCompanyId?: string;

  /* 渠道 */

  channel?: string;

  /* 交货方式
0 = DeliveryGoodsByMyself
1 = PickUpByCityocean */

  fbaPickUpMethodType?: number;

  /* 联系人id */

  contactId?: string;

  /* 在起始地交货日期（货物就绪时间） */

  cargoReadyDate?: string;

  /* 关联的起始地址Id (存在拖车服务、FBA\M 需要上门取件时有值) */

  originAddressId?: string;

  /* 起始仓库地址 */

  originWarehouseId?: string;

  /* 起始港Id */

  originPortId?: string;

  /* 目的港口Id */

  destinationPortId?: string;

  /* 目的地址  
<remarks>FBM 时来源：客户自己创建的【network-MY-organization-location】</remarks> */

  destinationAddressId?: string;

  /* 目的仓库地址   
<remarks>FBA 时来源：亚马逊仓库基础数据（CRM FBALocations）</remarks> */

  destinationWarehouseId?: string;

  /* 预计在目的港交货日期，指必须交付货物的日期。 */

  deliveryDate?: string;

  /* 数量 */

  quantity?: number;

  /* 数量单位代码 */

  quantityUnitCode?: string;

  /* 重量 */

  weight?: number;

  /* 重量单位代码 */

  weightUnitCode?: string;

  /* 体积 */

  volume?: number;

  /* 体积单位代码 */

  volumeUnitCode?: string;
}

/**
 * 更新booking后返回
 */
export class CSPCreateOrUpdateForFcmOutput {
  bookingNo?: string;

  id?: string;
}

/**
 *  No Remark
 */
export class CSPCreateOrUpdateClearanceInvoicesForFcmInput {
  /* 映射 */

  cusClearanceInvoices?: any[];

  /* 映射 */

  packingLists?: any[];

  /* 客户 Id */

  customerId?: string;

  id?: string;
}

/**
 *  No Remark
 */
export class CSPDeleteBookingForFcmInput {
  bookingIds?: any[];
}

/**
 *  No Remark
 */
export class CSPGetBookingListForFcmInput {
  bookingIds?: any[];
}

/**
 *  No Remark
 */
export class CSPBookingListItemDtoForFcm {
  /* Id */

  id?: string;

  /* 主客户Id */

  customerId?: string;

  /* 发货客户Id */

  shipperCustomerId?: string;

  /* 业务员id */

  serviceUserId?: number;

  /* 业务类型（运输方式）
0 = Unknown
1 = Ocean
2 = Air */

  transportationMode?: number;

  /* 贸易类型
0 = NotSet
1 = General
2 = FBA
3 = FBM */

  tradeType?: number;

  /* 运输条款，port_to_door、port_to_port、door_to_door、door_to_port ... */

  freightType?: string;

  /* 订舱单号 */

  bookingNo?: string;

  /* 出货口岸 */

  serviceCompanyId?: string;

  /* 渠道 */

  channel?: string;

  /* 交货方式 */

  fbaPickUpMethodType?: string;

  /* 联系人id */

  contactId?: string;

  /* 地址地址 */

  originAddressId?: string;

  /* 起始仓库地址 */

  originWarehouseId?: string;

  /* 目的仓库地址 */

  destinationWarehouseId?: string;

  /* 目的地址 */

  destinationAddressId?: string;

  /* 始发装载时间/FBA时  Pick Up / Delivery Time */

  cargoReadyDate?: string;

  /* 预估交货日期，指必须交付货物的日期。 */

  deliveryDate?: string;

  /* 贸易条款 */

  incoterm?: string;

  /* 目的港 */

  destinationPortId?: string;

  /* 起始港Id */

  originPortId?: string;

  /* 数量 */

  quantity?: number;

  /* 数量单位代码 */

  quantityUnitCode?: string;

  /* 重量 */

  weight?: number;

  /* 重量单位代码 */

  weightUnitCode?: string;

  /* 体积 */

  volume?: number;

  /* 体积单位代码 */

  volumeUnitCode?: string;
}

/**
 * 订舱模板（仅用于全返回）
 */
export class CSPBookingTemplateOutput {
  /* 是否包含特殊品 */

  isContainsSpecialGoods?: boolean;

  /* 发货港 */

  originPort?: CSPPubLocation;

  /* 目的港 */

  destinationPort?: CSPPubLocation;

  /* 贸易条款显示字符 */

  incotermsString?: string;

  /* 发货方地址 */

  shipperAddress?: CSPNetWorkLocationModel;

  /* 收货方地址 */

  consigneeAddress?: CSPNetWorkLocationModel;

  /* 起始仓库 */

  deliveryWarehouse?: CSPFBALocationModel;

  /* FBA/FBM 上门提货地址（取件详细地址） */

  pickUpAddress?: CSPNetWorkLocationModel;

  /* 起始地址 */

  originAddress?: CSPNetWorkLocationModel;

  /* 目的地址 */

  destinationAddress?: CSPNetWorkLocationModel;

  /* Gets or sets the name of the consignee customer. */

  consigneeCustomerName?: string;

  /* Gets or sets the name of the shipper customer. */

  shipperCustomerName?: string;

  serviceCompanyId?: string;

  quantity?: number;

  quantityUnitId?: string;

  weight?: number;

  weightUnitId?: string;

  volume?: number;

  volumeUnitId?: string;

  /* 
0 = Imperial
1 = Metric */

  unitConvertType?: number;

  containsSpecialGoodsTypes?: string;

  description?: string;

  specialInstructions?: string;

  containerType?: string;

  name?: string;

  consigneeCustomerId?: string;

  consigneePartnerId?: string;

  shipperCustomerId?: string;

  shipperPartnerId?: string;

  cargoReadyDate?: string;

  incotermsId?: string;

  /* 
0 = NotSet
1 = General
2 = FBA
3 = FBM */

  tradeType?: number;

  /* 
0 = NotSet
1 = CY_CY
2 = CY_DOOR
3 = DOOR_CY
4 = DOOR_DOOR */

  freightType?: number;

  /* 
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 
0 = FCL
1 = LCL */

  shipmentType?: number;

  originPortId?: string;

  originIsRequireTruck?: boolean;

  originAddressId?: string;

  isDeclaration?: boolean;

  isInsurance?: boolean;

  destinationPortId?: string;

  destinationAddressId?: string;

  deliveryDate?: string;

  destinationIsRequireTruck?: boolean;

  isClearance?: boolean;

  isTaxIncluded?: boolean;

  declareCurrencyId?: string;

  contactId?: string;

  contactUserId?: string;

  /* 
0 = DeliveryGoodsByMyself
1 = PickUpByCityocean */

  deliveryMethodType?: number;

  deliveryWarehouseId?: string;

  fbaFreightMethodId?: string;

  channelId?: string;

  customerId?: string;

  tenantId?: number;

  extensionData?: string;

  /* 主键 */

  id?: string;

  /* 创建时间 */

  creationTime?: string;

  /* 创建人ID */

  creatorUserId?: number;

  /* 最后一次修改时间 */

  lastModificationTime?: string;

  /* 最后一次修改人 */

  lastModifierUserId?: number;

  /* 删除时间 */

  deletionTime?: string;

  /* 删除用户 */

  deleterUserId?: number;

  isDeleted?: boolean;
}

/**
 * 订舱单模板
 */
export class CSPBookingTemplateDto {
  /* 运输方式，freight默认为空，有选用提交后根据提交结果进行填充
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 发货港 */

  originPort?: CSPPubLocation;

  /* 目的港 */

  destinationPort?: CSPPubLocation;

  /* 贸易条款显示字符 */

  incotermsString?: string;

  /* 发货方地址 */

  shipperAddress?: CSPNetWorkLocationModel;

  /* 收货方地址 */

  consigneeAddress?: CSPNetWorkLocationModel;

  /* 起始仓库 */

  deliveryWarehouse?: CSPFBALocationModel;

  /* FBA/FBM 上门提货地址（取件详细地址） */

  pickUpAddress?: CSPNetWorkLocationModel;

  /* 是否包含特殊品 */

  isContainsSpecialGoods?: boolean;

  /* Gets or sets the name of the consignee customer. */

  consigneeCustomerName?: string;

  /* Gets or sets the name of the shipper customer. */

  shipperCustomerName?: string;

  serviceCompanyId?: string;

  quantity?: number;

  quantityUnitId?: string;

  weight?: number;

  weightUnitId?: string;

  volume?: number;

  volumeUnitId?: string;

  /* 
0 = Imperial
1 = Metric */

  unitConvertType?: number;

  containsSpecialGoodsTypes?: string;

  description?: string;

  specialInstructions?: string;

  containerType?: string;

  name?: string;

  consigneeCustomerId?: string;

  consigneePartnerId?: string;

  shipperCustomerId?: string;

  shipperPartnerId?: string;

  cargoReadyDate?: string;

  incotermsId?: string;

  /* 
0 = NotSet
1 = General
2 = FBA
3 = FBM */

  tradeType?: number;

  /* 
0 = NotSet
1 = CY_CY
2 = CY_DOOR
3 = DOOR_CY
4 = DOOR_DOOR */

  freightType?: number;

  /* 
0 = FCL
1 = LCL */

  shipmentType?: number;

  originPortId?: string;

  originIsRequireTruck?: boolean;

  originAddressId?: string;

  isDeclaration?: boolean;

  isInsurance?: boolean;

  destinationPortId?: string;

  destinationAddressId?: string;

  deliveryDate?: string;

  destinationIsRequireTruck?: boolean;

  isClearance?: boolean;

  isTaxIncluded?: boolean;

  declareCurrencyId?: string;

  contactId?: string;

  contactUserId?: string;

  /* 
0 = DeliveryGoodsByMyself
1 = PickUpByCityocean */

  deliveryMethodType?: number;

  deliveryWarehouseId?: string;

  fbaFreightMethodId?: string;

  channelId?: string;

  customerId?: string;

  tenantId?: number;

  extensionData?: string;

  /* 主键 */

  id?: string;

  /* 创建时间 */

  creationTime?: string;

  /* 创建人ID */

  creatorUserId?: number;

  /* 最后一次修改时间 */

  lastModificationTime?: string;

  /* 最后一次修改人 */

  lastModifierUserId?: number;

  /* 删除时间 */

  deletionTime?: string;

  /* 删除用户 */

  deleterUserId?: number;

  isDeleted?: boolean;
}

/**
 * 重复校验传输模型
 */
export class CSPBookingTemplateCheckInputDto {
  /* 模板名称 */

  name?: string;

  id?: string;
}

/**
 * 客服团队Dto
 */
export class CSPServiceUserGroupDto {
  /* 公司名称 */

  companyName?: string;

  /* 公司成员 */

  users?: any[];
}

/**
 * 危险品-传输对象模型
 */
export class CSPDangerousGoodDto {
  /* 代码 */

  code?: string;

  /* 名称 */

  name?: string;

  /* 类别 */

  class?: string;

  /* 附属风险 */

  subsidiaryRisk?: string;

  /* 包装类别 */

  packingGroup?: string;

  /* 特殊规定 */

  specialProvision?: string;

  /* 限量 */

  limitedQuantity?: string;

  /* 包装说明 */

  packingInstruction?: string;

  /* 包装特殊规定 */

  packingSpecialProvision?: string;

  /* 移动式油箱说明 */

  portableTankInstruction?: string;

  /* 移动式油箱特殊规定 */

  portableTankSpecialProvision?: string;

  id?: string;
}

/**
 * H.S. Code - 传输对象模型
 */
export class CSPHsCodeDto {
  /* H.S. Number */

  hsNumber?: string;

  /* 说明 */

  description?: string;

  /* 数量单位 */

  unitOfQuantity?: string;

  /* 普通税率 */

  generalRateOfDuty?: string;

  /* 特殊税率 */

  specialRateOfDuty?: string;

  /* 第二栏税率 */

  column2RateOfDuty?: string;

  /* 定额数量 */

  quotaQuantity?: string;

  /* 附加关税 */

  additionalDuties?: string;

  id?: string;
}

/**
 *  No Remark
 */
export class CSPMayInviteUserModel {
  userId?: number;

  userFullName?: string;

  companyId?: string;

  companyName?: string;

  isInGroup?: boolean;

  tenantId?: number;

  positionId?: string;

  positionName?: string;

  isActive?: boolean;
}

/**
 * Class CreateImGroupInput.
 */
export class CSPCreateImGroupInput {
  /* 业务类型
0 = Quote
1 = Booking
2 = Shipment
3 = Order
4 = Product
5 = Billing */

  businessType: number;

  /* 业务单号Id */

  businessId: string;

  /* 群名，一般是业务号 */

  imGroupName: string;

  /* 创建成功之后发送的文本消息 */

  textMessage?: string;
}

/**
 * Class CreateImGroupForCustomerInput.
 */
export class CSPCreateImGroupForCustomerInput {
  /* 业务类型
0 = Quote
1 = Booking
2 = Shipment
3 = Order
4 = Product
5 = Billing */

  businessType: number;

  /* 目标客户Id */

  customerId: string;
}

/**
 *  No Remark
 */
export class CSPAddDeleteGroupInput {
  groupId?: string;

  deleteNow?: boolean;

  hours?: number;
}

/**
 *  No Remark
 */
export class CSPErrorInfo {
  code?: number;

  message?: string;

  details?: string;

  validationErrors?: any[];
}

/**
 *  No Remark
 */
export class CSPAjaxResponse {
  result?: object;

  targetUrl?: string;

  success?: boolean;

  error?: CSPErrorInfo;

  unAuthorizedRequest?: boolean;

  __abp?: boolean;
}

/**
 *  No Remark
 */
export class CSPInvioceTitleListDto {
  /* 公司名称 */

  companyName?: string;

  /* 税号 */

  tfn?: string;

  /* 地址 */

  address?: string;

  /* 电话 */

  tel?: string;

  /* 是否默认 */

  isDefault?: boolean;

  /* 开户银行 */

  bank?: string;

  /* 银行账号1 */

  bankAccount1?: string;

  /* 币种1 */

  currency1?: string;

  /* 银行账号2 */

  bankAccount2?: string;

  /* 币种2 */

  currency2?: string;

  id?: string;
}

/**
 * 新增/编辑抬头Id
 */
export class CSPInvioceTitleDto {
  /* 公司名称 */

  companyName: string;

  /* 税号 */

  tfn: string;

  /* 地址 */

  address: string;

  /* 电话 */

  tel: string;

  /* 是否默认 */

  isDefault?: boolean;

  /* 开户银行 */

  bank?: string;

  /* 银行账号1 */

  bankAccount1?: string;

  /* 币种1 */

  currency1?: string;

  /* 银行账号2 */

  bankAccount2?: string;

  /* 币种2 */

  currency2?: string;

  id?: string;
}

/**
 * 产品-传输对象模型
 */
export class CSPProductDto {
  /* 产品名称 */

  name: string;

  /* 所属订单id */

  purchaseOrderId?: string;

  /* Sku */

  sku?: string;

  /* 产品链接 */

  url?: string;

  /* 产品分类Id */

  categoryId?: string;

  /* 产品分类名称-仅明细使用 */

  categoryName?: string;

  /* 原产地Id */

  originId?: string;

  /* 原产地名称-仅明细使用 */

  originName?: string;

  /* 是否危险品 */

  isDangerousGood?: boolean;

  /* 危险品Id */

  dangerousGoodId?: string;

  /* 危险品对象-仅明细使用 */

  dangerousGoodDto?: CSPDangerousGoodDto;

  /* 产品属性 */

  properties?: any[];

  /* 产品关税分类 */

  classifications?: any[];

  /* 产品图片 */

  imageId?: string;

  id?: string;
}

/**
 * 产品列表-传输对象模型
 */
export class CSPProductListDto {
  /* 产品名称 */

  name?: string;

  /* Sku */

  sku?: string;

  /* 原产地名称 */

  originName?: string;

  /* 产品链接 */

  url?: string;

  /* 产品属性 */

  properties?: any[];

  /* 产品关税分类 */

  classifications?: any[];

  /* 运输中的数量 */

  unitsInTransit?: number;

  /* 有效运输的数量 */

  activeShipments?: number;

  /* 产品图片 */

  imageId?: string;

  id?: string;
}

/**
 * 导入结果
 */
export class CSPImportResult {
  /* 验证错误 */

  rowErrors?: any[];

  /* 其它消息信息 */

  message?: string;

  /* 行数据总条数 */

  totalRowCount?: number;

  /* 行数据验证错误条数 */

  errorRowCount?: number;

  /* 导入异常信息 */

  exception?: object;

  /* 是否存在导入错误 */

  hasError?: boolean;
}

/**
 * 产品导出
 */
export class CSPProductExportInput {
  /* 国家Id */

  regionId?: string;

  /* 搜索关键字 */

  searchText?: string;

  /* 产品Id集合 */

  ids?: any[];
}

/**
 * 获取产品Sku列表
 */
export class CSPProductSkuListOutput {
  /* 产品名称 */

  name?: string;

  /* Sku */

  sku?: string;

  /* 产品链接 */

  url?: string;

  /* H.S. Code */

  hsCode?: string;

  /* 图片Id */

  imageId?: string;

  id?: string;
}

/**
 *  No Remark
 */
export class CSPCurrentUserProfileEditDto {
  timezone?: string;
}

/**
 * 采购订单-传输对象模型
 */
export class CSPPurchaseOrderDto {
  /* 订单号 */

  orderNumber: string;

  /* 是否共享给供应商 */

  isShare: boolean;

  /* 采购商Id */

  buyerPartnerId?: string;

  /* 采购商客户Id */

  buyerCustomerId?: string;

  /* 供应商Id */

  venderPartnerId?: string;

  /* 供应商客户Id */

  venderCustomerId?: string;

  /* 供应商名称 - 新建时不传POD */

  venderName?: string;

  /* 采购商名称 - 新建时不传 */

  buyerName?: string;

  /* 是否供应商创建 - 新建时不传 */

  isVenderCreated?: boolean;

  /* 运输方式
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 到达日期 */

  arriveDate?: string;

  /* 订单项，有子订单不传 */

  items?: any[];

  /* 子订单,没有子订单不传 */

  children?: any[];

  /* 创建时间 */

  creationTime?: string;

  /* 创建人id */

  creatorUserId?: number;

  /* 最后修改人id */

  lastModifierUserId?: number;

  /* 最后一次修改时间 */

  lastModificationTime?: string;

  id?: string;
}

/**
 * 采购订单明细-传输对象模型
 */
export class CSPPurchaseOrderDetailOutput {
  /* 订单号 */

  orderNumber: string;

  /* 是否共享给供应商 */

  isShare: boolean;

  /* 采购数量 */

  requested?: number;

  /* 供货数量 */

  received?: number;

  /* 金额 */

  totalUnitCost?: number;

  /* 状态
0 = AwaitingConfirmation
1 = Confirmed
2 = Rejected
3 = Modified
4 = Booked
5 = PartiallyBooked
6 = Expired */

  status?: number;

  /* 产品统计列表 */

  products?: any[];

  /* 最新记录 */

  current?: CSPPurchaseOrderDto;

  /* 变更记录 */

  modified?: any[];

  /* 原始记录 */

  original?: CSPPurchaseOrderDto;

  /* 最后的修改记录 */

  lastChange?: CSPPurchaseOrderDto;

  /* 最新的修改中涉及到的 OrderItem 数量 */

  orderItemNewChangeCount?: number;

  /* 可拒绝或确认 */

  canConfirmOrReject?: boolean;

  /* 可编辑 */

  canEdit?: boolean;

  /* 采购商Id */

  buyerPartnerId?: string;

  /* 采购商客户Id */

  buyerCustomerId?: string;

  /* 供应商Id */

  venderPartnerId?: string;

  /* 供应商客户Id */

  venderCustomerId?: string;

  /* 供应商名称 - 新建时不传POD */

  venderName?: string;

  /* 采购商名称 - 新建时不传 */

  buyerName?: string;

  /* 是否供应商创建 - 新建时不传 */

  isVenderCreated?: boolean;

  /* 运输方式
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 到达日期 */

  arriveDate?: string;

  /* 订单项，有子订单不传 */

  items?: any[];

  /* 子订单,没有子订单不传 */

  children?: any[];

  /* 创建时间 */

  creationTime?: string;

  /* 创建人id */

  creatorUserId?: number;

  /* 最后修改人id */

  lastModifierUserId?: number;

  /* 最后一次修改时间 */

  lastModificationTime?: string;

  id?: string;
}

/**
 * 获取订单列表-传输对象模型
 */
export class CSPGetPurchaseOrderListInput {
  /* 全局搜索关键字 */

  searchText?: string;

  /* 开始日期 */

  startDate?: string;

  /* 结束日期 */

  endDate?: string;

  /* 状态 */

  status?: any[];

  /* 过滤条件 */

  filters?: any[];

  /* 排序 */

  sorting?: string;

  /* 页大小 */

  maxResultCount?: number;

  /* 跳过指定条数 */

  skipCount?: number;
}

/**
 * 采购订单列表-传输对象模型
 */
export class CSPPurchaseOrderListDto {
  /* 订单号 */

  orderNumber?: string;

  /* 产品 */

  products?: any[];

  /* 采购商名称 */

  buyerName?: string;

  /* 供应商名称 */

  venderName?: string;

  /* 供应商客户Id */

  venderCustomerId?: string;

  /* 供应商Id，供应商创建为null */

  venderPartnerId?: string;

  /* 采购商客户Id */

  buyerCustomerId?: string;

  /* 采购商Id，采购商创建为null */

  buyerPartnerId?: string;

  /* 发送人 */

  senderName?: string;

  /* 接收人 */

  receivers?: any[];

  /* 是否供应商创建 */

  isVenderCreated?: boolean;

  /* 状态
0 = AwaitingConfirmation
1 = Confirmed
2 = Rejected
3 = Modified
4 = Booked
5 = PartiallyBooked
6 = Expired */

  status?: number;

  /* 采购数量 */

  requested?: number;

  /* 供货数量 */

  received?: number;

  /* 金额 */

  totalUnitCost?: number;

  /* 创建时间 */

  creationTime?: string;

  /* 创建人id */

  creatorUserId?: number;

  /* 最后修改人id */

  lastModifierUserId?: number;

  /* 最后一次修改时间 */

  lastModificationTime?: string;

  /* 可拒绝或确认 */

  canConfirmOrReject?: boolean;

  /* 可编辑 */

  canEdit?: boolean;

  id?: string;
}

/**
 * 获取采购订单列表供Product模块使用
 */
export class CSPPurchaseOrderListToProductDto {
  /* 订单号 */

  orderNumber?: string;

  /* 创建时间 */

  creationTime?: string;

  /* 供应商名称 */

  venderName?: string;

  /* 采购商名称 */

  buyerName?: string;

  /* 状态
0 = AwaitingConfirmation
1 = Confirmed
2 = Rejected
3 = Modified
4 = Booked
5 = PartiallyBooked
6 = Expired */

  status?: number;

  id?: string;
}

/**
 * 采购订单列表明细-传输对象模型
 */
export class CSPPurchaseOrderListDetailOutput {
  /* 订单号 */

  orderNumber?: string;

  /* 运输方式
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 到达日期 */

  arriveDate?: string;

  /* 订单项 */

  items?: any[];

  id?: string;
}

/**
 * 获取采购订单修改明细-传输对象模型
 */
export class CSPPurchaseOrderChangeDetailOutput {
  /* 最新记录 */

  current?: CSPPurchaseOrderDto;

  /* 变更记录 */

  modified?: any[];

  /* 原始记录 */

  original?: CSPPurchaseOrderDto;
}

/**
 * 查看修改记录
 */
export class CSPViewChangeInput {
  id?: string;
}

/**
 * 确认采购订单-传输对象模型
 */
export class CSPPurchaseOrderConfirmInput {
  /* 需要创建Booking的采购订单Id */

  orderIds?: any[];
}

/**
 * 拒绝采购订单-传输对象模型
 */
export class CSPPurchaseOrderRejectInput {
  id?: string;
}

/**
 * 创建Booking-传输对象模型
 */
export class CSPPurchaseOrderBookingInput {
  /* 是否转换为 Booking，如果是 true，则返回带有预生成 Booking 的数据，否则只返回PO信息 */

  toBooking?: boolean;

  /* 海运还是空运
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 需要创建Booking的采购订单Id */

  orderIds?: any[];
}

/**
 * 创建Booking返回结果-传输对象模型
 */
export class CSPPurchaseOrderBookingOutput {
  /* 采购商名称数组 */

  buyers?: any[];

  /* 供应商名称数组 */

  venders?: any[];

  /* 是否是卖方 */

  isShipper?: boolean;

  /* 始发装载时间 */

  cargoReadyDate?: string;

  /* 订单列表 */

  orders?: any[];

  bookingOrder?: CSPBookingDto;
}

/**
 * Booking创建搜索关联-传输对象模型
 */
export class CSPPurchaseOrderBookingSearchInput {
  /* 查询关键字-PO# */

  searchKeyword?: string;
}

/**
 * Booking创建搜索关联-传输对象模型
 */
export class CSPPurchaseOrderBookingSearchOutput {
  /* 订单号 */

  orderNumber?: string;

  /* 是否包含危险品 */

  hasDangerousGood?: boolean;

  /* 产品名称 */

  productNames?: any[];

  /* 子集合 */

  children?: any[];

  id?: string;
}

/**
 * 导入采购订单
 */
export class CSPPurchaseOrderImportInput {
  /* 订单数据 */

  data?: any[];
}

/**
 * 下载采购订单-传输对象模型
 */
export class CSPPurchaseOrderExportInput {
  /* 采购订单Id集合 */

  ids?: any[];
}

/**
 *  No Remark
 */
export class CSPConditionItemAttribute {
  modelTypeName?: string;

  groupName?: string;

  groupOrder?: number;

  displayName?: string;

  memberName?: string;

  inputValueType?: string;

  isSpecial?: boolean;

  optionalValues?: object;

  remark?: string;

  operators?: any[];

  typeId?: object;
}

/**
 * 采购订单统一返回下拉数据模型
 */
export class CSPPurchaseOrderFilterDto {
  /* 显示名称 */

  displayName?: string;

  /* 值 */

  value?: object;
}

/**
 * 移除OrderItem
 */
export class CSPDeleteByItemIdInput {
  /* 订单Id */

  orderId?: string;

  /* 订单项Id */

  itemId?: string;
}

/**
 * 自定义日程Dto
 */
export class CSPScheduleDto {
  /* 提醒开始时间 */

  remindStartTime: string;

  /* 提醒标题 */

  title: string;

  /* 提前提醒时间（分钟） */

  advanceTime: number;

  /* 提醒结束时间 */

  remindEndTime?: string;

  /* 提醒内容 */

  content?: string;

  /* 提醒人多个用，分开 */

  remindPeople?: string;

  /* 日程类型
0 = NotSet
1 = DIYSet
2 = Shipment */

  scheduleType?: number;

  /* 业务号 */

  businessNo?: string;

  /* 创建时间 */

  creationTime?: string;

  id?: string;
}

/**
 * 日程发送
 */
export class CSPScheduleSentInput {
  /* 日程Id */

  id?: string;
}

/**
 *  No Remark
 */
export class CSPNewsAndUpdatesSettingsEditDto {
  emailMeTheDailyShipmentDigest?: boolean;

  emailMeTheWeeklyShipmentDigest?: boolean;
}

/**
 * 基本设置参数
 */
export class CSPGeneralSettingsEditDto {
  /* 币种 */

  currencyCode?: string;
}

/**
 * Settings Dto
 */
export class CSPSettingsEditDto {
  /* 基础设置 */

  general?: CSPGeneralSettingsEditDto;

  /* Gets or sets the news and updates. */

  newsAndUpdates?: CSPNewsAndUpdatesSettingsEditDto;
}

/**
 * 获取传输模型
 */
export class CSPGetShipmentListInput {
  /* 搜索关键字 */

  searchText?: string;

  /* 选中的状态集合 */

  status?: any[];

  /* 运输方式 FreightMethodType */

  freightMethodTypes?: any[];

  /* 运输类型 ShipmentType */

  shipmentTypes?: any[];

  /* 过滤条件 */

  filters?: any[];

  /* 排序 */

  sorting?: string;

  /* 页大小 */

  maxResultCount?: number;

  /* 跳过指定条数 */

  skipCount?: number;
}

/**
 * 路线详情
 */
export class CSPRouteDetails {
  /* 多发货人信息 */

  shipperDtos?: any[];

  /* 多收货人信息 */

  consigneeDtos?: any[];

  /* 截文件日 */

  siCutOffDate?: string;

  /* 截VGM日 */

  vgmCutOffDate?: string;

  /* 截柜日 */

  cyCutOffTime?: string;

  /* 可以提柜日 */

  availableDate?: string;

  /* 免堆日 */

  lastFreeDate?: string;

  /* 起始港 */

  originPort?: CSPPubLocation;

  /* 预计拖车到达起始港时间 */

  estTruckDeliveryOrignDate?: string;

  /* 实际拖车到达起始港时间 */

  actualTruckDeliveryOrignDate?: string;

  /* 预估离开出发港日期 */

  estDepatureOrginPortDate?: string;

  /* 实际离开出发港日期 */

  actualDepatureOrginPortDate?: string;

  /* Delivered 目的地数量 */

  destinationPlaceDeliveredCount?: number;

  /* 总集装箱数 */

  containerCount?: number;

  /* 船东 */

  carrierCustomerName?: string;

  /* 属于船运公司工作范围的目的地 */

  destinationPortId?: string;

  /* 预估到达目的港日期 */

  estArrivalDestinationPortDate?: string;

  /* 实际到达目的港日期 */

  actualArrivalDestinationPortDate?: string;

  /* 预估装车时间（离港后） */

  estPickUpTruckDestinationDate?: string;

  /* 实际装车时间（离港后） */

  actualPickUpTruckDestinationDate?: string;

  /* 目的港 */

  destinationPort?: CSPPubLocation;

  /* 港后拖车公司 */

  truckCustomerName?: string;

  /* 从目的港 PickedUp 数量 */

  destinationPortPickedUpCount?: number;

  /* Delivered 起始港数量 */

  originPortDeliveredCount?: number;

  /* 从起始地 PickedUp 数量 */

  originPlacePickUpCount?: number;
}

/**
 * 运输单主页List
 */
export class CSPShipmentListOutput {
  /* Gets or sets the customer identifier. */

  customerId?: string;

  /* shipment业务号 */

  shipmentNo?: string;

  /* shipment名称 */

  shipmentName?: string;

  /* icp订舱号 */

  soNo?: string;

  /* 运输类型 整箱或散货
0 = FCL
1 = LCL */

  shipmentType?: number;

  /* 运输方式
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 运输状态
0 = Seller_Location
1 = OriginStopOff
2 = In_Transit_To_Departure_port
3 = Departure_Port
4 = In_Transit_To_Arrival_Port
5 = Arrival_Port
6 = In_Transit_To_Final_Destination
7 = DestinationStopOff
8 = Final_Destination
9 = Canceled
10 = Completed
-1 = Default */

  status?: number;

  /* 最晚预计最终到达时间 */

  mainESTTruckDeliveryDate?: string;

  /* 大船/航次 */

  vessel?: string;

  /* 大船航次信息 */

  vesselVoyage?: CSPNameValueDto;

  /* 大船/航次 */

  preVessel?: string;

  /* 驳船航次信息 */

  preVesselVoyage?: CSPNameValueDto;

  /* 运输条款 来自基础数据（用来判断显示路径door to door） */

  transportClausesId?: string;

  /* 运输条款显示 */

  transportClausesString?: string;

  /* 箱型规格计算后List
01 整柜 ：显示运单中container 型号、数量；可以是多个
02 散货：显示运单中 货物"计费总重量"（e.g.：982.33 cbm）或者"计费总体积"；（e.g. 889.99cbm） */

  containerTypes?: any[];

  /* 重量 */

  totalWeightString?: string;

  /* 体积 */

  totalVolumeString?: string;

  /* 路线详情 */

  routeDetails?: CSPRouteDetails;

  /* 事件分组，包括异常正常 */

  shipmentEventGroups?: any[];

  /* 采购单Id list(用于详情) */

  purchaseOrderIds?: any[];

  /* 关联的询价Id */

  quoteEnquiryIds?: any[];

  /* 关联的产品Id */

  productIds?: any[];

  /* 提单号 */

  billOfLadingNo?: string;

  /* 贸易条款(单选取字典) */

  incotermsId?: string;

  /* 箱号 */

  containerNos?: string;

  /* 运输类型（门到门港 到 港等） */

  freightTypeString?: string;

  /* 数量 */

  quantityString?: string;

  /* 贸易条款显示字符 */

  incotermsString?: string;

  /* 特殊介绍 */

  specialInstructions?: string;

  /* 装货港 */

  portOfLoading?: CSPPubLocation;

  /* 卸货港 */

  portOfDischarge?: CSPPubLocation;

  /* 预计到达时间 */

  eta?: string;

  /* 预计出发时间 */

  etd?: string;

  id?: string;
}

/**
 * 为产品提供Shipment列表返回
 */
export class CSPGetAllForProductOutput {
  /* shipment业务号 */

  shipmentNo?: string;

  /* 运输方式（用来判断显示图标）
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 运输方式显示 */

  freightMethodTypeString?: string;

  /* 运输状态
0 = Seller_Location
1 = OriginStopOff
2 = In_Transit_To_Departure_port
3 = Departure_Port
4 = In_Transit_To_Arrival_Port
5 = Arrival_Port
6 = In_Transit_To_Final_Destination
7 = DestinationStopOff
8 = Final_Destination
9 = Canceled
10 = Completed
-1 = Default */

  status?: number;

  /* 属于船运公司工作范围的起始地 */

  originPortId?: string;

  /* 属于船运公司工作范围的目的地 */

  destinationPortId?: string;

  /* 货物到达最终目的地的预估时间 */

  estDeliveryDate?: string;

  /* 在途货物件数 */

  quantity?: number;

  /* PO号多个，号分开 */

  poNumbers?: string;

  /* 起始港 */

  originPort?: CSPPubLocation;

  /* 起始港 */

  originPortString?: string;

  /* 目的港 */

  destinationPort?: CSPPubLocation;

  /* 目的港 */

  destinationPortString?: string;

  /* 发货客户名称集合 */

  shipperCustomerNames?: any[];

  /* 收货客户名称集合 */

  consigneeCustomerNames?: any[];

  /* 这里是发货公司 */

  originPorts?: any[];

  /* 这里是收货公司 */

  destinationPorts?: any[];
}

/**
 * 运单详情仅用于展示模型
 */
export class CSPShipmentDetailOutput {
  /* 产品包装数 */

  packages?: number;

  /* 运输的产品件数 */

  pieces?: number;

  /* Gets or sets the customer identifier. */

  customerId?: string;

  /* shipment业务号 */

  shipmentNo?: string;

  /* shipment名称 */

  shipmentName?: string;

  /* icp订舱号 */

  soNo?: string;

  /* 运输类型 整箱或散货
0 = FCL
1 = LCL */

  shipmentType?: number;

  /* 运输方式
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 运输状态
0 = Seller_Location
1 = OriginStopOff
2 = In_Transit_To_Departure_port
3 = Departure_Port
4 = In_Transit_To_Arrival_Port
5 = Arrival_Port
6 = In_Transit_To_Final_Destination
7 = DestinationStopOff
8 = Final_Destination
9 = Canceled
10 = Completed
-1 = Default */

  status?: number;

  /* 最晚预计最终到达时间 */

  mainESTTruckDeliveryDate?: string;

  /* 大船/航次 */

  vessel?: string;

  /* 大船航次信息 */

  vesselVoyage?: CSPNameValueDto;

  /* 大船/航次 */

  preVessel?: string;

  /* 驳船航次信息 */

  preVesselVoyage?: CSPNameValueDto;

  /* 运输条款 来自基础数据（用来判断显示路径door to door） */

  transportClausesId?: string;

  /* 运输条款显示 */

  transportClausesString?: string;

  /* 箱型规格计算后List
01 整柜 ：显示运单中container 型号、数量；可以是多个
02 散货：显示运单中 货物"计费总重量"（e.g.：982.33 cbm）或者"计费总体积"；（e.g. 889.99cbm） */

  containerTypes?: any[];

  /* 重量 */

  totalWeightString?: string;

  /* 体积 */

  totalVolumeString?: string;

  /* 路线详情 */

  routeDetails?: CSPRouteDetails;

  /* 事件分组，包括异常正常 */

  shipmentEventGroups?: any[];

  /* 采购单Id list(用于详情) */

  purchaseOrderIds?: any[];

  /* 关联的询价Id */

  quoteEnquiryIds?: any[];

  /* 关联的产品Id */

  productIds?: any[];

  /* 提单号 */

  billOfLadingNo?: string;

  /* 贸易条款(单选取字典) */

  incotermsId?: string;

  /* 箱号 */

  containerNos?: string;

  /* 运输类型（门到门港 到 港等） */

  freightTypeString?: string;

  /* 数量 */

  quantityString?: string;

  /* 贸易条款显示字符 */

  incotermsString?: string;

  /* 特殊介绍 */

  specialInstructions?: string;

  /* 装货港 */

  portOfLoading?: CSPPubLocation;

  /* 卸货港 */

  portOfDischarge?: CSPPubLocation;

  /* 预计到达时间 */

  eta?: string;

  /* 预计出发时间 */

  etd?: string;

  id?: string;
}

/**
 * Class ShipmentEventGroupDto.
 */
export class CSPShipmentEventGroupDto {
  /* 关联的 Shipment Id */

  shipmentId?: string;

  /* 事件针对的业务类型
0 = Unknown
1 = Shipment
2 = ShipmentItem
3 = ShipmentContainer
8 = Bill */

  businessEventType?: number;

  /* 事件类型：操作流程事件、运输状态事件、其它事件
0 = ProcedureEvent
1 = ShipmentStatusEvent
2 = OthersEvent */

  type?: number;

  /* 事件代码 */

  eventCode?: string;

  /* 主题 */

  subject?: string;

  /* 描述 */

  description?: string;

  /* 发生节点
0 = NotSet
1 = OriginPlace
2 = OriginPort
3 = DestinationPort
4 = DestinationPlace */

  happenNode?: number;

  /* 发生时间 */

  happenTime?: string;

  /* 是否异常 0无，1异常 */

  isException?: boolean;

  /* 详细 */

  details?: string;

  /* 发生地点 */

  address?: string;

  /* 当前事件代码分组下的箱信息 */

  shipmentContainers?: any[];

  /* 当前事件下活动的箱数量 */

  containerActivityCount?: number;

  /* 总箱数 */

  containerTotalCount?: number;
}

/**
 * 运输单基本信息
 */
export class CSPCreateOrUpdateShipmentInput {
  /* 业务服务人员列表 */

  serviceUsers?: any[];

  /* Shipment 订舱单列表 */

  shipmentBookings?: any[];

  customerId?: string;

  /* shipment 业务号 */

  shipmentNo?: string;

  /* shipment名称 */

  shipmentName?: string;

  /* icp订舱号 */

  soNo?: string;

  /* FBA/M 业务时的快递单号 */

  expressNo?: string;

  /* 入库单号 */

  warehouseNo?: string;

  /* 转单号 */

  transferNo?: string;

  /* 运输状态
0 = Seller_Location
1 = OriginStopOff
2 = In_Transit_To_Departure_port
3 = Departure_Port
4 = In_Transit_To_Arrival_Port
5 = Arrival_Port
6 = In_Transit_To_Final_Destination
7 = DestinationStopOff
8 = Final_Destination
9 = Canceled
10 = Completed
-1 = Default */

  status?: number;

  /* 运输方式（用来判断显示图标）
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 运输类型 整箱或散货（用来判断显示详细货物信息还是整柜）
0 = FCL
1 = LCL */

  shipmentType?: number;

  /* 运输条款 来自基础数据（用来判断显示路径door to door） */

  transportClausesId?: string;

  /* 运输条款显示 */

  transportClausesString?: string;

  /* 贸易类型
0 = NotSet
1 = General
2 = FBA
3 = FBM */

  tradeType?: number;

  /* 贸易条款(单选取字典) */

  incotermsId?: string;

  /* 大船船名/航次 */

  vessel?: string;

  /* 驳船船名/航次 */

  preVessel?: string;

  /* 船东客户Id */

  carrierCustomerId?: string;

  /* 拖车公司客户Id */

  truckCustomerId?: string;

  /* 属于船运公司工作范围的起始地 */

  originPortId?: string;

  /* 属于船运公司工作范围的目的地 */

  destinationPortId?: string;

  /* 进港日，入关日 */

  gateInDate?: string;

  /* 截关日 */

  gateCutOffDate?: string;

  /* 截AMS日 */

  amsCutOffDate?: string;

  /* 截文件日 */

  siCutOffDate?: string;

  /* 截VGM日 */

  vgmCutOffDate?: string;

  /* 截柜日 */

  cyCutOffTime?: string;

  /* 预估离开出发港日期 */

  estDepatureOrginPortDate?: string;

  /* 实际离开出发港日期 */

  actualDepatureOrginPortDate?: string;

  /* 预估到达目的港日期 */

  estArrivalDestinationPortDate?: string;

  /* 实际到达目的港日期 */

  actualArrivalDestinationPortDate?: string;

  id?: string;
}

/**
     * Class CloseShipmentInput.
Implements the CO.Platform.Core.Application.Dto.CoEntityDto
     */
export class CSPCloseShipmentInput {
  /* 是否由于还空柜已完成而关闭，如果 false 则是因为其它原因取消 Shipment */

  isCompleted?: boolean;

  id?: string;
}

/**
 * Class ShipmentOrderItemDto.
 */
export class CSPShipmentOrderItemDto {
  /* ShipmentId */

  shipmentId?: string;

  /* Gets or sets the order item in containers. */

  orderItemInContainers?: any[];

  /* Gets or sets the po no. */

  orderNumber?: string;

  /* PO Id */

  orderId?: string;

  /* 关联的供应商客户Id */

  venderCustomerId?: string;

  /* 关联的采购商客户Id */

  buyerCustomerId?: string;

  /* PO ItemId */

  orderItemId?: string;

  /* Product Id */

  productId?: string;

  /* Gets or sets the name of the product. */

  productName?: string;

  /* Gets or sets the MPN. */

  mpn?: string;

  /* Gets or sets the sku. */

  sku?: string;

  /* 数量 */

  units?: number;

  /* 单价 */

  unitCost?: number;

  /* 体积 */

  volume?: number;

  /* 箱数 */

  cartons?: number;

  /* 毛重 */

  grossWeight?: number;

  /* 净重 */

  netWeight?: number;
}

/**
 *  No Remark
 */
export class CSPImportShipmentOrderItemsInput {
  shipmentId?: string;

  items?: any[];
}

/**
     * Class UpdatePostPortEstDateInput.
Implements the CO.Platform.Core.Application.Dto.CoEntityDto
     */
export class CSPUpdatePostPortEstDateInput {
  /* 预计最终到达时间 */

  estTruckDeliveryDate?: string;

  /* 预估在目的港装车时间（离港后） */

  estPickUpTruckDestinationDate?: string;

  /* 预估到达目的港日期 */

  estArrivalDestinationPortDate?: string;

  /* 预估到达起始港日期 */

  estDepatureOrginPortDate?: string;

  id?: string;
}

/**
 * Shipment相关状态统计
 */
export class CSPShipmentsStatisticsOutput {
  items?: any[];
}

/**
 * 运输异常事件Dto
 */
export class CSPShipmentEventDto {
  /* 事件代码 */

  eventCode: string;

  /* 主题 */

  subject: string;

  /* 关联的 Shipment Id */

  shipmentId?: string;

  /* 业务Id */

  businessId?: string;

  /* 事件针对的业务类型
0 = Unknown
1 = Shipment
2 = ShipmentItem
3 = ShipmentContainer
8 = Bill */

  businessEventType?: number;

  /* 事件类型：操作流程事件、运输状态事件、其它事件
0 = ProcedureEvent
1 = ShipmentStatusEvent
2 = OthersEvent */

  type?: number;

  /* 描述 */

  description?: string;

  /* 发生节点
0 = NotSet
1 = OriginPlace
2 = OriginPort
3 = DestinationPort
4 = DestinationPlace */

  happenNode?: number;

  /* 发生时间 */

  happenTime?: string;

  /* 是否异常 0无，1异常 */

  isException?: boolean;

  /* 详细 */

  details?: string;

  id?: string;
}

/**
 * shipment提单
 */
export class CSPShipmentItemDto {
  /* 运输条款 来自基础数据 */

  transportClausesId?: string;

  /* 运输条款显示 */

  transportClausesString?: string;

  /* Shipment Id */

  shipmentId?: string;

  /* 收货人客户Id */

  shipperCustomerId?: string;

  /* 收货人公司id */

  consigneeCustomerId?: string;

  /* 发货人公司地址Id */

  shipperLocationId?: string;

  /* 收获人公司地址Id */

  consigneeLocationId?: string;

  /* 发货人合作伙伴Id，主要用于合作伙伴还没有转成客户时使用 */

  shipperPartnerId?: string;

  /* 收货人合作伙伴Id，主要用于合作伙伴还没有转成客户时使用 */

  consigneePartnerId?: string;

  /* 提单号 */

  billOfLadingNo?: string;

  /* 关联的起始地址Id (存在拖车服务、FBA\M 需要上门取件时有值) */

  originAddressId?: string;

  /* 目的地址
<remarks>常规业务时来源：地址基础数据</remarks><remarks>FBA 时来源：亚马逊仓库基础数据（CRM FBALocations）</remarks><remarks>FBM 时来源：客户自己创建的【network-MY-organization-location】</remarks> */

  destinationAddressId?: string;

  /* 服务商起始仓库地址 */

  deliveryWarehouseId?: string;

  /* 备注说明 */

  description?: string;

  /* 预计拖车到达起始港时间 */

  estTruckDeliveryOrignDate?: string;

  /* 实际拖车到达起始港时间 */

  actualTruckDeliveryOrignDate?: string;

  /* 预估在目的港装车时间（离港后） */

  estPickUpTruckDestinationDate?: string;

  /* 实际在目的港装车时间（离港后） */

  actualPickUpTruckDestinationDate?: string;

  /* 预计最终到达时间 */

  estTruckDeliveryDate?: string;

  /* 实际最终到达时间 */

  actualTruckDeliveryDate?: string;

  /* 数量 */

  totalQuantity?: number;

  /* 数量(单位) */

  totalQuantityUnitId?: string;

  /* 总重量 */

  totalWeight?: number;

  /* 总重量(单位) */

  totalWeightUnitId?: string;

  /* 总体积 */

  totalVolume?: number;

  /* 总体积单位(单位) */

  totalVolumeUnitId?: string;

  /* 货物已准备好的时间 */

  cargoReadyDate?: string;

  /* 特殊介绍 */

  specialInstructions?: string;

  /* A JSON formatted string to extend the containing object.
JSON data can contain properties with arbitrary values (like primitives or complex objects).
Extension methods are available (Abp.Domain.Entities.ExtendableObjectExtensions) to manipulate this data.
General format:
<code>
{
  "Property1" : ...
  "Property2" : ...
}
</code> */

  extensionData?: string;

  /* 总重量单位 */

  totalWeightUnitString?: string;

  /* 总体积单位 */

  totalVolumeUnitString?: string;

  /* 总数量单位 */

  totalQuantityUnitString?: string;

  id?: string;
}

/**
     * Class ShipmentItemContainerDto.
Implements the CO.Platform.Core.Domain.Entities.CoEntity
     */
export class CSPShipmentItemContainerDto {
  /* 提单Id */

  shipmentItemId?: string;

  /* 运单箱Id */

  shipmentContainerId?: string;

  /* 数量 */

  quantity?: number;

  /* 数量(单位) */

  quantityUnitId?: string;

  /* 总重量 */

  weight?: number;

  /* 总重量(单位) */

  weightUnitId?: string;

  /* 总体积 */

  volume?: number;

  /* 总体积单位(单位) */

  volumeUnitId?: string;

  /* ShipmentId */

  shipmentId?: string;

  id?: string;
}

/**
 * Class OrderItemInShipmentItemContainerDto.
 */
export class CSPOrderItemInShipmentItemContainerDto {
  shipmentId?: string;

  items?: any[];
}

/**
 *  No Remark
 */
export class CSPShipmentOrderItemInContainerDto {
  /* ShipmentId */

  shipmentId?: string;

  /* 提单Id */

  shipmentItemId?: string;

  /* 提单号 */

  billOfLadingNo?: string;

  /* 提单箱Id */

  shipmentItemContainerId?: string;

  /* 箱号 */

  containerNo?: string;

  /* 关联的 ShipmentOrderId */

  shipmentOrderItemId?: string;

  /* Gets or sets the po no. */

  orderNumber?: string;

  /* PO Id */

  orderId?: string;

  /* 关联的供应商客户Id */

  venderCustomerId?: string;

  /* 关联的采购商客户Id */

  buyerCustomerId?: string;

  /* PO ItemId */

  orderItemId?: string;

  /* Product Id */

  productId?: string;

  /* Gets or sets the name of the product. */

  productName?: string;

  /* Gets or sets the MPN. */

  mpn?: string;

  /* Gets or sets the sku. */

  sku?: string;

  /* 数量 */

  units?: number;

  /* 单价 */

  unitCost?: number;

  /* 体积 */

  volume?: number;

  /* 箱数 */

  cartons?: number;

  /* 毛重 */

  grossWeight?: number;

  /* 净重 */

  netWeight?: number;
}

/**
 * 分享链接
 */
export class CSPShipmentShareLinkDto {
  /* shipment详情 */

  shipmentId: string;

  /* 前端生成路径 */

  url: string;

  /* 分享的多个收货人客户Id */

  consigneeCustomerIds?: any[];

  /* 分享的多个发货人客户Id */

  shipperCustomerIds?: any[];

  /* 邮箱收件人（多个，分开） */

  receivers?: string;

  /* 邮件内容 */

  content?: string;

  /* 是否已取消 */

  cancel?: boolean;

  /* 运单号 */

  shipmentNo?: string;

  id?: string;
}

/**
 * 分享详情页
 */
export class CSPShipmentShareLinkDetailOutput {
  /* 是否已过期 */

  isExpired?: boolean;

  /* 状态
0 = Seller_Location
1 = OriginStopOff
2 = In_Transit_To_Departure_port
3 = Departure_Port
4 = In_Transit_To_Arrival_Port
5 = Arrival_Port
6 = In_Transit_To_Final_Destination
7 = DestinationStopOff
8 = Final_Destination
9 = Canceled
10 = Completed
-1 = Default */

  status?: number;

  /* shipment业务号 */

  shipmentNo?: string;

  /* 运输方式（用来判断显示图标）
0 = Unknown
1 = Ocean
2 = Air */

  freightMethodType?: number;

  /* 详情 */

  details?: CSPShipmentDetailOutput;

  /* 事件时间轴 */

  eventTimeAxis?: any[];

  /* 路线详情 */

  routeDetails?: CSPRouteDetails;
}
