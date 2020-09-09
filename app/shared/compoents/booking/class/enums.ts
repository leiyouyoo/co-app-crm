export enum VolumeUnitCode {
  CBM = 'TJDWCBM',
  CFT = 'TJDWCFT',
}

export enum WeightUnitCode {
  KGS = 'ZLDWKGS',
  LBS = 'ZLDWLBS',
  MT = 'ZLDWMT',
}

export enum FbaFreightMethod {
  oceanTruck = 'b04d977d-ced7-4c61-a14f-3beaa70d2fd2',
  oceanExpress = '593c69dc-f13f-413f-bbd0-8a77894f53cd',
  airExpress = '214af958-69c5-41e4-8b75-2244035a0485',
  express = '6f517c25-577f-44e2-959c-9468af5ec753',
}

export enum DictionaryType {
  PaymentTerm = '001',
  TransportClause = '002',
  QuantityUnit = '003',
  WeightUnit = '004',
  MeasurementUnit = '005',
  TradeTerm = '006',
  SalesType = '007',
  ValuationUnit = '008',
  WorkflowCategory = '009',
  RateClass = '010',
  AirUnit = '011',
  MovieProjects = '012',
  TaxIdType = '014',
  InvoiceType = '015',
  BatteryType = '016',
  OtherDangerousGoods = '017',
  ProductCategories = '020',
  SpecialGoods = '095',
  SalesChannels = '096',
  FreightMethod = '097',
  Industry = '098',
  ContactJobs = '099',
}

export enum OriginalOrTelex {
  NotSet = 0,

  /// <summary>
  /// 正本提单
  /// </summary>
  Original = 1,

  /// <summary>
  /// 电放提单
  /// </summary>
  Telex = 2,

  /// <summary>
  /// 海运提单
  /// </summary>
  SeaWay = 3,
}
