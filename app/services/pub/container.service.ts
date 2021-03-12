import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBPagedResultDto1,PUBContainerDto,PUBListResultDto1,PUBContainerGroupDto,PUBContainerCheckInputDto,PUBChangeContainerStateInput,PUBGetAllContainerForUiPickerInput,PUBContainerUiPickerDto,PUBQueryContainerDto } from './pub.types';

@BaseUrl('/PUB/Container')
@Injectable({ providedIn: 'root' })
export class PUBContainerService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/Container/GetAll
     * 获取分页箱型列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {isValid?:boolean,code?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<PUBPagedResultDto1<PUBContainerDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Container/GetAllGroup
     * 获取箱型分组列表（根据数字前缀分组）
     */

    @GET('GetAllGroup')
    getAllGroup(
        @Payload
        _req: {} 

    ): Observable<PUBListResultDto1<PUBContainerGroupDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Container/Get
     * 获取箱型详情
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBContainerDto> {
        return null as any
    }


    /**
     * @param url /PUB/Container/Check
     * 箱型重复校验
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBContainerCheckInputDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Container/Create
     * 创建箱型
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBContainerDto

    ): Observable<PUBContainerDto> {
        return null as any
    }


    /**
     * @param url /PUB/Container/Update
     * 编辑箱型
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBContainerDto

    ): Observable<PUBContainerDto> {
        return null as any
    }


    /**
     * @param url /PUB/Container/Delete
     * 删除箱型
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Container/ChangeContainerState
     * 修改费用代码状态
     */

    @POST('ChangeContainerState')
    changeContainerState(
        @Payload
        _req:PUBChangeContainerStateInput

    ): Observable<PUBContainerDto> {
        return null as any
    }


    /**
     * @param url /PUB/Container/CreateOrUpdate
     * 创建或更新箱型
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBContainerDto

    ): Observable<PUBContainerDto> {
        return null as any
    }


    /**
     * @param url /PUB/Container/GetAllForUiPicker
     * 提供给UI箱型选择器服务接口
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllContainerForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBContainerUiPickerDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Container/PushContainerETA
     * 推送inttra箱动态到icp3
     */

    @POST('PushContainerETA')
    pushContainerETA(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Container/GetAllEvent
     * 查询箱事件列表数据
     */

    @POST('GetAllEvent')
    getAllEvent(
        @Payload
        _req:PUBQueryContainerDto

    ): Observable<any> {
        return null as any
    }



  }
