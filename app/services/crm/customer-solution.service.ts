import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMPagedResultDto1,CRMCustomerSolutionApplyListDto,CRMCustomerSolutionApplyInput,CRMCustomerSolutionForAudit,CRMCustomerSolutionAuditInput } from './crm.types';

@BaseUrl('/CRM/CustomerSolution')
@Injectable({ providedIn: 'root' })
export class CRMCustomerSolutionService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/CustomerSolution/GetApplyList
     * 申请列表
     */

    @GET('GetApplyList')
    getApplyList(
        @Payload
        _req: {businessNo?:string,agentType?:number,creatorUserId?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerSolutionApplyListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerSolution/ApplyCustomerSolution
     * 申请客户解决方案
     */

    @POST('ApplyCustomerSolution')
    applyCustomerSolution(
        @Payload
        _req:CRMCustomerSolutionApplyInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerSolution/GetApplyForAudit
     * 获取申请信息用于审核
     */

    @GET('GetApplyForAudit')
    getApplyForAudit(
        @Payload
        _req: {businessId?:string,id?:string} 

    ): Observable<CRMCustomerSolutionForAudit> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerSolution/AuditApplyInfo
     * 审核申请信息
     */

    @POST('AuditApplyInfo')
    auditApplyInfo(
        @Payload
        _req:CRMCustomerSolutionAuditInput

    ): Observable<any> {
        return null as any
    }



  }
