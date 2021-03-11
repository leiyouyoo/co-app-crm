import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBCurrencyDto,PUBPagedResultDto1,PUBCurrencyCheckDto,PUBChangeCurrencyStateInput,PUBGetAllForUiPickerInput,PUBCurrencyUiPickerDto } from './pub.types';

@BaseUrl('/PUB/Currency')
@Injectable({ providedIn: 'root' })
export class PUBCurrencyService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/Currency/Get
     * 获取币种明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBCurrencyDto> {
        return null as any
    }


    /**
     * @param url /PUB/Currency/GetAll
     * 获取币种列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {code?:string,name?:string,regionId?:string,isValid?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<PUBPagedResultDto1<PUBCurrencyDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Currency/Check
     * 校验重复性数据
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBCurrencyCheckDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Currency/CreateOrUpdate
     * 新建或更新币种
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBCurrencyDto

    ): Observable<PUBCurrencyDto> {
        return null as any
    }


    /**
     * @param url /PUB/Currency/Create
     * 创建币种
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBCurrencyDto

    ): Observable<PUBCurrencyDto> {
        return null as any
    }


    /**
     * @param url /PUB/Currency/Update
     * 更新币种
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBCurrencyDto

    ): Observable<PUBCurrencyDto> {
        return null as any
    }


    /**
     * @param url /PUB/Currency/ChangeCurrencyState
     * 修改币种状态
     */

    @POST('ChangeCurrencyState')
    changeCurrencyState(
        @Payload
        _req:PUBChangeCurrencyStateInput

    ): Observable<PUBCurrencyDto> {
        return null as any
    }


    /**
     * @param url /PUB/Currency/Delete
     * 删除币种
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Currency/GetAllForUiPicker
     * 获取币种列表
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBCurrencyUiPickerDto>> {
        return null as any
    }


    /**
     * @param url /PUB/Currency/GetExchangeList
     * 获取所有币种的汇率
     */

    @GET('GetExchangeList')
    getExchangeList(
        @Payload
        _req: {toCode?:string} 

    ): Observable<any> {
        return null as any
    }



  }
