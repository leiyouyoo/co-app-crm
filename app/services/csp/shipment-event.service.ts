import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPShipmentEventDto, } from './csp.types';

@BaseUrl('/csp/ShipmentEvent')
@Injectable({ providedIn: 'root' })
export class CSPShipmentEventService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/ShipmentEvent/BatchCreateOrUpdate
     * 批量创建或更新事件
     */

    @POST('batchCreateOrUpdate')
    batchCreateOrUpdate(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/ShipmentEvent/CreateOrUpdate
     * 创建或更新事件
     */

    @POST('createOrUpdate')
    createOrUpdate(
        @Payload
        _req:CSPShipmentEventDto

    ): Observable<any> {
        return null as any
    }



  }
