import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesRouteNoteDto, RatesListResultDto } from '../../services/rates/rates.types';

@BaseUrl('/rates/RouteNoteService')
@Injectable({ providedIn: 'root' })
export class RatesRouteNoteService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * @param url /Rates/RouteNoteService/GetAllAsync
   *
   */

  @GET('getAllAsync')
  getAllAsync(
    @Payload
    _req: {},
  ): Observable<RatesListResultDto<RatesRouteNoteDto>> {
    return null as any;
  }

  /**
   * @param url /Rates/RouteNoteService/DeleteAsync
   *
   */

  @DELETE('deleteAsync')
  deleteAsync(
    @Payload
    _req: {
      id?: string;
    },
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/RouteNoteService/CreateOrUpdate
   *
   */

  @POST('createOrUpdate')
  createOrUpdate(
    @Payload
    _req: RatesRouteNoteDto,
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/RouteNoteService/CheckRepeat
   *
   */

  @POST('checkRepeat')
  checkRepeat(
    @Payload
    _req: RatesRouteNoteDto,
  ): Observable<any> {
    return null as any;
  }
}
