import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPProductDto,CSPProductListDto,CSPPagedResultDto,CSPImportResult,CSPProductExportInput,CSPProductSkuListOutput, } from './csp.types';

@BaseUrl('/csp/Product')
@Injectable({ providedIn: 'root' })
export class CSPProductService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/Product/Get
     * 获取产品明细
     */

    @GET('get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPProductDto> {
        return null as any
    }


    /**
     * @param url /CSP/Product/GetAll
     * 获取产品列表
     */

    @GET('getAll')
    getAll(
        @Payload
        _req: {regionId?:string,searchText?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CSPPagedResultDto<CSPProductListDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Product/CreateOrUpdate
     * 保存产品
     */

    @POST('createOrUpdate')
    createOrUpdate(
        @Payload
        _req:CSPProductDto

    ): Observable<CSPProductDto> {
        return null as any
    }


    /**
     * @param url /CSP/Product/Delete
     * 删除产品
     */

    @DELETE('delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Product/Import
     * 导入产品
     */

    @POST('import')
    import(
        @Payload
        _req: {} 

    ): Observable<CSPImportResult> {
        return null as any
    }


    /**
     * @param url /CSP/Product/Export
     * 产品导出
     */

    @POST('export')
    export(
        @Payload
        _req:CSPProductExportInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Product/GetSkuList
     * 获取SKU列表
     */

    @GET('getSkuList')
    getSkuList(
        @Payload
        _req: {searchText?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CSPPagedResultDto<CSPProductSkuListOutput>> {
        return null as any
    }



  }
