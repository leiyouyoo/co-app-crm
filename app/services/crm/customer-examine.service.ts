import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMPostCodeInput } from './crm.types';

@BaseUrl('/CRM/CustomerExamine')
@Injectable({ providedIn: 'root' })
export class CRMCustomerExamineService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/CustomerExamine/PostCodeAsync
     * 申请代码
     */

    @POST('PostCodeAsync')
    postCodeAsync(
        @Payload
        _req:CRMPostCodeInput

    ): Observable<any> {
        return null as any
    }



  }
