import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBSolutionGLConfigDto,PUBListResultDto1 } from './pub.types';

@BaseUrl('/PUB/SolutionGLConfig')
@Injectable({ providedIn: 'root' })
export class PUBSolutionGLConfigService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/SolutionGLConfig/Get
     * 获取会计科目配置明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBSolutionGLConfigDto> {
        return null as any
    }


    /**
     * @param url /PUB/SolutionGLConfig/GetAll
     * 获取会计科目配置列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {solutionId:string} 

    ): Observable<PUBListResultDto1<PUBSolutionGLConfigDto>> {
        return null as any
    }


    /**
     * @param url /PUB/SolutionGLConfig/CreateOrUpdate
     * 保存会计科目配置
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBSolutionGLConfigDto

    ): Observable<PUBSolutionGLConfigDto> {
        return null as any
    }


    /**
     * @param url /PUB/SolutionGLConfig/Delete
     * 删除会计科目配置
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
