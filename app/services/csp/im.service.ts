import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPMayInviteUserModel,CSPListResultDto,CSPCreateImGroupInput,CSPCreateImGroupForCustomerInput,CSPAddDeleteGroupInput,CSPAjaxResponse, } from './csp.types';

@BaseUrl('/CSP/IM')
@Injectable({ providedIn: 'root' })
export class CSPIMService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/IM/GetMayInviteUserList
     * 获取可邀请加入群聊的用户列表
     */

    @GET('getMayInviteUserList')
    getMayInviteUserList(
        @Payload
        _req: {businessType:number,businessId:string} 

    ): Observable<CSPListResultDto<CSPMayInviteUserModel>> {
        return null as any
    }


    /**
     * @param url /CSP/IM/CreateImGroup
     * 创建业务IM群
     */

    @POST('createImGroup')
    createImGroup(
        @Payload
        _req:CSPCreateImGroupInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/IM/CreateImGroupForCustomer
     * 为指定客户创建业务IM群，目前只实现了 Shipment群的建立
     */

    @POST('createImGroupForCustomer')
    createImGroupForCustomer(
        @Payload
        _req:CSPCreateImGroupForCustomerInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/IM/AddDeleteGroupTask
     * 删除群
     */

    @POST('addDeleteGroupTask')
    addDeleteGroupTask(
        @Payload
        _req:CSPAddDeleteGroupInput

    ): Observable<CSPAjaxResponse> {
        return null as any
    }



  }
