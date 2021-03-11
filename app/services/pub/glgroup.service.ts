import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBGLGroupDto,PUBListResultDto1 } from './pub.types';

@BaseUrl('/PUB/GLGroup')
@Injectable({ providedIn: 'root' })
export class PUBGLGroupService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/GLGroup/Get
     * 获取会计科目分组明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBGLGroupDto> {
        return null as any
    }


    /**
     * @param url /PUB/GLGroup/GetAll
     * 获取会计科目分组列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {searchText?:string,parentId?:string,isRecursion?:boolean} 

    ): Observable<PUBListResultDto1<PUBGLGroupDto>> {
        return null as any
    }


    /**
     * @param url /PUB/GLGroup/CreateOrUpdate
     * 保存会计科目分组
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBGLGroupDto

    ): Observable<PUBGLGroupDto> {
        return null as any
    }


    /**
     * @param url /PUB/GLGroup/Delete
     * 删除会计科目分组
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
