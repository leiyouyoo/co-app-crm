export interface CreateOrUpdateLocationEntity {
    zip: string;
    streetAddress: string;
    streetAddress2: string;
    streetAddressLocalization: string;
    name: string;
    countryId?: number;
    provinceId?: number;
    cityId?: number;
    contactIds: number[];
    customerId: number;
    description: string;
    locationAddition: LocationAddition;
    id?: number;
}
export interface LocationAddition {
    unlocode?: string;
    description?: string;
}