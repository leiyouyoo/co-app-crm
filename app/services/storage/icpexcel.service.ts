import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import {  } from './storage.types';

@BaseUrl('/STORAGE/ICPExcel')
@Injectable({ providedIn: 'root' })
export class STORAGEICPExcelService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Storage/ICPExcel/OrderImport
     * 暂无备注
     */

    @FORM('OrderImport')
    orderImport(
        @Payload
        _req: {file?:File} 

    ): Observable<any> {
        return null as any
    }



  }
