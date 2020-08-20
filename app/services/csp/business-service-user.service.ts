import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPServiceUserGroupDto,CSPListResultDto, } from './csp.types';

@BaseUrl('/csp/BusinessServiceUser')
@Injectable({ providedIn: 'root' })
export class CSPBusinessServiceUserService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/BusinessServiceUser/GetServiceUsers
     * 根据客户Id获取客服列表
     */

    @GET('getServiceUsers')
    getServiceUsers(
        @Payload
        _req: {customerId?:string} 

    ): Observable<CSPListResultDto<CSPServiceUserGroupDto>> {
        return null as any
    }



  }
