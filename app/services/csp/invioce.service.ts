import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPInvioceTitleListDto,CSPPagedResultDto,CSPInvioceTitleDto, } from './csp.types';

@BaseUrl('/csp/Invioce')
@Injectable({ providedIn: 'root' })
export class CSPInvioceService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/Invioce/GetInvioceTitleList
     * 获取抬头列表
     */

    @GET('getInvioceTitleList')
    getInvioceTitleList(
        @Payload
        _req: {searchKeyWord?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CSPPagedResultDto<CSPInvioceTitleListDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Invioce/CreateOrUpdateInvioceTitle
     * 新增/编辑抬头
     */

    @POST('createOrUpdateInvioceTitle')
    createOrUpdateInvioceTitle(
        @Payload
        _req:CSPInvioceTitleDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invioce/DeleteInvioceTitle
     * 删除抬头
     */

    @DELETE('deleteInvioceTitle')
    deleteInvioceTitle(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invioce/SetInvioceTitleDefalut
     * 设置为默认
     */

    @POST('setInvioceTitleDefalut')
    setInvioceTitleDefalut(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
