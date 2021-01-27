import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import {  } from './crm.types';

@BaseUrl('/CRM/CustomerTask')
@Injectable({ providedIn: 'root' })
export class CRMCustomerTaskService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/CustomerTask/PushOwnerlessCustomer
     * 任务调度-自动推送无主客户,每天早上8点推送
     */

    @POST('pushOwnerlessCustomer')
    pushOwnerlessCustomer(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerTask/CooperationToUncooperative
     * 任务调度-合作客户转潜在
     */

    @POST('cooperationToUncooperative')
    cooperationToUncooperative(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerTask/NoFollowUncooperativeToShared
     * 任务调度-没跟进潜在转共享
     */

    @POST('noFollowUncooperativeToShared')
    noFollowUncooperativeToShared(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerTask/NoDealUncooperativeToShared
     * 任务调度-没交易潜在客户转共享
     */

    @POST('noDealUncooperativeToShared')
    noDealUncooperativeToShared(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerTask/NoDealUncooperativeToSharedByClaim
     * 任务调度-没交易潜在转共享（交易日期空，根据认领时间判断）
     */

    @POST('noDealUncooperativeToSharedByClaim')
    noDealUncooperativeToSharedByClaim(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerTask/NoFollowSharedToUnowned
     * 未跟进共享转无主
     */

    @POST('noFollowSharedToUnowned')
    noFollowSharedToUnowned(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
