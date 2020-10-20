import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPInvoiceTitleListDto,CSPPagedResultDto,CSPCreateInvoicceTitleDto,CSPGetInvoiceListDto,CSPInvoiceListDto,CSPCreateOrUpdateInvoiceDto,CSPUpdateInvoiceStatusDto,CSPInvoiceDetailsDto,CSPUpdateInvoiceItemStatusDto,CSPCreateOrUpdateForIcpDto,CSPAttachmentListDto,CSPListResultDto,CSPMailLocationModel,CSPGetInvoiceAddressDto, } from './csp.types';

@BaseUrl('/CSP/Invoice')
@Injectable({ providedIn: 'root' })
export class CSPInvoiceService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/Invoice/GetInvoiceTitleList
     * 获取抬头列表
     */

    @GET('getInvoiceTitleList')
    getInvoiceTitleList(
        @Payload
        _req: {searchKeyWord?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CSPPagedResultDto<CSPInvoiceTitleListDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/CreateOrUpdateInvoiceTitle
     * 新增/编辑抬头
     */

    @POST('createOrUpdateInvoiceTitle')
    createOrUpdateInvoiceTitle(
        @Payload
        _req:CSPCreateInvoicceTitleDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/DeleteInvoiceTitle
     * 删除抬头
     */

    @DELETE('deleteInvoiceTitle')
    deleteInvoiceTitle(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/InvoiceTitleSetDefault
     * 设置为默认
     */

    @GET('invoiceTitleSetDefault')
    invoiceTitleSetDefault(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/GetInvoiceList
     * 获取开票列表
     */

    @POST('getInvoiceList')
    getInvoiceList(
        @Payload
        _req:CSPGetInvoiceListDto

    ): Observable<CSPPagedResultDto<CSPInvoiceListDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/CreateOrUpdateInvoice
     * 新增/编辑开票
     */

    @POST('createOrUpdateInvoice')
    createOrUpdateInvoice(
        @Payload
        _req:CSPCreateOrUpdateInvoiceDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/UpdateInvoiceStatus
     * 更新开票状态
     */

    @POST('updateInvoiceStatus')
    updateInvoiceStatus(
        @Payload
        _req:CSPUpdateInvoiceStatusDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/GetInvoice
     * 获取开票详情
     */

    @GET('getInvoice')
    getInvoice(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPInvoiceDetailsDto> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/UpdateInvoiceItemStatus
     * ICP更新发票状态
     */

    @POST('updateInvoiceItemStatus')
    updateInvoiceItemStatus(
        @Payload
        _req:CSPUpdateInvoiceItemStatusDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/CreateOrUpdateForIcp
     * ICP创建或更新开票，只更新费用票金额
     */

    @POST('createOrUpdateForIcp')
    createOrUpdateForIcp(
        @Payload
        _req:CSPCreateOrUpdateForIcpDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/GetFiles
     * 获取发票附件
     */

    @GET('getFiles')
    getFiles(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPListResultDto<CSPAttachmentListDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/DownLoadFile
     * 下载文件pdf
     */

    @POST('downLoadFile')
    downLoadFile(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/GetMaxInvoiceAmount
     * 获取最大开票额度(人民币)
     */

    @GET('getMaxInvoiceAmount')
    getMaxInvoiceAmount(
        @Payload
        _req: {companyId?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/GetMailLocations
     * 获取邮寄地址列表
     */

    @GET('getMailLocations')
    getMailLocations(
        @Payload
        _req: {} 

    ): Observable<CSPListResultDto<CSPMailLocationModel>> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/GetAddressList
     * 获取邮寄地址
     */

    @POST('getAddressList')
    getAddressList(
        @Payload
        _req:CSPGetInvoiceAddressDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/CreateOrUpdateAddress
     * 新增/编辑邮寄地址
     */

    @POST('createOrUpdateAddress')
    createOrUpdateAddress(
        @Payload
        _req:CSPMailLocationModel

    ): Observable<CSPMailLocationModel> {
        return null as any
    }


    /**
     * @param url /CSP/Invoice/GetCurrencyAsync
     * 发票获取币种（美元，人民币）
     */

    @GET('getCurrencyAsync')
    getCurrencyAsync(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
