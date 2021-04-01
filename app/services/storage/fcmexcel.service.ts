import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { STORAGEEsPageQueryInput,STORAGEFileDto,STORAGEPreShipmentExportInput,STORAGEGetShipmentListInput,STORAGEGetDeliveryInfoListInput,STORAGEImportDataRowDto1,STORAGEExportShippingOrdersInput,STORAGEImportResultDto1,STORAGEExportPackingListInput,STORAGEExportContainersInput } from './storage.types';

@BaseUrl('/STORAGE/FCMExcel')
@Injectable({ providedIn: 'root' })
export class STORAGEFCMExcelService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Storage/FCMExcel/BookingOrderExport
     * 电商委托单导出
     */

    @POST('BookingOrderExport')
    bookingOrderExport(
        @Payload
        _req:STORAGEEsPageQueryInput

    ): Observable<STORAGEFileDto> {
        return null as any
    }


    /**
     * @param url /Storage/FCMExcel/PreShipmentExport
     * 暂无备注
     */

    @POST('PreShipmentExport')
    preShipmentExport(
        @Payload
        _req:STORAGEPreShipmentExportInput

    ): Observable<STORAGEFileDto> {
        return null as any
    }


    /**
     * @param url /Storage/FCMExcel/ShipmentListExport
     * 已受理列表导出
     */

    @POST('ShipmentListExport')
    shipmentListExport(
        @Payload
        _req:STORAGEGetShipmentListInput

    ): Observable<STORAGEFileDto> {
        return null as any
    }


    /**
     * @param url /Storage/FCMExcel/DeliveryInfoListExport
     * 配送列表导出
     */

    @POST('DeliveryInfoListExport')
    deliveryInfoListExport(
        @Payload
        _req:STORAGEGetDeliveryInfoListInput

    ): Observable<STORAGEFileDto> {
        return null as any
    }


    /**
     * @param url /Storage/FCMExcel/ImportShippingOrders
     * 暂无备注
     */

    @FORM('ImportShippingOrders')
    importShippingOrders(
        @Payload
        _req: {file?:File} 

    ): Observable<STORAGEImportDataRowDto1<any>> {
        return null as any
    }


    /**
     * @param url /Storage/FCMExcel/ExportShippingOrders
     * 导出SO
     */

    @POST('ExportShippingOrders')
    exportShippingOrders(
        @Payload
        _req:STORAGEExportShippingOrdersInput

    ): Observable<STORAGEFileDto> {
        return null as any
    }


    /**
     * @param url /Storage/FCMExcel/ImportPackingList
     * 暂无备注
     */

    @FORM('ImportPackingList')
    importPackingList(
        @Payload
        _req: {businessId?:string,businessType?:number,tradeType?:number,isSave?:boolean,file?:File} 

    ): Observable<STORAGEImportResultDto1<any>> {
        return null as any
    }


    /**
     * @param url /Storage/FCMExcel/ExportPackingList
     * 导出装箱单
     */

    @POST('ExportPackingList')
    exportPackingList(
        @Payload
        _req:STORAGEExportPackingListInput

    ): Observable<STORAGEFileDto> {
        return null as any
    }


    /**
     * @param url /Storage/FCMExcel/ExportContainers
     * 导出集装箱
     */

    @POST('ExportContainers')
    exportContainers(
        @Payload
        _req:STORAGEExportContainersInput

    ): Observable<STORAGEFileDto> {
        return null as any
    }


    /**
     * @param url /Storage/FCMExcel/ImportContainers
     * 暂无备注
     */

    @FORM('ImportContainers')
    importContainers(
        @Payload
        _req: {shipmentId?:string,file?:File} 

    ): Observable<STORAGEImportDataRowDto1<any>> {
        return null as any
    }



  }
