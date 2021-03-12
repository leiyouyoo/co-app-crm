import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBConfigureModel,PUBGetExchangeRateListInput,PUBQueryBankDirectAccountInfo,PUBQueryGLCodeInput,PUBGLCodeModel,PUBConfigure } from './pub.types';

@BaseUrl('/PUB/Configure')
@Injectable({ providedIn: 'root' })
export class PUBConfigureService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/Configure/GetAccountNoByBankShortNameList
     * 获取银行账户根据 银行短名
     */

    @GET('GetAccountNoByBankShortNameList')
    getAccountNoByBankShortNameList(
        @Payload
        _req: {shortName?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetAccountNoByCompany
     * 根据公司获取所有银行账号
     */

    @GET('GetAccountNoByCompany')
    getAccountNoByCompany(
        @Payload
        _req: {companyId?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetBankShortNameList
     * 获取简写公司列表
     */

    @GET('GetBankShortNameList')
    getBankShortNameList(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetBnakAccountList
     * 获取银行账户列表
     */

    @POST('GetBnakAccountList')
    getBnakAccountList(
        @Payload
        _req: {companyId?:string,shortName?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetCompanyListByShortName
     * 获取公司列表 根据银行短名
     */

    @POST('GetCompanyListByShortName')
    getCompanyListByShortName(
        @Payload
        _req: {shortName?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetCompayBank
     * 获取公司银行列表
     */

    @POST('GetCompayBank')
    getCompayBank(
        @Payload
        _req: {companyId?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetCompayBankByUser
     * 根据用户获取银行列表
     */

    @POST('GetCompayBankByUser')
    getCompayBankByUser(
        @Payload
        _req: {userId?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetConfigure
     * 暂无备注
     */

    @GET('GetConfigure')
    getConfigure(
        @Payload
        _req: {companyId?:string} 

    ): Observable<PUBConfigureModel> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetConfigureModelAsync
     * 获取公司配置信息
     */

    @POST('GetConfigureModelAsync')
    getConfigureModelAsync(
        @Payload
        _req: {companyId?:string} 

    ): Observable<PUBConfigureModel> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetConfigureBankAccountListAsync
     * 获取银行账号
     */

    @POST('GetConfigureBankAccountListAsync')
    getConfigureBankAccountListAsync(
        @Payload
        _req: {companyId?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetExchangeRateAsync
     * 获取汇率
     */

    @POST('GetExchangeRateAsync')
    getExchangeRateAsync(
        @Payload
        _req: {date?:string,sourceCurrency?:string,targetCurrency?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetExchangeRateListAsync
     * 获取汇率集合
     */

    @POST('GetExchangeRateListAsync')
    getExchangeRateListAsync(
        @Payload
        _req:PUBGetExchangeRateListInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetExchangeRateListAllByDatesAsync
     * 暂无备注
     */

    @POST('GetExchangeRateListAllByDatesAsync')
    getExchangeRateListAllByDatesAsync(
        @Payload
        _req:PUBGetExchangeRateListInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetExchangeRateListByDatesAsync
     * 获取汇率集合
     */

    @POST('GetExchangeRateListByDatesAsync')
    getExchangeRateListByDatesAsync(
        @Payload
        _req:PUBGetExchangeRateListInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetGLCodeListByUserAsync
     * 获取会计科目集合
     */

    @POST('GetGLCodeListByUserAsync')
    getGLCodeListByUserAsync(
        @Payload
        _req: {userId?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetSolutionGLConfigListByUserAsync
     * 获取会计科目集合
     */

    @POST('GetSolutionGLConfigListByUserAsync')
    getSolutionGLConfigListByUserAsync(
        @Payload
        _req: {userId?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetBankDirectByUserAsync
     * 获取银企直连信息
     */

    @POST('GetBankDirectByUserAsync')
    getBankDirectByUserAsync(
        @Payload
        _req: {userId?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetBankDirectModelAsync
     * 获取银企直连信息
     */

    @POST('GetBankDirectModelAsync')
    getBankDirectModelAsync(
        @Payload
        _req:PUBQueryBankDirectAccountInfo

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/UpBankDirectActnbrAsync
     * 更新银企直连账号信息
     */

    @POST('UpBankDirectActnbrAsync')
    upBankDirectActnbrAsync(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetGLCodeAsync
     * 获取会计科目
     */

    @POST('GetGLCodeAsync')
    getGLCodeAsync(
        @Payload
        _req:PUBQueryGLCodeInput

    ): Observable<PUBGLCodeModel> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetGLCodeListAsync
     * 获取会计科目集合
     */

    @POST('GetGLCodeListAsync')
    getGLCodeListAsync(
        @Payload
        _req: {companyId?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetSolutionGLConfigListAsync
     * 获取解决方案会计科目配置集合
     */

    @POST('GetSolutionGLConfigListAsync')
    getSolutionGLConfigListAsync(
        @Payload
        _req: {companyId?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetSolutionCurrencyListByCompany
     * 根据公司获取解决方案币种
     */

    @GET('GetSolutionCurrencyListByCompany')
    getSolutionCurrencyListByCompany(
        @Payload
        _req: {companyId?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetConfigureAsync
     * 获取公司配置
     */

    @GET('GetConfigureAsync')
    getConfigureAsync(
        @Payload
        _req: {companyId?:string} 

    ): Observable<PUBConfigure> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetAccountInfos
     * 暂无备注
     */

    @POST('GetAccountInfos')
    getAccountInfos(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetBankAccountList
     * 暂无备注
     */

    @POST('GetBankAccountList')
    getBankAccountList(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetConfigureListAsync
     * 获取公司配置列表
     */

    @POST('GetConfigureListAsync')
    getConfigureListAsync(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Configure/GetSolutionGLConfigListByCompanyIdsAsync
     * 暂无备注
     */

    @POST('GetSolutionGLConfigListByCompanyIdsAsync')
    getSolutionGLConfigListByCompanyIdsAsync(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
