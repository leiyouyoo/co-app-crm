export enum customerType {
  Carrier = 1,
  AirLine = 2,
  Forwarding = 3,
  DirectClient = 4,
  Trucker = 5,
  CustomsBroker = 6,
  WareHouse = 7,
  Storage = 8,
  RailWay = 9,
  Express = 10,
  Terminal = 11,
  Other = 12,
}

export enum CooperationState {
  NotSet = 0,

  /// <summary>
  /// 未合作
  /// </summary>
  NoneCooperation = 1,

  /// <summary>
  /// 合作过
  /// </summary>
  HaveCooperation = 2,
}

export enum CustomerStatus {
  /// <summary>
  /// 未合作
  /// </summary>
  NoneCooperation = 0,
  /// <summary>
  /// 合作
  /// </summary>
  Cooperation = 1,

  /// <summary>
  /// 共享
  /// </summary>
  Share = 2,

  /// <summary>
  /// 无主客户
  /// </summary>
  Ownerless = 3,
}

export enum CustomerType {
  /// <summary>
  /// 船东
  /// </summary>
  Carrier = 1,
  /// <summary>
  /// 航空公司
  /// </summary>
  AirLine = 2,
  /// <summary>
  /// 货代(同行)
  /// </summary>
  Forwarding = 3,
  /// <summary>
  /// 直客
  /// </summary>
  DirectClient = 4,
  /// <summary>
  /// 拖车行
  /// </summary>
  Trucker = 5,
  /// <summary>
  /// 报关行
  /// </summary>
  CustomsBroker = 6,
  /// <summary>
  /// 仓储
  /// </summary>
  WareHouse = 7,
  /// <summary>
  /// 堆场
  /// </summary>
  Storage = 8,
  /// <summary>
  /// 铁路
  /// </summary>
  RailWay = 9,
  /// <summary>
  /// 快递
  /// </summary>
  Express = 10,
  /// <summary>
  /// 码头
  /// </summary>
  Terminal = 11,
  /// <summary>
  /// 其他
  /// </summary>
  Other = 12,
}

export enum examineType {
  /// <summary>
  /// 未设置
  /// </summary>
  NoteSet = 0,
  /// <summary>
  /// 更改名称审批
  /// </summary>
  UpdateName = 1,
  /// <summary>
  /// 更改代码审批
  /// </summary>
  PostCode = 2,
}
