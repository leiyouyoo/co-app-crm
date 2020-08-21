import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, skip } from 'rxjs/operators';
import { AmapHttpService } from './amap-http.service';

export interface GeoResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Geometry {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Bounds;
}

interface Bounds {
  northeast: Location;
  southwest: Location;
}

interface Location {
  lat: number;
  lng: number;
}

interface NetworkLocation {
  streetAddress: string;
  tenantName?: string;
  province?: string;
  country?: string;
  city?: string;
  [PROP_NAME: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AmapService {
  apiPrefix = `https://api.cityocean.com:20001/`;
  googleKey = 'AIzaSyAEdT5BA0MmANhrmcnR4QrXu08gLtgvhqI';
  // private amapHttp: any;
  constructor(private amapHttp: AmapHttpService) { }

  //地图搜索地址
  mapSearch(input: any, language = 'en', options = {}): Observable<any> {
    let url = `${this.apiPrefix}place/maps/api/place/autocomplete/json`;
    let params = {
      input,
      key: this.googleKey,
      language,
      ...options,
    };
    return this.amapHttp.get(url, params);
  }

  getPlaceDetail(placeId: string, options = {}) {
    const url = `${this.apiPrefix}place/maps/api/place/details/json`
    const params = {
      key: this.googleKey,
      place_id: placeId,
      ...options,
    }
    return this.amapHttp.get(url, params);
  }

  googleGeo(address): Observable<GeoResult> {
    // const url = `https://maps.googleapis.com/maps/api/js/GeocodeService.Search?4ssichuan2&7sUS&9szh-CN&callback=_xdc_._s18ps3&key=AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM&token=28858`
    const url = `${this.apiPrefix}geo/maps/api/geocode/json?address=${address}&key=${this.googleKey}`

    return new Observable<GeoResult>(ob => {
      this.amapHttp.get(url)
        .subscribe((data: { status: string, results: GeoResult[] }) => {
          if (data.status === 'OK') {
            ob.next(data.results[0])
            ob.complete()
          } else {
            ob.error('Empty Geo');
          }
        }, error => {
          ob.error(error);
        })
    });
  }
}
