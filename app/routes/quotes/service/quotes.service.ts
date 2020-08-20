import { Injectable } from '@angular/core';
import {
  QuoteLibraryService,
  quoteInputParams,
  quoteReplys,
  QuoteReplyItem,
  QuoteEnquiry,
  oceanFreightParams,
  truckRatesParams,
  TruckListInput,
  routeQuoteParams,
} from 'projects/cityocean/quote-library/src/public-api';
import { Observable } from 'rxjs';
import { locationLibraryService, DataDictionarySevice } from 'projects/cityocean/basicdata-library/src/public-api';
import { SailService } from 'projects/cityocean/sail-library/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor(
    private quoteLibraryService: QuoteLibraryService,
    public locationLibraryService: locationLibraryService,
    public sailService: SailService,
    public dataDictionarySevice: DataDictionarySevice,
  ) {}

  //获取字典信息
  getDataDictionaryInfo(typeId: string): Observable<any> {
    return this.quoteLibraryService.getDataDictionaryInfo(typeId);
  }

  GetAllForCRM(quoreInfo: quoteInputParams) {
    quoreInfo.Status = quoreInfo.Status == null ? '' : quoreInfo.Status;
    return this.quoteLibraryService.GetAllForCRM(quoreInfo);
  }

  getQuoteDetail(id: string) {
    return this.quoteLibraryService.getQuoteDetail(id);
  }

  getUserInfo(id: number) {
    return this.quoteLibraryService.getUserInfo(id);
  }
  //获取港口数据
  getAllPost(locationObj: {
    Name?: string;
    RegionId?: number;
    IsOcean?: boolean;
    IsAir?: boolean;
    IsOther?: boolean;
    IsValid?: boolean;
    Sorting?: string;
    MaxResultCount?: number;
    IsCity?: boolean;
    SkipCount?: number;
  }): Observable<any> {
    if (locationObj.IsOcean === false) delete locationObj.IsOcean;
    if (locationObj.IsAir === false) delete locationObj.IsAir;
    return this.locationLibraryService.GetAllPort(locationObj);
  }

  //币别列表
  getAllCurrency(json: {
    IsValid?: boolean;
    Name?: string;
    Code?: string;
    RegionId?: number;
    Sorting?: string;
    MaxResultCount?: number;
    SkipCount?: number;
  }): Observable<any> {
    return this.dataDictionarySevice.getAll(json);
  }
  //创建报价
  create(quoteReplys: quoteReplys) {
    return this.quoteLibraryService.create(quoteReplys);
  }
  //主动创建报价
  initiaivecreate(quoteobj: QuoteEnquiry) {
    return this.quoteLibraryService.initiaivecreate(quoteobj);
  }
  //获取船东信息
  getCarrierList() {
    return this.sailService.getCarrierList();
  }

  //获取贸易类型
  getTradeTypes() {
    return this.quoteLibraryService.getTradeTypes();
  }
  //获取费用代码列表
  getCostAll(costObj: { GroupId?: number; Text?: string; isValid?: boolean }): Observable<any> {
    return this.dataDictionarySevice.getCostAll(costObj);
  }

  //获取船东
  GetCustomerByType(CustomerType: number): Observable<any> {
    return this.quoteLibraryService.GetCustomerByType(CustomerType);
  }
  //获取发货人收货人信息
  GetLocationByCustomer(): Observable<any> {
    return this.quoteLibraryService.GetLocationByCustomer();
  }

  //获取报价记录
  getAllRecordForCRM(id: string): Observable<any> {
    return this.quoteLibraryService.getAllRecordForCRM(id);
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
    return this.quoteLibraryService.getCRMCustomerAndUserHistorys();
  }

  //获取当前业务员拥有的所有客户(开通租户的)
  GetOwnerCustomers(): Observable<any> {
    return this.quoteLibraryService.GetOwnerCustomers();
  }

  //CRM获取客户最近5条数据联动用户
  GetCRMCustomerBindUserHistorys(): Observable<any> {
    return this.quoteLibraryService.GetCRMCustomerBindUserHistorys();
  }

  GetQuoteFreightRates(freight: oceanFreightParams): Observable<any> {
    return this.quoteLibraryService.GetQuoteFreightRates(freight);
  }

  GetQuoteTruckRates(truckRates: TruckListInput): Observable<any> {
    return this.quoteLibraryService.GetQuoteTruckRates(truckRates);
  }
  GetOriginalAndDestinationLocalRates(params: { carrierId?: string; polId?: string; podId?: string }): Observable<any> {
    return this.quoteLibraryService.GetOriginalAndDestinationLocalRates(params);
  }

  //FBA地址
  GetFBALocations(isCityocean: boolean): Observable<any> {
    return this.quoteLibraryService.GetFBALocations(isCityocean);
  }

  //获取询报价列表(用于复制)
  GetListByRouteForCRM(quoreInfo: routeQuoteParams) {
    return this.quoteLibraryService.GetListByRouteForCRM(quoreInfo);
  }

  GetLastForCRM(id:string){
    return this.quoteLibraryService.GetLastForCRM(id);

  }
}
