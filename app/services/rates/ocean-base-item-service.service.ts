import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesGetFreightRatesInput, RatesQueryFreightRateOutput, RatesPagedResultDto, RatesCrmBusinessRateListInput, RatesCrmBusinessRateListOutput, RatesCrmOceanRateDetails, } from './rates.types';

@BaseUrl('/rates/OceanBaseItemService')
@Injectable({ providedIn: 'root' })
export class RatesOceanBaseItemServiceService extends BaseApi {
    constructor(injector: Injector) {
        super(injector);
    }


    /**
     * @param url /Rates/OceanBaseItemService/Create
     * 生成运价
     */

    @POST('create')
    create(
        @Payload
        _req: { oceanId?: string }

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBaseItemService/QueryFreightRates
     * csp 运价查询
     */

    @POST('queryFreightRates')
    queryFreightRates(
        @Payload
        _req: RatesGetFreightRatesInput

    ): Observable<RatesQueryFreightRateOutput> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBaseItemService/GetBusinessRateList
     * crm运价查询
     */

    @POST('getBusinessRateList')
    getBusinessRateList(
        @Payload
        _req: RatesCrmBusinessRateListInput

    ): Observable<RatesPagedResultDto<RatesCrmBusinessRateListOutput>> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBaseItemService/GetBusinessRateDetails
     * crm 运价详情
     */

    @GET('getBusinessRateDetails')
    getBusinessRateDetails(
        @Payload
        _req: { baseItemId?: string }

    ): Observable<RatesCrmOceanRateDetails> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBaseItemService/GetIcpOceanBaseItemList
     * icp运价查询
     */

    @GET('getIcpOceanBaseItemList')
    getIcpOceanBaseItemList(
        @Payload
        _req: { contractNo?: string, carrierId?: string, placeOfReceiptId?: string, pOLId?: string, pODId?: string, finalDestinationId?: string, comm?: string, fromDate?: string, toDate?: string, freightId?: string, onlyFreightId?: boolean }

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBaseItemService/GetIcpOceanBaseItemDetails
     * icp运价详情
     */

    @GET('getIcpOceanBaseItemDetails')
    getIcpOceanBaseItemDetails(
        @Payload
        _req: { id?: string }

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBaseItemService/IcpGetOceanOriginInfoAsync
     * 
     */

    @GET('icpGetOceanOriginInfoAsync')
    icpGetOceanOriginInfoAsync(
        @Payload
        _req: { id?: string }

    ): Observable<any> {
        return null as any
    }



}
