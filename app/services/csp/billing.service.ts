import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPUserIdentifier,CSPGetBillListInput,CSPBillOutput,CSPPagedResultDto,CSPListResultDto,CSPBillDto,CSPCoEntityDto,CSPChangeBillStatusInput,CSPConfirmBillsInput,CSPExportBillInput,CSPExportBillOutput,CSPSynchronizeBillsInput,CSPCreateOrUpdatePaymentRecordsInput,CSPPaymentRecordDto,CSPCreateOrUpdateChargeItemsInput,CSPChargeItemDto,CSPBankAccountDto,CSPCompanyBankAccountDto,CSPBillingStatisticsOutput,CSPBillExportInput,CSPGetInvoiceBillInput,CSPInvoiceBillOutput,CSPInvoiceChargeItemInputDto, } from './csp.types';

@BaseUrl('/CSP/Billing')
@Injectable({ providedIn: 'root' })
export class CSPBillingService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/Billing/CheckPermission
     * 测试 PermissionChecker
     */

    @POST('checkPermission')
    checkPermission(
        @Payload
        _req:CSPUserIdentifier

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/GetBillList
     * 分页获取账单列表
     */

    @POST('getBillList')
    getBillList(
        @Payload
        _req:CSPGetBillListInput

    ): Observable<CSPPagedResultDto<CSPBillOutput>> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/GetListByIds
     * 根据多个billingId获取对应详情
     */

    @POST('getListByIds')
    getListByIds(
        @Payload
        _req: {} 

    ): Observable<CSPListResultDto<CSPBillOutput>> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/GetBill
     * 获取账单详情
     */

    @GET('getBill')
    getBill(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPBillOutput> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/CreateOrUpdateBills
     * 批量创建或更新账单
     */

    @POST('createOrUpdateBills')
    createOrUpdateBills(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/CreateOrUpdateBill
     * 创建或更新账单
     */

    @POST('createOrUpdateBill')
    createOrUpdateBill(
        @Payload
        _req:CSPBillDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/DeleteBill
     * 删除账单
     */

    @POST('deleteBill')
    deleteBill(
        @Payload
        _req:CSPCoEntityDto<any>

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/ChangeBillStatus
     * 更新账单状态
     */

    @POST('changeBillStatus')
    changeBillStatus(
        @Payload
        _req:CSPChangeBillStatusInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/ConfirmBills
     * 确认账单
     */

    @POST('confirmBills')
    confirmBills(
        @Payload
        _req:CSPConfirmBillsInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/GetBillReport
     * Get Bill Report
     */

    @GET('getBillReport')
    getBillReport(
        @Payload
        _req: {token?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/ExportBill
     * 导出单个账单
     */

    @POST('exportBill')
    exportBill(
        @Payload
        _req:CSPExportBillInput

    ): Observable<CSPExportBillOutput> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/SynchronizeBills
     * 同步账单
     */

    @POST('synchronizeBills')
    synchronizeBills(
        @Payload
        _req:CSPSynchronizeBillsInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/CreateOrUpdatePaymentRecords
     * 批量创建或更新收费记录
     */

    @POST('createOrUpdatePaymentRecords')
    createOrUpdatePaymentRecords(
        @Payload
        _req:CSPCreateOrUpdatePaymentRecordsInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/CreateOrUpdatePaymentRecord
     * 创建或更新收费记录
     */

    @POST('createOrUpdatePaymentRecord')
    createOrUpdatePaymentRecord(
        @Payload
        _req:CSPPaymentRecordDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/DeletePaymentRecords
     * 批量删除支付记录
     */

    @POST('deletePaymentRecords')
    deletePaymentRecords(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/DeletePaymentRecord
     * 删除支付记录
     */

    @POST('deletePaymentRecord')
    deletePaymentRecord(
        @Payload
        _req:CSPCoEntityDto<any>

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/CreateOrUpdateChargeItems
     * 批量创建收费条目
     */

    @POST('createOrUpdateChargeItems')
    createOrUpdateChargeItems(
        @Payload
        _req:CSPCreateOrUpdateChargeItemsInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/CreateOrUpdateChargeItem
     * 创建或更新收费项
     */

    @POST('createOrUpdateChargeItem')
    createOrUpdateChargeItem(
        @Payload
        _req:CSPChargeItemDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/DeleteChargeItems
     * 批量删除收费条目
     */

    @POST('deleteChargeItems')
    deleteChargeItems(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/DeleteChargeItem
     * 删除收费条目
     */

    @POST('deleteChargeItem')
    deleteChargeItem(
        @Payload
        _req:CSPCoEntityDto<any>

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/GetBankAccount
     * 获取银行账户
     */

    @GET('getBankAccount')
    getBankAccount(
        @Payload
        _req: {billId?:string} 

    ): Observable<CSPListResultDto<CSPBankAccountDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/GetCompanyBankAccountList
     * 获取银行账户（发票使用）
     */

    @GET('getCompanyBankAccountList')
    getCompanyBankAccountList(
        @Payload
        _req: {companyId?:string} 

    ): Observable<CSPListResultDto<CSPCompanyBankAccountDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/GetCompanyBankAccount
     * 获取银行账户（发票使用）
     */

    @GET('getCompanyBankAccount')
    getCompanyBankAccount(
        @Payload
        _req: {companyId?:string} 

    ): Observable<CSPCompanyBankAccountDto> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/GetBillingsStatistics
     * 获取Billings统计信息
     */

    @GET('getBillingsStatistics')
    getBillingsStatistics(
        @Payload
        _req: {} 

    ): Observable<CSPBillingStatisticsOutput> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/Export
     * 账单导出
     */

    @POST('export')
    export(
        @Payload
        _req:CSPBillExportInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/GetInvoiceBillList
     * 查询未开票账单
     */

    @POST('getInvoiceBillList')
    getInvoiceBillList(
        @Payload
        _req:CSPGetInvoiceBillInput

    ): Observable<CSPPagedResultDto<CSPInvoiceBillOutput>> {
        return null as any
    }


    /**
     * @param url /CSP/Billing/GetInvoiceChargeItems
     * 根据账单及币种获取汇总费用项
     */

    @POST('getInvoiceChargeItems')
    getInvoiceChargeItems(
        @Payload
        _req:CSPInvoiceChargeItemInputDto

    ): Observable<any> {
        return null as any
    }



  }
