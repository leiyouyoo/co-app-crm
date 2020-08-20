import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPScheduleDto,CSPListResultDto,CSPScheduleSentInput,CSPPagedResultDto, } from './csp.types';

@BaseUrl('/csp/Schedule')
@Injectable({ providedIn: 'root' })
export class CSPScheduleService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/Schedule/GetAllScheduleList
     * 根据条件获取日程包括自定义与shipment日程
     */

    @GET('getAllScheduleList')
    getAllScheduleList(
        @Payload
        _req: {searchMonthOrDay:string} 

    ): Observable<CSPListResultDto<CSPScheduleDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Schedule/Get
     * 根据Id获取详情
     */

    @GET('get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPScheduleDto> {
        return null as any
    }


    /**
     * @param url /CSP/Schedule/CreateAsync
     * 创建自定义日程
     */

    @POST('createAsync')
    createAsync(
        @Payload
        _req:CSPScheduleDto

    ): Observable<CSPScheduleDto> {
        return null as any
    }


    /**
     * @param url /CSP/Schedule/UpdateAsync
     * 编辑自定义日程
     */

    @PUT('updateAsync')
    updateAsync(
        @Payload
        _req:CSPScheduleDto

    ): Observable<CSPScheduleDto> {
        return null as any
    }


    /**
     * @param url /CSP/Schedule/Delete
     * 删除自定义日程
     */

    @DELETE('delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Schedule/ScheduleSent
     * 推送接口（定时调用）
     */

    @POST('scheduleSent')
    scheduleSent(
        @Payload
        _req:CSPScheduleSentInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Schedule/RemoveExpiredSchedule
     * 删除过期的日程-导入的数据（定时调用）
     */

    @DELETE('removeExpiredSchedule')
    removeExpiredSchedule(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Schedule/CreateOrUpdate
     * 保存
     */

    @POST('createOrUpdate')
    createOrUpdate(
        @Payload
        _req:CSPScheduleDto

    ): Observable<CSPScheduleDto> {
        return null as any
    }


    /**
     * @param url /CSP/Schedule/GetAll
     * 
     */

    @GET('getAll')
    getAll(
        @Payload
        _req: {sorting?:string,skipCount?:number,maxResultCount?:number} 

    ): Observable<CSPPagedResultDto<CSPScheduleDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Schedule/Create
     * 
     */

    @POST('create')
    create(
        @Payload
        _req:CSPScheduleDto

    ): Observable<CSPScheduleDto> {
        return null as any
    }


    /**
     * @param url /CSP/Schedule/Update
     * 
     */

    @PUT('update')
    update(
        @Payload
        _req:CSPScheduleDto

    ): Observable<CSPScheduleDto> {
        return null as any
    }



  }
