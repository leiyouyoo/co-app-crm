import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBTransportClauseDto,PUBPagedResultDto1,PUBTransportClauseCheckDto,PUBChangeTransportClauseStateInput,PUBGetAllTransportClauseForUiPickerInput,PUBTransportClauseUiPickerDto } from './pub.types';

@BaseUrl('/PUB/TransportClause')
@Injectable({ providedIn: 'root' })
export class PUBTransportClauseService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/TransportClause/Get
     * 获取运输条款明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBTransportClauseDto> {
        return null as any
    }


    /**
     * @param url /PUB/TransportClause/GetAll
     * 获取运输条款列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {originalId?:string,destinationId?:string,isValid?:boolean} 

    ): Observable<PUBPagedResultDto1<PUBTransportClauseDto>> {
        return null as any
    }


    /**
     * @param url /PUB/TransportClause/Check
     * 校验重复性数据
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBTransportClauseCheckDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/TransportClause/CreateOrUpdate
     * 新建或更新运输条款
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBTransportClauseDto

    ): Observable<PUBTransportClauseDto> {
        return null as any
    }


    /**
     * @param url /PUB/TransportClause/Create
     * 创建运输条款
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBTransportClauseDto

    ): Observable<PUBTransportClauseDto> {
        return null as any
    }


    /**
     * @param url /PUB/TransportClause/Update
     * 更新运输条款
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBTransportClauseDto

    ): Observable<PUBTransportClauseDto> {
        return null as any
    }


    /**
     * @param url /PUB/TransportClause/Delete
     * 删除运输条款
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/TransportClause/ChangeTransportClauseState
     * 修改运输条款状态
     */

    @POST('ChangeTransportClauseState')
    changeTransportClauseState(
        @Payload
        _req:PUBChangeTransportClauseStateInput

    ): Observable<PUBTransportClauseDto> {
        return null as any
    }


    /**
     * @param url /PUB/TransportClause/GetAllForUiPicker
     * 提供给UI运输条款选择器的服务接口
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllTransportClauseForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBTransportClauseUiPickerDto>> {
        return null as any
    }



  }
