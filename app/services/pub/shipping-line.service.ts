import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBShippingLineDto,PUBListResultDto1,PUBShippingLineCheckInputDto,PUBChangeShippingLineStateInput,PUBCountryReationShippingDto,PUBPortReationCountryDto,PUBGetAllShippingLineForUiPickerInput,PUBPagedResultDto1,PUBShippingLineUiPickerDto,PUBShippingLinesByPortDto } from './pub.types';

@BaseUrl('/PUB/ShippingLine')
@Injectable({ providedIn: 'root' })
export class PUBShippingLineService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/ShippingLine/Get
     * 获取航线详情
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBShippingLineDto> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/GetAll
     * 分页获取航线顶级父类集合
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {isValid?:boolean,parentId?:string,isRecursion?:boolean} 

    ): Observable<PUBListResultDto1<PUBShippingLineDto>> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/Check
     * 航线重复校验
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBShippingLineCheckInputDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/Create
     * 创建航线
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBShippingLineDto

    ): Observable<PUBShippingLineDto> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/CreateOrUpdate
     * 更新或者删除
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBShippingLineDto

    ): Observable<PUBShippingLineDto> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/PostUpdate
     * 编辑航线
     */

    @POST('PostUpdate')
    postUpdate(
        @Payload
        _req:PUBShippingLineDto

    ): Observable<PUBShippingLineDto> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/Delete
     * 删除航线
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/ChangeShippingLineState
     * 修改航线状态
     */

    @POST('ChangeShippingLineState')
    changeShippingLineState(
        @Payload
        _req:PUBChangeShippingLineStateInput

    ): Observable<PUBShippingLineDto> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/GetCountryList
     * 获取航线与国家关系列表
     */

    @GET('GetCountryList')
    getCountryList(
        @Payload
        _req: {shippingLineId?:string} 

    ): Observable<PUBListResultDto1<PUBCountryReationShippingDto>> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/SaveCountry
     * 保存航线与国家关系列表
     */

    @POST('SaveCountry')
    saveCountry(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/GetPortList
     * 获取航线与港口关系列表
     */

    @GET('GetPortList')
    getPortList(
        @Payload
        _req: {shippingLineId?:string} 

    ): Observable<PUBListResultDto1<PUBPortReationCountryDto>> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/SavePort
     * 保存航线与港口关系列表
     */

    @POST('SavePort')
    savePort(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/GetPortsByShippingLine
     * 根据航线获取对应的港口
     */

    @GET('GetPortsByShippingLine')
    getPortsByShippingLine(
        @Payload
        _req: {code?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/GetRegionsByShippingLine
     * 根据航线获取对应的省份
     */

    @GET('GetRegionsByShippingLine')
    getRegionsByShippingLine(
        @Payload
        _req: {code?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/GetAllForUiPicker
     * 提供给UI航线选择器服务接口
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllShippingLineForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBShippingLineUiPickerDto>> {
        return null as any
    }


    /**
     * @param url /PUB/ShippingLine/GetShippingLinesByPort
     * 根据港口查询航线
     */

    @POST('GetShippingLinesByPort')
    getShippingLinesByPort(
        @Payload
        _req:PUBShippingLinesByPortDto

    ): Observable<any> {
        return null as any
    }



  }
