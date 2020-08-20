import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPGetShipmentListInput,CSPShipmentListOutput,CSPPagedResultDto,CSPPubLocation,CSPListResultDto,CSPNameValueDto,CSPNetWorkLocationModel,CSPGetAllForProductOutput,CSPShipmentDetailOutput,CSPShipmentEventGroupDto,CSPCreateOrUpdateShipmentInput,CSPCloseShipmentInput,CSPShipmentOrderItemDto,CSPImportShipmentOrderItemsInput,CSPUpdatePostPortEstDateInput,CSPConditionItemAttribute,CSPShipmentsStatisticsOutput,CSPGetRelatedBusinessOutput, } from './csp.types';

@BaseUrl('/csp/Shipment')
@Injectable({ providedIn: 'root' })
export class CSPShipmentService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/Shipment/GetRouteDetailsByShipmentNo
     * (App端)游客模式 根据完整的箱号、提单号、PO、SKU获取运单的路线
     */

    @GET('getRouteDetailsByShipmentNo')
    getRouteDetailsByShipmentNo(
        @Payload
        _req: {searchKey?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetAllListForDashboard
     * Dashboard 运单列表全部(分页)
     */

    @POST('getAllListForDashboard')
    getAllListForDashboard(
        @Payload
        _req:CSPGetShipmentListInput

    ): Observable<CSPPagedResultDto<CSPShipmentListOutput>> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetAllList
     * 获取运单列表全部(分页)
     */

    @POST('getAllList')
    getAllList(
        @Payload
        _req:CSPGetShipmentListInput

    ): Observable<CSPPagedResultDto<CSPShipmentListOutput>> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetAllPortsForOthers
     * 提供已使用Ports数据源
     */

    @GET('getAllPortsForOthers')
    getAllPortsForOthers(
        @Payload
        _req: {isFromBooking?:boolean,isFromShipment?:boolean,isFromOrigin?:boolean,isFromDestination?:boolean} 

    ): Observable<CSPListResultDto<CSPPubLocation>> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetAllCompanyForOthers
     * 提供运单已使用的公司数据源
     */

    @GET('getAllCompanyForOthers')
    getAllCompanyForOthers(
        @Payload
        _req: {} 

    ): Observable<CSPListResultDto<CSPNameValueDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetAllLocationsForOthers
     * 提供已使用的Location数据源
     */

    @GET('getAllLocationsForOthers')
    getAllLocationsForOthers(
        @Payload
        _req: {isFromBooking?:boolean,isFromShipment?:boolean,isFromOrigin?:boolean,isFromDestination?:boolean} 

    ): Observable<CSPListResultDto<CSPNetWorkLocationModel>> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetAllForProduct
     * 根据 产品Id 获取正在运输此产品的全部运单
     */

    @GET('getAllForProduct')
    getAllForProduct(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPListResultDto<CSPGetAllForProductOutput>> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetShipmentDetail
     * 获取运单部分详情，主要是提供给账单中的 [ShipmentDetail] 选项卡
     */

    @GET('getShipmentDetail')
    getShipmentDetail(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPShipmentDetailOutput> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetDetail
     * 根据shipmentId获取详情
     */

    @GET('getDetail')
    getDetail(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPShipmentListOutput> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetEvents
     * 根据shipmentId获取事件详情
     */

    @GET('getEvents')
    getEvents(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPListResultDto<CSPShipmentEventGroupDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/CreateOrUpdateShipmentContainers
     * 批量新增或编辑运单箱
     */

    @POST('createOrUpdateShipmentContainers')
    createOrUpdateShipmentContainers(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/UpdatePostShipmentContainers
     * 更新港后运单箱
     */

    @POST('updatePostShipmentContainers')
    updatePostShipmentContainers(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/BatchCreateOrUpdate
     * 批量创建或编辑Shipment
     */

    @POST('batchCreateOrUpdate')
    batchCreateOrUpdate(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/CreateOrUpdate
     * 创建或编辑Shipment
     */

    @POST('createOrUpdate')
    createOrUpdate(
        @Payload
        _req:CSPCreateOrUpdateShipmentInput

    ): Observable<CSPShipmentListOutput> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/CloseShipment
     * 关闭 Shipment（可能是因为已完成或已取消）
     */

    @POST('closeShipment')
    closeShipment(
        @Payload
        _req:CSPCloseShipmentInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetShipmentOrderItems
     * 根据 ShipmentId 返回需要发货的PO信息
     */

    @GET('getShipmentOrderItems')
    getShipmentOrderItems(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPListResultDto<CSPShipmentOrderItemDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/ImportShipmentOrderItems
     * 提供给ICP 建立Shipment与POItem的关系
     */

    @POST('importShipmentOrderItems')
    importShipmentOrderItems(
        @Payload
        _req:CSPImportShipmentOrderItemsInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/BatchUpdatePostPortEstDate
     * 批量更新港后预估时间
     */

    @POST('batchUpdatePostPortEstDate')
    batchUpdatePostPortEstDate(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/UpdatePostPortEstDate
     * 更新港后预估时间
     */

    @POST('updatePostPortEstDate')
    updatePostPortEstDate(
        @Payload
        _req:CSPUpdatePostPortEstDateInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetCustomSubscriptionFilters
     * 获取自定义订阅的可选条件项
     */

    @GET('getCustomSubscriptionFilters')
    getCustomSubscriptionFilters(
        @Payload
        _req: {} 

    ): Observable<CSPListResultDto<CSPConditionItemAttribute>> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetFilters
     * 获取高级过滤条件项
     */

    @GET('getFilters')
    getFilters(
        @Payload
        _req: {} 

    ): Observable<CSPListResultDto<CSPConditionItemAttribute>> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetShipmentsStatistics
     * 获取shipment统计信息
     */

    @GET('getShipmentsStatistics')
    getShipmentsStatistics(
        @Payload
        _req: {withCount?:boolean} 

    ): Observable<CSPShipmentsStatisticsOutput> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetSubscriberUsers
     * 获取运单订阅者(默认显示本公司的订阅者username)
     */

    @GET('getSubscriberUsers')
    getSubscriberUsers(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPListResultDto<CSPNameValueDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GetRelatedBusiness
     * shipment业务对话获取相关的业务id（app端）
     */

    @GET('getRelatedBusiness')
    getRelatedBusiness(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPGetRelatedBusinessOutput> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/GenerateJob
     * 用于通过数据库脚本同步业务数据时，生成日程、航线信息
     */

    @POST('generateJob')
    generateJob(
        @Payload
        _req: {skipCount?:number,maxResultCount?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Shipment/CreateShipmentIm
     * 用于通过数据库脚本同步业务数据时，生成IM
     */

    @POST('createShipmentIm')
    createShipmentIm(
        @Payload
        _req: {skipCount?:number,maxResultCount?:number} 

    ): Observable<any> {
        return null as any
    }



  }
