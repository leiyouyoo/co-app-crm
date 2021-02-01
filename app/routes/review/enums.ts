export enum ReviewStatusType {
  /// <summary>
  /// WaitingReply
  /// </summary>
  WaitingReply = 0,

  /// <summary>
  /// Pass
  /// </summary>
  Pass = 1,

  /// <summary>
  /// 散Reject杂货
  /// </summary>
  Reject = 2,
}

export enum ReviewBusinessType {
  /// <summary>
  /// Shipment
  /// </summary>
  Shipment = 0,
}

export enum ReviewAgentType {
  /// <summary>
  /// Normal
  /// </summary>
  Normal = 0,

  /// <summary>
  /// ThirdParty
  /// </summary>
  ThirdParty = 1,

  /// <summary>
  /// SpecialRequirements
  /// </summary>
  SpecialRequirements = 2,
}
