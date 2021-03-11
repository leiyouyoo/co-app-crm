import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBGetAllForUiPickerInput,PUBPagedResultDto1,PUBChannelUiPickerDto } from './pub.types';

@BaseUrl('/PUB/Channel')
@Injectable({ providedIn: 'root' })
export class PUBChannelService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/Channel/InitSeedData
     * 暂无备注
     */

    @POST('InitSeedData')
    initSeedData(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/Channel/GetAllForUiPicker
     * 获取Channel列表
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:PUBGetAllForUiPickerInput

    ): Observable<PUBPagedResultDto1<PUBChannelUiPickerDto>> {
        return null as any
    }



  }
