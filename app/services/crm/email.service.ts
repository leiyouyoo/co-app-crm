import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMSeedEmailInput } from './crm.types';

@BaseUrl('/CRM/Email')
@Injectable({ providedIn: 'root' })
export class CRMEmailService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/Email/Seed
     * 发送邮件
     */

    @POST('Seed')
    seed(
        @Payload
        _req:CRMSeedEmailInput

    ): Observable<any> {
        return null as any
    }



  }
