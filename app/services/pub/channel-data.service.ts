import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBChannelDataCreateUpdateDto,PUBChannelDataDto,PUBChannelDataCheckDto,PUBPagedResultDto1 } from './pub.types';

@BaseUrl('/PUB/ChannelData')
@Injectable({ providedIn: 'root' })
export class PUBChannelDataService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/ChannelData/CreateOrUpdate
     * 保存渠道
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBChannelDataCreateUpdateDto

    ): Observable<PUBChannelDataDto> {
        return null as any
    }


    /**
     * @param url /PUB/ChannelData/Check
     * 校验重复性数据
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBChannelDataCheckDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/ChannelData/Delete
     * 删除渠道
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/ChannelData/Get
     * 获取渠道实体
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBChannelDataDto> {
        return null as any
    }


    /**
     * @param url /PUB/ChannelData/GetAll
     * 获取渠道列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {freightMethodType?:number,channelGroupStr?:string,fbaFreightMethodId?:string,isTaxIncluded?:boolean,channelId?:string,ids?:any[],keyName?:string,searchText?:string,includeDeleted?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<PUBPagedResultDto1<PUBChannelDataDto>> {
        return null as any
    }



  }
