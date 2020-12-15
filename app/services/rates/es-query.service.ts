import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesEsOceanRatesPageQueryInput,RatesOceanRatesModel,RatesPagedResultDto,RatesOceanRatesUpdateEventModel, } from './rates.types';

@BaseUrl('/rates/EsQuery')
@Injectable({ providedIn: 'root' })
export class RatesEsQueryService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/EsQuery/GetAllForES
     * 
     */

    @POST('getAllForES')
    getAllForES(
        @Payload
        _req:RatesEsOceanRatesPageQueryInput

    ): Observable<RatesPagedResultDto<RatesOceanRatesModel>> {
        return null as any
    }


    /**
     * @param url /Rates/EsQuery/SyncOceanRates
     * 
     */

    @POST('syncOceanRates')
    syncOceanRates(
        @Payload
        _req: {from?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/EsQuery/SyncOceanRatesUpdateEventModel
     * 
     */

    @POST('syncOceanRatesUpdateEventModel')
    syncOceanRatesUpdateEventModel(
        @Payload
        _req:RatesOceanRatesUpdateEventModel

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/EsQuery/RebuildIndex
     * 
     */

    @POST('rebuildIndex')
    rebuildIndex(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
