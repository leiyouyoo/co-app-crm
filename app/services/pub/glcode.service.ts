import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBGLCodeDto,PUBListResultDto1,PUBEntityDto1,PUBGLCodeSetGroupInput,PUBGLCodeSetCompanyInput } from './pub.types';

@BaseUrl('/PUB/GLCode')
@Injectable({ providedIn: 'root' })
export class PUBGLCodeService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/GLCode/Get
     * 获取会计科目明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBGLCodeDto> {
        return null as any
    }


    /**
     * @param url /PUB/GLCode/GetAll
     * 获取会计科目列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {solutionId:string,companyId?:string,gLCodeType?:number,groupId?:string,searchText?:string,parentId?:string,isValid?:boolean,isRecursion?:boolean} 

    ): Observable<PUBListResultDto1<PUBGLCodeDto>> {
        return null as any
    }


    /**
     * @param url /PUB/GLCode/CreateOrUpdate
     * 保存会计科目
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBGLCodeDto

    ): Observable<PUBGLCodeDto> {
        return null as any
    }


    /**
     * @param url /PUB/GLCode/SetValid
     * 设置是否有效
     */

    @POST('SetValid')
    setValid(
        @Payload
        _req:PUBEntityDto1<any>

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/GLCode/Delete
     * 删除会计科目
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/GLCode/SetGroup
     * 转移分组
     */

    @POST('SetGroup')
    setGroup(
        @Payload
        _req:PUBGLCodeSetGroupInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/GLCode/SetCompany
     * 设置公司
     */

    @POST('SetCompany')
    setCompany(
        @Payload
        _req:PUBGLCodeSetCompanyInput

    ): Observable<any> {
        return null as any
    }



  }
