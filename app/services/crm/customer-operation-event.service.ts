import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMPagedResultDto1,CRMCustomerOperationEventDto } from './crm.types';

@BaseUrl('/CRM/CustomerOperationEvent')
@Injectable({ providedIn: 'root' })
export class CRMCustomerOperationEventService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/CustomerOperationEvent/GetAll
     * 暂无备注
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {searchKey?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerOperationEventDto>> {
        return null as any
    }



  }
