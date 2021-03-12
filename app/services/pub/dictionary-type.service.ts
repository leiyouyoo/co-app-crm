import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBDictionaryTypeDto,PUBPagedResultDto1,PUBDictionaryTypeCheckDto } from './pub.types';

@BaseUrl('/PUB/DictionaryType')
@Injectable({ providedIn: 'root' })
export class PUBDictionaryTypeService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/DictionaryType/Get
     * 获取字典类型明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBDictionaryTypeDto> {
        return null as any
    }


    /**
     * @param url /PUB/DictionaryType/GetAll
     * 获取字典类型列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {code?:string,name?:string,isValid?:boolean} 

    ): Observable<PUBPagedResultDto1<PUBDictionaryTypeDto>> {
        return null as any
    }


    /**
     * @param url /PUB/DictionaryType/Check
     * 校验重复性数据
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBDictionaryTypeCheckDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/DictionaryType/CreateOrUpdate
     * 创建或更新字典类型
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBDictionaryTypeDto

    ): Observable<PUBDictionaryTypeDto> {
        return null as any
    }


    /**
     * @param url /PUB/DictionaryType/Create
     * 创建字典类型
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBDictionaryTypeDto

    ): Observable<PUBDictionaryTypeDto> {
        return null as any
    }


    /**
     * @param url /PUB/DictionaryType/Update
     * 更新字典类型
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBDictionaryTypeDto

    ): Observable<PUBDictionaryTypeDto> {
        return null as any
    }


    /**
     * @param url /PUB/DictionaryType/Delete
     * 删除字典类型
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
