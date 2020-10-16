 
    /**
     *  No Remark 
     */
    export class RatesEsOceanRatesPageQueryInput {
        
         
            
            isFollow?: boolean;
         
            
            pols?: any[];
         
            
            pods?: any[];
         
            
            deliverys?: any[];
         
            
            searchText?: string;
         
            
            orderBy?: object;
         
            
            dynamicQuery?: object;
         
            
            incluedFields?: any[];
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesLocalizationText {
        
         
            
            zh?: string;
         
            
            en?: string;
         
            
            display?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesPortModel {
        
         
            
            id?: string;
         
            
            code?: string;
         
            
            fullName?: RatesLocalizationText;
         
            
            displayFullName?: string;
         
            
            isOcean?: boolean;
         
            
            isAir?: boolean;
         
            
            isOther?: boolean;
         
            
            name?: RatesLocalizationText;
         
            
            displayName?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesCompanyOrOrganizationModel {
        
         
            
            id?: string;
         
            
            name?: RatesLocalizationText;
         
            
            displayName?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesUserModel {
        
         
            
            id?: number;
         
            
            name?: RatesLocalizationText;
         
            
            displayName?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanRatesModel {
        
         
            
            isFavorite?: boolean;
         
            
            isSuperPermission?: boolean;
         
            
            id?: string;
         
            
            pol?: RatesPortModel;
         
            
            pod?: RatesPortModel;
         
            
            delivery?: RatesPortModel;
         
            
            shipCompany?: RatesCompanyOrOrganizationModel;
         
            
            from?: string;
         
            
            to?: string;
         
            /* 
0 = OceanContract
1 = OceanQuote
2 = TruckContract
3 = TruckQuote */ 
            businessType?: number;
         
            
            itemCode?: string;
         
            
            commodity?: string;
         
            
            term?: string;
         
            
            surCharge?: string;
         
            
            cls?: string;
         
            
            dd?: string;
         
            
            remarkBusiness?: string;
         
            
            updateBy?: RatesUserModel;
         
            
            reject?: boolean;
         
            
            rejectRemark?: string;
         
            
            isValid?: boolean;
         
            
            containerPrice?: object;
         
            
            unitCodes?: string;
         
            
            no?: string;
         
            
            shippingLineId?: string;
         
            
            isTerms?: boolean;
         
            
            account?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesPagedResultDto<T> {
        
         
            
            totalCount: any;
         
            
            items: any;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesFavoriteInput {
        
         
            /* 
0 = OceanContract
1 = OceanQuote
2 = TruckContract
3 = TruckQuote */ 
            type?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class Rates {
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesTuple {
        
         
            
            item1: any;
         
            
            item2: any;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesLocalBaseRateOutput {
        
         
            /* 船东Id（多个逗号分开） */ 
            carrierIds?: string;
         
            /* 路线Id */ 
            shiplineId?: string;
         
            /* 省份字符串分隔 */ 
            provinceIds?: string;
         
            
            carrierNames?: string;
         
            
            shiplineName?: string;
         
            
            provinceNames?: string;
         
            
            startDate?: string;
         
            
            endDate?: string;
         
            /* 是否过期 */ 
            isExpired?: boolean;
         
            
            updateById?: number;
         
            
            updateBy?: string;
         
            /* 付款方式（文本显示） */ 
            payment?: string;
         
            /* 最后更新时间 */ 
            lastModificationTime?: string;
         
            /* 是否发布 */ 
            isPublish?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesLocalDetailOutput {
        
         
            
            localBaseRate?: RatesLocalBaseRateOutput;
         
            
            localItemRates?: any[];
         
            
            units?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesLocalBaseRateDto {
        
         
            /* 船东Id（多个逗号分开） */ 
            carrierIds: string;
         
            /* 航线 */ 
            shiplineId: string;
         
            /* 省份字符串分隔 */ 
            provinceIds: string;
         
            /* 有效期开始日期 */ 
            startDate?: string;
         
            /* 有效期结束日期 */ 
            endDate?: string;
         
            /* 是否是启运港（反之就是目的港） */ 
            isOriginPort?: boolean;
         
            /* 修改人 */ 
            updateById?: number;
         
            
            localItemRates?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesBulkCommonInput {
        
         
            
            ids?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesPublishInput {
        
         
            
            localBaseRateDto?: RatesLocalBaseRateDto;
         
            
            ids?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanAdditionalFeeDto {
        
         
            /* 海运运价ID */ 
            oceanId?: string;
         
            /* 费用项目ID */ 
            chargingCodeId?: string;
         
            /* 客户ID */ 
            customerId?: string;
         
            /* 币种ID */ 
            currencyId?: string;
         
            /* 百分比 */ 
            percent?: number;
         
            /* 备注 */ 
            remark?: string;
         
            /* 是否特殊费用（如果是特殊费用，那么必须与运价项目关联才有效） */ 
            isSpecialFee?: boolean;
         
            /* 是否只对主运价叠加 */ 
            isOverlayHostRate?: number;
         
            /* 是否加到baseport rates */ 
            isAppendToBasePortRate?: boolean;
         
            /* 从 */ 
            fromDate?: string;
         
            /* 到 */ 
            toDate?: string;
         
            /* 箱型价格 */ 
            oceanAdditionalFeeRates?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     * 批量删除输入
     */
    export class RatesBulkDeleteInput {
        
         
            /* 要删除的id */ 
            ids?: any[];
         
            /* 是否全部删除 */ 
            isDeleteAll?: boolean;
         
            /* 合约id */ 
            oceanId?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesGetAdditionalFeeRelationBaseItemInput {
        
         
            
            id?: string;
         
            
            oceanId?: string;
         
            
            pol?: string;
         
            
            polExcl?: boolean;
         
            
            via?: string;
         
            
            viaExcl?: boolean;
         
            
            pod?: string;
         
            
            podExcl?: boolean;
         
            
            delivery?: string;
         
            
            deliveryExcl?: boolean;
         
            
            carrier?: string;
         
            
            carrierExcl?: boolean;
         
            
            itemCode?: string;
         
            
            itemCodeExcl?: boolean;
         
            
            comm?: string;
         
            
            commExcl?: boolean;
         
            
            term?: string;
         
            
            termExcl?: boolean;
         
            
            surCharge?: string;
         
            
            surChargeExcl?: boolean;
         
            
            description?: string;
         
            
            descriptionExcl?: boolean;
         
            
            isAll?: boolean;
         
            
            isEligibility?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanBindAdditionalFeeInput {
        
         
            /* id */ 
            ids?: any[];
         
            /* 附加费id */ 
            additionalId?: string;
         
            /* 绑定解绑 */ 
            isBind?: boolean;
         
            /* 绑定查询条件 */ 
            getAdditionalFeeRelation?: RatesGetAdditionalFeeRelationBaseItemInput;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesGetByOceanIdListInput {
        
         
            /* 运价Id */ 
            oceanId: string;
         
            /* 起始港 */ 
            form?: string;
         
            /* 反向 */ 
            formExcl?: boolean;
         
            /* 到达港 */ 
            to?: string;
         
            /* 反向 */ 
            toExcl?: boolean;
         
            
            itemCode?: string;
         
            /* 反向 */ 
            itemCodeExcl?: boolean;
         
            /* 运输条款 */ 
            term?: any[];
         
            /* 反向 */ 
            termExcl?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanArbitraryBulkDto {
        
         
            /* 运价id */ 
            oceanId?: string;
         
            /* 筛选条件 */ 
            input?: RatesGetByOceanIdListInput;
         
            /* 需要修改新增的数据数据传json */ 
            content?: string;
         
            /* 批量复制编辑 */ 
            bulkEdit?: boolean;
         
            /* 导入模式 */ 
            import?: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanArbitraryBulkAllDto {
        
         
            
            oceanId?: string;
         
            
            polId?: string;
         
            
            podId?: string;
         
            /* 
0 = None
1 = Original
2 = Destination */ 
            type?: number;
         
            
            transportClauseId?: string;
         
            
            itemCode?: string;
         
            
            remark?: string;
         
            /* 
0 = None
1 = Feeder
2 = Truck */ 
            modeOfTransportType?: number;
         
            /* 是否叠价格 */ 
            isFollowingRates?: boolean;
         
            /* 价格 */ 
            units?: any[];
         
            /* 筛选条件 */ 
            input?: RatesGetByOceanIdListInput;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanArbitrarySomeColumnInput {
        
         
            /* 运价的oceanId */ 
            oceanId?: string;
         
            /* 旧的 */ 
            oldPolId?: string;
         
            /* 新的 */ 
            newPolId?: string;
         
            /* 旧的 */ 
            oldPodId?: string;
         
            /* 新的 */ 
            newPodId?: string;
         
            /* 是否批量 */ 
            isBulk?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanArbitraryDeleteInput {
        
         
            /* 要删除的id */ 
            ids?: any[];
         
            /* 是否全部删除 */ 
            isDeleteAll?: boolean;
         
            /* 合约id */ 
            oceanId?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesGetCrmFreightRateAndQuoteInput {
        
         
            
            ids?: any[];
         
            
            customerId?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesCrmSaveFreightAndQuoteInput {
        
         
            /* 要保存的数据 */ 
            freightRates?: any[];
         
            /* 客户id */ 
            customerId?: string;
         
            /* 询价人 */ 
            enquiryId?: number;
         
            /* 保存有效期 */ 
            dateStart?: string;
         
            /* 保存有效期 */ 
            dateEnd?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesSaveSendCustomerInput {
        
         
            
            cacheKey?: string;
        
        
    }
 
    /**
     * 获取谷歌+本地位置信息模型
     */
    export class RatesGetPortByCityInput {
        
         
            /* 本地Place级别Id */ 
            id?: string;
         
            /* 谷歌地图place_id */ 
            placeId?: string;
         
            /* 谷歌地点明细 */ 
            placeName?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesGetFreightRatesInput {
        
         
            /* 船东Id */ 
            carrierIds?: any[];
         
            /* 运价有效天数(默认7天) */ 
            ratesValidDays?: number;
         
            /* 起始地点(没有是NUll) */ 
            originLocationModel?: RatesGetPortByCityInput;
         
            /* 起始港口 */ 
            originPortId?: any[];
         
            /* 目的港口 */ 
            deliveryPortId?: any[];
         
            /* 目的地点(没有是NUll) */ 
            deliveryLocationModel?: RatesGetPortByCityInput;
         
            /* 复选箱型组合 */ 
            unitIds?: any[];
         
            /* 中转港口 */ 
            viaPortId?: string;
         
            
            filter?: string;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesQueryFreightRateDto {
        
         
            /* 海运运费基础信息 */ 
            oceanBaseItem: any;
         
            /* 分组后的费用 */ 
            chargesGroup: any;
         
            /* 分箱型后的费用统计 */ 
            boxTypeTotal: any;
        
        
    }
 
    /**
     * CSP运价输出模型
     */
    export class RatesQueryFreightRateOutput {
        
         
            /* 箱型 */ 
            boxType?: any[];
         
            /* 运价模型 */ 
            queryFreightRateDtos?: RatesPagedResultDto<RatesQueryFreightRateDto>;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesCrmBusinessRateListInput {
        
         
            /* 默认查询关注的 */ 
            isFollow?: boolean;
         
            
            pol?: any[];
         
            
            pod?: any[];
         
            
            delivery?: any[];
         
            
            carrier?: any[];
         
            
            shipline?: string;
         
            
            commodity?: string;
         
            
            fromDate?: string;
         
            
            toDate?: string;
         
            /* 询价业务号 */ 
            no?: string;
         
            
            id?: string;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesCrmBusinessRateListOutput {
        
         
            /* 是否关注 */ 
            isFavorite?: boolean;
         
            /* 业务类型
0 = OceanContract
1 = OceanQuote
2 = TruckContract
3 = TruckQuote */ 
            businessType?: number;
         
            /* 报价状态 0有效，1过期 */ 
            status?: number;
         
            /* POL */ 
            polId?: string;
         
            /* POD */ 
            podId?: string;
         
            /* Delivery */ 
            deliveryId?: string;
         
            
            pol?: string;
         
            
            pod?: string;
         
            
            delivery?: string;
         
            /* 船公司 */ 
            shipCompany?: string;
         
            /* 有效时间 */ 
            from?: string;
         
            /* 有效时间 */ 
            to?: string;
         
            /* 品名 */ 
            commodity?: string;
         
            
            term?: string;
         
            
            surCharge?: string;
         
            
            cls?: string;
         
            
            tt?: string;
         
            /* 免租期/免堆期 */ 
            dd?: string;
         
            /* 业务员备注 */ 
            remarkBusiness?: string;
         
            /* 客服备注 */ 
            remarkCustomerService?: string;
         
            /* 创建人 */ 
            updateBy?: string;
         
            /* 判断是否是美线 true美线，fasle 不是美线 */ 
            isTerms?: boolean;
         
            /* 项目代码 */ 
            itemCode?: string;
         
            /* 大客户ID列表(指为某个客户向船东争取的价格) */ 
            account?: string;
         
            /* 是否被商务拒绝（仅限询报价） */ 
            reject?: boolean;
         
            
            ratePriceOutputs?: any[];
         
            /* 是否有高级权限 */ 
            isSuperPermission?: boolean;
         
            /* 商务拒绝备注 */ 
            rejectRemark?: string;
         
            
            carrierLogo?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * crm运价基本信息
     */
    export class RatesCrmOceanRateDetails {
        
         
            /* 是否有高级权限 */ 
            isSuperPermission?: boolean;
         
            
            from?: string;
         
            
            to?: string;
         
            /* 品名 */ 
            commodity?: string;
         
            
            pol?: string;
         
            
            pod?: string;
         
            
            delivery?: string;
         
            
            via?: string;
         
            
            tt?: string;
         
            /* 滞留费 */ 
            detentionAndDemurrage?: string;
         
            
            carrier?: string;
         
            
            term?: string;
         
            
            currency?: string;
         
            
            surcharge?: string;
         
            
            cls?: string;
         
            /* 业务员 */ 
            remark?: string;
         
            /* 客服 */ 
            remarkOfService?: string;
         
            /* 判断是业务员权限还是客服,1业务员2客服，3都有 */ 
            remarkPermission?: number;
         
            /* 箱型 */ 
            units?: any[];
         
            
            shipper?: string;
         
            
            consignee?: string;
         
            
            notify?: string;
         
            
            contractNO?: string;
         
            
            shipline?: string;
         
            
            accountType?: string;
         
            
            account?: string;
         
            
            costUnits?: any[];
         
            
            costDetails?: object;
         
            
            carrierLogo?: string;
         
            
            id?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanBasePortBulkDto {
        
         
            /* 运价id */ 
            oceanId?: string;
         
            /* 筛选条件 */ 
            input?: RatesGetByOceanIdListInput;
         
            /* 需要修改新增的数据数据传json */ 
            content?: string;
         
            /* 导入 */ 
            import?: boolean;
         
            /* 批量编辑 */ 
            bulkEdit?: boolean;
        
        
    }
 
    /**
     * 删除异常记录Dto
     */
    export class RatesDeleteErrorMessageInputDto {
        
         
            /* 合约价Id */ 
            oceanId: string;
         
            /* 业务类型
0 = BasePortRates
1 = ArbitraryRates
2 = AdditionalFees */ 
            businessType: number;
         
            /* 异常记录Id集合 */ 
            recordIds: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanBasePortBulkAllDto {
        
         
            
            oceanId?: string;
         
            /* 大客户ID列表(指为某个客户向船东争取的价格) */ 
            account?: string;
         
            /* 大客户类型(1:发货人：Shipper,2:收货人:Consignee)
0 = None
1 = Shipper
2 = Consignee */ 
            accountType?: number;
         
            /* 船东 */ 
            carrier?: string;
         
            /* 船东ID */ 
            carrierId?: string;
         
            /* 装货港 */ 
            pol?: string;
         
            /* 装货港Id */ 
            polId?: string;
         
            /* 中转港 */ 
            via?: string;
         
            /* 装货港Id */ 
            viaId?: string;
         
            /* 卸货港 */ 
            pod?: string;
         
            /* 装货港Id */ 
            podId?: string;
         
            /* 交货地 */ 
            delivery?: string;
         
            /* 装货港Id */ 
            placeOfDeliveryId?: string;
         
            /* 是否关联起始支线运价 */ 
            isOriginalArbitrary?: boolean;
         
            /* 是否需要修改 */ 
            isOriginalArbitraryEdit?: boolean;
         
            /* 是否关联目的港支线运价 */ 
            isDestinationArbitrary?: boolean;
         
            /* 是否需要修改 */ 
            isDestinationArbitraryEdit?: boolean;
         
            /* 是否后主 */ 
            isMainDestinationArbitrary?: boolean;
         
            /* 是否后主 */ 
            isMainDestinationArbitraryEdit?: boolean;
         
            /* 关联代码 */ 
            itemCode?: string;
         
            /* 品名 */ 
            commodity?: string;
         
            /* 品名操作类型
1 = Override
2 = Clean
3 = Append */ 
            commodityOperation?: number;
         
            /* 是否需要修改 */ 
            commodityEdit?: boolean;
         
            /* 运输条款 */ 
            term?: string;
         
            /* 运输条款Id */ 
            transportClauseId?: string;
         
            /* 附加费描述 */ 
            surCharge?: string;
         
            /* 附加费描述类型
1 = Override
2 = Clean
3 = Append */ 
            surChargeOperation?: number;
         
            /* 是否需要修改 */ 
            surChargeEdit?: boolean;
         
            /* 截关时间(CLS) */ 
            closingDate?: string;
         
            /* 航程 */ 
            transitTime?: string;
         
            /* 航程类型
1 = Override
2 = Clean
3 = Append */ 
            detentionAndDemurrageOperation?: number;
         
            /* 是否需要修改 */ 
            detentionAndDemurrageEdit?: boolean;
         
            /* 描述 */ 
            remark?: string;
         
            /* 描述类型
1 = Override
2 = Clean
3 = Append */ 
            remarkOperation?: number;
         
            /* 是否需要修改 */ 
            remarkEdit?: boolean;
         
            /* 时间范围 */ 
            fromDate?: string;
         
            /* 是否清除时间 */ 
            cleanFromDate?: boolean;
         
            /* 时间范围 */ 
            toDate?: string;
         
            /* 是否清除时间 */ 
            cleanToDate?: boolean;
         
            /* 判断是否叠加箱型价格 */ 
            isFollowingRates?: boolean;
         
            /* 价格 */ 
            units?: any[];
         
            /* 筛选条件 */ 
            input?: RatesGetByOceanIdListInput;
         
            /* 滞留费 */ 
            detentionAndDemurrage?: string;
        
        
    }
 
    /**
     * 单列编辑
     */
    export class RatesOceanBasePortSomeColumnInput {
        
         
            /* 运价的oceanId */ 
            oceanId?: string;
         
            /* 旧的 */ 
            oldPolId?: string;
         
            /* 新的 */ 
            newPolId?: string;
         
            /* 旧的 */ 
            oldPodId?: string;
         
            /* 新的 */ 
            newPodId?: string;
         
            /* 旧的 */ 
            oldPlaceOfDeliveryId?: string;
         
            /* 新的 */ 
            newPlaceOfDeliveryId?: string;
         
            /* 旧的 */ 
            oldCarrierId?: string;
         
            /* 新的 */ 
            newCarrierId?: string;
         
            /* 是否批量 */ 
            isBulk?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanBsePortByIdArbitraryAndAdditionalFeeOuput {
        
         
            /* 驳船 */ 
            arbitrarys?: object;
         
            /* 附加费 */ 
            additionalFees?: object;
         
            /* 箱型 */ 
            units?: any[];
        
        
    }
 
    /**
     * 删除参数dto
     */
    export class RatesOceanBasePortDeleteInput {
        
         
            /* 要删除的id */ 
            ids?: any[];
         
            /* 是否全部删除 */ 
            isDeleteAll?: boolean;
         
            /* 合约id */ 
            oceanId?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanFileDto {
        
         
            /* 运价Id */ 
            oceanId: string;
         
            /* 文件名 */ 
            fileName: string;
         
            /* 文件存放地址ID */ 
            fileId?: string;
         
            /* 扩展名 */ 
            extensionName?: string;
         
            /* 描述 */ 
            description?: string;
         
            /* 创建人 */ 
            createBy?: string;
         
            /* 创建时间 */ 
            createDate?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesOceanOutput {
        
         
            /* 名称 */ 
            name?: string;
         
            /* 航线ID */ 
            shippingLineId?: string;
         
            
            shippingLine?: string;
         
            /* 合约号 */ 
            contractNo?: string;
         
            /* 船东ID */ 
            carrierId?: string;
         
            
            carrier?: string;
         
            /* 收货人 */ 
            consignee?: string;
         
            /* 发货人 */ 
            shipper?: string;
         
            /* 付费条款ID */ 
            paymentId?: string;
         
            
            payment?: string;
         
            /* 币种ID */ 
            currencyId?: string;
         
            
            currency?: string;
         
            /* 开始时间 */ 
            from?: string;
         
            /* 结束时间 */ 
            to?: string;
         
            /* 运价状态
0 = All
1 = Draft
2 = Published
3 = Invalidated
4 = Expired
5 = Publishing */ 
            state?: number;
         
            /* 发布人Id */ 
            publisherId?: number;
         
            /* 发布人 */ 
            publisher?: string;
         
            /* 是否公布 */ 
            isPublish?: boolean;
         
            /* 运价类型
1 = Market
2 = Bco
4 = Fix
5 = Flaoting */ 
            rateType?: number;
         
            /* 备注 */ 
            remark?: string;
         
            /* 备注客服 */ 
            remark1?: string;
         
            /* 箱型 */ 
            oceanUnits?: any[];
         
            /* 收货人发货人通知人 */ 
            oceanCustomers?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     * 运价合约dto
     */
    export class RatesOceanDto {
        
         
            /* 合约号 */ 
            contractNo: string;
         
            /* 合约名 */ 
            contractName: string;
         
            /* 航线ID  接口提供数据 */ 
            shippingLineId: string;
         
            /* 币种ID 接口提供数据 */ 
            currencyId: string;
         
            /* 从 */ 
            fromDate: string;
         
            /* 到 */ 
            toDate: string;
         
            /* 运价类型
1 = Market
2 = Bco
4 = Fix
5 = Flaoting */ 
            rateType: number;
         
            /* 状态
0 = All
1 = Draft
2 = Published
3 = Invalidated
4 = Expired
5 = Publishing */ 
            state: number;
         
            /* 是否公布 */ 
            isPublish?: boolean;
         
            /* 船东ID  接口提供数据 */ 
            carrierId?: string;
         
            
            changeCarrier?: boolean;
         
            /* 付费条款ID 接口提供数据 */ 
            paymentTermId?: string;
         
            /* 备注 */ 
            remark?: string;
         
            /* 客服备注 */ 
            remark1?: string;
         
            /* 发布人ID 接口提供数据 */ 
            publisherId?: number;
         
            /* 发布时间 */ 
            publishDate?: string;
         
            /* 合约箱型 */ 
            units?: any[];
         
            /* 客户 */ 
            oceanCustomers?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesUpdateStateTypeDto {
        
         
            /* 合约价Id */ 
            id?: string;
         
            /* 合约价状态
0 = All
1 = Draft
2 = Published
3 = Invalidated
4 = Expired
5 = Publishing */ 
            stateType?: number;
        
        
    }
 
    /**
     * 报价Dto
     */
    export class RatesQuoteReplyDto {
        
         
            /* 报价业务号 */ 
            replyNo?: string;
         
            /* 报价船东公司 */ 
            replyCarrier?: string;
         
            /* TT航程 */ 
            transitTime?: string;
         
            /* 有效起始时间 */ 
            validStartDate?: string;
         
            /* 有效结束时间 */ 
            validEndDate?: string;
         
            /* 报价人 */ 
            replyUser?: string;
         
            /* 报价状态
0 = Normal
1 = Expired
2 = Invalid */ 
            status?: number;
         
            /* 报价子项集合 */ 
            quoteReplyItems?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     * 询价公共Dto
     */
    export class RatesQuoteEnquiryBaseDto {
        
         
            /* 询价业务号 */ 
            quoteNo?: string;
         
            /* 运输方式
0 = NotSet
1 = Ocean
2 = Air
3 = Truck */ 
            freightMethodType?: number;
         
            /* 运输条款Id */ 
            transportClauseId?: string;
         
            /* 货好时间 */ 
            cargoReadyDate?: string;
         
            /* 预计交货时间 */ 
            deliveryDate?: string;
         
            /* 港前港后(拖车询价才有值，用来控制TruckPort、TruckAddress)
0 = NoSet
1 = Frontend
2 = Backend */ 
            truckType?: number;
         
            /* 品名 */ 
            commodity?: string;
         
            /* Etod（仅拖车用） */ 
            etod?: string;
         
            /* 备注 */ 
            description?: string;
         
            /* 数量 */ 
            quantity?: number;
         
            /* 总重量 */ 
            weight?: number;
         
            /* 总体积 */ 
            volume?: number;
         
            /* 单位切换枚举
0 = Imperial
1 = Metric */ 
            unitConvertType?: number;
         
            /* 数量单位字典 */ 
            quantityUnit?: string;
         
            /* 重量单位字典 */ 
            totalWeightUnit?: string;
         
            /* 体积单位字典 */ 
            totalVolumeUnit?: string;
         
            /* 拖车港口 */ 
            truckPortId?: string;
         
            /* 拖车送货地 */ 
            truckAddressId?: string;
         
            
            originPortId?: string;
         
            
            destinationPortId?: string;
         
            /* 目的港缓存 */ 
            destinationPort?: string;
         
            
            deliveryAddressId?: string;
         
            
            fromPlaceName?: string;
         
            
            fromFullRegion?: string;
         
            
            toFullRegion?: string;
         
            
            toPlaceName?: string;
         
            /* 方便前端使用（根据TruckType处理过的） */ 
            fromId?: string;
         
            /* 方便前端使用（根据TruckType处理过的） */ 
            toId?: string;
         
            /* 创建人信息 */ 
            quoteCreator?: string;
         
            /* 询价人信息 */ 
            enquiryUser?: string;
         
            /* 所属客户（公司）信息 */ 
            ownerCustomer?: string;
         
            /* 船东（公司）信息 */ 
            carrierCustomer?: string;
         
            
            carrierLogo?: string;
         
            /* 船东客户Id */ 
            carrierCustomerId?: string;
         
            /* 询价归属联系人 */ 
            ownerContact?: string;
         
            /* 是否发货人,true发货人，false收货人 */ 
            isShipper?: boolean;
         
            /* 询价归属客户Id */ 
            ownerCustomerId?: string;
         
            /* 询价归属联系人Id */ 
            ownerContactId?: string;
         
            /* 运输条款(缓存导航加载) */ 
            transportClause?: string;
         
            /* 箱型规格保存json字符串，如 [ {name:20GP,value:1},{name:40GP,value2} ] */ 
            containerType?: string;
         
            /* 报价信息 */ 
            quoteReply?: RatesQuoteReplyDto;
         
            /* 邮编 */ 
            zipCode?: string;
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 是否显示操作（商务新增的拖车询报价才可以） */ 
            isOperationer?: boolean;
         
            /* 创建人 */ 
            creatorUserId?: number;
         
            /* 是否被商务拒绝 */ 
            reject?: boolean;
         
            /* 指定报价人 */ 
            replyUserId?: number;
         
            /* 商务拒绝理由 */ 
            rejectRemark?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 询价fromDto
     */
    export class RatesQuoteEnquiryFromDto {
        
         
            
            id?: string;
         
            /* 
0 = OceanFromPort
1 = TruckFromPort
2 = TruckFromAddress */ 
            fromType?: number;
         
            
            cityName?: string;
         
            
            regionFullName?: string;
         
            
            zipCode?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesQuoteEnquiryToDto {
        
         
            
            id?: string;
         
            /* 
0 = OceanToAddress
1 = TruckToPort
2 = TruckToAddress */ 
            toType?: number;
         
            
            cityName?: string;
         
            
            regionFullName?: string;
         
            
            zipCode?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesQuoteCustomerContactDto {
        
         
            
            id?: string;
         
            
            quoteNo?: string;
         
            
            replyNo?: string;
         
            
            customerName?: string;
         
            
            quoteCreator?: string;
        
        
    }
 
    /**
     * 询价Dto
     */
    export class RatesCreateQuoteEnquiryInput {
        
         
            /* 询价业务号 */ 
            quoteNo?: string;
         
            /* 询价归属客户Id */ 
            ownerCustomerId?: string;
         
            /* 询价归属联系人Id */ 
            ownerContactId?: string;
         
            /* 船东客户Id */ 
            carrierCustomerId?: string;
         
            /* 备注 */ 
            description?: string;
         
            /* 是否发货人,true发货人，false收货人 */ 
            isShipper?: boolean;
         
            /* 品名 */ 
            commodity?: string;
         
            
            etod?: string;
         
            /* 指定报价人 */ 
            replyUserId?: number;
         
            /* 运输方式
0 = NotSet
1 = Ocean
2 = Air
3 = Truck */ 
            freightMethodType?: number;
         
            /* 箱型规格保存json字符串，如 [ {name:20GP,value:1},{name:40GP,value2} ] */ 
            containerType?: string;
         
            /* 运输条款 */ 
            transportClauseId?: string;
         
            /* 港前港后(拖车询价才有值)
0 = NoSet
1 = Frontend
2 = Backend */ 
            truckType?: number;
         
            /* 拖车港口，TruckType=1时为港前目的港，2为港后出发港 */ 
            truckPortId?: string;
         
            /* 拖车送货地，TruckType=1时为发货地，2为港后接收地 */ 
            truckAddressId?: string;
         
            /* 邮编 */ 
            zipCode?: string;
         
            /* 始发口岸Id */ 
            originPortId?: string;
         
            /* 始发装载时间/FBA时  Pick Up / Delivery Time */ 
            cargoReadyDate?: string;
         
            /* 目的口岸Id */ 
            destinationPortId?: string;
         
            /* 预计交货时间 */ 
            deliveryDate?: string;
         
            /* 交货地址 */ 
            deliveryAddressId?: string;
         
            /* 数量 */ 
            quantity?: number;
         
            /* 总重量 */ 
            weight?: number;
         
            /* 总体积 */ 
            volume?: number;
         
            /* 单位切换枚举
0 = Imperial
1 = Metric */ 
            unitConvertType?: number;
         
            /* 数量单位代码 */ 
            quantityUnitCode?: string;
         
            /* 重量单位代码 */ 
            weightUnitCode?: string;
         
            /* 体积单位代码 */ 
            volumeUnitCode?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 拖车报价Dto
     */
    export class RatesCreateTruckQuoteReplyInput {
        
         
            /* 询价Id */ 
            quoteEnquiryId: string;
         
            /* 有效起始时间 */ 
            validStartDate: string;
         
            /* 有效结束时间 */ 
            validEndDate: string;
         
            /* 起始地 */ 
            from?: string;
         
            /* 目的地 */ 
            to?: string;
         
            /* 邮编 */ 
            zipCode?: string;
         
            /* 币种id */ 
            currencyId?: string;
         
            /* 单价（Rate) */ 
            unitPrice?: number;
         
            /* 燃油附加费Fuel */ 
            truckFuel?: number;
         
            /* 备注 */ 
            remark?: string;
        
        
    }
 
    /**
     * 询价Dto
     */
    export class RatesCreateTruckQuoteInput {
        
         
            /* 备注 */ 
            description?: string;
         
            /* 询价归属业务员Id */ 
            enquiryUserId?: number;
         
            /* 运输方式
0 = NotSet
1 = Ocean
2 = Air
3 = Truck */ 
            freightMethodType?: number;
         
            /* 港前港后(拖车询价才有值)
0 = NoSet
1 = Frontend
2 = Backend */ 
            truckType?: number;
         
            /* 拖车港口，TruckType=1时为港前目的港，2为港后出发港 */ 
            truckPortId?: string;
         
            /* 拖车送货地，TruckType=1时为发货地，2为港后接收地 */ 
            truckAddressId?: string;
         
            /* 邮编 */ 
            zipCode?: string;
         
            /* 报价信息 */ 
            reply?: RatesCreateTruckQuoteReplyInput;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesCoEntityDto {
        
         
            
            id?: string;
        
        
    }
 
    /**
     * 拒绝询价
     */
    export class RatesRejectQuoteEnquiryInput {
        
         
            /* 备注 */ 
            remark?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 海运报价
     */
    export class RatesCreateOceanQuoteReplyInput {
        
         
            /* 询价Id */ 
            quoteEnquiryId: string;
         
            /* 有效起始时间 */ 
            validStartDate: string;
         
            /* 有效结束时间 */ 
            validEndDate: string;
         
            /* 船公司id */ 
            carrierId?: string;
         
            /* TT航程 */ 
            transitTime?: string;
         
            /* 报价明细集合 */ 
            quoteReplyItems?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesCspTruckListInput {
        
         
            /* 获取谷歌+本地位置信息模型 (location地址暂时传CityId) */ 
            placeModel?: RatesGetPortByCityInput;
         
            /* 港口 */ 
            portId?: string;
         
            /* 港前还是港后：1港前2港后
0 = NoSet
1 = Frontend
2 = Backend */ 
            type?: number;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesCspTruckOutput {
        
         
            
            trucker?: string;
         
            
            from?: string;
         
            
            to?: string;
         
            
            rate?: number;
         
            
            fuel?: number;
         
            
            total?: number;
         
            
            currency?: string;
         
            
            currencyId?: string;
         
            
            durationStart?: string;
         
            
            durationEnd?: string;
         
            
            remark?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesRegionAndCountryDto {
        
         
            
            localizationTextFullName?: string;
         
            
            name?: string;
         
            
            cityName?: string;
         
            
            regionId?: string;
         
            
            province?: string;
         
            
            country?: string;
         
            
            nameLocalization?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesTruckOuput {
        
         
            
            country?: string;
         
            
            countryId?: string;
         
            
            city?: string;
         
            
            cityId?: string;
         
            
            businesType?: number;
         
            
            validStart?: string;
         
            
            validEnd?: string;
         
            
            rate?: number;
         
            
            fuel?: number;
         
            
            totalRate?: number;
         
            
            valid?: number;
         
            
            portId?: string;
         
            
            addressId?: string;
         
            
            remark?: string;
         
            
            carrierId?: string;
         
            
            carrier?: string;
         
            
            currencyId?: string;
         
            
            currency?: string;
         
            
            updateTime?: string;
         
            
            updateBy?: string;
         
            
            updateById?: string;
         
            
            creatorUserId?: string;
         
            
            isPublish?: boolean;
         
            
            isSign?: boolean;
         
            
            message?: string;
         
            
            from?: string;
         
            
            to?: string;
         
            
            zipCode?: string;
         
            
            fromDetails?: RatesRegionAndCountryDto;
         
            
            toDetails?: RatesRegionAndCountryDto;
         
            
            isTruckRate?: boolean;
         
            
            hashRepeat?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * crm的拖车列表
     */
    export class RatesCrmTruckOuput {
        
         
            /* 是否收藏的 */ 
            isFavorite?: boolean;
         
            /* 业务类型
0 = OceanContract
1 = OceanQuote
2 = TruckContract
3 = TruckQuote */ 
            businessType?: number;
         
            /* 拖车类型（1 港前，2港后）
0 = NoSet
1 = Frontend
2 = Backend */ 
            truckType?: number;
         
            /* 港口 */ 
            portId?: string;
         
            /* 位置 */ 
            addressId?: string;
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 价格 */ 
            rate?: number;
         
            /* 燃油附加费 */ 
            fuel?: number;
         
            /* 币种 */ 
            currencyId?: string;
         
            /* 状态 0有效，1过期 */ 
            status?: number;
         
            /* 开始时间(如果是询价没有报价，则空) */ 
            validStart?: string;
         
            /* 结束时间(如果是询价没有报价，则空) */ 
            validEnd?: string;
         
            /* 船东 */ 
            carrierId?: string;
         
            /* 创建人 */ 
            creatorUserId?: number;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 备注 */ 
            remark?: string;
         
            
            truckPort?: string;
         
            /* 拖车地址缓存 */ 
            truckAddress?: string;
         
            /* 国家 */ 
            country?: string;
         
            /* 城市 */ 
            city?: string;
         
            /* 币种缓存 */ 
            currency?: string;
         
            /* 船东 */ 
            carrier?: string;
         
            /* 创建人 */ 
            users?: string;
         
            /* 始发地 */ 
            fromDetails?: RatesRegionAndCountryDto;
         
            /* 终止地 */ 
            toDetails?: RatesRegionAndCountryDto;
         
            /* 邮编 */ 
            zipCode?: string;
         
            /* 单号(询价则为QuoteNo) */ 
            no?: string;
         
            /* 驳回 */ 
            reject?: boolean;
         
            /* 商务拒绝备注 */ 
            rejectRemark?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesTruckDropDownListOutput {
        
         
            /* Id */ 
            id?: string;
         
            /* 名称 */ 
            name?: string;
         
            /* 邮政编码 */ 
            zipCode?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class RatesTruckRateDto {
        
         
            /* 开始时间 */ 
            validStart?: string;
         
            /* 结束时间 */ 
            validEnd?: string;
         
            /* 国家 */ 
            countryId?: string;
         
            /* 城市 */ 
            cityId?: string;
         
            /* 港口 */ 
            portId?: string;
         
            /* 位置 */ 
            addressId?: string;
         
            /* 备注 */ 
            remark?: string;
         
            /* 船东 */ 
            carrierId?: string;
         
            /* 价格 */ 
            fuel?: number;
         
            /* 币种 */ 
            currencyId?: string;
         
            /* 价格 */ 
            rate?: number;
         
            /* 总价格 */ 
            totalRate?: number;
         
            /* 航线ID */ 
            shippingLineId?: string;
         
            /* 港口类型 */ 
            businesType?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     * 新增拖车价格/记事本
     */
    export class RatesCreateListTruckInput {
        
         
            /* 是不是拖车价格 false=记事本 */ 
            isTruckingRate?: boolean;
         
            /* 地点港口 */ 
            from?: string;
         
            /* 地点港口 */ 
            to?: string;
         
            /* 邮政编码 */ 
            zipCode?: string;
         
            /* 币种 */ 
            currencyId?: string;
         
            /* 有效期开始日期 */ 
            validStart?: string;
         
            /* 修改时间 */ 
            validEnd?: string;
         
            /* 修改人 */ 
            updateBy?: number;
         
            /* 更新时间 */ 
            updateDate?: string;
         
            
            createTruckInputs?: any[];
        
        
    }


