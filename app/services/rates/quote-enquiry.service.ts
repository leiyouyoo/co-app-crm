import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import {
  RatesQuoteEnquiryBaseDto,
  RatesPagedResultDto,
  RatesQuoteEnquiryFromDto,
  RatesQuoteEnquiryToDto,
  RatesQuoteCustomerContactDto,
  RatesCreateQuoteEnquiryInput,
  RatesCreateTruckQuoteInput,
  RatesCoEntityDto,
} from './rates.types';

@BaseUrl('/rates/QuoteEnquiry')
@Injectable({ providedIn: 'root' })
export class RatesQuoteEnquiryService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * @param url /Rates/QuoteEnquiry/Get
   * 获取询报价详情
   */

  @GET('get')
  get(
    @Payload
    _req: {
      id?: string;
    },
  ): Observable<RatesQuoteEnquiryBaseDto> {
    return null as any;
  }

  /**
   * @param url /Rates/QuoteEnquiry/GetQuoteNo
   * 获取报价号
   */

  @GET('GetQuoteNo')
  getQuoteNo(
    @Payload
    _req: {
      searchText?: string;
    },
  ): Observable<any> {
    return null as any;
  }
  /**
   * @param url /Rates/QuoteEnquiry/GetAll
   * 分页获取询报价列表
   */

  @GET('getAll')
  getAll(
    @Payload
    _req: {
      customerId?: string;
      contactId?: string;
      id?: string;
      status?: any[];
      isGetAll?: boolean;
      freightMethodType?: any[];
      validStartDate?: string;
      validEndDate?: string;
      fromId?: string;
      fromType?: number;
      toId?: string;
      toType?: number;
      searchText?: string;
      sorting?: string;
      maxResultCount?: number;
      skipCount?: number;
    },
  ): Observable<RatesPagedResultDto<RatesQuoteEnquiryBaseDto>> {
    return null as any;
  }

  /**
   * @param url /Rates/QuoteEnquiry/GetFromInfo
   *
   */

  @GET('getFromInfo')
  getFromInfo(
    @Payload
    _req: {
      searchText?: string;
      sorting?: string;
      maxResultCount?: number;
      skipCount?: number;
    },
  ): Observable<RatesPagedResultDto<RatesQuoteEnquiryFromDto>> {
    return null as any;
  }

  /**
   * @param url /Rates/QuoteEnquiry/GetToInfo
   *
   */

  @GET('getToInfo')
  getToInfo(
    @Payload
    _req: {
      searchText?: string;
      sorting?: string;
      maxResultCount?: number;
      skipCount?: number;
    },
  ): Observable<RatesPagedResultDto<RatesQuoteEnquiryToDto>> {
    return null as any;
  }

  /**
   * @param url /Rates/QuoteEnquiry/GetQuoteCustomerContactInfo
   *
   */

  @GET('getQuoteCustomerContactInfo')
  getQuoteCustomerContactInfo(
    @Payload
    _req: {
      searchText?: string;
      sorting?: string;
      maxResultCount?: number;
      skipCount?: number;
    },
  ): Observable<RatesPagedResultDto<RatesQuoteCustomerContactDto>> {
    return null as any;
  }

  /**
   * @param url /Rates/QuoteEnquiry/Create
   * 创建询价
   */

  @POST('create')
  create(
    @Payload
    _req: RatesCreateQuoteEnquiryInput,
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/QuoteEnquiry/UpdateForRejectAsync
   *
   */

  @PUT('updateForRejectAsync')
  updateForRejectAsync(
    @Payload
    _req: RatesCreateQuoteEnquiryInput,
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/QuoteEnquiry/CreateTruckQuoteAndReply
   *
   */

  @POST('createTruckQuoteAndReply')
  createTruckQuoteAndReply(
    @Payload
    _req: RatesCreateTruckQuoteInput,
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/QuoteEnquiry/CancelAsync
   *
   */

  @POST('cancelAsync')
  cancelAsync(
    @Payload
    _req: RatesCoEntityDto,
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/QuoteEnquiry/RecoverAsync
   *
   */

  @POST('recoverAsync')
  recoverAsync(
    @Payload
    _req: RatesCoEntityDto,
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/QuoteEnquiry/DeleteAsync
   *
   */

  @DELETE('deleteAsync')
  deleteAsync(
    @Payload
    _req: {
      id?: string;
    },
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/QuoteEnquiry/Reject
   *
   */

  @POST('reject')
  reject(
    @Payload
    _req: RatesCoEntityDto,
  ): Observable<any> {
    return null as any;
  }
}
