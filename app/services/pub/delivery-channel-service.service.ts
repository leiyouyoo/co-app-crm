import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBDeliveryChannelDto,PUBListResultDto1 } from './pub.types';

@BaseUrl('/PUB/DeliveryChannelService')
@Injectable({ providedIn: 'root' })
export class PUBDeliveryChannelService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/DeliveryChannelService/CreateOrUpdate
     * 创建或添加数据
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBDeliveryChannelDto

    ): Observable<PUBDeliveryChannelDto> {
        return null as any
    }


    /**
     * @param url /PUB/DeliveryChannelService/Delete
     * 删除数据
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/DeliveryChannelService/Get
     * 获取详细数据
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBDeliveryChannelDto> {
        return null as any
    }


    /**
     * @param url /PUB/DeliveryChannelService/Check
     * 验证名称重复
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBDeliveryChannelDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/DeliveryChannelService/GetAll
     * 根据条件查询列表数据
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {name?:string,tradeType?:number,isTaxIncluded?:boolean,isValid?:boolean} 

    ): Observable<PUBListResultDto1<PUBDeliveryChannelDto>> {
        return null as any
    }



  }
