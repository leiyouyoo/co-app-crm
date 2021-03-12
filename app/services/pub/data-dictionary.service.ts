import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBDataDictionaryDto,PUBPagedResultDto1,PUBDataDictionaryCheckDto,PUBChangeDataDictionnaryStateInput,PUBGetAllDataDictionaryForUiPickerInput,PUBDataDictionaryUiPickerDto,PUBGetListByInput } from './pub.types';

@BaseUrl('/PUB/DataDictionary')
@Injectable({ providedIn: 'root' })
export class PUBDataDictionaryService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/DataDictionary/Get
     * 获取数据字典明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBDataDictionaryDto> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/GetAll
     * 获取数据字典列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {code?:string,name?:string,typeId?:string,typeCode?:string,isValid?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<PUBPagedResultDto1<PUBDataDictionaryDto>> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/Check
     * 校验数据字典重复性
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBDataDictionaryCheckDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/CreateOrUpdate
     * 创建或更新数据字典
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBDataDictionaryDto

    ): Observable<PUBDataDictionaryDto> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/Create
     * 创建数据字典
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBDataDictionaryDto

    ): Observable<PUBDataDictionaryDto> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/Update
     * 更新数据字典
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBDataDictionaryDto

    ): Observable<PUBDataDictionaryDto> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/Delete
     * 删除数据字典
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/GetTradeTypes
     * 获取贸易类型类别
     */

    @GET('GetTradeTypes')
    getTradeTypes(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/GetIncotermsByTradeType
     * 根据贸易类型获取贸易条款
     */

    @GET('GetIncotermsByTradeType')
    getIncotermsByTradeType(
        @Payload
        _req: {tradeType?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/ChangeDataDictionnaryState
     * 修改数据字典状态
     */

    @POST('ChangeDataDictionnaryState')
    changeDataDictionnaryState(
        @Payload
        _req:PUBChangeDataDictionnaryStateInput

    ): Observable<PUBDataDictionaryDto> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/GetAllForUiPicker
     * 提供给UI数据字典选择器的服务接口
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllDataDictionaryForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBDataDictionaryUiPickerDto>> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/GetListByType
     * 获取配置的列表数据
     */

    @POST('GetListByType')
    getListByType(
        @Payload
        _req:PUBGetListByInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/CreateOrUpdateConfigureData
     * 创建或更新配置数据
     */

    @POST('CreateOrUpdateConfigureData')
    createOrUpdateConfigureData(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/DataDictionary/InsertCustomerVerificationConfiguration
     * 暂无备注
     */

    @POST('InsertCustomerVerificationConfiguration')
    insertCustomerVerificationConfiguration(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
