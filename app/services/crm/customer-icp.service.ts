import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { crmIcpCreateOrUpdateCustomerInput,crmCustomerOutput,crmIcpUpdateCustomerCodeInput } from './crm.types';

@BaseUrl('/crm/CustomerIcp')
@Injectable({ providedIn: 'root' })
export class crmCustomerIcpService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/CustomerIcp/CreateOrUpdate
     * 新增或者修改客户
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:crmIcpCreateOrUpdateCustomerInput

    ): Observable<crmCustomerOutput> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerIcp/UpdateCode
     * 更新Code
     */

    @POST('UpdateCode')
    updateCode(
        @Payload
        _req:crmIcpUpdateCustomerCodeInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerIcp/Delete
     * 删除客户
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerIcp/SyncCustomerToLocation
     * 暂无备注
     */

    @POST('SyncCustomerToLocation')
    syncCustomerToLocation(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
