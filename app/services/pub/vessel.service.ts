import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBVesselDto,PUBPagedResultDto1,PUBVesselCheckInputDto,PUBGetAllVesselForUiPickerInput,PUBVesselUiPickerDto } from './pub.types';

@BaseUrl('/PUB/Vessel')
@Injectable({ providedIn: 'root' })
export class PUBVesselService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/Vessel/Get
     * 获取船名详情
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBVesselDto> {
        return null as any
    }


    /**
     * @param url /PUB/Vessel/GetAll
     * 分页获取船名列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {isValid?:boolean,code?:string,name?:string,carrierId?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<PUBPagedResultDto1<PUBVesselDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Vessel/Check
     * 船名重复校验
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBVesselCheckInputDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Vessel/Create
     * 创建船名
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBVesselDto

    ): Observable<PUBVesselDto> {
        return null as any
    }


    /**
     * @param url /PUB/Vessel/Update
     * 编辑船名
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBVesselDto

    ): Observable<PUBVesselDto> {
        return null as any
    }


    /**
     * @param url /PUB/Vessel/Delete
     * 删除船名
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Vessel/GetAllForUiPicker
     * 提供给UI船名选择器的服务接口
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllVesselForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBVesselUiPickerDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Vessel/CreateOrUpdate
     * 暂无备注
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBVesselDto

    ): Observable<PUBVesselDto> {
        return null as any
    }



  }
