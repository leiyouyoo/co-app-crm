import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { STORAGEFileDto } from './storage.types';

@BaseUrl('/STORAGE/Excel')
@Injectable({ providedIn: 'root' })
export class STORAGEExcelService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Storage/Excel/ExportExcel
     * 暂无备注
     */

    @FORM('ExportExcel')
    exportExcel(
        @Payload
        _req: {sheetName?:string,templateName?:string,headers?:any[],apiTypes?:number,url:string,parametersJsonStr?:string,isBackgroundJob?:boolean} 

    ): Observable<STORAGEFileDto> {
        return null as any
    }


    /**
     * @param url /Storage/Excel/ImportExcel
     * 暂无备注
     */

    @FORM('ImportExcel')
    importExcel(
        @Payload
        _req: {file:File,headers:any[],apiParameterName?:string,isBackgroundJob?:boolean,apiTypes?:number,url:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Storage/Excel/DownloadExcel
     * 下载excel
     */

    @GET('DownloadExcel')
    downloadExcel(
        @Payload
        _req: {fileName:string,fileType?:string,fileToken:string,isSuccess?:boolean,message?:string,result?:object} 

    ): Observable<any> {
        return null as any
    }



  }
