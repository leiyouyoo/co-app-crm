import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import {  } from './storage.types';

@BaseUrl('/STORAGE/FcmPurchaseOrder')
@Injectable({ providedIn: 'root' })
export class STORAGEFcmPurchaseOrderService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Storage/FcmPurchaseOrder/GetTemplateDownload
     * 获取导出模板
     */

    @GET('GetTemplateDownload')
    getTemplateDownload(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Storage/FcmPurchaseOrder/ParsePurchaseOrderExcel
     * 暂无备注
     */

    @FORM('ParsePurchaseOrderExcel')
    parsePurchaseOrderExcel(
        @Payload
        _req: {shipmentId:string,file:File} 

    ): Observable<any> {
        return null as any
    }



  }
