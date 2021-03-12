import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBListResultDto1,PUBCommodityDto,PUBCommodityCheckInputDto,PUBGetAllCommodityForUiPickerInput,PUBPagedResultDto1,PUBCommodityUiPickerDto } from './pub.types';

@BaseUrl('/PUB/Commodity')
@Injectable({ providedIn: 'root' })
export class PUBCommodityService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/Commodity/GetAll
     * 分页获取品名顶级父类集合
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {isValid?:boolean,text?:string,isRecursion?:boolean,maxResultCount?:number,skipCount?:number} 

    ): Observable<PUBListResultDto1<PUBCommodityDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Commodity/Get
     * 获取品名明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBCommodityDto> {
        return null as any
    }


    /**
     * @param url /PUB/Commodity/Check
     * 品名重复校验
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBCommodityCheckInputDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Commodity/Create
     * 创建品名
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBCommodityDto

    ): Observable<PUBCommodityDto> {
        return null as any
    }


    /**
     * @param url /PUB/Commodity/Update
     * 更新品名
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBCommodityDto

    ): Observable<PUBCommodityDto> {
        return null as any
    }


    /**
     * @param url /PUB/Commodity/Delete
     * 删除品名
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Commodity/GetAllForUiPicker
     * 提供给UI品名选择器服务接口
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllCommodityForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBCommodityUiPickerDto>> {
        return null as any
    }



  }
