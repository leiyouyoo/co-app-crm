 
    /**
     * 片区Dto
     */
    export class PUBAreaDto {
        [key:string]: any;
        
         
            /* 片区名称-英文 */ 
            name: string;
         
            /* 片区名称-本地化 */ 
            nameLocalization?: string;
         
            /* 直接RegionId */ 
            regionIds?: any[];
         
            /* 直接Region名称-本地化 */ 
            regionNames?: any[];
         
            /* 片区包含或所属国家 */ 
            countryIds?: any[];
         
            /* 中文名称 */ 
            chineseName?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBListResultDto1<T> {
        [key:string]: any;
        
         
            
            items?: T[];
        
        
    }
 
    /**
     * 片区重复校验-传输对象模型
     */
    export class PUBAreaCheckDto {
        [key:string]: any;
        
         
            /* 名称 */ 
            name?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * GetAllAreaForUiPickerInput
     */
    export class PUBGetAllAreaForUiPickerInput {
        [key:string]: any;
        
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     * AreaUiPickerDto
     */
    export class PUBAreaUiPickerDto {
        [key:string]: any;
        
         
            /* 片区名称 */ 
            name?: string;
         
            /* 片区名称-本地化 */ 
            nameLocalization?: string;
         
            /* 直接RegionId */ 
            regionIds?: any[];
         
            /* 直接Region名称-本地化 */ 
            regionNames?: any[];
         
            /* 片区包含或所属国家 */ 
            countryIds?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBPagedResultDto1<T> {
        [key:string]: any;
        
         
            
            totalCount?: number;
         
            
            items?: T[];
        
        
    }
 
    /**
     * 过滤条件
     */
    export class PUBGetAllForUiPickerInput {
        [key:string]: any;
        
         
            /* 是否含税 */ 
            isTaxIncluded?: boolean;
         
            /* 主要运输方式
0 = NotSet
1 = Ocean
2 = Air
3 = Rail
4 = MultiModal
5 = Express
6 = Truck */ 
            transportationMode?: number;
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChannelUiPickerDto {
        [key:string]: any;
        
         
            /* 显示名称 */ 
            name?: string;
         
            /* 本地化显示名称 */ 
            localizationName?: string;
         
            /* 是否含税 */ 
            isTaxIncluded?: boolean;
         
            /* 主要运输方式
0 = NotSet
1 = Ocean
2 = Air
3 = Rail
4 = MultiModal
5 = Express
6 = Truck */ 
            transportationMode?: number;
         
            /* 尾程运输方式
0 = NotSet
1 = Ocean
2 = Air
3 = Rail
4 = MultiModal
5 = Express
6 = Truck */ 
            postTransportationMode?: number;
         
            
            localizationText?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 渠道添加修改DTO
     */
    export class PUBChannelDataCreateUpdateDto {
        [key:string]: any;
        
         
            /* 本地化 */ 
            localizationText?: string;
         
            /* 运输模式
0 = Unknown
1 = Ocean
2 = Air */ 
            freightMethodType?: number;
         
            /* 渠道名称 */ 
            channelGroupStr?: string;
         
            /* 运输方式ID */ 
            fbaFreightMethodId?: string;
         
            /* 是否含税 */ 
            isTaxIncluded?: boolean;
         
            /* 渠道公司ID
1、美森快船;2、海派;3、海卡;4、南航直飞;5、香港飞;6、北京飞;7、韩国飞 */ 
            channelId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 渠道DTO
     */
    export class PUBChannelDataDto {
        [key:string]: any;
        
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 本地化 */ 
            localizationText?: string;
         
            /* 运输模式
0 = Unknown
1 = Ocean
2 = Air */ 
            freightMethodType?: number;
         
            /* 渠道名称 */ 
            channelGroupStr?: string;
         
            /* 运输方式ID */ 
            fbaFreightMethodId?: string;
         
            /* 运输方式 */ 
            fbaFreightMethodValue?: string;
         
            /* 是否含税 */ 
            isTaxIncluded?: boolean;
         
            /* 渠道公司ID
1、美森快船;2、海派;3、海卡;4、南航直飞;5、香港飞;6、北京飞;7、韩国飞 */ 
            channelId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 渠道重复校验-传输对象模型
     */
    export class PUBChannelDataCheckDto {
        [key:string]: any;
        
         
            /* 名称 */ 
            channelGroupStr?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChargingCodeDto {
        [key:string]: any;
        
         
            /* 费用组Id */ 
            groupId?: string;
         
            /* 费用代码 */ 
            code?: string;
         
            /* 费用名称 */ 
            name?: string;
         
            /* 是否佣金 */ 
            isCommission?: boolean;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 是特殊费用（特殊费用名称：profit\cuf，新增提示：是否加到baseport rates? 。
默认加到base,可以勾选不添加到基本港费用。）
0 = OtherCharging
1 = ManagerCharging */ 
            type?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChangeChargingCodeStateInput {
        [key:string]: any;
        
         
            
            id: string;
         
            
            isValid: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetAllChargingCodeForUiPickerInput {
        [key:string]: any;
        
         
            /* 分组Id */ 
            groupId?: string;
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChargingCodeUiPickerDto {
        [key:string]: any;
        
         
            /* 费用组Id */ 
            groupId?: string;
         
            /* 费用代码 */ 
            code?: string;
         
            /* 费用名称 */ 
            name?: string;
         
            /* 是否佣金 */ 
            isCommission?: boolean;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 是特殊费用（特殊费用名称：profit\cuf，新增提示：是否加到baseport rates? 。
默认加到base,可以勾选不添加到基本港费用。）
0 = OtherCharging
1 = ManagerCharging */ 
            type?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     * 品名管理
     */
    export class PUBCommodityDto {
        [key:string]: any;
        
         
            /* 名称 */ 
            name: string;
         
            /* 本地化名称 */ 
            localizationName?: string;
         
            /* 备注 */ 
            remark?: string;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 子集Md */ 
            children?: any[];
         
            /* 父Id */ 
            parentId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 品名校验
     */
    export class PUBCommodityCheckInputDto {
        [key:string]: any;
        
         
            /* 校验类型 
公共类型：不校验 0； 与校验 1； 或校验 2； 
自定义类型：校验Name 3；
0 = NoCheck
1 = AndCheck
2 = OrCheck
3 = Name */ 
            checkType: number;
         
            /* 名称 */ 
            name: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetAllCommodityForUiPickerInput {
        [key:string]: any;
        
         
            /* 是否包含子级 */ 
            includeChildren?: boolean;
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBCommodityUiPickerDto {
        [key:string]: any;
        
         
            /* 名称 */ 
            name?: string;
         
            /* 本地化名称 */ 
            localizationName?: string;
         
            /* 备注 */ 
            remark?: string;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 子集Md */ 
            children?: any[];
         
            /* 父Id */ 
            parentId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBCompayBankAccountDto {
        [key:string]: any;
        
         
            /* 显示名称 */ 
            showName?: string;
         
            
            companyName?: string;
         
            
            companyId?: string;
         
            /* 银行名称 */ 
            bankName?: string;
         
            /* 银行账户 */ 
            bankAccountNo?: string;
         
            /* 账户Id */ 
            acocuntNoId?: string;
         
            /* 银行ID */ 
            bankId?: string;
         
            /* 币种 */ 
            currency?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBOrganizationUnitDto {
        [key:string]: any;
        
         
            
            name?: string;
         
            
            displayName?: string;
         
            
            fullName?: string;
         
            
            localizationText?: string;
         
            
            tenantId?: number;
         
            
            isValid?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBCompanyBankDto {
        [key:string]: any;
        
         
            
            accountNo?: string;
         
            
            showName?: string;
         
            
            companyName?: string;
         
            
            companyId?: string;
         
            /* 银行名称 */ 
            bankName?: string;
         
            /* 银行ID */ 
            bankId?: string;
         
            /* 币种 */ 
            currency?: string;
        
        
    }
 
    /**
     * 会计科目
     */
    export class PUBGLCodeModel {
        [key:string]: any;
        
         
            /* 主键 */ 
            id?: string;
         
            /* 财务解决方案Id */ 
            solutionId?: string;
         
            /* 公司Id */ 
            companyId?: string;
         
            /* 会计科目组Id */ 
            glGroupId?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 名称 */ 
            name?: string;
         
            /* 本地化 */ 
            localizationText?: string;
         
            
            remark?: string;
         
            /* 流程费用报销 */ 
            isFee?: boolean;
         
            /* 分组名称 */ 
            glGroupName?: string;
         
            /* 外币币种 */ 
            foreignCurrency?: string;
        
        
    }
 
    /**
     * 解决方案会计科目配置
     */
    export class PUBSolutionGLConfigModel {
        [key:string]: any;
        
         
            /* 主键 */ 
            id?: string;
         
            /* 财务解决方案Id */ 
            solutionId?: string;
         
            /* 公司Id */ 
            companyId?: string;
         
            /* Required
类型 */ 
            type?: number;
         
            /* 费用项目Id */ 
            chargingCodeId?: string;
         
            /* Required, Max length = 10
币种 */ 
            currency?: string;
         
            /* Required
应收会计科目ID */ 
            drglCodeId?: string;
         
            /* Required
应付会计科目ID */ 
            crglCodeId?: string;
        
        
    }
 
    /**
     * 解决方案可用币种
     */
    export class PUBSolutionCurrencyModel {
        [key:string]: any;
        
         
            /* 主键 */ 
            id?: string;
         
            /* 财务解决方案Id */ 
            solutionId?: string;
         
            /* 币种 */ 
            currency?: string;
         
            
            companyId?: string;
        
        
    }
 
    /**
     * 银行帐号
     */
    export class PUBConfigureBankAccountModel {
        [key:string]: any;
        
         
            /* Identity, Indexed, Required
主键 */ 
            id?: string;
         
            /* 公司Id */ 
            companyId?: string;
         
            /* Required
银行ID */ 
            configureBankId?: string;
         
            /* Required, Max length = 30
账号 */ 
            accountNo?: string;
         
            /* Required, Max length = 10
币种 */ 
            currency?: string;
         
            /* 会计科目ID */ 
            glId?: string;
         
            /* Required
是否对公账号 */ 
            isOpen?: boolean;
         
            /* Required, Default value = true
是否有效 */ 
            isValid?: boolean;
        
        
    }
 
    /**
     * 公司配置
     */
    export class PUBConfigureModel {
        [key:string]: any;
        
         
            /* 主键 */ 
            id?: string;
         
            /* 公司Id */ 
            companyId?: string;
         
            /* Required
客户ID */ 
            customerId?: string;
         
            /* 财务解决方案Id */ 
            solutionId?: string;
         
            /* Required, Max length = 10
本位币 */ 
            standardCurrency?: string;
         
            /* Required, Max length = 10
默认币种 */ 
            defaultCurrency?: string;
         
            /* 签发地ID */ 
            issuePlaceId?: string;
         
            /* Max length = 10
公司缩写代码 */ 
            shortCode?: string;
         
            
            glCodes?: PUBGLCodeModel[];
         
            
            solutionGlConfigs?: PUBSolutionGLConfigModel[];
         
            
            solutionCurrencies?: PUBSolutionCurrencyModel[];
         
            
            configureBankAccounts?: PUBConfigureBankAccountModel[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetExchangeRateListInput {
        [key:string]: any;
        
         
            /* 
0 = Default
1 = Invoice
2 = ARAP */ 
            type?: number;
         
            
            dates?: any[];
         
            
            date?: string;
        
        
    }
 
    /**
     * 汇率
     */
    export class PUBExchangeRateModel {
        [key:string]: any;
        
         
            /* Identity, Indexed, Required
主键 */ 
            id?: string;
         
            /* Required
类型
0 = Default
1 = Invoice
2 = ARAP */ 
            type?: number;
         
            /* Required, Max length = 10
源币种 */ 
            sourceCurrency?: string;
         
            /* Required, Max length = 10
目标币种 */ 
            targetCurrency?: string;
         
            /* Required
有效期-从 */ 
            fromDate?: string;
         
            /* Required
有效期-到 */ 
            toDate?: string;
         
            /* Required
汇率 */ 
            rate?: number;
         
            /* Required
是否有效 */ 
            isValid?: boolean;
        
        
    }
 
    /**
     * 银企直连信息
     */
    export class PUBConfigureBankDirectDto {
        [key:string]: any;
        
         
            /* 银行名 */ 
            bankName?: string;
         
            /* 币种 */ 
            currency?: string;
         
            /* 公司ID */ 
            companyId?: string;
         
            /* 是否支持银企直连 */ 
            isBankDirect?: boolean;
         
            /* 招商银行账户 */ 
            cmbBankAccountNo?: string;
         
            /* 银行账户Id */ 
            cmbAccountId?: string;
         
            /* 账户名称 */ 
            cmbBankAccountName?: string;
         
            /* 一网通账户ID */ 
            cmbNetComUserAccount?: string;
         
            /* CMB银企直连户口号 */ 
            cmbDirectActnbr?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBQueryBankDirectAccountInfo {
        [key:string]: any;
        
         
            /* 公司ID */ 
            companyId?: string;
         
            /* 银行账户ID */ 
            bankAccountId?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBUpBankDirectActnbrInput {
        [key:string]: any;
        
         
            
            companyId?: string;
         
            
            bankAccountId?: string;
         
            
            cmbDirectActnbr?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBQueryGLCodeInput {
        [key:string]: any;
        
         
            
            companyId?: string;
         
            
            currency?: string;
         
            
            type?: number;
         
            
            isReceivable?: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBConfigureBank {
        [key:string]: any;
        
         
            
            configureId: string;
         
            
            shortName: string;
         
            
            name: string;
         
            
            isValid: boolean;
         
            
            tenantId: number;
         
            
            address?: string;
         
            
            localizationText?: string;
         
            
            remark?: string;
         
            
            voidDate?: string;
         
            
            configuresBankAccounts?: any[];
         
            
            configure?: PUBConfigure;
         
            
            isDeleted?: boolean;
         
            
            deleterUserId?: number;
         
            
            deletionTime?: string;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBConfigure2Solution {
        [key:string]: any;
        
         
            
            configureId: string;
         
            
            solutionId: string;
         
            
            tenantId: number;
         
            
            solution?: PUBSolution;
         
            
            configure?: PUBConfigure;
         
            
            isDeleted?: boolean;
         
            
            deleterUserId?: number;
         
            
            deletionTime?: string;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBConfigure {
        [key:string]: any;
        
         
            
            companyId: string;
         
            
            customerId: string;
         
            
            standardCurrency: string;
         
            
            defaultCurrency: string;
         
            
            tenantId: number;
         
            
            cmbNetComUserAccount?: string;
         
            
            isActivateBankDirect?: boolean;
         
            
            issuePlaceId?: string;
         
            
            shortCode?: string;
         
            
            configuresBanks?: PUBConfigureBank[];
         
            
            configure2Solutions?: PUBConfigure2Solution[];
         
            
            isDeleted?: boolean;
         
            
            deleterUserId?: number;
         
            
            deletionTime?: string;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBConfiguresBankAccount {
        [key:string]: any;
        
         
            
            configureBankId: string;
         
            
            accountNo: string;
         
            
            currency: string;
         
            
            isOpen: boolean;
         
            
            isValid: boolean;
         
            
            tenantId: number;
         
            
            cmbNetComUserAccount?: string;
         
            
            isCMBankDirect?: boolean;
         
            
            cmbDirectActnbr?: string;
         
            
            glId?: string;
         
            
            voidDate?: string;
         
            
            configuresBank?: PUBConfigureBank;
         
            
            isDeleted?: boolean;
         
            
            deleterUserId?: number;
         
            
            deletionTime?: string;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBSolution {
        [key:string]: any;
        
         
            /* 
0 = Bussiness
1 = Finance */ 
            type: number;
         
            
            name: string;
         
            /* 
0 = CreateTime
1 = BussinessTime */ 
            invoiceDateType: number;
         
            
            isAccountingShare: boolean;
         
            
            isValid: boolean;
         
            
            tenantId: number;
         
            
            creatorUserCache?: object;
         
            
            remark?: string;
         
            
            voidTime?: string;
         
            
            localizationText?: string;
         
            
            solution2Currencies?: any[];
         
            
            solutionGLConfigs?: any[];
         
            
            solution2ChargingCodeGroups?: any[];
         
            
            configure2Solutions?: any[];
         
            
            glCodes?: any[];
         
            
            isDeleted?: boolean;
         
            
            deleterUserId?: number;
         
            
            deletionTime?: string;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBSolution2Currency {
        [key:string]: any;
        
         
            
            solutionId: string;
         
            
            currency: string;
         
            
            tenantId: number;
         
            
            creatorUserCache?: object;
         
            
            solution?: PUBSolution;
         
            
            isDeleted?: boolean;
         
            
            deleterUserId?: number;
         
            
            deletionTime?: string;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBSolutionGLConfig {
        [key:string]: any;
        
         
            
            solutionId: string;
         
            
            type: number;
         
            
            currency: string;
         
            
            drglCodeId: string;
         
            
            crglCodeId: string;
         
            
            isValid: boolean;
         
            
            tenantId: number;
         
            
            chargingCodeCache?: object;
         
            
            drglCodeCache?: object;
         
            
            crglCodeCache?: object;
         
            
            creatorUserCache?: object;
         
            
            chargingCodeId?: string;
         
            
            companyId?: string;
         
            
            voidTime?: string;
         
            
            solution?: PUBSolution;
         
            
            isDeleted?: boolean;
         
            
            deleterUserId?: number;
         
            
            deletionTime?: string;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBSolution2ChargingCodeGroup {
        [key:string]: any;
        
         
            
            solutionId: string;
         
            
            chargingCodeGroupId: string;
         
            
            isAgent: boolean;
         
            
            tenantId: number;
         
            
            solution?: PUBSolution;
         
            
            chargingCodeGroup?: PUBChargingGroup;
         
            
            isDeleted?: boolean;
         
            
            deleterUserId?: number;
         
            
            deletionTime?: string;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGLCode {
        [key:string]: any;
        
         
            
            solutionId: string;
         
            
            code: string;
         
            
            name: string;
         
            
            isPub: boolean;
         
            
            isValid: boolean;
         
            
            tenantId: number;
         
            
            fullName?: string;
         
            
            fullId?: string;
         
            
            levelCode?: string;
         
            
            level?: number;
         
            
            parent?: PUBGLCode;
         
            
            children?: any[];
         
            
            creatorUserCache?: object;
         
            
            glGroupId?: string;
         
            
            localizationText?: string;
         
            
            remark?: string;
         
            /* 
1 = Assets
2 = Debt
3 = Rights
4 = Costs
5 = ProfitAndLoss
6 = Cost
7 = Income */ 
            glCodeType?: number;
         
            /* 
1 = Amount
2 = ForeignCurrencyAmount
3 = NumberAmount
4 = NumberForeignCurrencyAmount */ 
            ledgerStyle?: number;
         
            /* 
1 = Debit
2 = Credit */ 
            glCodeProperty?: number;
         
            
            isForeignCheck?: boolean;
         
            
            foreignCurrency?: string;
         
            
            isFee?: boolean;
         
            
            isDepartmentCheck?: boolean;
         
            
            isPersonalCheck?: boolean;
         
            
            isCustomerCheck?: boolean;
         
            
            isBankAccount?: boolean;
         
            
            parentId?: string;
         
            
            companyId?: string;
         
            
            isNumberCheck?: boolean;
         
            
            unitName?: string;
         
            
            isJournal?: boolean;
         
            
            voidTime?: string;
         
            
            solution?: PUBSolution;
         
            
            glGroup?: PUBGLGroup;
         
            
            isDeleted?: boolean;
         
            
            deleterUserId?: number;
         
            
            deletionTime?: string;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChargingGroup {
        [key:string]: any;
        
         
            
            code?: string;
         
            
            name?: string;
         
            
            type?: number;
         
            
            fullName?: string;
         
            
            fullId?: string;
         
            
            levelCode?: string;
         
            
            level?: number;
         
            
            parent?: PUBChargingGroup;
         
            
            parentId?: string;
         
            
            children?: any[];
         
            
            chargingCodes?: any[];
         
            
            solution2ChargingCodeGroups?: any[];
         
            
            localizationText?: string;
         
            
            id?: string;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            deletionTime?: string;
         
            
            deleterUserId?: number;
         
            
            isDeleted?: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGLGroup {
        [key:string]: any;
        
         
            
            code: string;
         
            
            tenantId: number;
         
            
            fullName?: string;
         
            
            fullId?: string;
         
            
            levelCode?: string;
         
            
            level?: number;
         
            
            parent?: PUBGLGroup;
         
            
            children?: any[];
         
            
            creatorUserCache?: object;
         
            
            type?: number;
         
            
            parentId?: string;
         
            
            name?: string;
         
            
            localizationText?: string;
         
            
            remark?: string;
         
            
            glCodes?: any[];
         
            
            id?: string;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            deletionTime?: string;
         
            
            deleterUserId?: number;
         
            
            isDeleted?: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChargingCode {
        [key:string]: any;
        
         
            
            groupId?: string;
         
            
            group?: PUBChargingGroup;
         
            
            code?: string;
         
            
            name?: string;
         
            
            isCommission?: boolean;
         
            
            mergerId?: string;
         
            
            isValid?: boolean;
         
            /* 
0 = OtherCharging
1 = ManagerCharging */ 
            type?: number;
         
            
            localizationText?: string;
         
            
            id?: string;
         
            
            creationTime?: string;
         
            
            creatorUserId?: number;
         
            
            lastModificationTime?: string;
         
            
            lastModifierUserId?: number;
         
            
            deletionTime?: string;
         
            
            deleterUserId?: number;
         
            
            isDeleted?: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBBankAccountInfoDto {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            accountNo?: string;
         
            
            currency?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBBankAccountModel {
        [key:string]: any;
        
         
            /* 公司Id */ 
            companyId?: string;
         
            /* 公司名称 */ 
            companyName?: string;
         
            /* 银行ID */ 
            bankId?: string;
         
            /* 银行名称 */ 
            bankName?: string;
         
            /* 账户Id */ 
            bankAccountId?: string;
         
            /* 银行账户 */ 
            bankAccountNo?: string;
         
            /* 币种 */ 
            currency?: string;
         
            /* 会计科目Id */ 
            glId?: string;
         
            /* 客户Id */ 
            customerId?: string;
         
            /* 显示名称 */ 
            showName?: string;
        
        
    }
 
    /**
     * 箱型管理
     */
    export class PUBContainerDto {
        [key:string]: any;
        
         
            /* 代码 */ 
            code: string;
         
            /* 国际标准代码 */ 
            isoCode: string;
         
            /* 箱量 */ 
            teu: number;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 描述 MaxLength(500) */ 
            desc?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* ISO */ 
            iso?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBContainerGroupDto {
        [key:string]: any;
        
         
            /* 箱型分组名 */ 
            groupName?: string;
         
            /* 箱型集合 */ 
            containers?: any[];
        
        
    }
 
    /**
     * 箱型校验
     */
    export class PUBContainerCheckInputDto {
        [key:string]: any;
        
         
            /* 校验类型
公共类型：不校验 0； 与校验 1； 或校验 2； 
自定义类型：校验Code 3； 校验ISOCode 4； 校验ISO 5；
0 = NoCheck
1 = AndCheck
2 = OrCheck
3 = Code
4 = ISOCode
5 = ISO */ 
            checkType: number;
         
            /* 代码 */ 
            code?: string;
         
            /* 国际标准代码 */ 
            isoCode?: string;
         
            /* 箱量 */ 
            teu?: number;
         
            /* ISO */ 
            iso?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChangeContainerStateInput {
        [key:string]: any;
        
         
            
            id: string;
         
            
            isValid: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetAllContainerForUiPickerInput {
        [key:string]: any;
        
         
            /* 箱型代码 */ 
            code?: string;
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBContainerUiPickerDto {
        [key:string]: any;
        
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 国际标准代码 */ 
            isoCode?: string;
         
            /* 描述 MaxLength(500) */ 
            desc?: string;
         
            /* 箱量 */ 
            teu?: number;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* ISO */ 
            iso?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 查询箱动态数据
     */
    export class PUBQueryContainerDto {
        [key:string]: any;
        
         
            /* 箱号列表 */ 
            containerNos?: any[];
         
            /* 船名 */ 
            vesselName?: string;
         
            /* 航次 */ 
            voyageNo?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBFCMContainerDynamicDto {
        [key:string]: any;
        
         
            
            containerID?: string;
         
            
            containerNo?: string;
         
            /* 实际从起始地提柜时间 */ 
            actualPickupUpDate?: string;
         
            /* 还重柜时间(重柜到达起运港) */ 
            fullReturnedDate?: string;
         
            /* 实际从起始港出发时间(装船) */ 
            actualDepartureDate?: string;
         
            /* 实际到达目的港时间 */ 
            actualArrivalDate?: string;
         
            /* 实际到达目的地后的交货时间 */ 
            actualDeliveryDate?: string;
         
            /* 空柜归还至目的港日期 */ 
            emptyReturnedDate?: string;
        
        
    }
 
    /**
     * 费用代码-传输对象模型
     */
    export class PUBCostItemDto {
        [key:string]: any;
        
         
            /* 费用代码 */ 
            code: string;
         
            /* 费用代码名称 */ 
            name: string;
         
            /* 费用名称-本地化 */ 
            nameLocalization?: string;
         
            /* 是否包含佣金 */ 
            property?: boolean;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 上级Id */ 
            parentId?: string;
         
            /* 子集 */ 
            children?: any[];
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 费用代码重复校验-传输对象模型
     */
    export class PUBCostItemCheckDto {
        [key:string]: any;
        
         
            /* 费用代码 */ 
            code: string;
         
            /* 费用名称 */ 
            name: string;
         
            /* 上级Id */ 
            parentId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 费用代码扁平列表
     */
    export class PUBCostItemFlatDto {
        [key:string]: any;
        
         
            /* 费用代码 */ 
            code?: string;
         
            
            name?: string;
         
            
            fullName?: string;
         
            
            fullId?: string;
         
            
            levelCode?: string;
         
            
            level?: number;
         
            
            parentId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 区县镇
     */
    export class PUBCountyDto {
        [key:string]: any;
        
         
            /* 地区名称-英文 */ 
            name: string;
         
            /* 地区代码 */ 
            code?: string;
         
            /* 地区名称-本地化 */ 
            nameLocalization?: string;
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 国家名称 */ 
            countryName?: string;
         
            /* 省份Id */ 
            provinceId?: string;
         
            /* 省份 */ 
            provinceName?: string;
         
            /* 城市Id */ 
            placeId?: string;
         
            /* 城市名称 */ 
            placeName?: string;
         
            /* 经度 */ 
            longitude?: string;
         
            /* 纬度 */ 
            latitude?: string;
         
            /* 备注 */ 
            remark?: string;
         
            /* 上级Id */ 
            parentId?: string;
         
            /* 子集 */ 
            children?: any[];
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 币种管理
     */
    export class PUBCurrencyDto {
        [key:string]: any;
        
         
            /* 国家Id */ 
            regionId: string;
         
            /* 币种代码 */ 
            code: string;
         
            /* 币种名称 */ 
            name: string;
         
            /* 币种名称-本地化 */ 
            nameLocalization?: string;
         
            /* 国家名称 */ 
            regionName?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 币种重复校验-传输对象模型
     */
    export class PUBCurrencyCheckDto {
        [key:string]: any;
        
         
            /* 币种代码 */ 
            code: string;
         
            /* 币种名称 */ 
            name: string;
         
            /* 校验类型 - Code|Name
0 = All
1 = Code
2 = Name */ 
            type?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChangeCurrencyStateInput {
        [key:string]: any;
        
         
            
            id: string;
         
            
            isValid: boolean;
        
        
    }
 
    /**
     * 币种列表
     */
    export class PUBCurrencyUiPickerDto {
        [key:string]: any;
        
         
            /* 币种代码 */ 
            code: string;
         
            /* 币种名称 */ 
            name: string;
         
            /* 币种名称-本地化 */ 
            nameLocalization?: string;
         
            /* 国家名称 */ 
            regionName?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBExchange {
        [key:string]: any;
        
         
            
            fromCurrencyId?: string;
         
            
            toCurrencyId?: string;
         
            
            exchangeRate?: number;
        
        
    }
 
    /**
     * 数据字典-传输对象模型
     */
    export class PUBDataDictionaryDto {
        [key:string]: any;
        
         
            /* 类型Id */ 
            typeId: string;
         
            /* 字典代码 */ 
            code: string;
         
            /* 字典名称 */ 
            name?: string;
         
            /* 描述 */ 
            description?: string;
         
            /* 字典名称-本地化 */ 
            nameLocalization?: string;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            
            isValid?: boolean;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 数据值 */ 
            value?: string;
         
            /* 显示名 */ 
            displayName?: string;
         
            /* 上级别数据 */ 
            parentId?: string;
         
            /* 扩展属性 */ 
            extensionData?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 数据字典重复校验-传输对象模型
     */
    export class PUBDataDictionaryCheckDto {
        [key:string]: any;
        
         
            /* 字典类型 */ 
            typeId: string;
         
            /* 代码 */ 
            code: string;
         
            /* 名称 */ 
            name: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChangeDataDictionnaryStateInput {
        [key:string]: any;
        
         
            
            id: string;
         
            
            isValid: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetAllDataDictionaryForUiPickerInput {
        [key:string]: any;
        
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            /* 类型Id */ 
            typeIds?: any[];
         
            /* 类型代码 */ 
            typeCodes?: any[];
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBDataDictionaryUiPickerDto {
        [key:string]: any;
        
         
            /* 类型Id */ 
            typeId?: string;
         
            /* 类型代码 */ 
            typeCode?: string;
         
            /* 字典代码 */ 
            code?: string;
         
            /* 字典名称 */ 
            name?: string;
         
            /* 描述 */ 
            description?: string;
         
            /* 字典名称-本地化 */ 
            nameLocalization?: string;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 获取配置数据列表
     */
    export class PUBGetListByInput {
        [key:string]: any;
        
         
            
            typeId?: string;
         
            
            typeCode?: string;
         
            
            code?: string;
         
            
            name?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBDeliveryChannelDto {
        [key:string]: any;
        
         
            /* 渠道名称 */ 
            name: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 渠道名称-本地化 */ 
            localizationText?: string;
         
            /* 贸易类型 */ 
            tradeType?: number;
         
            /* 是否收税 */ 
            isTaxIncluded?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     * 字典类型-传输对象模型
     */
    export class PUBDictionaryTypeDto {
        [key:string]: any;
        
         
            /* 类型代码 */ 
            code: string;
         
            /* 类型名称 */ 
            name: string;
         
            /* 地区名称-本地化 */ 
            nameLocalization?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 描述 */ 
            description?: string;
         
            /* 备注 */ 
            remark?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 数据字典类型重复校验-传输对象模型
     */
    export class PUBDictionaryTypeCheckDto {
        [key:string]: any;
        
         
            /* 名称 */ 
            name: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 汇率模型
     */
    export class PUBExchangeRateDto {
        [key:string]: any;
        
         
            /* 类型
0 = Default
1 = Invoice
2 = ARAP */ 
            type: number;
         
            /* 源币种 */ 
            sourceCurrency: string;
         
            /* 目标币种 */ 
            targetCurrency: string;
         
            /* 有效期-从 */ 
            fromDate: string;
         
            /* 有效期-到 */ 
            toDate: string;
         
            /* 汇率 */ 
            rate: number;
         
            /* 是否有效 */ 
            isValid: boolean;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBEntityDto1<T> {
        [key:string]: any;
        
         
            
            id?: string;
        
        
    }
 
    /**
     * 运输方式DTO
     */
    export class PUBFbaFreightMethodDto {
        [key:string]: any;
        
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 本地化 */ 
            localizationText?: string;
         
            /* 运输方式 */ 
            value?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 运输方式重复校验-传输对象模型
     */
    export class PUBFbaFreightMethodCheckDto {
        [key:string]: any;
        
         
            /* 运输方式 */ 
            value?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 航班管理
     */
    export class PUBFlightDto {
        [key:string]: any;
        
         
            /* 航空公司ID */ 
            airlineId: string;
         
            /* 航班号 */ 
            no: string;
         
            /* 创建人姓名 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     * 航班校验
     */
    export class PUBFlightCheckInputDto {
        [key:string]: any;
        
         
            /* 校验类型
公共类型：不校验 0； 与校验 1； 或校验 2； 
自定义类型：校验No 3；
0 = NoCheck
1 = AndCheck
2 = OrCheck
3 = No */ 
            checkType: number;
         
            /* 航班号 */ 
            no?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetAllFlightForUiPickerInput {
        [key:string]: any;
        
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            /* 航空公司 Id */ 
            airlineIds?: any[];
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBFlightUiPickerDto {
        [key:string]: any;
        
         
            /* 创建人姓名 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 航空公司ID */ 
            airlineId?: string;
         
            /* 航空公司名称 */ 
            airlineName?: string;
         
            /* 航班号 */ 
            no?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     * 会计科目模型
     */
    export class PUBGLCodeDto {
        [key:string]: any;
        
         
            /* 财务解决方案ID */ 
            solutionId: string;
         
            /* 代码 */ 
            code: string;
         
            /* 名称 */ 
            name: string;
         
            /* 是否为公共科目 */ 
            isPub: boolean;
         
            /* 会计科目组ID */ 
            glGroupId?: string;
         
            /* 名称本地化 */ 
            nameLocalization?: string;
         
            /* 备注 */ 
            remark?: string;
         
            /* 科目类型(1:资产;2:负债;3:权益;4:成本;5:损益;6:费用;7:收入 )
1 = Assets
2 = Debt
3 = Rights
4 = Costs
5 = ProfitAndLoss
6 = Cost
7 = Income */ 
            glCodeType?: number;
         
            /* 帐页格式(1:金额式;2:外币金额式;3:数量金额式;4:数量式外币)
1 = Amount
2 = ForeignCurrencyAmount
3 = NumberAmount
4 = NumberForeignCurrencyAmount */ 
            ledgerStyle?: number;
         
            /* 科目性质(余额方向)1:借方;2:贷方
1 = Debit
2 = Credit */ 
            glCodeProperty?: number;
         
            /* 外币核算 */ 
            isForeignCheck?: boolean;
         
            /* 外币币种 */ 
            foreignCurrency?: string;
         
            /* 是否部门核算 */ 
            isDepartmentCheck?: boolean;
         
            /* 是否个人核算 */ 
            isPersonalCheck?: boolean;
         
            /* 是否客户往来 */ 
            isCustomerCheck?: boolean;
         
            /* 辅助核算 */ 
            aidCheckDescription?: string;
         
            /* 流程费用报销 */ 
            isFee?: boolean;
         
            /* 银行帐 */ 
            isBankAccount?: boolean;
         
            /* 父节点 */ 
            parentId?: string;
         
            /* 公司 */ 
            companyId?: string;
         
            /* 数量核算 */ 
            isNumberCheck?: boolean;
         
            /* 计量单位 */ 
            unitName?: string;
         
            /* 日记帐 */ 
            isJournal?: boolean;
         
            /* 层级 */ 
            level?: number;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 子集 */ 
            children?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     * 设置分组输入参数
     */
    export class PUBGLCodeSetGroupInput {
        [key:string]: any;
        
         
            /* 分组Id */ 
            groupId: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 设置公司输入参数
     */
    export class PUBGLCodeSetCompanyInput {
        [key:string]: any;
        
         
            /* 分组Id */ 
            companyId: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 会计科目分组模型
     */
    export class PUBGLGroupDto {
        [key:string]: any;
        
         
            /* 地区名称-英文 */ 
            name: string;
         
            /* 类型 */ 
            type?: number;
         
            /* 地区代码 */ 
            code?: string;
         
            /* 地区名称-本地化 */ 
            nameLocalization?: string;
         
            /* 上级Id */ 
            parentId?: string;
         
            /* 层级 */ 
            level?: number;
         
            /* Max length = 200
备注 */ 
            remark?: string;
         
            /* 子集 */ 
            children?: any[];
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 地点-传输对象模型
     */
    export class PUBPlaceDto {
        [key:string]: any;
        
         
            /* 地点代码-维护 */ 
            code: string;
         
            /* 地点名称-维护 */ 
            name: string;
         
            /* 地区Id-维护 */ 
            regionId: string;
         
            /* 地点名称-本地化-维护 */ 
            nameLocalization?: string;
         
            /* 是否海运-维护 */ 
            isOcean?: boolean;
         
            /* 是否空运-维护 */ 
            isAir?: boolean;
         
            /* 是否铁路-维护 */ 
            isRail?: boolean;
         
            /* 其它-维护 */ 
            isOther?: boolean;
         
            /* 是否城市-维护 */ 
            isCity?: boolean;
         
            /* 经度-维护 */ 
            longitude?: string;
         
            /* 纬度-维护 */ 
            latitude?: string;
         
            /* 备注-维护 */ 
            remark?: string;
         
            /* 城市Id-维护 */ 
            cityId?: string;
         
            /* 是否有效-维护 */ 
            isValid?: boolean;
         
            /* 国家ID */ 
            countryId?: string;
         
            /* 地区名称-列表显示 */ 
            regionName?: string;
         
            /* 全称 */ 
            fullName?: string;
         
            /* 全称-本地化 */ 
            fullNameLocalization?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 中文名称 */ 
            chineseName?: string;
         
            /* ICP用户 */ 
            icpUserId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 获取列表-传输对象模型
     */
    export class PUBGetPlaceListByRegionsInput {
        [key:string]: any;
        
         
            /* 城市id */ 
            placeId?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 地区Id */ 
            regionIds?: any[];
         
            /* 是否海运 */ 
            isOcean?: boolean;
         
            /* 是否空运 */ 
            isAir?: boolean;
         
            /* 是海运港或空运港 */ 
            isAirOrOcean?: boolean;
         
            /* 其它 */ 
            isOther?: boolean;
         
            /* 是否为城市 */ 
            isCity?: boolean;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 是否分页 */ 
            isPaged?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     * 港口或区县Dto
     */
    export class PUBPlaceOrCountyDto {
        [key:string]: any;
        
         
            /* 0为place,1为Country区县 */ 
            type?: number;
         
            /* 地点代码 */ 
            code?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 地点名称-本地化 */ 
            nameLocalization?: string;
         
            /* 多语言 */ 
            localizationText?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 地点重复性校验-传输对象模型
     */
    export class PUBPlaceCheckDto {
        [key:string]: any;
        
         
            /* 地点代码 */ 
            code: string;
         
            /* 名称 */ 
            name: string;
         
            /* 本地语言 */ 
            localName?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChangePlaceStateInput {
        [key:string]: any;
        
         
            
            id: string;
         
            
            isValid: boolean;
         
            
            icpUserId?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBPlaceMapTerm {
        [key:string]: any;
        
         
            
            long_name?: string;
         
            
            short_name?: string;
         
            
            types?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetPlaceMapInput {
        [key:string]: any;
        
         
            
            address_components?: PUBPlaceMapTerm[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBPlaceView {
        [key:string]: any;
        
         
            
            countryId?: string;
         
            
            countryName?: string;
         
            
            countryLocalizationText?: string;
         
            
            provinceId?: string;
         
            
            provinceName?: string;
         
            
            provinceLocalizationText?: string;
         
            
            cityId?: string;
         
            
            cityName?: string;
         
            
            cityLocalizationText?: string;
         
            
            countyId?: string;
         
            
            countyName?: string;
         
            
            countyLocalizationText?: string;
         
            
            streetId?: string;
         
            
            streetName?: string;
         
            
            streetLocalizationText?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBFromToDto {
        [key:string]: any;
        
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 名称 */ 
            name?: string;
         
            /* 名称-本地化 */ 
            nameLocalization?: string;
         
            /* 全称 */ 
            fullName?: string;
         
            /* 全称-本地化 */ 
            fullNameLocalization?: string;
         
            /* 多语言 */ 
            localizationText?: string;
         
            /* 邮政编码 */ 
            zipCode?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBPlaceModel {
        [key:string]: any;
        
         
            
            name?: string;
         
            
            placeId?: string;
         
            
            placeName?: string;
         
            
            regionId?: string;
         
            
            regionName?: string;
         
            
            countryId?: string;
         
            
            countryName?: string;
         
            
            areaId?: string;
         
            
            areaName?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBRegionWithLevelUiPickerDto {
        [key:string]: any;
        
         
            /* 地区代码 */ 
            code?: string;
         
            /* 地区名称-英文 */ 
            name?: string;
         
            /* 上级Id */ 
            parentId?: string;
         
            /* 地区名称-本地化 */ 
            nameLocalization?: string;
         
            /* 子集 */ 
            children?: any[];
         
            /* 是否包含查询对象 */ 
            isContainKeyword?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     * 根据港口Id获取港口信息(含逆向检索省州片区)
     */
    export class PUBGetByPortIdsOutput {
        [key:string]: any;
        
         
            /* 港口 */ 
            places?: PUBPlaceModel[];
         
            /* 区域 */ 
            regions?: PUBRegionWithLevelUiPickerDto[];
         
            /* 片区 */ 
            areas?: PUBAreaDto[];
        
        
    }
 
    /**
     * 根据城市信息返回港口数据
     */
    export class PUBGetPortByCityInput {
        [key:string]: any;
        
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 谷歌地图place_id */ 
            placeId?: string;
         
            /* 谷歌地点明细 */ 
            placeName?: string;
         
            /* 是否返回Data，如果为false，则Data为null */ 
            returnData?: boolean;
        
        
    }
 
    /**
     * 根据城市信息返回港口数据
     */
    export class PUBGetPortByCityDto {
        [key:string]: any;
        
         
            /* 是否有值 */ 
            hasData?: boolean;
         
            /* 港口数据 */ 
            data?: PUBPlaceDto[];
        
        
    }
 
    /**
     * 地点UI选择器
     */
    export class PUBGetAllPlaceForUiPickerInput {
        [key:string]: any;
        
         
            /* 地区Id */ 
            regionIds?: any[];
         
            /* 城市Id */ 
            cityIds?: any[];
         
            /* 是否海运 */ 
            isOcean?: boolean;
         
            /* 是否空运 */ 
            isAir?: boolean;
         
            /* 是海运港或空运港 */ 
            isAirOrOcean?: boolean;
         
            /* 其它 */ 
            isOther?: boolean;
         
            /* 是否为城市 */ 
            isCity?: boolean;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 是否分页 */ 
            isPaged?: boolean;
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBPlaceUiPickerDto {
        [key:string]: any;
        
         
            /* 地点代码 */ 
            code?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 地点名称-本地化 */ 
            nameLocalization?: string;
         
            /* 地区Id */ 
            regionId?: string;
         
            /* 地区名称-列表显示 */ 
            regionName?: string;
         
            /* 是否海运 */ 
            isOcean?: boolean;
         
            /* 是否空运 */ 
            isAir?: boolean;
         
            /* 其它 */ 
            isOther?: boolean;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 树形地区-传输对象模型
     */
    export class PUBRegionDto {
        [key:string]: any;
        
         
            /* 地区名称-英文 */ 
            name: string;
         
            /* 地区代码 */ 
            code?: string;
         
            /* 地区名称-本地化 */ 
            nameLocalization?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 上级Id */ 
            parentId?: string;
         
            /* 层级 */ 
            level?: number;
         
            /* 子集 */ 
            children?: any[];
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 中文名称 */ 
            chineseName?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetByAreaInput {
        [key:string]: any;
        
         
            /* 片区id */ 
            areaIds?: any[];
         
            /* 是否递归取所有下级 */ 
            recursive?: boolean;
        
        
    }
 
    /**
     * 地区重复校验-传输对象模型
     */
    export class PUBRegionCheckDto {
        [key:string]: any;
        
         
            /* 上级Id */ 
            parentId?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 名称 */ 
            name?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 国家UI组件过滤
     */
    export class PUBGetAllCountryForUiPickerInput {
        [key:string]: any;
        
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            /* 是否包含子对象数据 */ 
            includeChildren?: boolean;
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBCountryUiPickerDto {
        [key:string]: any;
        
         
            /* 地区名称-英文 */ 
            name: string;
         
            /* 地区代码 */ 
            code?: string;
         
            /* 地区名称-本地化 */ 
            nameLocalization?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 上级Id */ 
            parentId?: string;
         
            /* 子集 */ 
            children?: any[];
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 地区（省份）UI组件过滤
     */
    export class PUBGetAllRegionForUiPickerInput {
        [key:string]: any;
        
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            /* 是否包含子对象数据 */ 
            includeChildren?: boolean;
         
            /* 国家Id */ 
            countryIds?: any[];
         
            /* 地区Id */ 
            areaIds?: any[];
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBRegionUiPickerDto {
        [key:string]: any;
        
         
            /* 地区名称-英文 */ 
            name: string;
         
            /* 地区代码 */ 
            code?: string;
         
            /* 地区名称-本地化 */ 
            nameLocalization?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 上级Id */ 
            parentId?: string;
         
            /* 子集 */ 
            children?: any[];
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBQueryShippingETADto {
        [key:string]: any;
        
         
            
            oceanBookingsId?: string;
         
            
            oceanBookingNo?: string;
         
            
            vesselName?: string;
         
            
            voyageNo?: string;
         
            
            carrierCode?: string;
         
            
            eta?: string;
         
            
            etd?: string;
         
            /* 装货 */ 
            polCode?: string;
         
            /* 卸货 */ 
            podCode?: string;
         
            
            receiveEmail?: string;
        
        
    }
 
    /**
     * 传入参数
     */
    export class PUBSailingSchedulesInput {
        [key:string]: any;
        
         
            /* 起始港代码 */ 
            origPortId: string;
         
            /* 目的港代码 */ 
            destPortId: string;
         
            /* 船公司代码 */ 
            carrierCode: any[];
         
            /* 离港日期 */ 
            etd?: string;
         
            /* 到港日期 */ 
            eta?: string;
         
            /* 添加几周的日期 */ 
            week?: number;
         
            /* 是否重试 */ 
            isRetry?: boolean;
         
            /* 是否直航0全部，1直航，2不是直航
0 = All
1 = Direct
2 = NotDirect */ 
            isDirect?: number;
         
            
            filter?: string;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBSailingSchedulesDto {
        [key:string]: any;
        
         
            /* 图片网址 */ 
            imageUrl?: string;
         
            /* 船东代码 */ 
            carrierCode?: string;
         
            /* 船期和航次 */ 
            vesselVoyage?: string;
         
            /* 起始港名称 */ 
            originPortName?: string;
         
            /* 中途经过的港口 */ 
            portOfPass?: any[];
         
            /* 目的港名称 */ 
            destinationPortName?: string;
         
            /* 到港日期 */ 
            eta?: string;
         
            /* 离港日期 */ 
            etd?: string;
         
            /* IMO */ 
            imo?: string;
         
            /* 航程 */ 
            transitTime?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetByVoyageDto {
        [key:string]: any;
        
         
            /* 船名 */ 
            vesselName?: string;
         
            /* 航次号 */ 
            voyageNo?: string;
         
            /* 离港日 */ 
            etd?: string;
         
            /* 到港日 */ 
            eta?: string;
        
        
    }
 
    /**
     * 船期详情数据Dto
     */
    export class PUBSailingSchedulesDetailDto {
        [key:string]: any;
        
         
            /* 船东代码  inttra */ 
            inttraCarrierCode?: string;
         
            /* 船东代码 */ 
            carrierCode?: string;
         
            /* 服务名称 */ 
            serviceName?: string;
         
            /* 截关日 */ 
            terminalCutoff?: string;
         
            /* 可以向承运人预订的最晚日期 */ 
            bkCutoffDate?: string;
         
            /* 可以创建装箱指令的最晚日期 */ 
            siCutoffDate?: string;
         
            /* 可向承运人预订危险货物的最新日期/时间 */ 
            hazBkCutoffDate?: string;
         
            /* VGM可以发送给承运人的最新日期/时间 */ 
            vgmCutoffDate?: string;
         
            /* 可向承运人预订温控货物的最新日期/时间 */ 
            reeferCutoffDate?: string;
         
            /* 船名 */ 
            vesselName?: string;
         
            /* 船次 */ 
            voyageNo?: string;
         
            /* IMO */ 
            imo?: string;
         
            /* 原点Code */ 
            originUnCode?: string;
         
            /* 起始港 名称 本地化 */ 
            originNameLocalization?: string;
         
            /* 始发位置城市名称 */ 
            originCityName?: string;
         
            /* 始发位置省份 */ 
            originSubdivision?: string;
         
            /* 始发位置国家 */ 
            originCountry?: string;
         
            /* 始发码头名称 */ 
            originTerminal?: string;
         
            /* 出发日期 */ 
            departureDate?: string;
         
            /* 终点Code */ 
            destinationUnCode?: string;
         
            /* 目的地港 名称 本地化 */ 
            destinationNameLocalization?: string;
         
            /* 目的地位置的城市名称 */ 
            destinationCityName?: string;
         
            /* 目的地位置的省/自治区名称 */ 
            destinationSubdivision?: string;
         
            /* 目的地港所在国家 */ 
            destinationCountry?: string;
         
            /* 目的地港口码头名称 */ 
            destinationTerminal?: string;
         
            /* 到达日期 */ 
            arrivalDate?: string;
         
            /* 航程 */ 
            transitTime?: number;
         
            /* 航次类型 Mainline 主干线  Branchline转运支线 */ 
            conveyanceType?: string;
         
            /* 航线类型  Notransport没有转运线，transport有转运 */ 
            scheduleType?: string;
         
            /* 转运顺序 如果是有转运，则从初始港开始 */ 
            transportSeq?: number;
         
            /* 航线编号，作为api中一条航线，以及支线的记录 */ 
            scheduleNumber?: string;
         
            /* 船公司图片 */ 
            carrierImageUrl?: string;
         
            /* 转运支线集合 从出发港-终点港 */ 
            transports?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     * 转运线
     */
    export class PUBtransportDto {
        [key:string]: any;
        
         
            /* 船名 */ 
            vesselName?: string;
         
            /* 船次 */ 
            voyageNo?: string;
         
            /* IMO */ 
            imo?: string;
         
            /* 原点Code */ 
            originUnCode?: string;
         
            /* 起始港 名称 本地化 */ 
            originNameLocalization?: string;
         
            /* 始发位置城市名称 */ 
            originCityName?: string;
         
            /* 始发位置省份 */ 
            originSubdivision?: string;
         
            /* 始发位置国家 */ 
            originCountry?: string;
         
            /* 始发码头名称 */ 
            originTerminal?: string;
         
            /* 出发日期 */ 
            departureDate?: string;
         
            /* 终点Code */ 
            destinationUnCode?: string;
         
            /* 目的地港 名称 本地化 */ 
            destinationNameLocalization?: string;
         
            /* 目的地位置的城市名称 */ 
            destinationCityName?: string;
         
            /* 目的地位置的省/自治区名称 */ 
            destinationSubdivision?: string;
         
            /* 目的地港所在国家 */ 
            destinationCountry?: string;
         
            /* 目的地港口码头名称 */ 
            destinationTerminal?: string;
         
            /* 到达日期 */ 
            arrivalDate?: string;
         
            /* 航程 */ 
            transitTime?: number;
         
            /* 航次类型 Mainline 主干线  Branchline转运支线 */ 
            conveyanceType?: string;
         
            /* 转运顺序 如果是有转运，则从初始港开始 */ 
            transportSeq?: number;
         
            /* 航线编号，作为api中一条航线，以及支线的记录 */ 
            scheduleNumber?: string;
         
            /* 转运运输工具名称 */ 
            transportName?: string;
         
            /* 转运运输方式 */ 
            transportType?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 航线管理
     */
    export class PUBShippingLineDto {
        [key:string]: any;
        
         
            /* 代码 */ 
            code: string;
         
            /* 名称 */ 
            name: string;
         
            /* 创建人姓名 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 本地化名称 */ 
            localizationName?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 子集Md */ 
            children?: any[];
         
            /* 父Id */ 
            parentId?: string;
         
            /* 中文名称 */ 
            chineseName?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 航线校验
     */
    export class PUBShippingLineCheckInputDto {
        [key:string]: any;
        
         
            /* 校验类型 
公共类型：不校验 0； 与校验 1； 或校验 2； 
自定义类型：校验Code 3； 校验Name 4；
0 = NoCheck
1 = AndCheck
2 = OrCheck
3 = Code
4 = Name */ 
            checkType: number;
         
            /* 名称 */ 
            name: string;
         
            /* 代码 */ 
            code?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChangeShippingLineStateInput {
        [key:string]: any;
        
         
            
            id: string;
         
            
            isValid: boolean;
        
        
    }
 
    /**
     * 国家航线关系Dto
     */
    export class PUBCountryReationShippingDto {
        [key:string]: any;
        
         
            /* 国家Id */ 
            countryId: string;
         
            /* 航线Id */ 
            shippingLineId: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 港口航线关系Dto
     */
    export class PUBPortReationCountryDto {
        [key:string]: any;
        
         
            /* 港口 */ 
            portId: string;
         
            /* 航线 */ 
            shippingLineId: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetAllShippingLineForUiPickerInput {
        [key:string]: any;
        
         
            /* 是否包含子级 */ 
            includeChildren?: boolean;
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBShippingLineUiPickerDto {
        [key:string]: any;
        
         
            /* 名称 */ 
            name?: string;
         
            /* 本地化名称 */ 
            localizationName?: string;
         
            /* Code */ 
            code?: string;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 子集Md */ 
            children?: any[];
         
            /* 父Id */ 
            parentId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 根据港口获取航线
     */
    export class PUBShippingLinesByPortDto {
        [key:string]: any;
        
         
            /* 港口集合 */ 
            portIds?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBShippingLinesDto {
        [key:string]: any;
        
         
            
            name?: string;
         
            
            code?: string;
         
            
            isValid?: boolean;
         
            
            localizationText?: string;
         
            
            localizationName?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 解决方案模型
     */
    export class PUBSolutionDto {
        [key:string]: any;
        
         
            /* 类型
0 = Bussiness
1 = Finance */ 
            type: number;
         
            /* 名称 */ 
            name: string;
         
            /* 账单日期类型（0建立时间、1业务时间）
0 = CreateTime
1 = BussinessTime */ 
            invoiceDateType: number;
         
            /* 是否财务共享 */ 
            isAccountingShare: boolean;
         
            /* Required
是否有效 */ 
            isValid: boolean;
         
            /* 本地化名称 */ 
            nameLocalization?: string;
         
            /* 备注 */ 
            remark?: string;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBSolutionCurrencyDto {
        [key:string]: any;
        
         
            /* Required
解决方案Id */ 
            solutionId: string;
         
            /* Required, Max length = 10
币种 */ 
            currency: string;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBSolutionGLConfigDto {
        [key:string]: any;
        
         
            /* 解决方案Id */ 
            solutionId: string;
         
            /* 类型：1	费用项目; 2	主营业务收入; 3	预收预付; 4	代收代付; 5	汇兑损益; 6	当年改单科目; 7	上年改单科目; 8	上年之前改单科目; 9	当期净利润; 10 留存收益; 11 应收应付; 12	佣金(业务管理成本); 13	内部往来; 14	手续费; */ 
            type: number;
         
            /* 币种 */ 
            currency: string;
         
            /* 应收会计科目Id */ 
            drglCodeId: string;
         
            /* 应付会计科目Id */ 
            crglCodeId: string;
         
            /* 费用项目Id */ 
            chargingCodeId?: string;
         
            /* 费用项目名称 */ 
            chargingCodeName?: string;
         
            /* 应收会计科目代码 */ 
            drglCode?: string;
         
            /* 应付会计科目代码 */ 
            crglCode?: string;
         
            /* 所属公司(比如 主营业务收入，广州，深圳不同) */ 
            companyId?: string;
         
            /* 是否作废 */ 
            isValid?: boolean;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 运输条款-传输对象模型
     */
    export class PUBTransportClauseDto {
        [key:string]: any;
        
         
            /* 起始地类型 */ 
            originalId: string;
         
            /* 目的地类型 */ 
            destinationId: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 描述 */ 
            description?: string;
         
            /* 起始地类型 */ 
            originalName?: string;
         
            /* 目的地类型 */ 
            destinationName?: string;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 运输条款重复校验-传输对象模型
     */
    export class PUBTransportClauseCheckDto {
        [key:string]: any;
        
         
            /* 起始地 */ 
            originalId?: string;
         
            /* 目的地 */ 
            destinationId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBChangeTransportClauseStateInput {
        [key:string]: any;
        
         
            
            id: string;
         
            
            isValid: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetAllTransportClauseForUiPickerInput {
        [key:string]: any;
        
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBTransportClauseUiPickerDto {
        [key:string]: any;
        
         
            /* 起始地类型 */ 
            originalId?: string;
         
            /* 目的地类型 */ 
            destinationId?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 描述 */ 
            description?: string;
         
            /* 起始地类型 */ 
            originalName?: string;
         
            /* 目的地类型 */ 
            destinationName?: string;
         
            /* 创建人 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 船名管理
     */
    export class PUBVesselDto {
        [key:string]: any;
        
         
            /* 代码 */ 
            code: string;
         
            /* 名称 */ 
            name: string;
         
            /* 船东ID */ 
            carrierId: string;
         
            /* 船的注册国家 */ 
            registration: string;
         
            /* IMO编号 */ 
            imoNumber: string;
         
            
            unCode: string;
         
            /* 创建人姓名 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     * 船名校验
     */
    export class PUBVesselCheckInputDto {
        [key:string]: any;
        
         
            /* 校验类型 
公共类型：不校验 0； 与校验 1； 或校验 2； 
自定义类型：校验Code 3； 校验Name 4；
0 = NoCheck
1 = AndCheck
2 = OrCheck
3 = Code
4 = Name */ 
            checkType: number;
         
            /* 代码 */ 
            code?: string;
         
            /* 名称 */ 
            name?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetAllVesselForUiPickerInput {
        [key:string]: any;
        
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            /* 船东 Id */ 
            carrierIds?: any[];
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBVesselUiPickerDto {
        [key:string]: any;
        
         
            /* 创建人姓名 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 名称 */ 
            name?: string;
         
            /* 船东ID */ 
            carrierId?: string;
         
            /* 船的注册国家 */ 
            registration?: string;
         
            /* IMO编号 */ 
            imoNumber?: string;
         
            /* UNCode */ 
            unCode?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBShipTracePointDto {
        [key:string]: any;
        
         
            
            longitudeDegree?: string;
         
            
            latitudeDegree?: string;
         
            
            postTime?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetShipTrackInfoOutput {
        [key:string]: any;
        
         
            
            shipTracePoints?: PUBShipTracePointDto[];
         
            /* 当前坐标点 */ 
            currentPosition?: PUBVesselInfosDto;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBVesselInfosDto {
        [key:string]: any;
        
         
            
            imo?: string;
         
            
            mmsiNumber?: string;
         
            
            vesselName?: string;
         
            
            vesselCallNumber?: string;
         
            
            countryOfDestination?: string;
         
            
            navistatus?: string;
         
            
            estimatedArrivalDateTime?: string;
         
            
            latitudeDegree?: string;
         
            
            longitudeDegree?: string;
         
            
            postTime?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBAddingVesselInfosTaskInput {
        [key:string]: any;
        
         
            /* 船名Id */ 
            vesselName: string;
         
            /* 开始时间(UTC) */ 
            startTime: string;
         
            /* 结束时间(UTC) */ 
            endTime: string;
        
        
    }
 
    /**
     * 航次管理
     */
    export class PUBVoyageDto {
        [key:string]: any;
        
         
            /* 船名Id */ 
            vesselId: string;
         
            /* 航次 */ 
            no: string;
         
            /* 创建人姓名 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     * 航次校验
     */
    export class PUBVoyageCheckInputDto {
        [key:string]: any;
        
         
            /* 校验类型 
公共类型：不校验 0； 与校验 1； 或校验 2； 
自定义类型：校验No 3；
0 = NoCheck
1 = AndCheck
2 = OrCheck
3 = No */ 
            checkType: number;
         
            /* 航次 */ 
            no?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBGetAllVoyageForUiPickerInput {
        [key:string]: any;
        
         
            /* 是否包含无效数据 */ 
            includeInvalid?: boolean;
         
            /* 船名 Id */ 
            vesselIds?: any[];
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class PUBVoyageUiPickerDto {
        [key:string]: any;
        
         
            /* 创建人姓名 */ 
            creatorUserName?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 船名Id */ 
            vesselId?: string;
         
            /* 船名 */ 
            vesselName?: string;
         
            /* 航次 */ 
            no?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            
            id?: string;
        
        
    }


