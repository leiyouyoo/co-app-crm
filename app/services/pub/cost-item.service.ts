import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBCostItemDto,PUBPagedResultDto1,PUBCostItemCheckDto,PUBListResultDto1,PUBCostItemFlatDto } from './pub.types';

@BaseUrl('/PUB/CostItem')
@Injectable({ providedIn: 'root' })
export class PUBCostItemService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/CostItem/Get
     * 获取费用代码明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBCostItemDto> {
        return null as any
    }


    /**
     * @param url /PUB/CostItem/GetAll
     * 获取费用代码列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {code?:string,name?:string,property?:boolean,isValid?:boolean,parentId?:string} 

    ): Observable<PUBPagedResultDto1<PUBCostItemDto>> {
        return null as any
    }


    /**
     * @param url /PUB/CostItem/Check
     * 校验重复性数据
     */

    @POST('Check')
    check(
        @Payload
        _req:PUBCostItemCheckDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/CostItem/CreateOrUpdate
     * 创建或更新费用代码
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBCostItemDto

    ): Observable<PUBCostItemDto> {
        return null as any
    }


    /**
     * @param url /PUB/CostItem/Create
     * 创建费用代码
     */

    @POST('Create')
    create(
        @Payload
        _req:PUBCostItemDto

    ): Observable<PUBCostItemDto> {
        return null as any
    }


    /**
     * @param url /PUB/CostItem/Update
     * 更新地区
     */

    @PUT('Update')
    update(
        @Payload
        _req:PUBCostItemDto

    ): Observable<PUBCostItemDto> {
        return null as any
    }


    /**
     * @param url /PUB/CostItem/Delete
     * 删除地区
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/CostItem/GetTree
     * 获取树
     */

    @GET('GetTree')
    getTree(
        @Payload
        _req: {parentId?:string} 

    ): Observable<PUBListResultDto1<PUBCostItemDto>> {
        return null as any
    }


    /**
     * @param url /PUB/CostItem/GetRootTree
     * 获取最顶级的集合
     */

    @GET('GetRootTree')
    getRootTree(
        @Payload
        _req: {} 

    ): Observable<PUBListResultDto1<PUBCostItemFlatDto>> {
        return null as any
    }


    /**
     * @param url /PUB/CostItem/GetChildren
     * 根据父级Id获取扁平子集
     */

    @GET('GetChildren')
    getChildren(
        @Payload
        _req: {parentId?:string} 

    ): Observable<PUBListResultDto1<PUBCostItemFlatDto>> {
        return null as any
    }



  }
