import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesOceanOutput, RatesPagedResultDto, RatesOceanDto } from './rates.types';

@BaseUrl('/rates/OceanService')
@Injectable({ providedIn: 'root' })
export class RatesOceanServiceService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * @param url /Rates/OceanService/Get
   * 根据合约ID获取合约
   */

  @GET('get')
  get(
    @Payload
    _req: {
      id?: string;
    },
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/OceanService/GetContractNo
   * 获取合约号
   */

  @GET('GetContractNo')
  getContractNo(
    @Payload
    _req: {
      searchText?: string;
    },
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/OceanService/GetAll
   * 合约查询
   */

  @GET('getAll')
  getAll(
    @Payload
    _req: {
      contractNo?: string;
      contractName?: string;
      carrier?: string;
      pOL?: string;
      vIA?: string;
      pOD?: string;
      delivery?: string;
      type?: number;
      state?: number;
      publisher?: number;
      shippingLine?: string;
      from?: string;
      to?: string;
      sorting?: string;
      maxResultCount?: number;
      skipCount?: number;
    },
  ): Observable<RatesPagedResultDto<RatesOceanOutput>> {
    return null as any;
  }

  /**
   * @param url /Rates/OceanService/CreateOrUpdate
   * 新增或者编辑合约
   */

  @POST('createOrUpdate')
  createOrUpdate(
    @Payload
    _req: RatesOceanDto,
  ): Observable<RatesOceanDto> {
    return null as any;
  }

  /**
   * @param url /Rates/OceanService/UpdateStateType
   * 修改合约状态
   */

  @PUT('updateStateType')
  updateStateType(
    @Payload
    _req: {
      id?: string;
    },
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/OceanService/ExportContract
   * 导出合约
   */

  @POST('exportContract')
  exportContract(
    @Payload
    _req: {},
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/OceanService/Delete
   * 删除合约，可以传1个id或多个id
   */

  @DELETE('delete')
  delete(
    @Payload
    _req: {
      ids?: any[];
    },
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/OceanService/CopyOcean
   * 拷贝某一条运价的所有数据
   */

  @POST('copyOcean')
  copyOcean(
    @Payload
    _req: {
      oceanId?: string;
    },
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/OceanService/BulkUpdateState
   * 定时任务定时调用更改合约状态
   */

  @POST('bulkUpdateState')
  bulkUpdateState(
    @Payload
    _req: {},
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/OceanService/ResetOceanBasePortArbitrarys
   *
   */

  @POST('resetOceanBasePortArbitrarys')
  resetOceanBasePortArbitrarys(
    @Payload
    _req: {
      oceanId?: string;
    },
  ): Observable<any> {
    return null as any;
  }
}
