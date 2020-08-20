import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPHsCodeDto,CSPListResultDto, } from './csp.types';

@BaseUrl('/csp/HsCode')
@Injectable({ providedIn: 'root' })
export class CSPHsCodeService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/HsCode/Get
     * 获取H.S. Code 明细
     */

    @GET('get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPHsCodeDto> {
        return null as any
    }


    /**
     * @param url /CSP/HsCode/GetAll
     * 获取H.S. Code 列表
     */

    @GET('getAll')
    getAll(
        @Payload
        _req: {searchKeyword?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CSPListResultDto<CSPHsCodeDto>> {
        return null as any
    }



  }
