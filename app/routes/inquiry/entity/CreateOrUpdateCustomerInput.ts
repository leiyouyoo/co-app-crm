export interface CreateOrUpdateCustomerInput {
  id?: any;
  name?: string;
  nameLocalization?: string;
  shortName?: string;
  shortNameLocalization?: string;
  address?: string;
  addressLocalization?: string;
  tel?: string;
  fax?: string;
  keyWord?: string;
  cargoCanvassingType?: number;
  forwardingType?: number;
  email?: string;
  customerType?: number;
  isSalesCustomer?: boolean;
  countryId?: any;
  provinceId?: any;
  cityId?: any;
  industry?: number;
  description?: string;
  incoterms?: string;
  customerTaxes?: any;
  IsAudit?: boolean;
}
