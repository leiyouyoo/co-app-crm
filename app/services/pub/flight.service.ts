import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBPagedResultDto1,PUBFlightDto,PUBFlightCheckInputDto,PUBGetAllFlightForUiPickerInput,PUBFlightUiPickerDto } from './pub.types';

@BaseUrl('/PUB/Flight')
@Injectable({ providedIn: 'root' })
export class PUBFlightService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/Flight/GetAll
     * 分页获取航班列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {isValid?:boolean,airlineId?:string,no?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<PUBPagedResultDto1<PUBFlightDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Flight/Get
     * 获取航班详情
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBFlightDto> {
        return null as any
    }


    /**
     * @param url /PUB/Flight/Check
     * 航班重复校验
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBFlightCheckInputDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Flight/Create
     * 创建航班
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBFlightDto

    ): Observable<PUBFlightDto> {
        return null as any
    }


    /**
     * @param url /PUB/Flight/Update
     * 编辑航班
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBFlightDto

    ): Observable<PUBFlightDto> {
        return null as any
    }


    /**
     * @param url /PUB/Flight/Delete
     * 删除航班
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Flight/GetAllForUiPicker
     * 提供给UI航班选择器的服务接口
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllFlightForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBFlightUiPickerDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Flight/CreateOrUpdate
     * 暂无备注
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBFlightDto

    ): Observable<PUBFlightDto> {
        return null as any
    }



  }
