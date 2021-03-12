import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBCountyDto,PUBListResultDto1,PUBPagedResultDto1 } from './pub.types';

@BaseUrl('/PUB/County')
@Injectable({ providedIn: 'root' })
export class PUBCountyService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/County/Get
     * 获取区县镇
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBCountyDto> {
        return null as any
    }


    /**
     * @param url /PUB/County/GetAll
     * 获取区县镇列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {code?:string,name?:string,parentId?:string,isRecursion?:boolean,id?:string} 

    ): Observable<PUBListResultDto1<PUBCountyDto>> {
        return null as any
    }


    /**
     * @param url /PUB/County/GetFlatList
     * 获取区县镇列表（不区分上下级）
     */

    @GET('GetFlatList')
    getFlatList(
        @Payload
        _req: {id?:string,code?:string,name?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<PUBPagedResultDto1<PUBCountyDto>> {
        return null as any
    }


    /**
     * @param url /PUB/County/CreateOrUpdate
     * 创建或更新地区-前端提交只需调用这个方法即可
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBCountyDto

    ): Observable<PUBCountyDto> {
        return null as any
    }


    /**
     * @param url /PUB/County/Create
     * 创建地区
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBCountyDto

    ): Observable<PUBCountyDto> {
        return null as any
    }


    /**
     * @param url /PUB/County/Update
     * 更新地区
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBCountyDto

    ): Observable<PUBCountyDto> {
        return null as any
    }


    /**
     * @param url /PUB/County/Delete
     * 删除区县镇
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
