import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import {  } from './storage.types';

@BaseUrl('/STORAGE/RateExcel')
@Injectable({ providedIn: 'root' })
export class STORAGERateExcelService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Storage/RateExcel/ImportExcelToRate
     * 暂无备注
     */

    @FORM('ImportExcelToRate')
    importExcelToRate(
        @Payload
        _req: {oceanId?:string,file:File,type?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Storage/RateExcel/ImportExcelToTruck
     * 暂无备注
     */

    @FORM('ImportExcelToTruck')
    importExcelToTruck(
        @Payload
        _req: {oceanId?:string,file:File,type?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Storage/RateExcel/GetTemplateDownloadBasePort
     * 基本港模板下载
     */

    @GET('GetTemplateDownloadBasePort')
    getTemplateDownloadBasePort(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Storage/RateExcel/GetTemplateDownloadArbitrary
     * 驳船模板下载
     */

    @GET('GetTemplateDownloadArbitrary')
    getTemplateDownloadArbitrary(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Storage/RateExcel/GetTemplateDownloadTruck
     * 拖车模板下载
     */

    @GET('GetTemplateDownloadTruck')
    getTemplateDownloadTruck(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
