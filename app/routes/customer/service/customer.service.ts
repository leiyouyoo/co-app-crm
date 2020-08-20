import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { CrmService } from 'projects/crm/src/public-api';
import { CreateContactEntity } from 'projects/crm/src/lib/entity/CreateContactEntity';
import { CreateOrUpdateLocationEntity } from 'projects/crm/src/lib/entity/CreateOrUpdateLocationEntity';
import { CreateOrUpdatePartnerInput } from 'projects/crm/src/lib/entity/CreateOrUpdatePartnerInput';
import { UserService, RoleService } from 'projects/cityocean/basicdata-library/src/public-api';
import { Observable } from 'rxjs';
import { CreateOrUpdateCustomerInput } from 'projects/crm/src/lib/entity/CreateOrUpdateCustomerInput';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private http: HttpService,
    private crmService: CrmService,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  getCustomerByPageList(filterObj: {
    Sorting?: string;
    MaxResultCount?: number;
    SkipCount?: number;
    IsCooperation?: boolean;
    CustomerId?: any;
    ContactId?: any;
    CustomerOwnerIds?: any;
    SearchText?: any;
  }) {
    return this.crmService.getCustomerByPageList(filterObj);
  }
  getCustomerById(id: any) {
    return this.crmService.getCustomerById(id);
  }
  getByCustomerOrPartnerPageList(filterObj: {
    PartnerId?: any;
    CustomerId?: any;
    Sorting?: string;
    MaxResultCount?: number;
    SkipCount?: number;
  }) {
    return this.crmService.getByCustomerOrPartnerPageList(filterObj);
  }
  getLocationByPageList(filterObj: {
    CustomerId?: any;
    Sorting?: string;
    MaxResultCount?: number;
    SkipCount?: number;
  }) {
    return this.crmService.getLocationByPageList(filterObj);
  }
  getPartnerByPageList(filterObj: {
    CustomerId?: any;
    Sorting?: string;
    MaxResultCount?: number;
    SkipCount?: number;
    IsSignUp?: boolean;
  }) {
    return this.crmService.getPartnerByPageList(filterObj);
  }
  createForCustomer(entity: CreateContactEntity) {
    return this.crmService.createForCustomer(entity);
  }

  createpartnerForCustomer(entity: CreateContactEntity) {
    return this.crmService.createpartnerForCustomer(entity);
  }

  updateForCustomer(entity: CreateContactEntity) {
    return this.http.put('/CRM/Contact/Update', entity);
  }

  createForPartner(entity: CreateContactEntity) {
    return this.crmService.createForPartner(entity);
  }

  getByCustomerOrPartner(filterObj: {
    CustomerId?: any;
    Sorting?: string;
    MaxResultCount?: number;
    SkipCount?: number;
  }) {
    return this.crmService.getByCustomerOrPartner(filterObj);
  }
  createCustomerLocation(entity: CreateOrUpdateLocationEntity) {
    return this.crmService.createCustomerLocation(entity);
  }

  createPartnerLocation(entity: CreateOrUpdateLocationEntity) {
    return this.crmService.createPartnerLocation(entity);
  }

  createCustomer(entity: CreateOrUpdateCustomerInput) {
    return this.crmService.createCustomer(entity);
  }
  getCustomerByName(filterObj: any) {
    return this.crmService.getCustomerByName(filterObj);
  }
  bindCustomer(filterObj: { customerId?: any; partnerId?: any; bindCustomerId?: number; isGetCustomer?: boolean }) {
    return this.crmService.bindCustomer(filterObj);
  }
  unBindCustomer(filterObj: { partnerId?: any }) {
    return this.crmService.unBindCustomer(filterObj);
  }
  createPartnerCustomer(entity: CreateOrUpdatePartnerInput) {
    return this.crmService.createPartnerCustomer(entity);
  }
  getPartner(id: any) {
    return this.crmService.getPartner(id);
  }
  getCustomerByNameOrCode(json: any) {
    return this.crmService.getCustomerByNameOrCode(json);
  }
  getOwnerByUserName(searchText: string) {
    return this.crmService.getOwnerByUserName(searchText);
  }
  getByNameOrTel(searchText: string, type?: number) {
    return this.crmService.getByNameOrTel(searchText, type);
  }
  //用户信息
  getAllUserInfo(params?) {
    return this.userService.getAllUserInfo(params);
  }
  transferCustomer(filterObj: { customerIds?: any[]; userId?: any }) {
    return this.crmService.transferCustomer(filterObj);
  }
  customerUpdate(entity: CreateOrUpdateCustomerInput) {
    return this.crmService.customerUpdate(entity);
  }
  getAllRoleInfo() {
    return this.roleService.getAllRoleInfo();
  }
  getContactInfo(id: any) {
    return this.crmService.getContactInfo(id);
  }
  getLocationInfo(id: any) {
    return this.crmService.getLocationInfo(id);
  }
  ceckDuplicateName(name: string, maxResultCount: number, skipCount: number) {
    return this.crmService.ceckDuplicateName(name, maxResultCount, skipCount);
  }
  //删除前校验，确认客户是否可删除
  checkDelete(id: any) {
    const url = '/CRM/Customer/CheckDelete';
    return this.http.postJson(url, {}, { customerId: id });
  }
  //确认删除客户
  deleteCustomer(customerId: any) {
    const url = '/CRM/Customer/Delete';
    return this.http.delete(url, { id: customerId });
  }

  assignUsersToLocation(datas: any) {
    const url = '/CRM/LocationExternal/AssignUsersToLocation';
    return this.http.postJson(url, datas);
  }

  assignLocationsToUser(datas: any) {
    const url = '/CRM/LocationExternal/AssignLocationsToUser';
    return this.http.postJson(url, datas);
  }

  getAllByCustomerOrPartner(datas: any) {
    const url = '/CRM/Location/GetAllByCustomerOrPartner';
    return this.http.get(url, datas);
  }

  getAllByLocationOrPartner(datas: any) {
    const url = '/CRM/Contact/GetAllByCustomer';
    return this.http.get(url, datas);
  }

  getByLocationId(datas: any) {
    const url = '/CRM/Location/GetAll';
    return this.http.get(url, datas);
  }

  getDataDictionary(id: string) {
    const url = '/PUB/DataDictionary/GetAll';
    return this.http.get(url, { typeId: id });
  }

  // getAllLocation(datas: any) {
  //   ;
  //   const url = '/CRM/Contact/GetAllByCustomer';
  //   return this.http.get(url, datas);
  // }

  // getAllByCustomer(datas: any) {
  //   ;
  //   const url = '/CRM/Contact/GetAllByCustomer';
  //   return this.http.get(url, datas);
  // }

  getByContactId(datas: any) {
    const url = '/CRM/Location/GetByContactId';
    return this.http.get(url, datas);
  }

  updateLocationById(datas: any) {
    const url = '/CRM/Location/Update';
    return this.http.put(url, datas);
  }

  deleteLocationById(id: any) {
    const url = '/CRM/Location/Delete';
    return this.http.delete(url, { id: id });
  }

  deleteContactsById(id: any) {
    const url = '/CRM/Contact/Delete';
    return this.http.delete(url, { id: id });
  }
  // 获取无主客户列表
  getOwnerlessCustomer(id: any, MaxCount, count, search?: any) {
    const url = '/CRM/Customer/GetOwnerlessCustomer';
    return this.http.get(url, { CustomerId: id, MaxResultCount: MaxCount, SkipCount: count, SearchText: search });
  }
  //搜索客户名跟代码
  getOwnerlessCustomerByName(name: string) {
    const url = '/CRM/Customer/GetOwnerlessCustomerByName';

    return this.http.get(url, { name });
  }
  // 认领
  claimCustomer(id: any) {
    const url = '/CRM/Customer/ClaimCustomer';
    return this.http.postJson(url, { customerId: id });
  }
  //共享客户列表
  getShares(datas: any) {
    const url = '/CRM/Customer/GetShares';
    return this.http.get(url, datas);
  }

  unbindUserLocation(data: any) {
    const url = '/CRM/Location/UnbindUserLocation';
    return this.http.postJson(url, data);
  }

  getContactByLocationId(data: any) {
    const url = '/CRM/Contact/GetByLocationId';
    return this.http.get(url, data);
  }

  unbindOrDeleteUser(id: any) {
    const url = '/CRM/Contact/UnbindOrDeleteUser';
    return this.http.postJson(url, null, { id: id });
  }

  resetUserPassword(data: any) {
    const url = '/CRM/Contact/ResetUserPassword';
    return this.http.postJson(url, data);
  }

  getShareSources(data: any) {
    const url = '/CRM/Customer/GetShareSources';
    return this.http.get(url, data);
  }

  followCustomer(data: any) {
    const url = '/CRM/Customer/FollowCustomer';
    return this.http.postJson(url, data);
  }

  truckServiceGetAll(data: any) {
    const url = '/Rates/TruckService/GetCrmGetAll';
    return this.http.get(url, data);
  }

  bindFollow(data: any) {
    const url = '/Rates/FavoriteRateService/BindFollow';
    return this.http.postJson(url, data);
  }

  // tslint:disable-next-line: max-line-length
  getAllPlace(json: {
    Name?: string;
    RegionId?: any;
    IsOcean?: boolean;
    IsAir?: boolean;
    IsRamp?: boolean;
    IsOther?: boolean;
    IsValid?: boolean;
    Sorting?: string;
    IsAirOrOcean?: boolean;
    MaxResultCount?: number;
    SkipCount?: number;
  }) {
    if (!json.MaxResultCount) {
      json.MaxResultCount = 50;
    }
    return this.http.get('/PUB/Place/GetAll', json);
  }

  getAllRates(json: { IsValid?: boolean; Code?: string; MaxResultCount?: number; SkipCount?: number }) {
    // return this.http.get('/PUB/DictionaryType/GetAll',params);
    return this.http.get('PUB/Container/GetAll', json);
  }

  getCRMCarrierList(name) {
    let Sorting = 'code';
    return this.http.get('/CRM/Customer/GetCustomerByType', {
      Name: name,
      CustomerType: 1,
      Sorting: Sorting,
    });
  }

  // tslint:disable-next-line: max-line-length
  getAllShipLine(json: {
    IsValid?: boolean;
    Code?: string;
    Text?: string;
    IsRecursion?: boolean;
    MaxResultCount?: number;
    SkipCount?: number;
  }) {
    return this.http.get('/PUB/ShippingLine/GetAll', json);
  }

  getTransportClause() {
    return this.http.get('/PUB/TransportClause/GetAll', { IsValid: true });
  }

  getCurrentCustomerAndPartner(data?: any) {
    return this.http.get('/CRM/Customer/GetCurrentCustomerAndPartner', data);
  }

  getCarrierCustomerList(data: any) {
    return this.http.get('/CRM/Customer/GetCustomerByType', data);
  }

  quoteEnquiryCreate(data) {
    const url = '/Rates/QuoteEnquiry/Create';
    return this.http.postJson(url, data);
  }

  checkHasMainContact(data) {
    const url = '/CRM/Contact/CheckHasMainContact';
    return this.http.postJson(url, data);
  }

  getPlaceAndCounty(data: any) {
    return this.http.get('/PUB/Place/GetPlaceAndCounty', data);
  }

  getPlace(name?: string) {
    return this.http.get('/PUB/County/GetFlatList', { Name: name });
  }

  getBusinessRateList(data) {
    return this.http.get('/Rates/OceanBaseItemService/GetBusinessRateList', data);
  }

  getBusinessRateDetails(data) {
    return this.http.get('/Rates/OceanBaseItemService/GetBusinessRateDetails', data);
  }

  getEnquiryDetial(params) {
    return this.http.get('/Rates/QuoteEnquiry/Get', params);
  }
  //获取网站配置版本信息
  getEditionAll(params: {
    SearchText?: string;
    Sorting?: string;
    MaxResultCount?: number;
    SkipCount?: number;
  }): Observable<any> {
    return this.http.get('/Platform/Edition/GetAll', params);
  }
  //保存配置信息
  CustomerConfigure(CustomerConfigureInput: any) {
    return this.http.postJson('/CRM/Customer/CustomerConfigure', CustomerConfigureInput);
  }

  updateCustomerConfigure(CustomerConfigureInput: any) {
    return this.http.put('/CRM/Customer/UpdateCustomerConfigure', CustomerConfigureInput);
  }

  //获取配置信息
  GetCustomerConfigure(customerId: any) {
    let params = {
      customerId: customerId,
    };
    return this.http.get('/CRM/Customer/GetCustomerConfigure', params);
  }

  getTranferCustomer(json) {
    return this.http.get('/Platform/OrganizationUnit/GetAll', json);
  }

  getTranferCustomerList(json: any) {
    return this.http.get('/Platform/OrganizationUnit/GetAll', json);
  }

  getUsersByOrganizationUnitId(json: any) {
    return this.http.get('/Platform/OrganizationUnit/GetUsersByOrganizationUnitId', json);
  }

  // 跟进记录
  // 获取跟进记录列表
  getTraceLog(json) {
    return this.http.get('/CRM/TraceLog/GetAll', json);
  }
  // 创建跟进记录
  createTraceLog(json) {
    return this.http.postJson('/CRM/TraceLog/Create', json);
  }
  // 修改跟进记录
  updateTraceLog(json) {
    return this.http.put('/CRM/TraceLog/Update', json);
  }
  getDictionary() {
    const url = '/PUB/DataDictionary/GetAll';
    return this.http.get(url, { TypeCode: '100' });
  }
  // 获取跟进记录详情
  getTraceLogDetail(i) {
    return this.http.get('/CRM/TraceLog/Get', { id: i });
  }
  // 删除跟进记录
  deleteTraceLog(i) {
    return this.http.delete('/Storage/File/Delete', { id: i });
  }
  getParentRoles(json) {
    return this.http.get('SSO/Role/GetParentRoles', json);
  }

  getAllByCustomer(json) {
    return this.http.get('/CRM/Contact/GetAllByCustomer', json);
  }

  getOrganizationUnitUsers(json) {
    return this.http.get('/Platform/OrganizationUnit/GetOrganizationUnitUsers', json);
  }
  getLocalRateByPort(i) {
    const url = '/Rates/LocalBaseRateExternalService/GetLocalRateByPort';
    return this.http.get(url, { id: i });
  }
  /**
   * 获取所有币种的汇率
   * @param i
   */
  GetExchangeList(toCode) {
    const url = '/PUB/Currency/GetExchangeList';
    return this.http.get(url, { toCode: toCode });
  }

  getCustomer(json) {
    return this.http.get('/CRM/Customer/GetAll', json);
  }

  getShareCompnay(json) {
    return this.http.get('/CRM/Customer/GetCustomerByType', json);
  }

  getCrmFreightAndQuoteRates(json) {
    return this.http.postJson('/Rates/OceanBaseItemExternalService/GetCrmFreightAndQuoteRates', json);
  }

  saveFreightAndQuoteRates(json) {
    return this.http.postJson('/Rates/OceanBaseItemExternalService/SaveFreightAndQuoteRates', json);
  }

  getCurrency(json) {
    return this.http.get('/PUB/Currency/GetAll', json);
  }

  //费用名称列表
  getCostAll(json) {
    return this.http.get('/PUB/ChargingCode/GetAll', json);
  }

  getCrmCacheFreightAndQuoteRates(json) {
    return this.http.get('/Rates/OceanBaseItemExternalService/GetCrmCacheFreightAndQuoteRates', json);
  }

  saveSendCustomer(json) {
    return this.http.postJson('/Rates/OceanBaseItemExternalService/SaveSendCustomer', json);
  }

  // 获取to/from地点列表--拖车首页
  getAddress(searchText, type) {
    return this.http.get('/Rates/TruckService/GetAddressForTruckingFee', {
      SearchText: searchText,
      Type: type,
      MaxResultCount: 1000,
    });
  }
}
