import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesOceanArbitraryBulkDto,RatesOceanArbitraryBulkAllDto,RatesOceanArbitrarySomeColumnInput,RatesOceanArbitraryDeleteInput, } from './rates.types';

@BaseUrl('/rates/OceanArbitraryService')
@Injectable({ providedIn: 'root' })
export class RatesOceanArbitraryServiceService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/OceanArbitraryService/GetByOceanId
     * 根据运价获取驳船
     */

    @GET('getByOceanId')
    getByOceanId(
        @Payload
        _req: {oceanId:string,form?:string,formExcl?:boolean,to?:string,toExcl?:boolean,itemCode?:string,itemCodeExcl?:boolean,term?:any[],termExcl?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanArbitraryService/BulkUpdate
     * 批量新增和编辑
     */

    @POST('bulkUpdate')
    bulkUpdate(
        @Payload
        _req:RatesOceanArbitraryBulkDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanArbitraryService/BulkAllUpdate
     * 根据条件编辑所有数据
     */

    @POST('bulkAllUpdate')
    bulkAllUpdate(
        @Payload
        _req:RatesOceanArbitraryBulkAllDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanArbitraryService/BulkSomeColumns
     * 批量编辑某一列
     */

    @POST('bulkSomeColumns')
    bulkSomeColumns(
        @Payload
        _req:RatesOceanArbitrarySomeColumnInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanArbitraryService/BulkDelete
     * 删除arbitrary，可以传1个id或多个id
     */

    @POST('bulkDelete')
    bulkDelete(
        @Payload
        _req:RatesOceanArbitraryDeleteInput

    ): Observable<any> {
        return null as any
    }



  }
