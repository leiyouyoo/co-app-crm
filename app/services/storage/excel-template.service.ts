import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import {  } from './storage.types';

@BaseUrl('/STORAGE/ExcelTemplate')
@Injectable({ providedIn: 'root' })
export class STORAGEExcelTemplateService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Storage/ExcelTemplate/Get
     * 根据模板名称获取excel模板
     */

    @GET('Get')
    get(
        @Payload
        _req: {name?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Storage/ExcelTemplate/GetTemplate
     * 暂无备注
     */

    @GET('GetTemplate')
    getTemplate(
        @Payload
        _req: {name?:string} 

    ): Observable<any> {
        return null as any
    }



  }
