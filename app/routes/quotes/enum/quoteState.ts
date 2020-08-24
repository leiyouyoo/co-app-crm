export enum quoteState {
  // all = 0,
  Active = 1,
  Accept = 2,
  Expired = 3,
  Reject = 4,
}

export enum freightType {
  CYCY = 1,
  CYDOOR = 2,
  DOORCY = 3,
  DOORDOOR = 4,
}

export enum VolumeUnitCode {
  CBM = 'TJDWCBM',
  CFT = 'TJDWCFT',
}

export enum WeightUnitCode {
  KGS = 'ZLDWKGS',
  LBS = 'ZLDWLBS',
  MT = 'ZLDWMT',
}

export enum unitType {
  //五设置
  NotSet,
  //按箱
  Container,
  //按票
  Ticket,
  //按重量
  Weight,
  //按体积
  Volume,
}
export enum FreightMethodType {
  Ocean,
  Air,
}

export enum priceProduceNode {
  NotSet,
  Freight,
  Origin,
  Destination,
}

export enum computeMode {
  NotSet,
  CBM167KG,
  CBM363KG,
  CBM500KG,
  CBM750KG,
  CBM1000KG,
}

export enum computeFormula {
  NotSet,
  ActuallyWeight,
  ComputeWeight,
  ActuallyVolume,
  ComputeTon,
}
export enum BusinessType {
  Quote = 0,
  Booking = 1,
  Shipment = 2,
  Order = 3,
}
