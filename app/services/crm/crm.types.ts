 
    /**
     * 附件模型
     */
    export class CRMAttachmentDto {
        [key:string]: any;
        
         
            /* 客户Id */ 
            customerId?: string;
         
            /* 附件类型
0 = Other
1 = MonthlyClosing
2 = TelexRelease */ 
            type?: number;
         
            /* 文件id(上传到文件服务器后返回) */ 
            fileId?: string;
         
            /* 文件名称(上传到文件服务器后返回) */ 
            fileName?: string;
         
            /* 文件扩展名(上传到文件服务器后返回) */ 
            extensionName?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 附件列表模型
     */
    export class CRMAttachmentListDto {
        [key:string]: any;
        
         
            /* 上传人 */ 
            creator?: string;
         
            /* 上传时间 */ 
            creationTime?: string;
         
            /* 客户Id */ 
            customerId?: string;
         
            /* 附件类型
0 = Other
1 = MonthlyClosing
2 = TelexRelease */ 
            type?: number;
         
            /* 文件id(上传到文件服务器后返回) */ 
            fileId?: string;
         
            /* 文件名称(上传到文件服务器后返回) */ 
            fileName?: string;
         
            /* 文件扩展名(上传到文件服务器后返回) */ 
            extensionName?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMListResultDto1<T> {
        [key:string]: any;
        
         
            
            items?: T[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCoEntityDto {
        [key:string]: any;
        
         
            
            id?: string;
        
        
    }
 
    /**
     * 联系人Dto
     */
    export class CRMContactDto {
        [key:string]: any;
        
         
            /* 姓 */ 
            surname?: string;
         
            /* 名 */ 
            name?: string;
         
            /* 姓-本地化 */ 
            surnameLocalization?: string;
         
            /* 名-本地化 */ 
            nameLocalization?: string;
         
            /* 电话 */ 
            phone?: string;
         
            /* 电子邮件 */ 
            email?: string;
         
            /* 备注 */ 
            remark?: string;
         
            /* 固话 */ 
            tel?: string;
         
            /* 职位 */ 
            position?: string;
         
            /* 传真 */ 
            fax?: string;
         
            /* 是否主联系人 */ 
            isMaster?: boolean;
         
            /* 如果是给合作伙伴创建的，该字段表示拥有合作伙伴的客户id */ 
            customerId?: string;
         
            /* 所属客户名称（如果是合作伙伴联系人，则代表合作伙伴绑定的客户名称） */ 
            customerName?: string;
         
            /* 所属客户地址 */ 
            customerAddress?: string;
         
            /* 如果是给客户的合作伙伴创建的location,这个字段才有值 */ 
            partnerId?: string;
         
            /* 用户Id，如果有值则表示为租户用户 */ 
            userId?: number;
         
            /* 用户所属租户 */ 
            tenantId?: number;
         
            /* 用户角色 */ 
            role?: string;
         
            /* 是否可以注销账号 */ 
            isCanDelete?: boolean;
         
            /* 是否主账号联系人 */ 
            isMainAccount?: boolean;
         
            /* 头像id */ 
            profilePictureId?: string;
         
            /* 激活链接（空就不显示复制按钮） */ 
            activityLink?: string;
         
            /* 用户信息 */ 
            userInfo?: CRMCustomerBindCoUserDto;
         
            
            id?: string;
        
        
    }
 
    /**
     * 客户绑定的业务员Dto
     */
    export class CRMCustomerBindCoUserDto {
        [key:string]: any;
        
         
            
            tenantId?: number;
         
            
            id?: number;
         
            
            profilePictureId?: string;
         
            
            name?: string;
         
            
            surname?: string;
         
            /* 中文名 */ 
            cName?: string;
         
            
            userName?: string;
         
            
            emailAddress?: string;
         
            
            phoneNumber?: string;
         
            
            isActive?: boolean;
         
            
            password?: string;
         
            /* 业务员所属的客户Id */ 
            customerId?: string;
         
            /* 业务员所属客户名 */ 
            customerName?: string;
         
            /* 客户地址 */ 
            customerAddress?: string;
         
            /* 业务员所属职位名 */ 
            positionName?: string;
         
            /* 上级userid */ 
            parentId?: number;
        
        
    }
 
    /**
     * 联系人列表Dto
     */
    export class CRMContactListDto {
        [key:string]: any;
        
         
            /* 姓 */ 
            surname?: string;
         
            /* 名 */ 
            name?: string;
         
            /* 本地化姓 */ 
            localizationSurname?: string;
         
            /* 本地化名 */ 
            localizationName?: string;
         
            /* 电话 */ 
            phone?: string;
         
            /* 电子邮件 */ 
            email?: string;
         
            /* 备注 */ 
            remark?: string;
         
            /* 固话 */ 
            tel?: string;
         
            /* 职位 */ 
            position?: string;
         
            /* Msn */ 
            msn?: string;
         
            /* 是否主联系人 */ 
            isMaster?: boolean;
         
            /* 如果是给合作伙伴创建的location，该字段表示拥有合作伙伴的客户id */ 
            customerId?: string;
         
            /* 如果是给客户的合作伙伴创建的location,这个字段才有值 */ 
            partnerId?: string;
         
            /* 用户Id，如果有值则表示为租户用户 */ 
            userId?: number;
         
            
            isDeleted?: boolean;
         
            /* 用户信息 */ 
            userInfo?: CRMUserListResponse;
         
            /* 地点集合 */ 
            locations?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMUserListResponse {
        [key:string]: any;
        
         
            
            id?: number;
         
            
            tenantId?: number;
         
            
            name?: string;
         
            
            surname?: string;
         
            
            cName?: string;
         
            
            userName?: string;
         
            
            emailAddress?: string;
         
            
            phoneNumber?: string;
         
            
            profilePictureId?: string;
         
            
            isEmailConfirmed?: boolean;
         
            
            roles?: any[];
         
            
            isActive?: boolean;
         
            
            creationTime?: string;
        
        
    }
 
    /**
     * 地点Dto
     */
    export class CRMLocationDto {
        [key:string]: any;
        
         
            /* 邮政编码 */ 
            zip?: string;
         
            /* 街道地址 */ 
            streetAddress?: string;
         
            /* 公寓/套房/单元/建筑 */ 
            streetAddress2?: string;
         
            
            streetAddressEn?: string;
         
            /* 地址本地化 */ 
            streetAddressLocalization?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 省/洲 Id */ 
            provinceId?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 国家 */ 
            country?: string;
         
            /* 省/洲 */ 
            province?: string;
         
            /* 城市 */ 
            city?: string;
         
            /* 客户电话 */ 
            customerTel?: string;
         
            /* 客户传真 */ 
            customerFax?: string;
         
            /* 查看权限
0 = OnlyMyOrganization
1 = MyConnections
2 = SpecificConnections */ 
            viewableType?: number;
         
            /* 地点附加属性 */ 
            locationAddition?: CRMLocationAdditionDto;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMUserListRoleDto {
        [key:string]: any;
        
         
            
            roleId?: number;
         
            
            roleName?: string;
        
        
    }
 
    /**
     * 地点附加属性dto
     */
    export class CRMLocationAdditionDto {
        [key:string]: any;
        
         
            /* 港口贸易代码 */ 
            unlocode?: string;
         
            /* 接收时区 */ 
            timezone?: string;
         
            /* 是否住宅区 */ 
            isResidential?: boolean;
         
            /* 是否装货码头 */ 
            isDock?: boolean;
         
            /* 是否需要帮助卸货 */ 
            isUnloading?: boolean;
         
            /* 是否需要预约 */ 
            isAppointment?: boolean;
         
            /* 是否实时卸货 */ 
            isLiveUnload?: boolean;
         
            /* 卸货公司 */ 
            unloadCompanyId?: string;
         
            /* 是否实时装货 */ 
            isLiveLoad?: boolean;
         
            /* 装货公司 */ 
            loadCompanyId?: string;
         
            /* 附加信息 */ 
            description?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMPagedResultDto1<T> {
        [key:string]: any;
        
         
            
            totalCount?: number;
         
            
            items?: T[];
        
        
    }
 
    /**
     * 获取业务员与联系人输出对象
     */
    export class CRMGetAllSalesAndContactsOutput {
        [key:string]: any;
        
         
            /* 姓 */ 
            surname?: string;
         
            /* 名 */ 
            name?: string;
         
            /* 姓名 */ 
            fullName?: string;
         
            /* 电话 */ 
            phone?: string;
         
            /* 电子邮件 */ 
            email?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCheckContactEmailInput {
        [key:string]: any;
        
         
            /* 如果是编辑联系人，则传联系人id */ 
            id?: string;
         
            /* 客户Id */ 
            customerId?: string;
         
            /* 邮箱 */ 
            email?: string;
         
            /* 如果是验证合作伙伴联系人，则需要传值 */ 
            partnerId?: string;
         
            /* 是否开通ICP账号 */ 
            isSignUp?: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCheckContactEmailOutput {
        [key:string]: any;
        
         
            /* 是否成功通过验证 */ 
            success?: boolean;
         
            /* 联系人姓名 */ 
            contactName?: string;
         
            /* 重复的Email */ 
            email?: string;
         
            /* 联系人的用户Id */ 
            userId?: number;
         
            /* 错误的提示信息(创建客户联系人才有) */ 
            message?: string;
        
        
    }
 
    /**
     * 验证主联系人Dto
     */
    export class CRMCheckMainContact {
        [key:string]: any;
        
         
            /* 客户Id */ 
            customerId?: string;
         
            /* 合作伙伴Id(如果是合作伙伴联系人，则需要传该值) */ 
            partnerId?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCommonResponse {
        [key:string]: any;
        
         
            
            success?: boolean;
         
            
            message?: string;
        
        
    }
 
    /**
     * 创建或编辑联系人Dto
     */
    export class CRMCreateOrUpdateContactInput {
        [key:string]: any;
        
         
            /* 名 */ 
            name: string;
         
            /* 姓 */ 
            surname?: string;
         
            /* 全称-本地化 */ 
            surnameLocalization?: string;
         
            /* 名-本地化 */ 
            nameLocalization?: string;
         
            /* 电话 */ 
            phone?: string;
         
            /* 电子邮件 */ 
            email?: string;
         
            /* 传真 */ 
            fax?: string;
         
            /* 备注 */ 
            remark?: string;
         
            /* 固话 */ 
            tel?: string;
         
            /* 职位 */ 
            position?: string;
         
            /* 是否主联系人 */ 
            isMaster?: boolean;
         
            /* 如果是给合作伙伴创建的联系人，该字段表示拥有合作伙伴的客户id */ 
            customerId?: string;
         
            /* 如果是给客户的合作伙伴创建的联系人,这个字段才有值 */ 
            partnerId?: string;
         
            /* 联系人注册的userId */ 
            userId?: number;
         
            /* 在分布式事务中，该字段会自动设置为本地事务ID */ 
            txId?: string;
         
            /* 是否开通ICP账号 */ 
            isSignUp?: boolean;
         
            /* 用户名 */ 
            userName?: string;
         
            /* 密码 */ 
            password?: string;
         
            /* 用户角色 */ 
            role?: string;
         
            /* 是否发送邮件通知 */ 
            isSendEmail?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCreateOrUpdateContactOutput {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            link?: string;
        
        
    }
 
    /**
     * 重置密码
     */
    export class CRMResetUserPasswordInput {
        [key:string]: any;
        
         
            /* 要修改的用户id */ 
            userId: number;
         
            /* 新密码 */ 
            newPassword?: string;
        
        
    }
 
    /**
     * 联系人列表Dto
     */
    export class CRMExternalContactListDto {
        [key:string]: any;
        
         
            /* 姓 */ 
            surname?: string;
         
            /* 名 */ 
            name?: string;
         
            /* 本地化名称 */ 
            localizationName?: string;
         
            /* 本地化姓 */ 
            localizationSurname?: string;
         
            /* 职位 */ 
            position?: string;
         
            /* 电话 */ 
            phone?: string;
         
            /* 电子邮件 */ 
            email?: string;
         
            /* 如果是给合作伙伴创建的location，该字段表示拥有合作伙伴的客户id */ 
            customerId?: string;
         
            /* 如果是给客户的合作伙伴创建的location,这个字段才有值 */ 
            partnerId?: string;
         
            /* 用户Id，如果有值则表示为租户用户 */ 
            userId?: number;
         
            /* 是否激活账号 */ 
            isActive?: boolean;
         
            /* 联系人所属公司名称 */ 
            companyName?: string;
         
            /* 联系人所属公司是否认证 */ 
            isVerifiedCompany?: boolean;
         
            /* 是否共享地点里的 */ 
            isShare?: boolean;
         
            
            isMaster?: boolean;
         
            /* 地点集合 */ 
            locations?: any[];
         
            /* 用户信息 */ 
            userInfo?: CRMUserListResponse;
         
            
            id?: string;
        
        
    }
 
    /**
     * 地点Dto
     */
    export class CRMExternalLocationDto {
        [key:string]: any;
        
         
            /* 邮政编码 */ 
            zip?: string;
         
            /* 街道地址 */ 
            streetAddress?: string;
         
            /* 公寓/套房/单元/建筑 */ 
            streetAddress2?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 省/洲 Id */ 
            provinceId?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 国家 */ 
            country?: string;
         
            /* 省/洲 */ 
            province?: string;
         
            /* 城市 */ 
            city?: string;
         
            /* 查看权限
0 = OnlyMyOrganization
1 = MyConnections
2 = SpecificConnections */ 
            viewableType?: number;
         
            /* 地点附加属性 */ 
            locationAddition?: CRMLocationAdditionDto;
         
            /* 如果是为合作伙伴创建才需要传值 */ 
            partnerId?: string;
         
            /* 共享的合作伙伴Id（如果是为合作伙伴创建，则无需传值） */ 
            partnerIds?: any[];
         
            /* 联系人Id集合 */ 
            contactIds?: any[];
         
            /* 客户电话 */ 
            customerTel?: string;
         
            /* 客户电话 */ 
            customerFax?: string;
         
            /* 经度 */ 
            longitude?: string;
         
            /* 纬度 */ 
            latitude?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMGetByCustomerIdsInput {
        [key:string]: any;
        
         
            
            customerIds?: any[];
         
            /* 是否开通了账号 */ 
            isRegisterUser?: boolean;
        
        
    }
 
    /**
     * 外部-客户联系人dto
     */
    export class CRMExternalCustomerContactInput {
        [key:string]: any;
        
         
            /* 名 */ 
            name: string;
         
            /* 客户Id(只有当前是业务员登录才需要传) */ 
            customerId?: string;
         
            /* 姓 */ 
            surname?: string;
         
            /* 姓-本地化 */ 
            surnameLocalization?: string;
         
            /* 名-本地化 */ 
            nameLocalization?: string;
         
            /* 电话 */ 
            phone?: string;
         
            /* 职位 */ 
            position?: string;
         
            /* 电子邮件 */ 
            email?: string;
         
            /* 如果是给客户的合作伙伴创建的location,这个字段才有值 */ 
            partnerId?: string;
         
            /* 地点Id(如果是直接给地点添加联系人才需要传值) */ 
            locationId?: string;
         
            /* 仅仅只修改联系人，不同步修改账号 */ 
            onlyUpdateContact?: boolean;
         
            /* 是否开通ICP账号 */ 
            isSignUp?: boolean;
         
            /* 用户角色 */ 
            roles?: any[];
         
            /* 在分布式事务中，该字段会自动设置为本地事务ID */ 
            txId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMSSOUser {
        [key:string]: any;
        
         
            
            customerId?: string;
         
            
            contactId?: string;
         
            
            tenantId?: number;
         
            
            id?: number;
         
            
            name?: string;
         
            
            surname?: string;
         
            
            cName?: string;
         
            
            userName?: string;
         
            
            emailAddress?: string;
         
            
            phoneNumber?: string;
         
            
            password?: string;
         
            
            isActive?: boolean;
         
            
            parentId?: number;
         
            
            link?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMContactAndSaleOutput {
        [key:string]: any;
        
         
            /* 业务员id */ 
            userId?: number;
         
            /* 姓 */ 
            surname?: string;
         
            /* 名 */ 
            name?: string;
         
            /* 职位 */ 
            position?: string;
         
            /* 公司名称 */ 
            companyName?: string;
         
            
            customerId?: string;
         
            
            partnerId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMIMContactGroupDto {
        [key:string]: any;
        
         
            /* 是否开通了主账号 */ 
            isRegistered?: boolean;
         
            /* 所属公司名称（客户名/合作伙伴名） */ 
            companyName?: string;
         
            /* 联系人集合 */ 
            contacts?: any[];
        
        
    }
 
    /**
     * IM联系人Dto
     */
    export class CRMIMContactDto {
        [key:string]: any;
        
         
            /* 用户id */ 
            userId?: number;
         
            /* 头像Id(用存储地址拼接) */ 
            profilePictureId?: string;
         
            /* 名 */ 
            name?: string;
         
            /* 姓 */ 
            surname?: string;
         
            /* 多语言名称（只是为了统一声明CName） */ 
            cName?: string;
         
            /* 电话 */ 
            phoneNumber?: string;
         
            /* 邮箱 */ 
            email?: string;
         
            /* 是否激活 */ 
            isActive?: boolean;
         
            /* 职位 */ 
            position?: string;
         
            /* 所属客户id */ 
            customerId?: string;
         
            /* 所属公司名称（客户名/合作伙伴名） */ 
            companyName?: string;
         
            /* 客户地址 */ 
            customerAddress?: string;
         
            /* 合作伙伴id */ 
            partnerId?: string;
        
        
    }
 
    /**
     * 客户生命周期
     */
    export class CRMCustomerLifeCycleDto {
        [key:string]: any;
        
         
            /* 客户Id */ 
            customerId?: string;
         
            /* 发生时间 */ 
            creationTime?: string;
         
            /* 客户生命周期状态
0 = Created
1 = Registered
2 = FirsttimeShip
3 = Cooperation
4 = NoneCooperation
5 = Shared
6 = Ownerless
7 = Partner */ 
            status?: number;
         
            /* 备注信息（用于记录如创建人、开通租户人等信息） */ 
            remark?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 客户税务
     */
    export class CRMCustomerTaxDto {
        [key:string]: any;
        
         
            /* 
0 = EIN
1 = SSN
2 = ITIN
3 = ATIN */ 
            taxType?: number;
         
            
            taxNo?: string;
         
            
            customerId?: string;
        
        
    }
 
    /**
     * 客户dto
     */
    export class CRMCustomerDto {
        [key:string]: any;
        
         
            /* 全称 */ 
            name?: string;
         
            /* 本地化全称 */ 
            localizationName?: string;
         
            /* 简称 */ 
            shortName?: string;
         
            /* 本地化简称 */ 
            localizationShortName?: string;
         
            /* 地址 */ 
            address?: string;
         
            /* 本地化地址 */ 
            localizationAddress?: string;
         
            /* 电话1 */ 
            tel?: string;
         
            /* 传真 */ 
            fax?: string;
         
            /* 关键字 */ 
            keyWord?: string;
         
            /* 邮编 */ 
            postalCode?: string;
         
            /* 邮箱 */ 
            email?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 客户类型
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            /* 客户状态
0 = NoneCooperation
1 = Cooperation
2 = Share
3 = Ownerless */ 
            status?: number;
         
            /* 审核状态
0 = NoSet
1 = UnApply
2 = Processing
3 = Passed
4 = Unpassed */ 
            state?: number;
         
            /* 审批状态
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            examineState?: number;
         
            /* 审批时间 */ 
            examineTime?: string;
         
            /* 审批人 */ 
            examineUserId?: number;
         
            /* 是否危险客户 */ 
            isDangerFlag?: boolean;
         
            /* 成交状态
0 = NotSet
1 = NoneCooperation
2 = HaveCooperation */ 
            cooperationState?: number;
         
            /* 客户归属状态
0 = NotSet
1 = NoneOwner
2 = HaveOwner */ 
            ownerState?: number;
         
            /* 是否是销售客户 */ 
            isSalesCustomer?: boolean;
         
            /* 国家id */ 
            countryId?: string;
         
            /* 国家名称 */ 
            country?: string;
         
            /* 省/洲 Id */ 
            provinceId?: string;
         
            /* 省/洲 名称 */ 
            province?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 城市名称 */ 
            city?: string;
         
            /* 贸易条款，取PUB基础数据 */ 
            incoterms?: string;
         
            /* 贸易条款显示字符 */ 
            incotermsDisplay?: string;
         
            /* 行业，取PUB基础数据 */ 
            industry?: string;
         
            /* 行业显示字符串 */ 
            industryDisplay?: string;
         
            /* 公司简介 */ 
            description?: string;
         
            /* 当前用户是否客户拥有人(true则可以修改法人实体) */ 
            isOwner?: boolean;
         
            /* 客户角色版本Id */ 
            editionRoleId?: number;
         
            /* 客户角色名称 */ 
            editionRoleName?: string;
         
            /* 是否开通了主账号 */ 
            isRegistered?: boolean;
         
            /* 拥有地点数量 */ 
            locationCount?: number;
         
            /* 联系人数量 */ 
            contactCount?: number;
         
            
            customerConfigure?: CRMCustomerConfigure;
         
            
            customerLifeCycles?: CRMCustomerLifeCycleDto[];
         
            
            customerTaxes?: CRMCustomerTaxDto[];
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerConfigure {
        [key:string]: any;
        
         
            /* 
0 = Customize
1 = T1
2 = T2
3 = T3
4 = T4 */ 
            customerLevel?: number;
         
            
            oceanAttachFee?: number;
         
            
            website?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 客户列表dto
     */
    export class CRMCustomerListDto {
        [key:string]: any;
        
         
            /* 全称 */ 
            name?: string;
         
            /* 简称 */ 
            shortName?: string;
         
            /* 本地化全称 */ 
            localizationName?: string;
         
            /* 本地化简称 */ 
            localizationShortName?: string;
         
            /* 电话1 */ 
            tel?: string;
         
            /* 传真 */ 
            fax?: string;
         
            /* 关键字 */ 
            keyWord?: string;
         
            /* 邮箱 */ 
            email?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 客户类型
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            /* 是否是销售客户 */ 
            isSalesCustomer?: boolean;
         
            /* 贸易条款，取PUB基础数据 */ 
            incoterms?: string;
         
            /* 贸易条款字符串 */ 
            incotermsStr?: string;
         
            /* 公司简介 */ 
            description?: string;
         
            /* 是否危险客户 */ 
            isDangerFlag?: boolean;
         
            /* 潜在客户状态
0 = NoSet
1 = PreliminaryContact
2 = DemandDetermination
3 = QuotedPrice
4 = Negotiation
5 = WinTheOrder
6 = LostOrder */ 
            leadTrackingPhase?: number;
         
            /* 成交状态
0 = NotSet
1 = NoneCooperation
2 = HaveCooperation */ 
            cooperationState?: number;
         
            /* 客户状态
0 = NoneCooperation
1 = Cooperation
2 = Share
3 = Ownerless */ 
            status?: number;
         
            /* 审核状态（过期）
0 = NoSet
1 = UnApply
2 = Processing
3 = Passed
4 = Unpassed */ 
            state?: number;
         
            /* 审批状态（使用这个）
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            examineState?: number;
         
            /* 审批类型-业务类型
0 = NoteSet
1 = UpdateName
2 = PostCode
3 = UpdatePhone */ 
            examineType?: number;
         
            /* 申请人 */ 
            applyUserName?: string;
         
            /* 申请日期 */ 
            applyDate?: string;
         
            /* 驳回原因 */ 
            refuseReason?: string;
         
            /* 地址 */ 
            address?: string;
         
            /* 国家名称 */ 
            country?: string;
         
            /* 国家本地化名称 */ 
            localizationCountry?: string;
         
            /* 省/洲 名称 */ 
            province?: string;
         
            /* 城市名称 */ 
            city?: string;
         
            /* 客户拥有人 */ 
            owner?: string;
         
            /* 联系人名称 */ 
            contactName?: string;
         
            /* 联系人本地名称 */ 
            localizationContactName?: string;
         
            /* 联系人电话 */ 
            contactTel?: string;
         
            /* 是否开通了主账号 */ 
            isRegistered?: boolean;
         
            /* 认领状态 0未认领，1已认领，2经理分配 */ 
            claimStatus?: number;
         
            /* 首次交易时间 */ 
            firstTradeTime?: string;
         
            /* 创建人 */ 
            creator?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 最后修改人 */ 
            lastModifier?: string;
         
            /* 最后修改时间 */ 
            lastModificationTime?: string;
         
            /* 最后修改时间 */ 
            lastModificationOrderTime?: string;
         
            /* 审核人 */ 
            auditor?: string;
         
            /* 审核时间 */ 
            auditedDate?: string;
         
            /* 无主客户推送的业务员Id（仅无主客户用） */ 
            pushUserId?: number;
         
            /* 无主客户推送的业务员姓名（仅无主客户用） */ 
            pushName?: string;
         
            /* 是否合并的 */ 
            isMerged?: boolean;
         
            /* 是否默认值(下拉数据源才用) */ 
            isDefault?: boolean;
         
            /* 共享人 */ 
            sharedUsers?: any[];
         
            /* 客户拥有的联系人集合 */ 
            contacts?: any[];
         
            /* 地点集合 */ 
            locations?: any[];
         
            /* 税务登记信息 */ 
            customerTaxes?: any[];
         
            /* 是否删除 （是否有效） */ 
            isDeleted?: boolean;
         
            /* 客户列表分类
0 = Cooperative
1 = Potential
2 = Public */ 
            classification?: number;
         
            /* 是否改名中 */ 
            isRenaming?: boolean;
         
            /* 是否修改电话中 */ 
            isChangePhone?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     * 客户访问权限类
     */
    export class CRMCustomerAccessAllowListDto {
        [key:string]: any;
        
         
            /* 客户id */ 
            customerId?: string;
         
            /* 是否拥有者 */ 
            isOwner?: boolean;
         
            /* 用户名 */ 
            userName?: string;
         
            /* 用户Id */ 
            allowUserId?: number;
         
            /* 客户关联关系类型
0 = CustomerOwner */ 
            accessAllowType?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMMergeCustomerListInput {
        [key:string]: any;
        
         
            /* 关键字 */ 
            searchText?: string;
         
            /* 排除的客户id(假如合并的就需要排除) */ 
            excludeCustomerIds?: any[];
         
            
            isAll?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     * 获取选择器客户列表条件
     */
    export class CRMGetAllForUiPickerInput {
        [key:string]: any;
        
         
            /* 
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            /* 客户状态
0 = NoneCooperation
1 = Cooperation
2 = Share
3 = Ownerless */ 
            status?: number;
         
            /* 审核状态
0 = NoSet
1 = UnApply
2 = Processing
3 = Passed
4 = Unpassed */ 
            auditState?: number;
         
            /* 客户搜索范围
0 = User
1 = Department
2 = Company
3 = AgentCustomer
4 = All */ 
            scope?: number;
         
            /* 是否包含联系人 */ 
            includeContacts?: boolean;
         
            /* 是否标记默认值 */ 
            isMarkDefault?: boolean;
         
            /* 国家id */ 
            countryId?: string;
         
            /* 是否带出地点 */ 
            includeLocations?: boolean;
         
            /* 包含没有Code的客户 */ 
            includeNoCode?: boolean;
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     * 本公司客户及绑定了客户的合作伙伴
     */
    export class CRMExternalPartnerAndCustomerDto {
        [key:string]: any;
        
         
            /* 合作伙伴Id(本公司客户则为空) */ 
            partnerId?: string;
         
            /* 客户id,如果是合作伙伴则代表合作伙伴绑定的客户id */ 
            customerId?: string;
         
            /* 合作伙伴所属客户Id */ 
            partnerCustomerId?: string;
         
            /* 公司名 */ 
            name?: string;
         
            /* 本地语言名称 */ 
            localizationName?: string;
         
            
            tel?: string;
         
            
            fax?: string;
         
            
            address?: string;
         
            
            code?: string;
         
            /* 地点集合 */ 
            locations?: any[];
        
        
    }
 
    /**
     * 无主客户Dto
     */
    export class CRMOwnerLessPagedResultDto1<T> {
        [key:string]: any;
        
         
            /* 是否是上司 */ 
            isSuperior?: boolean;
         
            
            totalCount?: number;
         
            
            items?: T[];
        
        
    }
 
    /**
     * 用于搜索客户输出(一般用于下拉框)
     */
    export class CRMSearchCustomerOutput {
        [key:string]: any;
        
         
            /* 全称 */ 
            name?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 客户类型
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            /* 是否默认选中 */ 
            isDefault?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMContactCheckDto {
        [key:string]: any;
        
         
            
            id?: string;
         
            /* 号码 */ 
            phone?: string;
         
            /* 地址 */ 
            email?: string;
         
            /* 姓 */ 
            lastname?: string;
         
            /* 名 */ 
            name?: string;
         
            /* 本地名称 */ 
            nameLocalization?: string;
         
            /* 是否主联系人 */ 
            isMaster?: boolean;
         
            /* 固定电话 */ 
            tel?: string;
        
        
    }
 
    /**
     * 创建或更新客户
     */
    export class CRMCreateOrUpdateCustomerInput {
        [key:string]: any;
        
         
            /* 全称 */ 
            name: string;
         
            /* 是否申请认证 */ 
            isAudit?: boolean;
         
            /* 全称-英文 */ 
            nameLocalization?: string;
         
            /* 简称 */ 
            shortName?: string;
         
            /* 简称-英文 */ 
            shortNameLocalization?: string;
         
            /* 地址 */ 
            address?: string;
         
            /* 地址-英文 */ 
            addressLocalization?: string;
         
            /* 电话1 */ 
            tel?: string;
         
            /* 传真 */ 
            fax?: string;
         
            /* 关键字 */ 
            keyWord?: string;
         
            /* 邮编 */ 
            postalCode?: string;
         
            /* 邮箱 */ 
            email?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 客户类型
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            /* 是否是销售客户 */ 
            isSalesCustomer?: boolean;
         
            /* 国家id */ 
            countryId?: string;
         
            /* 省/洲 Id */ 
            provinceId?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 贸易条款，取PUB基础数据 */ 
            incoterms?: string;
         
            /* 所属行业，取PUB基础数据 */ 
            industry?: string;
         
            /* 公司简介 */ 
            description?: string;
         
            /* 客户税务集合 */ 
            customerTaxes?: CRMCustomerTaxDto[];
         
            /* 客户配置级别
0 = Customize
1 = T1
2 = T2
3 = T3
4 = T4 */ 
            customerLevel?: number;
         
            /* 海运费叠加金额 */ 
            oceanAttachFee?: number;
         
            /* 潜在客户追踪阶段
0 = NoSet
1 = PreliminaryContact
2 = DemandDetermination
3 = QuotedPrice
4 = Negotiation
5 = WinTheOrder
6 = LostOrder */ 
            leadTrackingPhase?: number;
         
            /* 客户联系人 */ 
            customerContacts?: CRMContactCheckDto[];
         
            /* 客户网址 */ 
            website?: string;
         
            /* 客户角色版本id */ 
            editionRoleId?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerOutput {
        [key:string]: any;
        
         
            /* 全称 */ 
            name?: string;
         
            /* 简称 */ 
            shortName?: string;
         
            /* 电话1 */ 
            tel?: string;
         
            /* 传真 */ 
            fax?: string;
         
            /* 关键字 */ 
            keyWord?: string;
         
            /* 邮箱 */ 
            email?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 客户类型
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            /* 是否是销售客户 */ 
            isSalesCustomer?: boolean;
         
            /* 贸易条款，取PUB基础数据 */ 
            incoterms?: string;
         
            /* 公司简介 */ 
            description?: string;
         
            /* 客户状态
0 = NoneCooperation
1 = Cooperation
2 = Share
3 = Ownerless */ 
            status?: number;
         
            /* 地址 */ 
            address?: string;
         
            /* 国家名称 */ 
            country?: string;
         
            /* 省/洲 名称 */ 
            province?: string;
         
            /* 城市名称 */ 
            city?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMGetCustomerByNameInput {
        [key:string]: any;
        
         
            
            name?: string;
         
            /* 不传则取当前登录客户 */ 
            customerId?: string;
         
            
            isAll?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCheckDeleteOutput {
        [key:string]: any;
        
         
            /* ErrorType=1时显示：开通CSP账号数 */ 
            accountCount?: number;
         
            /* ErrorType=2时显示：业务员名称(业务员1、业务员2、业务员3) */ 
            createAccountUsers?: string;
         
            /* ErrorType=3时候显示：被指定合作伙伴的客户(客户名1、客户名2、客户名3) */ 
            customerNames?: string;
         
            /* ErrorType=3时候显示：绑定客户的业务员(业务员1、业务员2、业务员3) */ 
            bindUserNames?: string;
         
            /* 0.可直接删除 1.提示开通账号X个 2.业务员给客户开通了账号 3.该客户被指定为合作伙伴 */ 
            errorType?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMFollowCustomerInput {
        [key:string]: any;
        
         
            /* 客户id */ 
            customerId?: string;
         
            /* 申请审核 */ 
            applyForAudit?: boolean;
         
            /* 客户税务集合 */ 
            customerTaxes?: CRMCustomerTaxDto[];
        
        
    }
 
    /**
     * 指派/转让 客户dto
     */
    export class CRMAssignCustomerInput {
        [key:string]: any;
        
         
            /* 转让的对象（用户id） */ 
            userId: number;
         
            /* 客户id */ 
            customerIds?: any[];
        
        
    }
 
    /**
     * 客户、合作伙伴列表
     */
    export class CRMCustomerAndPartnerListDto {
        [key:string]: any;
        
         
            /* 公司名称 */ 
            name?: string;
         
            /* 客户id或合作伙伴绑定客户id */ 
            id?: string;
         
            /* 合作伙伴id */ 
            partnerId?: string;
         
            /* 联系人集合 */ 
            contacts?: any[];
         
            /* 地址集合 */ 
            locations?: any[];
        
        
    }
 
    /**
     * 简约客户模型
     */
    export class CRMShortCustomerDto {
        [key:string]: any;
        
         
            /* 全称 */ 
            name?: string;
         
            
            isDefault?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerAuthenticateDto {
        [key:string]: any;
        
         
            /* 客户id */ 
            customerId: string;
         
            /* 用户名 */ 
            userName?: string;
         
            /* 联系人id */ 
            contactId?: string;
         
            /* 是否创建联系人 */ 
            isCreateContact?: boolean;
         
            /* 是否主联系人 */ 
            isMasterContact?: boolean;
         
            /* 联系人名称 */ 
            contactName?: string;
         
            /* 联系人姓 */ 
            contactSurName?: string;
         
            /* 联系人手机 */ 
            contactPhone?: string;
         
            /* 用户版本角色名称 */ 
            editionRoleName?: string;
         
            /* 联系人姓名(详情页面显示用，不用提交) */ 
            contactFullName?: string;
         
            /* 在分布式事务中，该字段会自动设置为本地事务ID */ 
            txId?: string;
         
            /* 客户配置 */ 
            customerConfigure?: CRMCustomerConfigureDto;
         
            /* 用户版本角色 */ 
            editionRoleId?: number;
        
        
    }
 
    /**
     * 客户配置
     */
    export class CRMCustomerConfigureDto {
        [key:string]: any;
        
         
            /* 客户级别
0 = Customize
1 = T1
2 = T2
3 = T3
4 = T4 */ 
            customerLevel?: number;
         
            /* 海运费叠加金额 */ 
            oceanAttachFee?: number;
        
        
    }
 
    /**
     * 认证客户输入
     */
    export class CRMAuditCustomerInput {
        [key:string]: any;
        
         
            
            customerId?: string;
         
            
            customerTaxes?: CRMCustomerTaxDto[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMMgergeCustomerConfirm {
        [key:string]: any;
        
         
            /* 关系类型
1 = Contact
2 = Location
3 = Partner
4 = CustomerTitle
5 = Document */ 
            type?: number;
         
            
            items?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMMergeCustomerInput {
        [key:string]: any;
        
         
            /* 选择合并的客户id */ 
            customerIds?: any[];
         
            /* 保留的客户ID */ 
            keepCustomerId?: string;
         
            /* 确认数据 */ 
            data?: CRMMgergeCustomerConfirm[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMMgergeCustomerConfirmItem {
        [key:string]: any;
        
         
            /* 主键 */ 
            id?: string;
         
            /* 客户Id */ 
            customerId?: string;
         
            /* 客户名称 */ 
            customerName?: string;
         
            /* 名称 */ 
            name?: string;
         
            /* 说明 */ 
            description?: string;
         
            /* 关系类型
1 = Contact
2 = Location
3 = Partner
4 = CustomerTitle
5 = Document */ 
            type?: number;
         
            /* 是否保留 */ 
            isKeep?: boolean;
        
        
    }
 
    /**
     * 客户合并记录
     */
    export class CRMCustomerMergeLogDto {
        [key:string]: any;
        
         
            /* 合并前客户Id */ 
            originalCustomerId?: string;
         
            /* 当前客户Id */ 
            customerId?: string;
         
            /* 合并人Id */ 
            mergeUserId?: number;
         
            /* 合并人姓名 */ 
            mergeUserName?: string;
         
            /* 合并日期 */ 
            mergeDate?: string;
         
            /* 是否移除 */ 
            isDeleted?: boolean;
         
            /* 移除人 */ 
            deleterUserId?: number;
         
            /* 移除人姓名 */ 
            deleterUserName?: string;
         
            /* 移除时间 */ 
            deletionTime?: string;
         
            /* 全称 */ 
            name?: string;
         
            /* 简称 */ 
            shortName?: string;
         
            /* 本地化全称 */ 
            localizationName?: string;
         
            /* 本地化简称 */ 
            localizationShortName?: string;
         
            /* 电话1 */ 
            tel?: string;
         
            /* 传真 */ 
            fax?: string;
         
            /* 关键字 */ 
            keyWord?: string;
         
            /* 邮箱 */ 
            email?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 客户类型
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            /* 是否是销售客户 */ 
            isSalesCustomer?: boolean;
         
            /* 贸易条款，取PUB基础数据 */ 
            incoterms?: string;
         
            /* 贸易条款字符串 */ 
            incotermsStr?: string;
         
            /* 公司简介 */ 
            description?: string;
         
            /* 是否危险客户 */ 
            isDangerFlag?: boolean;
         
            /* 潜在客户状态
0 = NoSet
1 = PreliminaryContact
2 = DemandDetermination
3 = QuotedPrice
4 = Negotiation
5 = WinTheOrder
6 = LostOrder */ 
            leadTrackingPhase?: number;
         
            /* 成交状态
0 = NotSet
1 = NoneCooperation
2 = HaveCooperation */ 
            cooperationState?: number;
         
            /* 客户状态
0 = NoneCooperation
1 = Cooperation
2 = Share
3 = Ownerless */ 
            status?: number;
         
            /* 审核状态（过期）
0 = NoSet
1 = UnApply
2 = Processing
3 = Passed
4 = Unpassed */ 
            state?: number;
         
            /* 审批状态（使用这个）
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            examineState?: number;
         
            /* 审批类型-业务类型
0 = NoteSet
1 = UpdateName
2 = PostCode
3 = UpdatePhone */ 
            examineType?: number;
         
            /* 申请人 */ 
            applyUserName?: string;
         
            /* 申请日期 */ 
            applyDate?: string;
         
            /* 驳回原因 */ 
            refuseReason?: string;
         
            /* 地址 */ 
            address?: string;
         
            /* 国家名称 */ 
            country?: string;
         
            /* 国家本地化名称 */ 
            localizationCountry?: string;
         
            /* 省/洲 名称 */ 
            province?: string;
         
            /* 城市名称 */ 
            city?: string;
         
            /* 客户拥有人 */ 
            owner?: string;
         
            /* 联系人名称 */ 
            contactName?: string;
         
            /* 联系人本地名称 */ 
            localizationContactName?: string;
         
            /* 联系人电话 */ 
            contactTel?: string;
         
            /* 是否开通了主账号 */ 
            isRegistered?: boolean;
         
            /* 认领状态 0未认领，1已认领，2经理分配 */ 
            claimStatus?: number;
         
            /* 首次交易时间 */ 
            firstTradeTime?: string;
         
            /* 创建人 */ 
            creator?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 最后修改人 */ 
            lastModifier?: string;
         
            /* 最后修改时间 */ 
            lastModificationTime?: string;
         
            /* 最后修改时间 */ 
            lastModificationOrderTime?: string;
         
            /* 审核人 */ 
            auditor?: string;
         
            /* 审核时间 */ 
            auditedDate?: string;
         
            /* 无主客户推送的业务员Id（仅无主客户用） */ 
            pushUserId?: number;
         
            /* 无主客户推送的业务员姓名（仅无主客户用） */ 
            pushName?: string;
         
            /* 是否合并的 */ 
            isMerged?: boolean;
         
            /* 是否默认值(下拉数据源才用) */ 
            isDefault?: boolean;
         
            /* 共享人 */ 
            sharedUsers?: CRMCustomerAccessAllowListDto[];
         
            /* 客户拥有的联系人集合 */ 
            contacts?: CRMContactDto[];
         
            /* 地点集合 */ 
            locations?: CRMLocationDto[];
         
            /* 税务登记信息 */ 
            customerTaxes?: CRMCustomerTaxDto[];
         
            /* 客户列表分类
0 = Cooperative
1 = Potential
2 = Public */ 
            classification?: number;
         
            /* 是否改名中 */ 
            isRenaming?: boolean;
         
            /* 是否修改电话中 */ 
            isChangePhone?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     * 撤销合并客户
     */
    export class CRMRemergeCustomerInput {
        [key:string]: any;
        
         
            /* 现主客户Id */ 
            customerId?: string;
         
            /* 原客户Id */ 
            originalCustomerIds?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMConfigure {
        [key:string]: any;
        
         
            
            label?: string;
         
            
            hidden?: boolean;
         
            
            configureItemlist?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCheckConfigure {
        [key:string]: any;
        
         
            
            definitionlist?: CRMConfigure[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMConfigureCheckItem {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            label?: string;
         
            
            value?: string;
         
            
            checked?: boolean;
         
            
            disabled?: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMConfigureItem {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            label?: string;
         
            
            type?: string;
         
            
            list?: CRMConfigureCheckItem[];
         
            
            isCheckAll?: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerHighSeasPondSettingDto {
        [key:string]: any;
        
         
            /* 负责人集合 */ 
            personLiableList?: any[];
         
            /* 部门数量 */ 
            personLiableDeptCount?: number;
         
            /* 负责人数量 */ 
            personLiableCount?: number;
         
            /* 设置公海类型 */ 
            highSeasPondType?: string;
         
            /* 随机分配数量 */ 
            highSeasPondType_RandomAllocationNumber?: number;
         
            /* 随机分配单位 */ 
            highSeasPondType_RandomAllocationUnit?: string;
         
            /* 公海用户成员 */ 
            highSeasPondUsers?: any[];
         
            /* 公海成员部门数量 */ 
            highSeasPondDeptCount?: number;
         
            /* 公海成员数量 */ 
            highSeasPondUserCount?: number;
         
            /* 客资领取单位上限 */ 
            customerCapitalNum?: number;
         
            /* 客资领取单位 */ 
            customerCapitalUnit?: string;
         
            /* 客资可领取总数量 */ 
            customerCapitalTotal?: number;
         
            /* 连续领取天数限定 */ 
            dayLimit?: number;
         
            /* 回收潜在客户未跟进天数 */ 
            recovery_Potential_NotFollowedDays?: number;
         
            /* 回收潜在客户未成交天数 */ 
            recovery_Potential_NotDealDays?: number;
         
            /* 回收成交客户获取后未跟进天数 */ 
            recovery_Obtain_NotFollowedDays?: number;
         
            /* 回收成交客户获取后未成交天数 */ 
            recovery_Obtain_NotDealDays?: number;
         
            /* 成交后未再跟进天数 */ 
            recovery_Deal_NotFollowedDays?: number;
         
            /* 成交后未再成交天数 */ 
            recovery_Deal_NotDealDays?: number;
         
            /* 设置领取规则 */ 
            settingClaimRules?: any[];
         
            /* 设置成交定义 */ 
            setingDealDefinition?: number;
         
            /* 回收提醒天数 */ 
            recallReminderDays?: number;
         
            /* 退回冻结次数 */ 
            returnTimesFreeze?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     * 认领模型
     */
    export class CRMClaimCustomerInput {
        [key:string]: any;
        
         
            /* 客户Id是s */ 
            ids?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerDistributionInput {
        [key:string]: any;
        
         
            /* 分配用户 */ 
            allocationUserId?: number;
         
            /* 客户Id是s */ 
            ids?: any[];
        
        
    }
 
    /**
     * 客户转移到公海
     */
    export class CRMTurnCustomerSeaInput {
        [key:string]: any;
        
         
            /* 客户Id是s */ 
            ids?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerAccountConfigureInput {
        [key:string]: any;
        
         
            /* 客户id */ 
            customerId: string;
         
            /* 客户配置 */ 
            customerConfigure?: CRMCustomerConfigureDto;
         
            /* 用户版本角色 */ 
            editionRoleId?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMGetCustomerOrganizationOutput {
        [key:string]: any;
        
         
            /* 客户名称 */ 
            customerName?: string;
         
            /* 国家省份名称 */ 
            countryProvinceName?: string;
         
            /* 客户拥有者名称 */ 
            ownerNames?: string;
         
            /* 手机号 */ 
            tel?: string;
         
            /* 首次交易时间 */ 
            firstTradeTime?: string;
        
        
    }
 
    /**
     * 公海池客户查询
     */
    export class CRMQueryHighSeasPondCustomerInput {
        [key:string]: any;
        
         
            /* 搜索类型
0 = AssignedToMe
1 = AssignedToMyDepartment
2 = ALL
3 = CustomerRecyclingStation */ 
            searchType?: number;
         
            /* 搜索关键字 */ 
            searchkeywork?: string;
         
            
            isAll?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     * 公海池客户查询
     */
    export class CRMQueryHighSeasPondCustomerDto {
        [key:string]: any;
        
         
            /* 转手次数 */ 
            turnoverCount?: number;
         
            /* 被退回次数 */ 
            returnCount?: number;
         
            /* 是否回收站客户 */ 
            isRecycleCustomer?: boolean;
         
            /* 全称 */ 
            name?: string;
         
            /* 简称 */ 
            shortName?: string;
         
            /* 本地化全称 */ 
            localizationName?: string;
         
            /* 本地化简称 */ 
            localizationShortName?: string;
         
            /* 电话1 */ 
            tel?: string;
         
            /* 传真 */ 
            fax?: string;
         
            /* 关键字 */ 
            keyWord?: string;
         
            /* 邮箱 */ 
            email?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 客户类型
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            /* 是否是销售客户 */ 
            isSalesCustomer?: boolean;
         
            /* 贸易条款，取PUB基础数据 */ 
            incoterms?: string;
         
            /* 贸易条款字符串 */ 
            incotermsStr?: string;
         
            /* 公司简介 */ 
            description?: string;
         
            /* 是否危险客户 */ 
            isDangerFlag?: boolean;
         
            /* 潜在客户状态
0 = NoSet
1 = PreliminaryContact
2 = DemandDetermination
3 = QuotedPrice
4 = Negotiation
5 = WinTheOrder
6 = LostOrder */ 
            leadTrackingPhase?: number;
         
            /* 成交状态
0 = NotSet
1 = NoneCooperation
2 = HaveCooperation */ 
            cooperationState?: number;
         
            /* 客户状态
0 = NoneCooperation
1 = Cooperation
2 = Share
3 = Ownerless */ 
            status?: number;
         
            /* 审核状态（过期）
0 = NoSet
1 = UnApply
2 = Processing
3 = Passed
4 = Unpassed */ 
            state?: number;
         
            /* 审批状态（使用这个）
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            examineState?: number;
         
            /* 审批类型-业务类型
0 = NoteSet
1 = UpdateName
2 = PostCode
3 = UpdatePhone */ 
            examineType?: number;
         
            /* 申请人 */ 
            applyUserName?: string;
         
            /* 申请日期 */ 
            applyDate?: string;
         
            /* 驳回原因 */ 
            refuseReason?: string;
         
            /* 地址 */ 
            address?: string;
         
            /* 国家名称 */ 
            country?: string;
         
            /* 国家本地化名称 */ 
            localizationCountry?: string;
         
            /* 省/洲 名称 */ 
            province?: string;
         
            /* 城市名称 */ 
            city?: string;
         
            /* 客户拥有人 */ 
            owner?: string;
         
            /* 联系人名称 */ 
            contactName?: string;
         
            /* 联系人本地名称 */ 
            localizationContactName?: string;
         
            /* 联系人电话 */ 
            contactTel?: string;
         
            /* 是否开通了主账号 */ 
            isRegistered?: boolean;
         
            /* 认领状态 0未认领，1已认领，2经理分配 */ 
            claimStatus?: number;
         
            /* 首次交易时间 */ 
            firstTradeTime?: string;
         
            /* 创建人 */ 
            creator?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 最后修改人 */ 
            lastModifier?: string;
         
            /* 最后修改时间 */ 
            lastModificationTime?: string;
         
            /* 最后修改时间 */ 
            lastModificationOrderTime?: string;
         
            /* 审核人 */ 
            auditor?: string;
         
            /* 审核时间 */ 
            auditedDate?: string;
         
            /* 无主客户推送的业务员Id（仅无主客户用） */ 
            pushUserId?: number;
         
            /* 无主客户推送的业务员姓名（仅无主客户用） */ 
            pushName?: string;
         
            /* 是否合并的 */ 
            isMerged?: boolean;
         
            /* 是否默认值(下拉数据源才用) */ 
            isDefault?: boolean;
         
            /* 共享人 */ 
            sharedUsers?: any[];
         
            /* 客户拥有的联系人集合 */ 
            contacts?: any[];
         
            /* 地点集合 */ 
            locations?: any[];
         
            /* 税务登记信息 */ 
            customerTaxes?: any[];
         
            /* 是否删除 （是否有效） */ 
            isDeleted?: boolean;
         
            /* 客户列表分类
0 = Cooperative
1 = Potential
2 = Public */ 
            classification?: number;
         
            /* 是否改名中 */ 
            isRenaming?: boolean;
         
            /* 是否修改电话中 */ 
            isChangePhone?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerAccessAllowOutput {
        [key:string]: any;
        
         
            /* 客户id */ 
            customerId?: string;
         
            /* 用户Id */ 
            allowUserId?: number;
         
            /* 是否拥有者 */ 
            isOwner?: boolean;
         
            
            allowUserName?: string;
         
            /* 客户关联关系类型
0 = CustomerOwner */ 
            accessAllowType?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     * 获取关联客户
     */
    export class CRMQueryConnectionCustomerDto {
        [key:string]: any;
        
         
            
            zhName?: string;
         
            
            enName?: string;
         
            
            zhShortName?: string;
         
            
            enShortName?: string;
         
            
            code?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMbeforeName {
        [key:string]: any;
        
         
            /* 数据来源 1更正，2合并 */ 
            dataSource?: number;
         
            
            name?: string;
         
            
            nameLocalization?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMScheduleDto {
        [key:string]: any;
        
         
            
            remindStartTime: string;
         
            
            title: string;
         
            
            remindEndTime?: string;
         
            
            content?: string;
         
            
            remindPeople?: string;
         
            
            advanceTime?: number;
         
            /* 
0 = NotSet
1 = DIYSet
2 = Shipment
3 = Customer */ 
            scheduleType?: number;
         
            
            businessNo?: string;
         
            
            creationTime?: string;
         
            /* 
1 = Csp
2 = Icp
3 = Crm */ 
            fromSource?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     * 日志列表Dto
     */
    export class CRMTraceLogListDto {
        [key:string]: any;
        
         
            /* 内容 */ 
            content?: string;
         
            /* 点赞数 */ 
            praiseCount?: number;
         
            /* 跟进类型id */ 
            traceLogTypeId?: string;
         
            /* 跟进类型 */ 
            traceLogType?: string;
         
            /* 跟进类型Code */ 
            traceLogTypeCode?: string;
         
            /* 更进记录 */ 
            followUpRecord?: string;
         
            /* 客户Id */ 
            customerId?: string;
         
            /* 客户名称 */ 
            customerName?: string;
         
            /* 用户头像 */ 
            profilePictureId?: string;
         
            /* 用户名 */ 
            creatorUser?: string;
         
            /* 内容明细集合 */ 
            traceLogItems?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMLocationContactsDto {
        [key:string]: any;
        
         
            /* 地点联系人集合 */ 
            contacts?: any[];
         
            /* 邮政编码 */ 
            zip?: string;
         
            /* 街道地址 */ 
            streetAddress?: string;
         
            /* 公寓/套房/单元/建筑 */ 
            streetAddress2?: string;
         
            
            streetAddressEn?: string;
         
            /* 地址本地化 */ 
            streetAddressLocalization?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 省/洲 Id */ 
            provinceId?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 国家 */ 
            country?: string;
         
            /* 省/洲 */ 
            province?: string;
         
            /* 城市 */ 
            city?: string;
         
            /* 客户电话 */ 
            customerTel?: string;
         
            /* 客户传真 */ 
            customerFax?: string;
         
            /* 查看权限
0 = OnlyMyOrganization
1 = MyConnections
2 = SpecificConnections */ 
            viewableType?: number;
         
            /* 地点附加属性 */ 
            locationAddition?: CRMLocationAdditionDto;
         
            
            id?: string;
        
        
    }
 
    /**
     * 客户详情
     */
    export class CRMCustomerDetailDto {
        [key:string]: any;
        
         
            /* 潜在客户阶段
0 = NoSet
1 = PreliminaryContact
2 = DemandDetermination
3 = QuotedPrice
4 = Negotiation
5 = WinTheOrder
6 = LostOrder */ 
            leadTrackingPhase?: number;
         
            /* 是否作废 */ 
            isDeleted?: boolean;
         
            /* 归属人列表 */ 
            ownerUserList?: CRMCustomerAccessAllowOutput[];
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            lastModificationTime?: string;
         
            
            creationUser?: string;
         
            
            lastModificationUser?: string;
         
            /* 关联客户 */ 
            relatedCustomers?: CRMQueryConnectionCustomerDto[];
         
            /* 客户名称修改列表 */ 
            beforeNames?: CRMbeforeName[];
         
            /* 是否企业认证 */ 
            isEnterpriseAuth?: boolean;
         
            /* 客户日程 */ 
            scheduleList?: CRMScheduleDto[];
         
            /* 跟踪记录 */ 
            traceLogList?: CRMTraceLogListDto[];
         
            /* 客户拥有的联系人集合 */ 
            contacts?: CRMContactCheckDto[];
         
            /* 客户联系人 */ 
            customerContacts?: CRMContactCheckDto[];
         
            /* 地点集合 */ 
            locations?: CRMLocationContactsDto[];
         
            /* 是否改名中 */ 
            isRenaming?: boolean;
         
            /* 是否修改电话中 */ 
            isChangePhone?: boolean;
         
            /* 全称 */ 
            name?: string;
         
            /* 本地化全称 */ 
            localizationName?: string;
         
            /* 简称 */ 
            shortName?: string;
         
            /* 本地化简称 */ 
            localizationShortName?: string;
         
            /* 地址 */ 
            address?: string;
         
            /* 本地化地址 */ 
            localizationAddress?: string;
         
            /* 电话1 */ 
            tel?: string;
         
            /* 传真 */ 
            fax?: string;
         
            /* 关键字 */ 
            keyWord?: string;
         
            /* 邮编 */ 
            postalCode?: string;
         
            /* 邮箱 */ 
            email?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 客户类型
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            /* 客户状态
0 = NoneCooperation
1 = Cooperation
2 = Share
3 = Ownerless */ 
            status?: number;
         
            /* 审核状态
0 = NoSet
1 = UnApply
2 = Processing
3 = Passed
4 = Unpassed */ 
            state?: number;
         
            /* 审批状态
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            examineState?: number;
         
            /* 审批时间 */ 
            examineTime?: string;
         
            /* 审批人 */ 
            examineUserId?: number;
         
            /* 是否危险客户 */ 
            isDangerFlag?: boolean;
         
            /* 成交状态
0 = NotSet
1 = NoneCooperation
2 = HaveCooperation */ 
            cooperationState?: number;
         
            /* 客户归属状态
0 = NotSet
1 = NoneOwner
2 = HaveOwner */ 
            ownerState?: number;
         
            /* 是否是销售客户 */ 
            isSalesCustomer?: boolean;
         
            /* 国家id */ 
            countryId?: string;
         
            /* 国家名称 */ 
            country?: string;
         
            /* 省/洲 Id */ 
            provinceId?: string;
         
            /* 省/洲 名称 */ 
            province?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 城市名称 */ 
            city?: string;
         
            /* 贸易条款，取PUB基础数据 */ 
            incoterms?: string;
         
            /* 贸易条款显示字符 */ 
            incotermsDisplay?: string;
         
            /* 行业，取PUB基础数据 */ 
            industry?: string;
         
            /* 行业显示字符串 */ 
            industryDisplay?: string;
         
            /* 公司简介 */ 
            description?: string;
         
            /* 当前用户是否客户拥有人(true则可以修改法人实体) */ 
            isOwner?: boolean;
         
            /* 客户角色版本Id */ 
            editionRoleId?: number;
         
            /* 客户角色名称 */ 
            editionRoleName?: string;
         
            /* 是否开通了主账号 */ 
            isRegistered?: boolean;
         
            /* 拥有地点数量 */ 
            locationCount?: number;
         
            /* 联系人数量 */ 
            contactCount?: number;
         
            
            customerConfigure?: CRMCustomerConfigure;
         
            
            customerLifeCycles?: CRMCustomerLifeCycleDto[];
         
            
            customerTaxes?: CRMCustomerTaxDto[];
         
            
            id?: string;
        
        
    }
 
    /**
     * 日志子项Dto
     */
    export class CRMTraceLogItemDto {
        [key:string]: any;
        
         
            /* 日志Id */ 
            traceLogId?: string;
         
            /* 图片文件的Guid，拼接文件服务器路径组成图片url */ 
            fileId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMUpateLeadTrackingPhaseInput {
        [key:string]: any;
        
         
            /* 潜在客户追踪阶段
0 = NoSet
1 = PreliminaryContact
2 = DemandDetermination
3 = QuotedPrice
4 = Negotiation
5 = WinTheOrder
6 = LostOrder */ 
            leadTrackingPhase?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMSetCustomerDealTimeInput {
        [key:string]: any;
        
         
            /* 客户ID */ 
            customerId?: string;
         
            /* 交易时间 */ 
            dealTime?: string;
         
            /* 上次交易时间 撤销时这里为必须 */ 
            lastDealTime?: string;
         
            /* 单据类型 0运单，1订单 撤销时交易类型为上次交易类型
0 = Waybill
1 = Order */ 
            dealType?: number;
         
            /* 单据操作类型 操作类型为撤销，其他数据为空时，客户转为未成交客户
0 = Deal
1 = Revoke */ 
            operationType?: number;
         
            /* 交易业务员 */ 
            saleUserId?: number;
        
        
    }
 
    /**
     * 客户变更电话输入
     */
    export class CRMCustomerChangePhoneInput {
        [key:string]: any;
        
         
            /* 客户ID */ 
            customerId?: string;
         
            /* 申请备注 */ 
            applyRemark?: string;
         
            /* 客户电话 */ 
            phone?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMChangePhoneDetailDto {
        [key:string]: any;
        
         
            
            customerId?: string;
         
            /* 申请备注 */ 
            applyRemark?: string;
         
            
            beforePhone?: string;
         
            /* 改后数据 */ 
            afterPhone?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 客户变更电话审批
     */
    export class CRMCustomerChangePhoneApprovalInput {
        [key:string]: any;
        
         
            /* 审批备注 */ 
            approvalReamrk?: string;
         
            /* 审批状态
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            approvalState?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     * 客户关联客户列表查询 组织结构
     */
    export class CRMQueryConnectionCustomersInput {
        [key:string]: any;
        
         
            /* 源客户id */ 
            sourceCustomerId?: string;
         
            /* 是否带出税务信息 */ 
            includeTaxes?: boolean;
         
            /* 是否带出联系人集合 */ 
            includeContacts?: boolean;
         
            /* 是否带出共享人 */ 
            includeShareOwner?: boolean;
         
            /* 是否加载SSO用户信息 */ 
            loadUser?: boolean;
         
            /* 带出的联系人是否开通CSP账号 */ 
            isUserContact?: boolean;
         
            /* 是否获取所有用户 默认获取已经删除客户 */ 
            isAll?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMRelationCustomerInput {
        [key:string]: any;
        
         
            /* 客户Id */ 
            mainCustomerId?: string;
         
            /* 关联客户id */ 
            relationCustomerIds?: any[];
        
        
    }
 
    /**
     * 获取可关联客户列表
     */
    export class CRMQueryConnectionCustomerInput {
        [key:string]: any;
        
         
            /* 输入关键字 */ 
            searchText?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerCommunalCheckInput {
        [key:string]: any;
        
         
            
            searchText?: string;
         
            
            checkMode?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCheckCustomerDto {
        [key:string]: any;
        
         
            /* 验证是否通过 */ 
            isAdopt?: boolean;
         
            /* 验证方式 */ 
            verifyMode?: string;
         
            
            isAllowAdd?: boolean;
         
            
            totalCount?: number;
         
            /* 重复数据 */ 
            validationErrors?: object;
        
        
    }
 
    /**
     * 客户详情
     */
    export class CRMFAMCustomerDto {
        [key:string]: any;
        
         
            /* 归属人列表 */ 
            ownerUserList?: CRMCustomerAccessAllowOutput[];
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            lastModificationTime?: string;
         
            
            creationUser?: string;
         
            
            lastModificationUser?: string;
         
            /* 关联客户 */ 
            relatedCustomers?: CRMQueryConnectionCustomerDto[];
         
            /* 客户名称修改列表 */ 
            beforeNames?: CRMbeforeName[];
         
            /* 是否改名中 */ 
            isRenaming?: boolean;
         
            /* 是否修改电话中 */ 
            isChangePhone?: boolean;
         
            /* 潜在客户阶段
0 = NoSet
1 = PreliminaryContact
2 = DemandDetermination
3 = QuotedPrice
4 = Negotiation
5 = WinTheOrder
6 = LostOrder */ 
            leadTrackingPhase?: number;
         
            /* 全称 */ 
            name?: string;
         
            /* 本地化全称 */ 
            localizationName?: string;
         
            /* 简称 */ 
            shortName?: string;
         
            /* 本地化简称 */ 
            localizationShortName?: string;
         
            /* 地址 */ 
            address?: string;
         
            /* 本地化地址 */ 
            localizationAddress?: string;
         
            /* 电话1 */ 
            tel?: string;
         
            /* 传真 */ 
            fax?: string;
         
            /* 关键字 */ 
            keyWord?: string;
         
            /* 邮编 */ 
            postalCode?: string;
         
            /* 邮箱 */ 
            email?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 客户类型
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            /* 客户状态
0 = NoneCooperation
1 = Cooperation
2 = Share
3 = Ownerless */ 
            status?: number;
         
            /* 审核状态
0 = NoSet
1 = UnApply
2 = Processing
3 = Passed
4 = Unpassed */ 
            state?: number;
         
            /* 审批状态
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            examineState?: number;
         
            /* 审批时间 */ 
            examineTime?: string;
         
            /* 审批人 */ 
            examineUserId?: number;
         
            /* 是否危险客户 */ 
            isDangerFlag?: boolean;
         
            /* 成交状态
0 = NotSet
1 = NoneCooperation
2 = HaveCooperation */ 
            cooperationState?: number;
         
            /* 客户归属状态
0 = NotSet
1 = NoneOwner
2 = HaveOwner */ 
            ownerState?: number;
         
            /* 是否是销售客户 */ 
            isSalesCustomer?: boolean;
         
            /* 国家id */ 
            countryId?: string;
         
            /* 国家名称 */ 
            country?: string;
         
            /* 省/洲 Id */ 
            provinceId?: string;
         
            /* 省/洲 名称 */ 
            province?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 城市名称 */ 
            city?: string;
         
            /* 贸易条款，取PUB基础数据 */ 
            incoterms?: string;
         
            /* 贸易条款显示字符 */ 
            incotermsDisplay?: string;
         
            /* 行业，取PUB基础数据 */ 
            industry?: string;
         
            /* 行业显示字符串 */ 
            industryDisplay?: string;
         
            /* 公司简介 */ 
            description?: string;
         
            /* 当前用户是否客户拥有人(true则可以修改法人实体) */ 
            isOwner?: boolean;
         
            /* 客户角色版本Id */ 
            editionRoleId?: number;
         
            /* 客户角色名称 */ 
            editionRoleName?: string;
         
            /* 是否开通了主账号 */ 
            isRegistered?: boolean;
         
            /* 拥有地点数量 */ 
            locationCount?: number;
         
            /* 联系人数量 */ 
            contactCount?: number;
         
            
            customerConfigure?: CRMCustomerConfigure;
         
            
            customerLifeCycles?: CRMCustomerLifeCycleDto[];
         
            
            customerTaxes?: CRMCustomerTaxDto[];
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCheckRepeatNameInput {
        [key:string]: any;
        
         
            /* 名称 */ 
            name?: string;
         
            /* 本地化语言名称 */ 
            nameLocalization?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 名称变更审批
     */
    export class CRMCustomerRenamingApprovalInput {
        [key:string]: any;
        
         
            /* 审批备注 */ 
            approvalReamrk?: string;
         
            /* 审批状态
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            approvalState?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     * 客户改名详情
     */
    export class CRMRenamingDetailDto {
        [key:string]: any;
        
         
            
            customerId?: string;
         
            /* 申请备注 */ 
            applyRemark?: string;
         
            /* 申请前数据 */ 
            renamingBefore?: CRMRenamingDto;
         
            /* 改名后数据 */ 
            renamingAfter?: CRMRenamingDto;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMRenamingDto {
        [key:string]: any;
        
         
            
            name?: string;
         
            
            nameLocalization?: string;
        
        
    }
 
    /**
     * 客户改名申请
     */
    export class CRMCustomerApplyModifyNameInput {
        [key:string]: any;
        
         
            
            customerId?: string;
         
            /* 申请备注 */ 
            applyRemark?: string;
         
            
            name?: string;
         
            
            nameLocalization?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMGetAccessAllowsByCustomerInput {
        [key:string]: any;
        
         
            /* 客户id */ 
            customerIds?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMQueryCustomerAccessAllowDto {
        [key:string]: any;
        
         
            /* 名称 */ 
            name?: string;
         
            /* 职位id */ 
            positionId?: string;
         
            /* 职位名称 */ 
            positionName?: string;
         
            /* 客户角色
0 = CustomerOwner */ 
            accessAllowType?: number;
         
            /* 不传则取当前登录客户 */ 
            customerId?: string;
         
            
            isAll?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     * 创建或更客户访问权限
     */
    export class CRMCreateOrUpdateAccessAllowInput {
        [key:string]: any;
        
         
            /* 客户id */ 
            customerId?: string;
         
            /* 用户Id */ 
            allowUserId?: number;
         
            /* 是否拥有者 */ 
            isOwner?: boolean;
         
            /* 客户客户访问权限角色类型
0 = CustomerOwner */ 
            accessAllowType?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     * 税务
     */
    export class CRMCustomerTaxInput {
        [key:string]: any;
        
         
            /* 税务类型
0 = EIN
1 = SSN
2 = ITIN
3 = ATIN */ 
            taxType: number;
         
            /* 税务号 */ 
            taxNo: string;
        
        
    }
 
    /**
     * 申请客户代码
     */
    export class CRMPostCodeInput {
        [key:string]: any;
        
         
            /* 税务列表 */ 
            customerTaxes?: CRMCustomerTaxInput[];
         
            /* 客户电话 */ 
            phone?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 审批代码详情内容
     */
    export class CRMExcmineCodeDto {
        [key:string]: any;
        
         
            
            customerTaxs?: CRMCustomerTaxDto[];
         
            /* 电话 */ 
            phone?: string;
         
            /* 客户Id */ 
            customerId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 代码审批
     */
    export class CRMExamineCodeInput {
        [key:string]: any;
        
         
            /* 客户Id */ 
            customerId: string;
         
            /* 审批状态
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            examineState: number;
         
            /* 代码 */ 
            code?: string;
         
            /* 驳回原因 */ 
            refuseReason?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMUserDetailInfo {
        [key:string]: any;
        
         
            
            customerId?: string;
         
            
            tenantId?: number;
         
            
            tenantName?: string;
         
            
            name?: string;
         
            
            surname?: string;
         
            
            fullName?: string;
         
            
            nameLocalization?: string;
         
            
            surnameLocalization?: string;
         
            
            userName?: string;
         
            
            emailAddress?: string;
         
            
            hasEmailPassword?: boolean;
         
            
            phoneNumber?: string;
         
            
            profilePictureId?: string;
         
            
            isEmailConfirmed?: boolean;
         
            
            roles?: any[];
         
            
            isActive?: boolean;
         
            
            isValid?: boolean;
         
            
            status?: string;
         
            /* 
0 = Internal
1 = External */ 
            type?: number;
         
            
            creator?: string;
         
            
            creationTime?: string;
         
            
            id?: number;
        
        
    }
 
    /**
     * 根据客户获取租户输出
     */
    export class CRMGetByCustomerIdsOutput {
        [key:string]: any;
        
         
            
            customerId?: string;
         
            
            name?: string;
         
            /* 本地化名称 */ 
            localizationName?: string;
         
            
            localizationText?: string;
         
            
            tenantId?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMGetCustomerAndPartnerOutput {
        [key:string]: any;
        
         
            /* 客户Id(如果是合作伙伴，则表示合作伙伴绑定的customerId) */ 
            customerId?: string;
         
            /* 合作伙伴id(如果是客户自己，则空) */ 
            partnerId?: string;
         
            /* 客户名称/合作伙伴名称 */ 
            companyName?: string;
         
            /* 拥有地点数量 */ 
            locationCount?: number;
         
            /* 联系人数量 */ 
            contactCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerAndContactDto {
        [key:string]: any;
        
         
            /* 客户id或询价人id */ 
            id?: string;
         
            /* 客户名或询价人名 */ 
            name?: string;
         
            /* 0是客户CustomerId，1是询价联系人ContactId */ 
            type?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMGetCustomerByNamesInput {
        [key:string]: any;
        
         
            
            names?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCompanyCustomerOutput {
        [key:string]: any;
        
         
            /* 公司ID */ 
            companyId?: string;
         
            /* 公司名称 */ 
            companyName?: string;
         
            /* 客户ID */ 
            customerId?: string;
         
            /* 客户名称 */ 
            customerName?: string;
         
            /* 客户英文名 */ 
            localizationCustomerName?: string;
         
            /* 客户编码 */ 
            code?: string;
         
            /* 客户电话 */ 
            customerTel?: string;
         
            /* 客户传真 */ 
            customerFax?: string;
         
            /* 客户地址 */ 
            customerAddress?: string;
         
            /* 标准币种ID */ 
            standardCurrencyId?: string;
         
            /* 标准币种ID */ 
            standardCurrencyName?: string;
         
            /* 是否有效 */ 
            isActive?: boolean;
         
            /* 默认值 */ 
            isDefault?: boolean;
         
            /* 地址集合 */ 
            locations?: any[];
        
        
    }
 
    /**
     * 转为客户Dto
     */
    export class CRMBecomeCooperationInput {
        [key:string]: any;
        
         
            /* 客户id */ 
            customerIds?: any[];
         
            /* 业务员Id */ 
            saleUserId?: number;
        
        
    }
 
    /**
     * 创建或更新客户
     */
    export class CRMIcpCreateOrUpdateCustomerInput {
        [key:string]: any;
        
         
            /* 全称 */ 
            name: string;
         
            /* 全称-中文 */ 
            nameLocalization?: string;
         
            /* 简称 */ 
            shortName?: string;
         
            /* 简称-中文 */ 
            shortNameLocalization?: string;
         
            /* 地址 */ 
            address?: string;
         
            /* 地址-中文 */ 
            addressLocalization?: string;
         
            /* 电话1 */ 
            tel?: string;
         
            /* 传真 */ 
            fax?: string;
         
            /* 关键字 */ 
            keyWord?: string;
         
            /* 是否承运人 */ 
            isCarrier?: boolean;
         
            /* 是否公司货 */ 
            isCompanyGoods?: boolean;
         
            /* 邮编 */ 
            postalCode?: string;
         
            /* 邮箱 */ 
            email?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 客户类型
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            /* 国家id */ 
            countryId?: string;
         
            /* 省/洲 Id */ 
            provinceId?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 贸易条款，取PUB基础数据 */ 
            incoterms?: string;
         
            /* 公司简介 */ 
            description?: string;
         
            /* 
0 = EIN
1 = SSN
2 = ITIN
3 = ATIN */ 
            taxIdType?: number;
         
            
            taxIdNo?: string;
         
            /* 合并客户id,如无合并一般与主键一样 */ 
            mergerId?: string;
         
            /* 是否危险客户 */ 
            isDangerFlag?: boolean;
         
            
            icpUserId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 创建或更新客户
     */
    export class CRMIcpUpdateCustomerCodeInput {
        [key:string]: any;
        
         
            /* 代码 */ 
            code?: string;
         
            /* 审核状态
0 = NoSet
1 = UnApply
2 = Processing
3 = Passed
4 = Unpassed */ 
            state?: number;
         
            
            icpUserId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 获取活动记录列表输入对象
     */
    export class CRMGetAllInput {
        [key:string]: any;
        
         
            /* 客户Id必传 */ 
            customerId: string;
         
            /* 搜索关键词 */ 
            searchKey?: string;
         
            /* 偏移天数 */ 
            offsetDay?: number;
         
            /* 业务类型 */ 
            businessTypes?: any[];
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerOperationEventDto {
        [key:string]: any;
        
         
            /* 归属业务Id */ 
            businessId?: string;
         
            /* 这里指事件的标题 */ 
            contentLocalizationText?: string;
         
            /* 业务类型
0 = NotSet
1 = TeamMember
2 = CustomerInfo
3 = TrackRecord
4 = Schedule
5 = Email */ 
            businessType?: number;
         
            /* 创建时间 */ 
            creationTime?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCreateInput {
        [key:string]: any;
        
         
            
            customerId?: string;
         
            /* 
1 = CancelLocation
2 = EnableLocation
3 = DownloadDocument
4 = DeleteDocument
5 = PrintDocument */ 
            customerOperatorType?: number;
        
        
    }
 
    /**
     * 客户解决方案申请列表模型
     */
    export class CRMCustomerSolutionApplyListDto {
        [key:string]: any;
        
         
            /* 代理类型
0 = Normal
1 = ThirdParty
2 = SpecialRequirements */ 
            agentType?: number;
         
            /* 申请时间 */ 
            creationTime?: string;
         
            /* 申请人 */ 
            creatorUser?: string;
         
            /* 申请备注 */ 
            applyRemark?: string;
         
            /* 回复人 */ 
            replierUser?: string;
         
            /* 回复时间 */ 
            replyTime?: string;
         
            /* 代理 */ 
            agentCustomer?: string;
         
            /* 申请状态
0 = WaitingReply
1 = Pass
2 = Reject */ 
            status?: number;
         
            /* 起运港 */ 
            originPort?: string;
         
            /* 目的港 */ 
            destinationPort?: string;
         
            /* 目的地 */ 
            destinationAddress?: string;
         
            /* 业务Id */ 
            businessId?: string;
         
            /* 业务编号 */ 
            businessNo?: string;
         
            /* 业务类型
0 = Shipment */ 
            businessType?: number;
         
            /* 目的国 */ 
            countryId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 申请客户解决方案Dto
     */
    export class CRMCustomerSolutionApplyInput {
        [key:string]: any;
        
         
            /* 业务Id */ 
            businessId?: string;
         
            /* 业务号 */ 
            businessNo?: string;
         
            /* 业务类型
0 = Shipment */ 
            businessType?: number;
         
            /* 代理类型
0 = Normal
1 = ThirdParty
2 = SpecialRequirements */ 
            agentType?: number;
         
            /* 申请备注 */ 
            applyRemark?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 用于审核显示
     */
    export class CRMCustomerSolutionForAudit {
        [key:string]: any;
        
         
            /* 申请时间 */ 
            creationTime?: string;
         
            /* 申请人 */ 
            creatorUser?: string;
         
            /* 申请状态
0 = WaitingReply
1 = Pass
2 = Reject */ 
            status?: number;
         
            /* 业务Id */ 
            businessId?: string;
         
            /* 业务号 */ 
            businessNo?: string;
         
            /* 业务类型
0 = Shipment */ 
            businessType?: number;
         
            /* 代理类型
0 = Normal
1 = ThirdParty
2 = SpecialRequirements */ 
            agentType?: number;
         
            /* 申请备注 */ 
            applyRemark?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 审核提交信息
     */
    export class CRMCustomerSolutionAuditInput {
        [key:string]: any;
        
         
            /* 申请id */ 
            ids?: any[];
         
            /* 申请状态 */ 
            isPass?: boolean;
         
            /* 代理客户id */ 
            customerId?: string;
         
            /* 回复备注 */ 
            replyRemark?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerTitleDto {
        [key:string]: any;
        
         
            /* 归属客户Id */ 
            customerId: string;
         
            /* 名称 */ 
            name: string;
         
            /* 税号 */ 
            tfn: string;
         
            /* 地址 */ 
            address: string;
         
            /* 电话 */ 
            tel: string;
         
            /* 开户银行 */ 
            bank: string;
         
            /* 银行账号1 */ 
            bankAccount1: string;
         
            /* 币种1 */ 
            currency1: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 是否默认 */ 
            isDefault?: boolean;
         
            /* 银行账号2 */ 
            bankAccount2?: string;
         
            /* 币种2 */ 
            currency2?: string;
         
            /* 发票类型
1 = SVAT
2 = PVAT
3 = EVAT */ 
            type?: number;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerTitleListDto {
        [key:string]: any;
        
         
            /* 归属客户Id */ 
            customerId?: string;
         
            /* 名称 */ 
            name?: string;
         
            /* 代码 */ 
            code?: string;
         
            /* 税号 */ 
            tfn?: string;
         
            /* 地址 */ 
            address?: string;
         
            /* 电话 */ 
            tel?: string;
         
            /* 是否默认 */ 
            isDefault?: boolean;
         
            /* 开户银行 */ 
            bank?: string;
         
            /* 银行账号1 */ 
            bankAccount1?: string;
         
            /* 币种1 */ 
            currency1?: string;
         
            /* 银行账号2 */ 
            bankAccount2?: string;
         
            /* 币种2 */ 
            currency2?: string;
         
            /* 发票类型
1 = SVAT
2 = PVAT
3 = EVAT */ 
            type?: number;
         
            /* 是否有效 */ 
            isValid?: boolean;
         
            /* 创建人 */ 
            creator?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerTitleSetValidDto {
        [key:string]: any;
        
         
            
            id?: string;
        
        
    }
 
    /**
     * 发送邮件输入对象
     */
    export class CRMSeedEmailInput {
        [key:string]: any;
        
         
            /* 客户Id */ 
            customerId: string;
         
            /* 发件人 */ 
            from: string;
         
            /* 发件人用户Id */ 
            fromUserId: number;
         
            /* 收件人 */ 
            to: any[];
         
            /* 主题 */ 
            subject: string;
         
            /* 主体内容 */ 
            body: string;
         
            /* 收件人邮箱密码 */ 
            fromPassword?: string;
         
            /* 抄送 */ 
            cc?: any[];
         
            /* 密送 */ 
            bcc?: any[];
         
            /* 附件 */ 
            attachments?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMQueryCrmEnquiryInput {
        [key:string]: any;
        
         
            /* 年份 */ 
            year?: number;
         
            
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
    export class CRMCrmEnquiryModel {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            quoteNo?: string;
         
            
            ownerCustomerId?: string;
         
            
            ownerUserId?: number;
         
            
            ownerCustomer?: CRMCompanyOrOrganizationModel;
         
            
            ownerUser?: CRMUserModel;
         
            /* 
0 = NotSet
1 = Ocean
2 = Air */ 
            freightMethodType?: number;
         
            
            cargoReadyDate?: string;
         
            
            deliveryDate?: string;
         
            /* 
0 = NoSet
1 = Active
2 = Accepted
3 = Expired
4 = Rejected */ 
            status?: number;
         
            
            fromAddressModel?: CRMPortModel;
         
            
            fromPortModel?: CRMPortModel;
         
            
            truckOriginAddressName?: string;
         
            
            toAddressModel?: CRMPortModel;
         
            
            toPortModel?: CRMPortModel;
         
            
            truckDestinationAddressName?: string;
         
            /* 
0 = NotSet
1 = General
2 = ECommerce */ 
            tradeType?: number;
         
            
            creationTime?: string;
         
            
            carrierId?: string;
         
            
            carrierCode?: string;
         
            
            currencyId?: string;
         
            
            currencyName?: string;
         
            
            carrierLogo?: string;
         
            
            containerPrice?: CRMContainerPrice;
         
            /* 
0 = NotSet
1 = Container
2 = Ticket
3 = Weight
4 = Volume */ 
            unitType?: number;
         
            
            notContainerPrice?: string;
         
            
            notContainerPrice1?: object;
         
            
            unitTotal?: string;
         
            
            unitTotal1?: object;
         
            
            fromDate?: string;
         
            
            endDate?: string;
         
            
            lastModificationTime?: string;
         
            
            isQuoteReply?: boolean;
         
            
            from?: string;
         
            
            to?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCompanyOrOrganizationModel {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            name?: CRMLocalizationText;
         
            
            displayName?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMUserModel {
        [key:string]: any;
        
         
            
            id?: number;
         
            
            name?: CRMLocalizationText;
         
            
            displayName?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMPortModel {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            code?: string;
         
            
            fullName?: CRMLocalizationText;
         
            
            displayFullName?: string;
         
            
            isOcean?: boolean;
         
            
            isAir?: boolean;
         
            
            isOther?: boolean;
         
            
            longitude?: string;
         
            
            latitude?: string;
         
            
            name?: CRMLocalizationText;
         
            
            displayName?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMContainerPrice {
        [key:string]: any;
        
         
            
            '45FR'?: number;
         
            
            '40RF'?: number;
         
            
            '45HT'?: number;
         
            
            '20RF'?: number;
         
            
            '20HQ'?: number;
         
            
            '20TK'?: number;
         
            
            '40HP'?: number;
         
            
            '20GP'?: number;
         
            
            '45HP'?: number;
         
            
            '40TK'?: number;
         
            
            '400T'?: number;
         
            
            '20FR'?: number;
         
            
            '53HQ'?: number;
         
            
            '45GP'?: number;
         
            
            '40GP'?: number;
         
            
            '45RF'?: number;
         
            
            '20RH'?: number;
         
            
            '450T'?: number;
         
            
            '40NOR'?: number;
         
            
            '40FR'?: number;
         
            
            '200T'?: number;
         
            
            '45TK'?: number;
         
            
            '20NOR'?: number;
         
            
            '40HT'?: number;
         
            
            '40RH'?: number;
         
            
            '45RH'?: number;
         
            
            '45HQ'?: number;
         
            
            '20HT'?: number;
         
            
            '40HQ'?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMLocalizationText {
        [key:string]: any;
        
         
            
            zh?: string;
         
            
            en?: string;
         
            
            display?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMEsPageQueryInput {
        [key:string]: any;
        
         
            
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
    export class CRMCrmCustomerModel {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            code?: string;
         
            /* 
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            examineState?: number;
         
            /* 
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            updateNameExamineState?: number;
         
            
            name?: CRMCoNameModel;
         
            
            sName?: CRMCoNameModel;
         
            
            tel?: string;
         
            
            fax?: string;
         
            
            countryId?: string;
         
            
            country?: CRMCoAddressModel;
         
            
            allowUserIds?: string;
         
            
            allowUserZhs?: string;
         
            
            allowUserEns?: string;
         
            
            creatorUserId?: number;
         
            
            createUser?: CRMUserModel;
         
            /* 
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            
            creationTime?: string;
         
            
            lastModificationTime?: string;
         
            
            examineTime?: string;
         
            
            examineUserId?: number;
         
            
            examineUser?: CRMUserModel;
         
            
            isDangerFlag?: boolean;
         
            
            isDeleted?: boolean;
         
            /* 
0 = NotSet
1 = NoneCooperation
2 = HaveCooperation */ 
            cooperationState?: number;
         
            /* 
0 = NotSet
1 = NoneOwner
2 = HaveOwner */ 
            ownerState?: number;
         
            
            isHaveCspAcount?: boolean;
         
            
            isMergerCustomer?: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCoNameModel {
        [key:string]: any;
        
         
            
            name?: CRMCoLocalizationText;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCoAddressModel {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            code?: string;
         
            
            name?: CRMLocalizationText;
         
            
            fullName?: CRMLocalizationText;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCoLocalizationText {
        [key:string]: any;
        
         
            
            zh?: string;
         
            
            en?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCrmCustomerExamineModel {
        [key:string]: any;
        
         
            /* 
0 = NoteSet
1 = UpdateName
2 = PostCode
3 = UpdatePhone */ 
            examineType?: number;
         
            
            customerId?: string;
         
            
            petitionerId?: number;
         
            
            petitionerUser?: CRMUserModel;
         
            
            applyTime?: string;
         
            
            refuseReason?: string;
         
            
            id?: string;
         
            
            code?: string;
         
            /* 
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            examineState?: number;
         
            /* 
0 = NotSet
1 = WaitingExamine
2 = PassExamine
3 = RefuseExamine */ 
            updateNameExamineState?: number;
         
            
            name?: CRMCoNameModel;
         
            
            sName?: CRMCoNameModel;
         
            
            tel?: string;
         
            
            fax?: string;
         
            
            countryId?: string;
         
            
            country?: CRMCoAddressModel;
         
            
            allowUserIds?: string;
         
            
            allowUserZhs?: string;
         
            
            allowUserEns?: string;
         
            
            creatorUserId?: number;
         
            
            createUser?: CRMUserModel;
         
            /* 
1 = Carrier
2 = AirLine
3 = Forwarding
4 = DirectClient
5 = Trucker
6 = CustomsBroker
7 = WareHouse
8 = Storage
9 = RailWay
10 = Express
11 = Terminal
12 = Other */ 
            customerType?: number;
         
            
            creationTime?: string;
         
            
            lastModificationTime?: string;
         
            
            examineTime?: string;
         
            
            examineUserId?: number;
         
            
            examineUser?: CRMUserModel;
         
            
            isDangerFlag?: boolean;
         
            
            isDeleted?: boolean;
         
            /* 
0 = NotSet
1 = NoneCooperation
2 = HaveCooperation */ 
            cooperationState?: number;
         
            /* 
0 = NotSet
1 = NoneOwner
2 = HaveOwner */ 
            ownerState?: number;
         
            
            isHaveCspAcount?: boolean;
         
            
            isMergerCustomer?: boolean;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMEntityDto1<T> {
        [key:string]: any;
        
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCrmCustomerChangeEventDto {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            lastModificationTime?: string;
         
            
            pageIndex?: number;
         
            
            pageSize?: number;
         
            
            eventTime?: string;
         
            
            eventSource?: object;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCrmCustomerExamineChangeEventDto {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            lastModificationTime?: string;
         
            
            pageIndex?: number;
         
            
            pageSize?: number;
         
            
            eventTime?: string;
         
            
            eventSource?: object;
        
        
    }
 
    /**
     * crm的客户权限筛选
     */
    export class CRMCrmEsPageQueryInput {
        [key:string]: any;
        
         
            /* 查询的客户列表类型
0 = NoneCooperation
1 = Cooperation
2 = Share
3 = Ownerless */ 
            customerStatus?: number;
         
            
            searchText?: string;
         
            
            orderBy?: object;
         
            
            dynamicQuery?: object;
         
            
            incluedFields?: any[];
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     * 创建或更新地点Dto
     */
    export class CRMCreateOrUpdateLocationInput {
        [key:string]: any;
        
         
            /* 地点名称 */ 
            name: string;
         
            /* 为哪个客户创建的 */ 
            customerId: string;
         
            /* 邮政编码 */ 
            zip?: string;
         
            /* 街道地址 */ 
            streetAddress?: string;
         
            /* 公寓/套房/单元/建筑 */ 
            streetAddress2?: string;
         
            /* 地址本地化 */ 
            streetAddressLocalization?: string;
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 省/洲 Id */ 
            provinceId?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 查看权限
0 = OnlyMyOrganization
1 = MyConnections
2 = SpecificConnections */ 
            viewableType?: number;
         
            /* 地点附加属性 */ 
            locationAddition?: CRMLocationAdditionDto;
         
            /* 如果是为合作伙伴创建才需要传值 */ 
            partnerId?: string;
         
            /* 共享的合作伙伴Id（如果是为合作伙伴创建，则无需传值） */ 
            partnerIds?: any[];
         
            /* 联系人Id集合 */ 
            contactIds?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     * 地点列表输出
     */
    export class CRMLocationListDto {
        [key:string]: any;
        
         
            /* 邮政编码 */ 
            zip?: string;
         
            /* 街道地址 */ 
            streetAddress?: string;
         
            /* 本地化地址 */ 
            streetAddressEn?: string;
         
            /* 本地化地址 */ 
            streetAddressLocalization?: string;
         
            /* 公寓/套房/单元/建筑 */ 
            streetAddress2?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 国家 */ 
            country?: string;
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 省/洲 */ 
            province?: string;
         
            /* 城市 */ 
            city?: string;
         
            /* 创建人 */ 
            creator?: string;
         
            /* 修改人 */ 
            lastModifier?: string;
         
            /* 是否海外仓 */ 
            isForeign?: boolean;
         
            
            isDeleted?: boolean;
         
            /* 查看权限
0 = OnlyMyOrganization
1 = MyConnections
2 = SpecificConnections */ 
            viewableType?: number;
         
            /* 地点附加属性 */ 
            locationAddition?: CRMLocationAdditionDto;
         
            /* 关联的联系人 */ 
            contacts?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     * 赋值地点到用户dto
     */
    export class CRMAssignUsersToLocationDto {
        [key:string]: any;
        
         
            /* 地点id */ 
            locationId?: string;
         
            /* 联系人Id集合 */ 
            contactIds?: any[];
        
        
    }
 
    /**
     * 赋值地点给用户Dto
     */
    export class CRMAssignLocationsToUserDto {
        [key:string]: any;
        
         
            /* 联系人Id */ 
            contactId?: string;
         
            /* 地点id集合 */ 
            locationIds?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMUnbindUsersLocationDto {
        [key:string]: any;
        
         
            /* 地点Id */ 
            locationId?: string;
         
            /* 联系人Id */ 
            contactId?: string;
        
        
    }
 
    /**
     * 地点列表输出
     */
    export class CRMExternalLocationListDto {
        [key:string]: any;
        
         
            /* 邮政编码 */ 
            zip?: string;
         
            /* 街道地址 */ 
            streetAddress?: string;
         
            /* 公寓/套房/单元/建筑 */ 
            streetAddress2?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 国家 */ 
            country?: string;
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 省/洲 */ 
            province?: string;
         
            /* 省/洲 ID */ 
            provinceId?: string;
         
            /* 城市 */ 
            city?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 查看权限
0 = OnlyMyOrganization
1 = MyConnections
2 = SpecificConnections */ 
            viewableType?: number;
         
            /* 合作伙伴Id */ 
            partnerId?: string;
         
            /* 租户Id（已弃用） */ 
            tenantId?: number;
         
            /* 租户名称/客户名称（已弃用） */ 
            tenantName?: string;
         
            /* 客户Id */ 
            customerId?: string;
         
            /* 客户名称 */ 
            customerName?: string;
         
            /* 港口贸易代码 */ 
            unlocode?: string;
         
            /* 地点所属公司是否认证 */ 
            isVerifiedCompany?: boolean;
         
            /* 是否别人分享的 */ 
            isShare?: boolean;
         
            /* 经度 */ 
            longitude?: string;
         
            /* 纬度 */ 
            latitude?: string;
         
            /* 地点类型
0 = Normal
1 = FBA */ 
            locationType?: number;
         
            /* 关联的联系人 */ 
            contacts?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     * 联系人Dto
     */
    export class CRMExternalContactDto {
        [key:string]: any;
        
         
            /* 姓 */ 
            surname?: string;
         
            /* 名 */ 
            name?: string;
         
            /* 电话 */ 
            phone?: string;
         
            /* 电子邮件 */ 
            email?: string;
         
            /* 备注 */ 
            remark?: string;
         
            /* 固话 */ 
            tel?: string;
         
            /* 职位 */ 
            position?: string;
         
            /* Msn */ 
            msn?: string;
         
            /* 是否主联系人 */ 
            isMaster?: boolean;
         
            /* 如果是给合作伙伴创建的location，该字段表示拥有合作伙伴的客户id */ 
            customerId?: string;
         
            /* 如果是给客户的合作伙伴创建的location,这个字段才有值 */ 
            partnerId?: string;
         
            /* 用户Id，如果有值则表示为租户用户 */ 
            userId?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMFBALocationListDto {
        [key:string]: any;
        
         
            /* 邮政编码 */ 
            zip?: string;
         
            /* 街道地址 */ 
            streetAddress?: string;
         
            /* 公寓/套房/单元/建筑 */ 
            streetAddress2?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 国家id */ 
            countryId?: string;
         
            /* 国家 */ 
            country?: string;
         
            /* 省/洲 */ 
            province?: string;
         
            /* 城市 */ 
            city?: string;
         
            
            unlocode?: string;
         
            /* 是否海外仓 */ 
            isForeign?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMGetLocationsForUiPickerInput {
        [key:string]: any;
        
         
            /* 地点所在国家 */ 
            countryId?: string;
         
            /* 
0 = Normal
1 = FBA
2 = Terminal */ 
            locationType?: number;
         
            /* 客户id */ 
            customerId?: string;
         
            
            ids?: any[];
         
            
            keyName?: string;
         
            
            searchText?: string;
         
            
            includeDeleted?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     * 创建或更新地点Dto
     */
    export class CRMCreateOrUpdateLocationExternalInput {
        [key:string]: any;
        
         
            /* 邮政编码 */ 
            zip?: string;
         
            /* 街道地址 */ 
            streetAddress?: string;
         
            /* 公寓/套房/单元/建筑 */ 
            streetAddress2?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 省/洲 Id */ 
            provinceId?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 查看权限，如果值为1，则需把全部合作伙伴id赋值到PartnerIds
0 = OnlyMyOrganization
1 = MyConnections
2 = SpecificConnections */ 
            viewableType?: number;
         
            /* 地点附加属性 */ 
            locationAddition?: CRMLocationAdditionDto;
         
            /* 如果是CRM给客户创建地址，则需要传 */ 
            customerId?: string;
         
            /* 如果是为合作伙伴创建才需要传值(更新不需要传，创建要传) */ 
            partnerId?: string;
         
            /* 共享的合作伙伴Id（如果是为合作伙伴创建，则无需传值） */ 
            partnerIds?: any[];
         
            /* 联系人Id集合 */ 
            contactIds?: any[];
         
            /* 分布式事务id */ 
            txId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMGlobalSearchInput {
        [key:string]: any;
        
         
            /* 关键字 */ 
            searchText?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMGlobalSearchOutput {
        [key:string]: any;
        
         
            /* 邮政编码 */ 
            zip?: string;
         
            /* 街道地址 */ 
            streetAddress?: string;
         
            /* 公寓/套房/单元/建筑 */ 
            streetAddress2?: string;
         
            /* 地点名称 */ 
            locationName?: string;
         
            /* 国家 */ 
            country?: string;
         
            /* 省/洲 */ 
            province?: string;
         
            /* 城市 */ 
            city?: string;
         
            /* 公司名称 */ 
            companyName?: string;
         
            /* 联系人姓名 */ 
            contactName?: string;
         
            /* 联系人手机号 */ 
            contactPhone?: string;
         
            /* 联系人电话 */ 
            contactTel?: string;
         
            /* 联系人邮箱 */ 
            contactEmail?: string;
         
            /* 是否账号激活 */ 
            isActive?: boolean;
         
            /* 0是地点，1是合作伙伴 ，3是联系人 */ 
            type?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     * 邮寄地点
     */
    export class CRMMailLocationDto {
        [key:string]: any;
        
         
            /* 联系人 */ 
            contactName: string;
         
            /* 联系电话 */ 
            contactPhone: string;
         
            /* 联系邮箱 */ 
            contactEmail: string;
         
            /* 街道地址 */ 
            streetAddress: string;
         
            /* 国家Id */ 
            countryId?: string;
         
            /* 国家（显示） */ 
            country?: string;
         
            /* 省/洲 Id */ 
            provinceId?: string;
         
            /* 省、洲（显示） */ 
            province?: string;
         
            /* 城市Id */ 
            cityId?: string;
         
            /* 城市（显示） */ 
            city?: string;
         
            /* 在分布式事务中，该字段会自动设置为本地事务ID */ 
            txId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMEditForBillOfLadingInput {
        [key:string]: any;
        
         
            /* 地址id */ 
            locationId?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 国家 */ 
            countryId?: string;
         
            /* 省份 */ 
            provinceId?: string;
         
            /* 城市 */ 
            cityId?: string;
         
            /* 街道地址 */ 
            streetAddress?: string;
         
            /* 联系类型
0 = Default
1 = Selected
2 = Create */ 
            contactType?: number;
         
            /* 客户id */ 
            customerId?: string;
         
            /* 客户电话 */ 
            customerTel?: string;
         
            /* 客户传真 */ 
            customerFax?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMEditForComponentInput {
        [key:string]: any;
        
         
            /* 所属客户id */ 
            customerId?: string;
         
            /* 地址id */ 
            locationId?: string;
         
            /* 地点名称 */ 
            name?: string;
         
            /* 国家 */ 
            countryId?: string;
         
            /* 省份 */ 
            provinceId?: string;
         
            /* 城市 */ 
            cityId?: string;
         
            /* 街道地址 */ 
            streetAddress?: string;
        
        
    }
 
    /**
     * 合作伙伴Dto
     */
    export class CRMPartnerDto {
        [key:string]: any;
        
         
            /* 合作伙伴名称 */ 
            name?: string;
         
            /* 拥有地点数量 */ 
            locationCount?: number;
         
            /* 联系人数量 */ 
            contactCount?: number;
         
            /* 合作伙伴所属客户 */ 
            partnerCustomer?: CRMCustomerDto;
         
            /* 当前账号是否为合作伙伴所属客户的拥有者 */ 
            isOwner?: boolean;
         
            /* 合作伙伴（具有客户身份）所归属的业务员 */ 
            partnerCustomerOwner?: string;
         
            /* 合作伙伴创建人 */ 
            creator?: string;
         
            /* 创建绑定的用户名 */ 
            bindUserName?: string;
         
            /* 绑定时间 */ 
            bindTime?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 合作伙伴列表Dto
     */
    export class CRMPartnerListDto {
        [key:string]: any;
        
         
            /* 合作伙伴名称 */ 
            name?: string;
         
            /* 合作伙伴自己的客户Id */ 
            partnerCustomerId?: string;
         
            /* 合作伙伴绑定的客户 */ 
            partnerCustomer?: string;
         
            /* 合作伙伴（具有客户身份）所归属的业务员 */ 
            partnerCustomerOwner?: string;
         
            /* 合作伙伴创建人 */ 
            creator?: string;
         
            /* 创建绑定的用户名 */ 
            bindUserName?: string;
         
            /* 绑定时间 */ 
            bindTime?: string;
         
            /* 是否开通了主账号 */ 
            isRegistered?: boolean;
         
            /* 匹配的客户集合 */ 
            matchCustomers?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerPagedAndSortedInput {
        [key:string]: any;
        
         
            /* 不传则取当前登录客户 */ 
            customerId?: string;
         
            
            isAll?: boolean;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     * 创建或更新合作伙伴dto
     */
    export class CRMCreateOrUpdatePartnerDto {
        [key:string]: any;
        
         
            /* 合作伙伴名称 */ 
            partnerName: string;
         
            /* 所属客户Id */ 
            customerId?: string;
         
            /* 合作伙伴Id（如果是转为客户，则需要传，不是则不传） */ 
            partnerId?: string;
         
            
            partnerCustomer?: CRMCreateOrUpdateCustomerInput;
         
            /* 是否创建合作伙伴所绑定客户下的合作伙伴 */ 
            isCreatePartner?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     * 合作伙伴绑定客户Dto
     */
    export class CRMPartnerBindCustomerInput {
        [key:string]: any;
        
         
            /* 要绑定的客户Id */ 
            bindCustomerId: string;
         
            /* 合作伙伴所属的客户Id */ 
            customerId: string;
         
            /* 要绑定的合作伙伴Id(如果传null，则会新建一个partner) */ 
            partnerId?: string;
         
            /* 是否认领客户 */ 
            isGetCustomer?: boolean;
         
            /* 是否创建合作伙伴所绑定客户下的合作伙伴 */ 
            isCreatePartner?: boolean;
        
        
    }
 
    /**
     * 解除绑定Dto
     */
    export class CRMUnBindCustomerInput {
        [key:string]: any;
        
         
            /* 要解除绑定的合作伙伴Id */ 
            partnerId: string;
        
        
    }
 
    /**
     * 合作伙伴Dto
     */
    export class CRMExternalPartnerDto {
        [key:string]: any;
        
         
            /* 合作伙伴名称 */ 
            name?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMExternalPartnerListDto {
        [key:string]: any;
        
         
            /* 合作伙伴公司名称 */ 
            name?: string;
         
            /* 合作伙伴自己的客户Id */ 
            partnerCustomerId?: string;
         
            /* 是否开通了主账号 */ 
            isRegistered?: boolean;
         
            /* 联系人集合 */ 
            contacts?: any[];
         
            /* 地址集合 */ 
            locations?: any[];
         
            
            id?: string;
        
        
    }
 
    /**
     * 报价Dto
     */
    export class CRMQuoteReplyDto {
        [key:string]: any;
        
         
            /* 报价业务号 */ 
            replyNo?: string;
         
            /* 承运公司 */ 
            carrierId?: string;
         
            /* 航程 */ 
            transitTime?: string;
         
            /* 截关/开船 */ 
            sailSchedule?: string;
         
            /* 有效起始时间 */ 
            validStartDate?: string;
         
            /* 有效结束时间 */ 
            validEndDate?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 状态
0 = NoSet
1 = Accept
2 = Reject
3 = Booked
4 = Expired */ 
            status?: number;
         
            /* 询价Id */ 
            quoteEnquiryId?: string;
         
            /* 报价详情集合 */ 
            quoteReplyItems?: any[];
         
            /* 承运公司名称 */ 
            carrierName?: string;
         
            /* 运输费用总价(不含本地费用、拖车费用等) */ 
            onlyOceanTotalCharge?: string;
         
            /* 运输费用总价 */ 
            totalCharge?: string;
         
            /* 费用总价(统一币种的全部费用) */ 
            unifiedTotalCharge?: number;
         
            /* 报价用户名称 */ 
            replyUserName?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 询价Dto
     */
    export class CRMQuoteEnquiryDto {
        [key:string]: any;
        
         
            /* 询价业务号 */ 
            quoteNo?: string;
         
            /* 询价归属客户Id */ 
            ownerCustomerId?: string;
         
            /* 询价归属用户Id */ 
            ownerUserId?: number;
         
            /* 运输方式
0 = NotSet
1 = Ocean
2 = Air */ 
            freightMethodType?: number;
         
            /* 运输类型
0 = FCL
1 = LCL */ 
            shipmentType?: number;
         
            /* 箱型规格保存json字符串，如 [ {name:20GP,value:1},{name:40GP,value2} ] */ 
            containerType?: string;
         
            /* 贸易类型(单选取字典)
0 = NotSet
1 = General
2 = ECommerce */ 
            tradeType?: number;
         
            /* 运输条款
0 = NotSet
1 = CY_CY
2 = CY_DOOR
3 = DOOR_CY
4 = DOOR_DOOR */ 
            freightType?: number;
         
            /* 始发口岸Id */ 
            originPortId?: string;
         
            /* 出发地是否需要拖车 */ 
            originIsRequireTruck?: boolean;
         
            /* 始发装载时间/FBA时  Pick Up / Delivery Time */ 
            cargoReadyDate?: string;
         
            /* 拖车起始地址NetWork */ 
            originAddressId?: string;
         
            /* 拖车起始地址手输部分/地图DIY查询 */ 
            originAddressName?: string;
         
            /* 是否报关 */ 
            isDeclaration?: boolean;
         
            /* 是否保险 */ 
            isInsurance?: boolean;
         
            /* 目的口岸Id */ 
            destinationPortId?: string;
         
            /* 预计交货时间 */ 
            deliveryDate?: string;
         
            /* 目的地是否需要拖车 */ 
            destinationIsRequireTruck?: boolean;
         
            /* 拖车目的地址CSP-&gt;Locations */ 
            destinationAddressId?: string;
         
            /* 拖车起始地址手输部分/地图DIY查询 */ 
            destinationAddressName?: string;
         
            /* 是否清关 */ 
            isClearance?: boolean;
         
            /* 上门提货时间范围(解析后赋值到cargoreadydate) (预计交货时间/提货日期) */ 
            pickUpTimeRange?: string;
         
            /* 渠道 */ 
            channelId?: string;
         
            /* 上门取件方式, 客户自送、Cityocean上门取件
0 = NotSet
1 = DeliveryGoodsByMyself
2 = PickUpByCityocean */ 
            fbaPickUpMethodType?: number;
         
            /* 交货方式
0 = FBA
1 = Overseas
2 = Customer
3 = LAZADA */ 
            fbaDeliveryMethodType?: number;
         
            /* 起始仓库地址 */ 
            originWarehouseId?: string;
         
            /* 送货地国家Id */ 
            countryId?: string;
         
            /* 是否处理税收(仅针对FBA) */ 
            isTaxIncluded?: boolean;
         
            /* 数量 */ 
            quantity?: number;
         
            /* 数量单位 */ 
            quantityUnitId?: string;
         
            /* 总重量 */ 
            weight?: number;
         
            /* 总重量单位 */ 
            weightUnitId?: string;
         
            /* 总体积 */ 
            volume?: number;
         
            /* 总体积单位 */ 
            volumeUnitId?: string;
         
            /* 数量单位代码 */ 
            quantityUnitCode?: string;
         
            /* 重量单位代码 */ 
            weightUnitCode?: string;
         
            /* 体积单位代码 */ 
            volumeUnitCode?: string;
         
            /* 单位切换枚举
0 = Imperial
1 = Metric */ 
            unitConvertType?: number;
         
            /* 海关编码 */ 
            hsCodes?: string;
         
            /* 品名 */ 
            commodity?: string;
         
            /* 是否包含特殊品 */ 
            isContainsSpecialGoods?: boolean;
         
            /* 包含特殊品类别,(考虑到可以直观知道是哪一个特殊品此处存储json)如：[ {Id:125, Name:Batteries, IsSelected:true} ]（是否危险，是否带电，是否带磁等） */ 
            containsSpecialGoodsTypes?: string;
         
            /* 产品描述 */ 
            description?: string;
         
            /* 特殊介绍 */ 
            specialInstructions?: string;
         
            /* 状态
0 = NoSet
1 = Active
2 = Accepted
3 = Expired
4 = Rejected */ 
            status?: number;
         
            /* 是否为再次询价（默认为false） */ 
            isRepeatEnquired?: boolean;
         
            /* 报价集合 */ 
            quoteReplys?: CRMQuoteReplyDto[];
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 询价归属客户名称 */ 
            ownerCustomerName?: string;
         
            /* 询价归属用户名称 */ 
            ownerUserName?: string;
         
            /* 起始地 */ 
            originAddress?: CRMAddressModel;
         
            /* 目的地 */ 
            destinationAddress?: CRMAddressModel;
         
            /* 起始港口 */ 
            originPort?: CRMPortModel;
         
            /* 目的港口 */ 
            destinationPort?: CRMPortModel;
         
            /* 渠道名称 */ 
            channelName?: string;
         
            /* 数量显示 */ 
            quantityDisplay?: string;
         
            /* 重量显示 */ 
            totalWeightDisplay?: string;
         
            /* 体积显示 */ 
            totalVolumeDisplay?: string;
         
            /* 询价来源是否是来自csp客户创建（客户创建OriginAddressId是network，销售创建是本地仓） */ 
            isFromCustomer?: boolean;
         
            /* 是否是美线用来显示（Terms） */ 
            isAmericaLine?: boolean;
         
            /* 船东Logo -没报价时没有 */ 
            carrierLogo?: string;
         
            /* 订舱Id */ 
            bookngId?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMAddressModel {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            country?: string;
         
            
            countryId?: string;
         
            
            province?: string;
         
            
            provinceId?: string;
         
            
            city?: string;
         
            
            cityId?: string;
         
            
            streetAddress?: string;
         
            
            streetAddress2?: string;
         
            
            name?: string;
        
        
    }
 
    /**
     * 报价详情
     */
    export class CRMQuoteReplyItemDto {
        [key:string]: any;
        
         
            /* 费用类型Id(运输费用时没有) */ 
            chargingCodeId?: string;
         
            /* 单价 */ 
            unitPrice?: number;
         
            /* 币种Id */ 
            currencyId?: string;
         
            /* 数量 */ 
            quantity?: number;
         
            /* 单位类型
0 = NotSet
1 = Container
2 = Ticket
3 = Weight
4 = Volume */ 
            unitType?: number;
         
            /* 箱型Code */ 
            containerCode?: string;
         
            /* 费用分类（起始港、目的港、运输费用）
0 = NotSet
1 = Freight
2 = Origin
3 = Destination */ 
            priceProduceNode?: number;
         
            /* 总价 = Quantity * UnitPrice */ 
            totalPrice?: number;
         
            /* 计算方式
0 = NotSet
1 = CBM167KG
2 = CBM363KG
3 = CBM500KG
4 = CBM750KG
5 = CBM1000KG */ 
            computeMode?: number;
         
            /* 计算公式
0 = NotSet
1 = ActuallyWeight
2 = ComputeWeight
3 = ActuallyVolume
4 = ComputeTon */ 
            computeFormula?: number;
         
            /* 备注 */ 
            remark?: string;
         
            /* 对应报价Id */ 
            quoteReplyId?: string;
         
            /* 币种名称 */ 
            currencyName?: string;
         
            /* 费用类型名称 */ 
            chargingCodeName?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 为CRM提供的询价列表Dto
     */
    export class CRMQuoteEnquiryListForCRMOutput {
        [key:string]: any;
        
         
            /* 询价业务号 */ 
            quoteNo?: string;
         
            /* 询价归属客户名称 */ 
            ownerCustomerName?: string;
         
            /* 询价归属用户名称 */ 
            ownerUserName?: string;
         
            /* 运输方式
0 = NotSet
1 = Ocean
2 = Air */ 
            freightMethodType?: number;
         
            /* 运输条款
0 = NotSet
1 = CY_CY
2 = CY_DOOR
3 = DOOR_CY
4 = DOOR_DOOR */ 
            freightType?: number;
         
            /* 始发装载时间/FBA时  Pick Up / Delivery Time */ 
            cargoReadyDate?: string;
         
            /* 预计交货时间 */ 
            deliveryDate?: string;
         
            /* 出发地 */ 
            from?: CRMAddressGroupModel;
         
            /* 拖车起始地址手输部分/地图DIY查询 */ 
            truckOriginAddressName?: string;
         
            /* 目的地 */ 
            to?: CRMAddressGroupModel;
         
            /* 拖车起始地址手输部分/地图DIY查询 */ 
            truckDestinationAddressName?: string;
         
            /* 状态
0 = NoSet
1 = Active
2 = Accepted
3 = Expired
4 = Rejected */ 
            status?: number;
         
            /* 是否已经报价 */ 
            isQuoteReply?: boolean;
         
            
            id?: string;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMAddressGroupModel {
        [key:string]: any;
        
         
            
            addressModel?: CRMAddressModel;
         
            
            portModel?: CRMPortModel;
        
        
    }
 
    /**
     * CRM获取询价列表
     */
    export class CRMQuoteEnquiryListForCRMInput {
        [key:string]: any;
        
         
            /* 状态
0 = NoSet
1 = Active
2 = Accepted
3 = Expired
4 = Rejected */ 
            status?: number;
         
            /* 贸易类型,多个逗号分开 */ 
            tradeTypes?: string;
         
            /* 询价编号 */ 
            quoteNo?: string;
         
            /* 用户还是客户
0 = NotSet
1 = User
2 = Customer */ 
            historyDataType?: number;
         
            /* 用户 */ 
            userId?: number;
         
            /* 客户 */ 
            customerId?: string;
         
            /* 用户名或客户名 */ 
            name?: string;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMCustomerListModel {
        [key:string]: any;
        
         
            
            id?: string;
         
            
            name?: string;
         
            
            contacts?: any[];
         
            
            locations?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMContactModel {
        [key:string]: any;
        
         
            
            surname?: string;
         
            
            name?: string;
         
            
            surnameLocalization?: string;
         
            
            nameLocalization?: string;
         
            
            phone?: string;
         
            
            email?: string;
         
            
            remark?: string;
         
            
            tel?: string;
         
            
            position?: string;
         
            
            fax?: string;
         
            
            isMaster?: boolean;
         
            
            customerId?: string;
         
            
            partnerId?: string;
         
            
            userId?: number;
         
            
            role?: string;
        
        
    }
 
    /**
     * CRM获取相关的报价（询价路线和订舱路线全匹配），用来选择报价（只有沟通中、已接受的）
     */
    export class CRMGetRelatedQuoteForCRMOutput {
        [key:string]: any;
        
         
            /* 相关询报价列表 */ 
            list?: CRMQuoteEnquiryDto[];
         
            /* 数量 */ 
            count?: number;
         
            /* 海运箱型集合（table头） */ 
            unitCodes?: any[];
        
        
    }
 
    /**
     *  No Remark 
     */
    export class CRMGetListByRouteForCRMOutput {
        [key:string]: any;
        
         
            /* 询价业务号 */ 
            quoteNo?: string;
         
            /* 询价归属客户名称 */ 
            ownerCustomerName?: string;
         
            /* 询价归属用户名称 */ 
            ownerUserName?: string;
         
            /* 运输方式
0 = NotSet
1 = Ocean
2 = Air */ 
            freightMethodType?: number;
         
            /* 运输条款
0 = NotSet
1 = CY_CY
2 = CY_DOOR
3 = DOOR_CY
4 = DOOR_DOOR */ 
            freightType?: number;
         
            /* 始发装载时间/FBA时  Pick Up / Delivery Time */ 
            cargoReadyDate?: string;
         
            /* 预计交货时间 */ 
            deliveryDate?: string;
         
            /* 状态
0 = NoSet
1 = Active
2 = Accepted
3 = Expired
4 = Rejected */ 
            status?: number;
         
            
            id?: string;
        
        
    }
 
    /**
     * 为CSP提供的询价列表请求Dto
     */
    export class CRMQuoteEnquiryListForCSPInput {
        [key:string]: any;
        
         
            /* 状态数组 */ 
            status?: any[];
         
            /* 运输方式,多个逗号分开 */ 
            freightMethodTypes?: string;
         
            /* 地点参数 */ 
            location?: CRMQueryLocationSourceModel;
         
            /* 创建人Id数组 */ 
            ownerIds?: any[];
         
            /* 模糊匹配 */ 
            searchKey?: string;
         
            
            sorting?: string;
         
            
            maxResultCount?: number;
         
            
            skipCount?: number;
        
        
    }
 
    /**
     * CSP询价检索数据源
     */
    export class CRMQueryLocationSourceModel {
        [key:string]: any;
        
         
            /* 地点LocationId */ 
            id?: string;
         
            /* 国家 */ 
            country?: string;
         
            /* 省份 */ 
            province?: string;
         
            /* 城市/港口 */ 
            city?: string;
         
            /* 街道/地址的自定义名称 */ 
            name?: string;
         
            /* 来源
0 = NotSet
1 = Port
2 = Address
3 = FBAAddress
4 = AllAddress
5 = User
6 = FBMAddress */ 
            historyDataType?: number;
         
            /* 是否海港 */ 
            isOcean?: boolean;
         
            /* 是否空港 */ 
            isAir?: boolean;
        
        
    }
 
    /**
     * 根据询价Id获取拥有者和绑定销售
     */
    export class CRMGetTeamUserOutput {
        [key:string]: any;
        
         
            /* 用户Id */ 
            userId?: number;
         
            /* 用户名 */ 
            userName?: string;
         
            /* 客户Id */ 
            customerId?: string;
         
            /* 客户名 */ 
            customerName?: string;
        
        
    }
 
    /**
     * 为CSP提供的询价列表Dto
     */
    export class CRMQuoteEnquiryListForCSPOutput {
        [key:string]: any;
        
         
            /* 询价业务号 */ 
            quoteNo?: string;
         
            /* 运输方式
0 = NotSet
1 = Ocean
2 = Air */ 
            freightMethodType?: number;
         
            /* 运输条款
0 = NotSet
1 = CY_CY
2 = CY_DOOR
3 = DOOR_CY
4 = DOOR_DOOR */ 
            freightType?: number;
         
            /* 始发装载时间/FBA时  Pick Up / Delivery Time */ 
            cargoReadyDate?: string;
         
            /* 出发地 */ 
            from?: CRMAddressGroupModel;
         
            /* 拖车起始地址手输部分/地图DIY查询 */ 
            truckOriginAddressName?: string;
         
            /* 目的地 */ 
            to?: CRMAddressGroupModel;
         
            /* 拖车起始地址手输部分/地图DIY查询 */ 
            truckDestinationAddressName?: string;
         
            /* 重量显示 */ 
            totalWeightDisplay?: string;
         
            /* 体积显示 */ 
            totalVolumeDisplay?: string;
         
            /* 创建用户/有报价时显示业务员名 */ 
            creatorUser?: string;
         
            /* 询价状态
0 = NoSet
1 = Active
2 = Accepted
3 = Expired
4 = Rejected */ 
            status?: number;
         
            /* Action
0 = NoSet
1 = ViewQuotes
2 = ViewNewQuotes
3 = ViewAcceptedQuotes
4 = ViewExperidQuotes
5 = ViewRejectedQuotes */ 
            action?: number;
         
            /* 渠道 */ 
            channelId?: string;
         
            /* 渠道名称 */ 
            channelName?: string;
         
            /* 海关编码 */ 
            hsCodes?: string;
         
            /* 品名 */ 
            commodity?: string;
         
            /* 创建时间 */ 
            creationTime?: string;
         
            /* 更新时间 */ 
            lastModificationTime?: string;
         
            /* 运输费用总价 */ 
            totalCharge?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 创建跟进日志
     */
    export class CRMCreateTraceLogInput {
        [key:string]: any;
        
         
            /* 内容 */ 
            content?: string;
         
            /* 客户id */ 
            customerId?: string;
         
            /* 日志类型id */ 
            traceLogTypeId?: string;
         
            /* 跟进时间 */ 
            followUpRecord?: string;
         
            /* 内容明细集合 */ 
            traceLogItems?: CRMTraceLogItemDto[];
         
            
            id?: string;
        
        
    }
 
    /**
     * 评论列表dto
     */
    export class CRMTraceLogCommentListDto {
        [key:string]: any;
        
         
            /* 日志Id */ 
            traceLogId?: string;
         
            /* 评论内容 */ 
            content?: string;
         
            /* 发表用户 */ 
            creatorUser?: string;
         
            /* 被评论用户 */ 
            repliedUser?: string;
         
            
            id?: string;
        
        
    }
 
    /**
     * 发表评论
     */
    export class CRMCreateTraceLogCommentInput {
        [key:string]: any;
        
         
            /* 日志Id */ 
            traceLogId?: string;
         
            /* 被评论用户Id */ 
            repliedUserId?: number;
         
            /* 评论内容 */ 
            content?: string;
        
        
    }


