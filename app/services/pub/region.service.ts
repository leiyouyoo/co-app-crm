import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBRegionDto,PUBListResultDto1,PUBGetByAreaInput,PUBRegionCheckDto,PUBGetAllCountryForUiPickerInput,PUBPagedResultDto1,PUBCountryUiPickerDto,PUBGetAllRegionForUiPickerInput,PUBRegionUiPickerDto,PUBRegionWithLevelUiPickerDto } from './pub.types';

@BaseUrl('/PUB/Region')
@Injectable({ providedIn: 'root' })
export class PUBRegionService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/Region/Get
     * 获取地区明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBRegionDto> {
        return null as any
    }


    /**
     * @param url /PUB/Region/GetAll
     * 获取地区列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {ids?:any[],code?:string,shippingCode?:string,name?:string,parentId?:string,isValid?:boolean,isRecursion?:boolean,id?:string} 

    ): Observable<PUBListResultDto1<PUBRegionDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Region/GetByAreaIds
     * 根据片区获取省份地区
     */

    @POST('GetByAreaIds')
    getByAreaIds(
        @Payload
        _req:PUBGetByAreaInput

    ): Observable<PUBListResultDto1<PUBRegionDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Region/Check
     * 校验重复性数据
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBRegionCheckDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Region/CreateOrUpdate
     * 创建或更新地区-前端提交只需调用这个方法即可
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBRegionDto

    ): Observable<PUBRegionDto> {
        return null as any
    }


    /**
     * @param url /PUB/Region/Create
     * 创建地区
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBRegionDto

    ): Observable<PUBRegionDto> {
        return null as any
    }


    /**
     * @param url /PUB/Region/Update
     * 更新地区
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBRegionDto

    ): Observable<PUBRegionDto> {
        return null as any
    }


    /**
     * @param url /PUB/Region/Delete
     * 删除地区
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Region/BulkCreateAsync
     * 暂无备注
     */

    @POST('BulkCreateAsync')
    bulkCreateAsync(
        @Payload
        _req:PUBRegionDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Region/GetAllCountryForUiPicker
     * 提供给UI国家选择器的服务接口
     */

    @POST('GetAllCountryForUiPicker')
    getAllCountryForUiPicker(
        @Payload
        _req:PUBGetAllCountryForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBCountryUiPickerDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Region/GetAllRegionForUiPicker
     * 提供给UI地区（省份）选择器的服务接口
     */

    @POST('GetAllRegionForUiPicker')
    getAllRegionForUiPicker(
        @Payload
        _req:PUBGetAllRegionForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBRegionUiPickerDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Region/GetAllCountriesForPicker
     * 提供给UI地区（国家带子级）选择器的服务接口
     */

    @GET('GetAllCountriesForPicker')
    getAllCountriesForPicker(
        @Payload
        _req: {searchText?:string,ids?:string} 

    ): Observable<PUBListResultDto1<PUBRegionWithLevelUiPickerDto>> {
        return null as any
    }



  }
