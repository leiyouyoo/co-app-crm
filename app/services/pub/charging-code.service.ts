import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBChargingCodeDto,PUBPagedResultDto1,PUBChangeChargingCodeStateInput,PUBGetAllChargingCodeForUiPickerInput,PUBChargingCodeUiPickerDto } from './pub.types';

@BaseUrl('/PUB/ChargingCode')
@Injectable({ providedIn: 'root' })
export class PUBChargingCodeService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/ChargingCode/Get
     * 获取费用代码
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBChargingCodeDto> {
        return null as any
    }


    /**
     * @param url /PUB/ChargingCode/GetAll
     * 获取费用代码列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {companyId?:string,groupId?:string,text?:string,isValid?:boolean} 

    ): Observable<PUBPagedResultDto1<PUBChargingCodeDto>> {
        return null as any
    }


    /**
     * @param url /PUB/ChargingCode/ChangeChargingCodeState
     * 修改费用代码状态
     */

    @POST('ChangeChargingCodeState')
    changeChargingCodeState(
        @Payload
        _req:PUBChangeChargingCodeStateInput

    ): Observable<PUBChargingCodeDto> {
        return null as any
    }


    /**
     * @param url /PUB/ChargingCode/CreateOrUpdate
     * 创建或更新费用代码
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBChargingCodeDto

    ): Observable<PUBChargingCodeDto> {
        return null as any
    }


    /**
     * @param url /PUB/ChargingCode/GetAllForUiPicker
     * 提供给UI费用代码选择器的服务接口
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllChargingCodeForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBChargingCodeUiPickerDto>> {
        return null as any
    }


    /**
     * @param url /PUB/ChargingCode/Check
     * 暂无备注
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBChargingCodeDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/ChargingCode/Create
     * 暂无备注
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBChargingCodeDto

    ): Observable<PUBChargingCodeDto> {
        return null as any
    }


    /**
     * @param url /PUB/ChargingCode/Update
     * 暂无备注
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBChargingCodeDto

    ): Observable<PUBChargingCodeDto> {
        return null as any
    }


    /**
     * @param url /PUB/ChargingCode/Delete
     * 暂无备注
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
