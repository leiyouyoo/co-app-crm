import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBAreaDto,PUBListResultDto1,PUBAreaCheckDto,PUBGetAllAreaForUiPickerInput,PUBPagedResultDto1,PUBAreaUiPickerDto } from './pub.types';

@BaseUrl('/PUB/Area')
@Injectable({ providedIn: 'root' })
export class PUBAreaService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/Area/Get
     * 获取片区
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBAreaDto> {
        return null as any
    }


    /**
     * @param url /PUB/Area/GetAll
     * 获取片区列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {name?:string,isValid?:boolean} 

    ): Observable<PUBListResultDto1<PUBAreaDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Area/CreateOrUpdate
     * 创建或编辑片区
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBAreaDto

    ): Observable<PUBAreaDto> {
        return null as any
    }


    /**
     * @param url /PUB/Area/Check
     * 校验重复性数据
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBAreaCheckDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Area/Delete
     * 删除片区
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Area/GetAllForUiPicker
     * 用于前端片区选择器
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllAreaForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBAreaUiPickerDto>> {
        return null as any
    }



  }
