import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBSolutionCurrencyDto,PUBListResultDto1 } from './pub.types';

@BaseUrl('/PUB/SolutionCurrency')
@Injectable({ providedIn: 'root' })
export class PUBSolutionCurrencyService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/SolutionCurrency/Get
     * 获取解决方案币种明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBSolutionCurrencyDto> {
        return null as any
    }


    /**
     * @param url /PUB/SolutionCurrency/GetAll
     * 获取解决方案币种列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {solutionId:string,searchText?:string} 

    ): Observable<PUBListResultDto1<PUBSolutionCurrencyDto>> {
        return null as any
    }


    /**
     * @param url /PUB/SolutionCurrency/CreateOrUpdate
     * 保存解决方案币种
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBSolutionCurrencyDto

    ): Observable<PUBSolutionCurrencyDto> {
        return null as any
    }


    /**
     * @param url /PUB/SolutionCurrency/Delete
     * 删除解决方案币种
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
