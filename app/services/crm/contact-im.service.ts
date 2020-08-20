import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMIMContactGroupDto,CRMListResultDto,CRMIMContactDto, } from './crm.types';

@BaseUrl('/crm/ContactIM')
@Injectable({ providedIn: 'root' })
export class CRMContactIMService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/ContactIM/GetPartnerContacts
     * 获取所有合作伙伴的所有联系人
     */

    @GET('getPartnerContacts')
    getPartnerContacts(
        @Payload
        _req: {customerId?:string,searchText?:string} 

    ): Observable<CRMListResultDto<CRMIMContactGroupDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactIM/GetCustomerContacts
     * 获取客户下所有联系人
     */

    @GET('getCustomerContacts')
    getCustomerContacts(
        @Payload
        _req: {customerId?:string,searchText?:string} 

    ): Observable<CRMListResultDto<CRMIMContactDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactIM/GetSaleCustomerContacts
     * 获取业务员所跟进的所有客户的所有联系人
     */

    @GET('getSaleCustomerContacts')
    getSaleCustomerContacts(
        @Payload
        _req: {customerId?:string,searchText?:string} 

    ): Observable<CRMListResultDto<CRMIMContactGroupDto>> {
        return null as any
    }



  }
