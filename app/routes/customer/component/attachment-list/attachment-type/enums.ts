export enum AttachmentRoles {
  /// <summary>
  /// 客户
  /// </summary>

  RealCustomer = 0,

  /// <summary>
  /// 发货人
  /// </summary>

  ShipperCustomer = 1,

  /// <summary>
  /// 收货人
  /// </summary>

  ConsigneeCustomer = 2,

  /// <summary>
  /// 通知人
  /// </summary>

  NotifyCustomer = 3,

  /// <summary>
  /// 提单发货人
  /// </summary>

  BLShipper = 5,

  /// <summary>
  /// 提单收货人
  /// </summary>

  BLConsignee = 6,

  /// <summary>
  /// 提单收货人
  /// </summary>

  BLNotifier = 7,
}

export enum InternalPermissionType {
  /// <summary>
  /// 未知
  /// </summary>
  InternalPermissionTypeNotSet = 0,

  /// <summary>
  /// 操作口岸
  /// </summary>
  InternalPermissionTypeExport = 1,

  /// <summary>
  /// 港后代理
  /// </summary>
  InternalPermissionTypeImport = 2,

  /// <summary>
  /// 揽货人（CRM委托单+运单）
  /// </summary>
  InternalPermissionTypeSalesUser = 3,
}
