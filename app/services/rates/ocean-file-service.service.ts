import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesOceanFileDto, } from './rates.types';

@BaseUrl('/rates/OceanFileService')
@Injectable({ providedIn: 'root' })
export class RatesOceanFileServiceService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/OceanFileService/GetOceanFileByOceanId
     * 根据合约id获取数据
     */

    @GET('getOceanFileByOceanId')
    getOceanFileByOceanId(
        @Payload
        _req: {oceanId?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanFileService/CreateOrUpdate
     * 文件新增or编辑
     */

    @POST('createOrUpdate')
    createOrUpdate(
        @Payload
        _req:RatesOceanFileDto

    ): Observable<RatesOceanFileDto> {
        return null as any
    }


    /**
     * @param url /Rates/OceanFileService/Delete
     * 文件删除
     */

    @DELETE('delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
