import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesOceanBasePortBulkDto,RatesDeleteErrorMessageInputDto,RatesOceanBasePortBulkAllDto,RatesOceanBasePortSomeColumnInput,RatesOceanBsePortByIdArbitraryAndAdditionalFeeOuput,RatesOceanBasePortDeleteInput, } from './rates.types';

@BaseUrl('/rates/OceanBasePortService')
@Injectable({ providedIn: 'root' })
export class RatesOceanBasePortService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/OceanBasePortService/GetByOceanId
     * 根据运价获取基本港
     */

    @GET('getByOceanId')
    getByOceanId(
        @Payload
        _req: {oceanId:string,account?:string,accountExcl?:boolean,pOL?:string,pOLExcl?:boolean,vIA?:string,vIAExcl?:boolean,pOD?:string,pODExcl?:boolean,delivery?:string,deliveryExcl?:boolean,itemCode?:string,itemCodeExcl?:boolean,comm?:string,commExcl?:boolean,term?:any[],termExcl?:boolean,surCharge?:string,surChargeExcl?:boolean,description?:string,descriptionExcl?:boolean,dD?:string,dDExcl?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBasePortService/BulkUpdate
     * 批量新增
     */

    @POST('bulkUpdate')
    bulkUpdate(
        @Payload
        _req:RatesOceanBasePortBulkDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBasePortService/GetErrorMessage
     * 获取导入异常记录
     */

    @GET('getErrorMessage')
    getErrorMessage(
        @Payload
        _req: {oceanId?:string,businessType?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBasePortService/DelErrorMessageRecord
     * 删除异常记录
     */

    @POST('delErrorMessageRecord')
    delErrorMessageRecord(
        @Payload
        _req:RatesDeleteErrorMessageInputDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBasePortService/BulkAllUpdate
     * 批量修改所有数据
     */

    @POST('bulkAllUpdate')
    bulkAllUpdate(
        @Payload
        _req:RatesOceanBasePortBulkAllDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBasePortService/BulkSomeColumns
     * 批量编辑某一列数据
     */

    @POST('bulkSomeColumns')
    bulkSomeColumns(
        @Payload
        _req:RatesOceanBasePortSomeColumnInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBasePortService/GetOceanBsePortByIdArbitraryAndAdditionalFee
     * 根据baseportId查询，驳船附加费
     */

    @GET('getOceanBsePortByIdArbitraryAndAdditionalFee')
    getOceanBsePortByIdArbitraryAndAdditionalFee(
        @Payload
        _req: {basePortId?:string,type?:number} 

    ): Observable<RatesOceanBsePortByIdArbitraryAndAdditionalFeeOuput> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBasePortService/BulkDelete
     * 删除basePort，可以传1个id或多个id
     */

    @POST('bulkDelete')
    bulkDelete(
        @Payload
        _req:RatesOceanBasePortDeleteInput

    ): Observable<any> {
        return null as any
    }



  }
