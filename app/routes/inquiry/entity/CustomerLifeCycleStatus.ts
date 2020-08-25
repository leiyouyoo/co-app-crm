 /// <summary>
    /// 客户生命周期状态
    /// </summary>
    export enum CustomerLifeCycleStatus
    {
        /// <summary>
        /// 创建
        /// </summary>
        Created = 0,
        /// <summary>
        /// 开通租户
        /// </summary>
        BindTenant = 1,
        /// <summary>
        /// 首次出货
        /// </summary>
        FirsttimeShip = 2,
        /// <summary>
        /// 合作客户
        /// </summary>
        Cooperation = 3,
        /// <summary>
        /// 潜在合作
        /// </summary>
        NoneCooperation=4,
        /// <summary>
        /// 共享客户
        /// </summary>
        Shared = 5,
        /// <summary>
        /// 无主客户
        /// </summary>
        Ownerless = 6,
        /// <summary>
        /// 被引用为客户合作伙伴
        /// </summary>
        Partner=7
    }