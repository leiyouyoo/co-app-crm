import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBVoyageDto,PUBPagedResultDto1,PUBVoyageCheckInputDto,PUBGetAllVoyageForUiPickerInput,PUBVoyageUiPickerDto } from './pub.types';

@BaseUrl('/PUB/Voyage')
@Injectable({ providedIn: 'root' })
export class PUBVoyageService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/Voyage/Get
     * 获取航次详情
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBVoyageDto> {
        return null as any
    }


    /**
     * @param url /PUB/Voyage/GetAll
     * 分页获取航次列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {isValid?:boolean,vesselId?:string,no?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<PUBPagedResultDto1<PUBVoyageDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Voyage/Check
     * 航次重复校验
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBVoyageCheckInputDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Voyage/Create
     * 创建航次
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBVoyageDto

    ): Observable<PUBVoyageDto> {
        return null as any
    }


    /**
     * @param url /PUB/Voyage/Update
     * 编辑航次
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBVoyageDto

    ): Observable<PUBVoyageDto> {
        return null as any
    }


    /**
     * @param url /PUB/Voyage/Delete
     * 删除航次
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Voyage/GetAllForUiPicker
     * 提供给UI航次选择器的服务接口
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllVoyageForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBVoyageUiPickerDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Voyage/CreateOrUpdate
     * 暂无备注
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBVoyageDto

    ): Observable<PUBVoyageDto> {
        return null as any
    }



  }
