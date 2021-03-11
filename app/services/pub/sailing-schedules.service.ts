import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBSailingSchedulesInput,PUBPagedResultDto1,PUBSailingSchedulesDto,PUBGetByVoyageDto,PUBSailingSchedulesDetailDto } from './pub.types';

@BaseUrl('/PUB/SailingSchedules')
@Injectable({ providedIn: 'root' })
export class PUBSailingSchedulesService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/SailingSchedules/SynchroVesselVoyageToICP3
     * 同步船，航次到ICP3
     */

    @POST('SynchroVesselVoyageToICP3')
    synchroVesselVoyageToICP3(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/SailingSchedules/QueryShippingETA
     * 查询船期ETA
     */

    @POST('QueryShippingETA')
    queryShippingETA(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/SailingSchedules/DownLoadInttraSailingScheduleDetail
     * 从inttra Api下载船期数据
     */

    @POST('DownLoadInttraSailingScheduleDetail')
    downLoadInttraSailingScheduleDetail(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/SailingSchedules/SaveSchedulesXmlToDataBase
     * 将Xml从Ftp服务获取下来再保存数据库
     */

    @POST('SaveSchedulesXmlToDataBase')
    saveSchedulesXmlToDataBase(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/SailingSchedules/DeleteSchedule
     * 删除超过15天的文件
     */

    @DELETE('DeleteSchedule')
    deleteSchedule(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/SailingSchedules/DeleteOldSchedule
     * 删除旧的船期数据
     */

    @DELETE('DeleteOldSchedule')
    deleteOldSchedule(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/SailingSchedules/QuerySailingSchedules
     * 查询船期数据
     */

    @POST('QuerySailingSchedules')
    querySailingSchedules(
        @Payload
        _req:PUBSailingSchedulesInput

    ): Observable<PUBPagedResultDto1<PUBSailingSchedulesDto>> {
        return null as any
    }


    /**
     * @param url /PUB/SailingSchedules/GetByVoyage
     * 根据船名航次获取ETD
     */

    @GET('GetByVoyage')
    getByVoyage(
        @Payload
        _req: {vesselName?:string,voyageNo?:string,carrierId?:string,polId?:string,podId?:string} 

    ): Observable<PUBGetByVoyageDto> {
        return null as any
    }


    /**
     * @param url /PUB/SailingSchedules/QuerySailingSchedulesDetail
     * 查询船期数据
     */

    @POST('QuerySailingSchedulesDetail')
    querySailingSchedulesDetail(
        @Payload
        _req:PUBSailingSchedulesInput

    ): Observable<PUBPagedResultDto1<PUBSailingSchedulesDetailDto>> {
        return null as any
    }



  }
