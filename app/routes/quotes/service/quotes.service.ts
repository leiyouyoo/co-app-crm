import { Injectable } from '@angular/core';
import {
  CRMQuoteEnquiryListForCRMOutput,
  CRMQuoteEnquiryDto,
  CRMQuoteReplyDto,
  CRMGetListByRouteForCRMOutput,
} from '../../../services/crm/crm.types';
import { RatesCspTruckListInput } from '../../../services/rates/rates.types';
import { PUBDataDictionaryService, PUBPlaceService, PUBCurrencyService, SSOUserService, PUBChargingCodeService } from '@co/cds';
import { CRMQuoteEnquiryService, CRMQuoteReplyService, CRMCustomerService, CRMLocationExternalService } from '../../../services/crm';
import { RatesLocalBaseRateExternalServiceService, RatesTruckExternalServiceService } from '../../../services/rates';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor(
    public dataDictionarySevice: PUBDataDictionaryService,
    public pubChargingCodeService: PUBChargingCodeService,
    public crmQuoteEnquiryService: CRMQuoteEnquiryService,
    public ssoUserService: SSOUserService,
    public pubPlaceService: PUBPlaceService,
    public pubCurrencyService: PUBCurrencyService,
    public crmQuoteReplyService: CRMQuoteReplyService,
    public crmCustomerService: CRMCustomerService,
    public crmLocationExternalService: CRMLocationExternalService,
    public RatesExternalService: RatesLocalBaseRateExternalServiceService,
    public RatesTruckExternalService: RatesTruckExternalServiceService,
  ) {}

  //获取字典信息
  getDataDictionaryInfo(typeId: string): Observable<any> {
    return this.dataDictionarySevice.getAll({ typeId: typeId });
  }

  GetAllForCRM(quoreInfo: CRMQuoteEnquiryListForCRMOutput) {
    quoreInfo.status = quoreInfo.status == null ? null : quoreInfo.status;
    return this.crmQuoteEnquiryService.getAllForCRM(quoreInfo);
  }

  getQuoteDetail(id: string) {
    return this.crmQuoteEnquiryService.getForCRM({ id: id });
  }

  getUserInfo(id: number) {
    return this.ssoUserService.get({ id: id });
  }

  //获取港口数据
  getAllPost(locationObj: {
    id?: string;
    name?: string;
    regionId?: string;
    isOcean?: boolean;
    isAir?: boolean;
    isAirOrOcean?: boolean;
    isRail?: boolean;
    isOther?: boolean;
    isCity?: boolean;
    isRamp?: boolean;
    isValid?: boolean;
    isMultiple?: boolean;
    sorting?: string;
    maxResultCount?: number;
    skipCount?: number;
  }): Observable<any> {
    if (locationObj.isOcean === false) delete locationObj.isOcean;
    if (locationObj.isAir === false) delete locationObj.isAir;
    return this.pubPlaceService.getAll(locationObj);
  }

  //币别列表
  getAllCurrency(json: {
    code?: string;
    name?: string;
    regionId?: string;
    isValid?: boolean;
    sorting?: string;
    maxResultCount?: number;
    skipCount?: number;
  }): Observable<any> {
    return this.pubCurrencyService.getAll(json);
  }
  //创建报价
  create(quoteReplys: CRMQuoteReplyDto) {
    return this.crmQuoteReplyService.create(quoteReplys);
  }
  //主动创建报价
  initiaivecreate(quoteobj: CRMQuoteEnquiryDto) {
    return this.crmQuoteEnquiryService.create(quoteobj);
  }
  //获取船东信息
  getCarrierList(carrirer: {
    customerType: number;
    name?: string;
    customerId?: string;
    sorting?: string;
    maxResultCount?: number;
    skipCount?: number;
  }) {
    return this.crmCustomerService.getCustomerByType(carrirer);
  }

  //获取贸易类型
  getTradeTypes() {
    return this.dataDictionarySevice.getTradeTypes({});
  }
  //获取费用代码列表
  getCostAll(costObj: { groupId?: string; text?: string; isValid?: boolean }): Observable<any> {
    return this.pubChargingCodeService.getAll(costObj);
  }

  //获取船东
  GetCustomerByType(CustomerType: any): Observable<any> {
    return this.crmCustomerService.getCustomerByType({
      customerType: CustomerType,
    });
  }
  //获取发货人收货人信息
  GetLocationByCustomer(customerId?): Observable<any> {
    return this.crmLocationExternalService.getLocationByCustomer({ customerId: customerId });
  }

  //获取报价记录
  getAllRecordForCRM(id?: string): Observable<any> {
    return this.crmQuoteReplyService.getAllForCRM({ id: id });
  }
  submit(formData: any): Observable<any> {
    for (const i in formData.controls) {
      formData.controls[i].markAsDirty();
      formData.controls[i].updateValueAndValidity();
      if (!formData.controls[i].valid) return;
    }
    return null;
  }

  getCRMCustomerAndUserHistorys() {
    return this.crmQuoteEnquiryService.getCRMCustomerAndUserHistorys({});
  }

  //获取当前业务员拥有的所有客户(开通租户的)
  GetOwnerCustomers(userId?): Observable<any> {
    return this.crmCustomerService.getOwnerCustomers({ userId: userId });
  }

  //CRM获取客户最近5条数据联动用户
  GetCRMCustomerBindUserHistorys(): Observable<any> {
    return this.crmQuoteEnquiryService.getCRMCustomerBindUserHistorys({});
  }

  GetQuoteFreightRates(freight: RatesCspTruckListInput): Observable<any> {
    return this.RatesTruckExternalService.getQuoteTruckRates(freight);
  }

  GetQuoteTruckRates(truckRates: RatesCspTruckListInput): Observable<any> {
    return this.RatesTruckExternalService.getQuoteTruckRates(truckRates);
  }
  GetOriginalAndDestinationLocalRates(params: { carrierId?: string; polId?: string; podId?: string }): Observable<any> {
    return this.RatesExternalService.getOriginalAndDestinationLocalRates(params);
  }

  //FBA地址
  GetFBALocations(isCityocean: boolean): Observable<any> {
    return this.crmLocationExternalService.getFBALocations({ isCityocean: isCityocean });
  }

  //获取询报价列表(用于复制)
  GetListByRouteForCRM(quoreInfo: CRMGetListByRouteForCRMOutput) {
    return this.crmQuoteEnquiryService.getListByRouteForCRM(quoreInfo);
  }

  GetLastForCRM(id: string) {
    return this.crmQuoteReplyService.getLastForCRM({ id: id });
  }
}
