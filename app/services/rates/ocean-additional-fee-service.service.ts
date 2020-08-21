import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesOceanAdditionalFeeDto,RatesOceanBindAdditionalFeeInput, } from './rates.types';

@BaseUrl('/rates/OceanAdditionalFeeService')
@Injectable({ providedIn: 'root' })
export class RatesOceanAdditionalFeeServiceService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/OceanAdditionalFeeService/GetAdditionalByOceanId
     * 根据合约id获取附加费
     */

    @GET('getAdditionalByOceanId')
    getAdditionalByOceanId(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanAdditionalFeeService/CreateOrUpdate
     * 新增附加费
     */

    @POST('createOrUpdate')
    createOrUpdate(
        @Payload
        _req:RatesOceanAdditionalFeeDto

    ): Observable<RatesOceanAdditionalFeeDto> {
        return null as any
    }


    /**
     * @param url /Rates/OceanAdditionalFeeService/BulkDelete
     * 删除附加费
     */

    @POST('bulkDelete')
    bulkDelete(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanAdditionalFeeService/GetAdditionalById
     * 根据id获取单条附加费
     */

    @GET('getAdditionalById')
    getAdditionalById(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanAdditionalFeeService/GetAdditionalFeeRelationBaseItem
     * 查询需要关联附加费的运价
     */

    @GET('getAdditionalFeeRelationBaseItem')
    getAdditionalFeeRelationBaseItem(
        @Payload
        _req: {id?:string,oceanId?:string,pOL?:string,pOLExcl?:boolean,vIA?:string,vIAExcl?:boolean,pOD?:string,pODExcl?:boolean,delivery?:string,deliveryExcl?:boolean,carrier?:string,carrierExcl?:boolean,itemCode?:string,itemCodeExcl?:boolean,comm?:string,commExcl?:boolean,term?:string,termExcl?:boolean,surCharge?:string,surChargeExcl?:boolean,description?:string,descriptionExcl?:boolean,isAll?:boolean,isEligibility?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanAdditionalFeeService/BindAdditionalFeeRelation
     * 需要绑定附加费的运价
     */

    @POST('bindAdditionalFeeRelation')
    bindAdditionalFeeRelation(
        @Payload
        _req:RatesOceanBindAdditionalFeeInput

    ): Observable<any> {
        return null as any
    }



  }
