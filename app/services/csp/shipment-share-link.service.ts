import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPShipmentShareLinkDto,CSPPagedResultDto,CSPCoEntityDto,CSPShipmentShareLinkDetailOutput, } from './csp.types';

@BaseUrl('/csp/ShipmentShareLink')
@Injectable({ providedIn: 'root' })
export class CSPShipmentShareLinkService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/ShipmentShareLink/Create
     * 创建数据
     */

    @POST('create')
    create(
        @Payload
        _req:CSPShipmentShareLinkDto

    ): Observable<CSPShipmentShareLinkDto> {
        return null as any
    }


    /**
     * @param url /CSP/ShipmentShareLink/Update
     * 编辑数据（用于发送邮件）
     */

    @PUT('update')
    update(
        @Payload
        _req:CSPShipmentShareLinkDto

    ): Observable<CSPShipmentShareLinkDto> {
        return null as any
    }


    /**
     * @param url /CSP/ShipmentShareLink/GetAll
     * 获取列表
     */

    @GET('getAll')
    getAll(
        @Payload
        _req: {shipmentId:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CSPPagedResultDto<CSPShipmentShareLinkDto>> {
        return null as any
    }


    /**
     * @param url /CSP/ShipmentShareLink/Cancel
     * 作废
     */

    @POST('cancel')
    cancel(
        @Payload
        _req:CSPCoEntityDto<any>

    ): Observable<CSPShipmentShareLinkDto> {
        return null as any
    }


    /**
     * @param url /CSP/ShipmentShareLink/GetDetail
     * 分享详情页
     */

    @GET('getDetail')
    getDetail(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPShipmentShareLinkDetailOutput> {
        return null as any
    }



  }
