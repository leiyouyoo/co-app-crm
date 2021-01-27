import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { crmListResultDto1,crmIMContactGroupDto,crmIMContactDto } from './crm.types';

@BaseUrl('/crm/ContactIM')
@Injectable({ providedIn: 'root' })
export class crmContactIMService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/ContactIM/GetPartnerContacts
     * 获取所有合作伙伴的所有联系人
     */

    @GET('GetPartnerContacts')
    getPartnerContacts(
        @Payload
        _req: {customerId?:string,searchText?:string} 

    ): Observable<crmListResultDto1<crmIMContactGroupDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactIM/GetCustomerContacts
     * 获取客户下所有联系人
     */

    @GET('GetCustomerContacts')
    getCustomerContacts(
        @Payload
        _req: {customerId?:string,searchText?:string} 

    ): Observable<crmListResultDto1<crmIMContactDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactIM/GetSaleCustomerContacts
     * 获取业务员所跟进的所有客户的所有联系人
     */

    @GET('GetSaleCustomerContacts')
    getSaleCustomerContacts(
        @Payload
        _req: {customerId?:string,searchText?:string} 

    ): Observable<crmListResultDto1<crmIMContactGroupDto>> {
        return null as any
    }



  }
