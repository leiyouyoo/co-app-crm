import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPCurrentUserProfileEditDto } from './csp.types';

@BaseUrl('/PUB')
@Injectable({ providedIn: 'root' })
export class CSPPubService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * @param url /PUB/Flight/GetAllForUiPicker
   * 提供给UI航班选择器的服务接口
   */

  @POST('Flight/GetAllForUiPicker')
  getAllForUiPicker(
    @Payload
    _req: {
      includeInvalid?: boolean;
      airlineIds?: Array<string>;
      ids?: Array<string>;
      keyName?: string;
      searchText?: string;
      includeDeleted?: boolean;
      sorting?: string;
      maxResultCount?: number;
      skipCount?: number;
    },
  ): Observable<any> {
    return null as any;
  }
}
