import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPNewsAndUpdatesSettingsEditDto,CSPSettingsEditDto, } from './csp.types';

@BaseUrl('/CSP/Settings')
@Injectable({ providedIn: 'root' })
export class CSPSettingsService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/Settings/GetNewsAndUpdates
     * 获取设置页 Shipment 动态设置
     */

    @GET('getNewsAndUpdates')
    getNewsAndUpdates(
        @Payload
        _req: {} 

    ): Observable<CSPNewsAndUpdatesSettingsEditDto> {
        return null as any
    }


    /**
     * @param url /CSP/Settings/UpdateNewsAndUpdates
     * 保存 Shipment 动态设置
     */

    @PUT('updateNewsAndUpdates')
    updateNewsAndUpdates(
        @Payload
        _req:CSPNewsAndUpdatesSettingsEditDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Settings/GetAll
     * 
     */

    @GET('getAll')
    getAll(
        @Payload
        _req: {} 

    ): Observable<CSPSettingsEditDto> {
        return null as any
    }


    /**
     * @param url /CSP/Settings/UpdateAll
     * 
     */

    @PUT('updateAll')
    updateAll(
        @Payload
        _req:CSPSettingsEditDto

    ): Observable<any> {
        return null as any
    }



  }
