export enum TradeType {
  Normal = 1,
  EC
}

export enum TransportationMode {
  Ocean = 1,
  Air
}

export enum ContainerLoadingType {
  FCL,
  LCL
}

export enum FbaDeliveryMethodType {
  FBA,
  Overseas,
  Customer,
  LAZADA,
}

/// <summary>
/// 订舱状态
/// </summary>
export enum ShippingOrderStatus {
  //草稿、待订舱、待船东确认、待分配SO、待发SO、订舱失败、修改中、取消中、已取消

  /// <summary>
  /// 草稿
  /// </summary>
  Draft = 0,

  /// <summary>
  /// 待订舱
  /// </summary>
  'Pending booking',

  /// <summary>
  /// 待船东确认
  /// </summary>
  'Carrier Confirming',

  /// <summary>
  /// 修改中(跟船公司申请修改了以后,直到他们回复确认前,有个等待的时间)
  /// </summary>
  Changing,

  /// <summary>
  /// 待分配SO
  /// </summary>
  'So Assigning',

  /// <summary>
  /// 待发SO
  /// </summary>
  'So Confirming',

  /// <summary>
  /// 订舱失败
  /// </summary>
  'Booking failed',

  /// <summary>
  /// 取消中
  /// </summary>
  Canceling,

  /// <summary>
  /// 已取消
  /// </summary>
  Cancelled,

  Completed,
}

// 订单状态
export enum ServiceStatus {
  //草稿
  Draft = 0,

  /// <summary>
  /// 待分配
  /// </summary>
  'Pending Assigning' = 1,

  /// <summary>
  /// 待受理
  /// </summary>
  'Pending Accept' = 2,

  /// <summary>
  /// 已受理(运单则显示"跟进中")
  /// </summary>
  'booking.Accepted' = 3,

  /// <summary>
  /// 已完成
  /// </summary>
  Completed = 4,

  /// <summary>
  /// 取消中
  /// </summary>
  Canceling = 5,

  /// <summary>
  /// 已取消
  /// </summary>
  Cancelled=6,

  /// <summary>
  /// 待入仓
  /// </summary>
  'Waiting For Housing' = 7,

  /// <summary>
  /// 待拼箱
  /// </summary>
  'Waiting for lcl' = 8,

  //  /// <summary>
  //  /// 待匹配
  //  /// </summary>
  'Pending match' = 9,
  /// <summary>
  //  /// 进行中
  //  /// </summary>
  'In Progress' = 10
}


/// <summary>
/// 报价（报）状态
/// </summary>
export enum QuoteReplyStatus {
  'Waiting for quote',
Active,
Accept,
Expired,
Rejected,
}

export enum FbaPickUpMethodType {
  Self = 1,
  Cityocean
}
