import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMPostCodeInput,CRMExcmineCodeDto,CRMExamineCodeInput } from './crm.types';

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


    /**
     * @param url /CRM/CustomerExamine/GetExamineDetail
     * 获取代码审批页数据
     */

    @GET('GetExamineDetail')
    getExamineDetail(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExamine/GetExamineDetailNew
     * 获取代码审批页数据
     */

    @GET('GetExamineDetailNew')
    getExamineDetailNew(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMExcmineCodeDto> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExamine/ExamineCodeAsync
     * 代码审批
     */

    @POST('ExamineCodeAsync')
    examineCodeAsync(
        @Payload
        _req:CRMExamineCodeInput

    ): Observable<any> {
        return null as any
    }



  }
