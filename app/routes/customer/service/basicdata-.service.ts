import { Injectable } from '@angular/core';
import { HttpService } from '@cityocean/common-library';
import { CrmService } from 'projects/crm/src/public-api';
import { RegionService, DataDictionarySevice } from 'projects/cityocean/basicdata-library/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class BasicdataService {
  constructor(private regionService: RegionService, private dataDictionarySevice: DataDictionarySevice) {}

  //获取国家信息
  getCountryInfo(obj?: any) {
    return this.regionService.getRegionInfo(obj);
  }

  //获取地区信息
  getRegionInfo(obj?: any) {
    return this.regionService.getRegionInfo(obj);
  }

  get(id?: any) {
    return this.regionService.get(id);
  }

  //获取地点
  getPlaceInfo(obj?: any, isCity?: any) {
    return this.regionService.getPlaceInfo(obj, isCity);
  }

  //获取数字字典列表
  getDataDictionaryTypeInfo(typeCode: string) {
    return this.dataDictionarySevice.getDataDictionaryInfo(typeCode);
  }
}
