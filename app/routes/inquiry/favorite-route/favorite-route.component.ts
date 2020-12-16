import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageSideDrawerComponent } from '@co/cbc';
import { PUBPlaceService, PUBShippingLineService } from '@co/cds';
import { debounce } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { RatesRouteNoteService } from 'apps/crm/app/services/rates/public_api';
import { NzMessageService } from 'ng-zorro-antd';
import { CRMCustomerService } from '../../../services/crm/customer.service';
@Component({
  selector: 'portal-favorite-route',
  templateUrl: './favorite-route.component.html',
  styleUrls: ['./favorite-route.component.less'],
})
export class FavoriteRouteComponent implements OnInit {
  @Input() title: string;
  @Input() sideDrawer: PageSideDrawerComponent;
  @Output() readonly onSubmitted = new EventEmitter<boolean>();
  @Input() set routeItem(v) {
    this.routeList = [v];
  }
  get routeItem() {
    return this.routeList;
  }
  routeList: any[] = [{}];
  basicPolPortList = [];
  basicPodPortList = [];
  deliveryList: any[];
  carriers = [];
  shippings = [];
  form: FormGroup;
  errorColor = '#ff4d4f';
  emptyGuid = '00000000-0000-0000-0000-000000000000';
  constructor(
    private fb: FormBuilder,
    private pubPlace: PUBPlaceService,
    private crmCustomer: CRMCustomerService,
    private ShippingLine: PUBShippingLineService,
    private ratesRouteNoteService: RatesRouteNoteService,
    private msg: NzMessageService,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
    debugger;
    this.buildForm();
    this.initData();
  }

  initData() {
    this.getCRMCarrierList({ name: '', customerType: 1, sorting: 'code' });
    this.getAllShipLine();
    if (this.title == 'edit') {
      // 处理下拉选项
      this.bindEditData();
    }
  }

  async bindEditData() {
    await this.getPortList('pol', this.routeList[0].polId);
    await this.getPortList('pod', this.routeList[0].podId);
    await this.getPortList('delivery', this.routeList[0].placeOfDeliveryId);
  }

  buildForm() {
    this.form = this.fb.group({
      routeList: this.fb.array([]),
    });
    const routelist = this.form.controls.routeList as FormArray;
    this.routeList.forEach((element) => {
      routelist.push(this.buildRouteForm(element));
    });
  }

  //组装路线数据
  private buildRouteForm(item?) {
    const route = this.fb.group({
      id: [item ? item.id : this.emptyGuid],
      name: [item ? item.name : null, this.title == 'edit' ? [Validators.required] : []],
      polId: [item ? item.polId : null, [Validators.required]],
      polName: [null],
      podId: [item ? item.podId : null, item?.placeOfDeliveryId?.length > 0 ? [] : [Validators.required]],
      podName: [null],
      placeOfDeliveryId: [item ? item.placeOfDeliveryId : null, item?.podId?.length > 0 ? [] : [Validators.required]],
      placeOfDeliveryName: [null],
      carrierId: [item ? item.carrierId : null],
      shippingLineId: [item ? item.shippingLineId : null],
      routeNoteType: [1],
    });
    return route;
  }

  @debounce(200)
  searchBasicPortList(value = '') {
    if (/[\u4e00-\u9fa5]{2}/gi.test(value) || value.length > 2) {
      this.pubPlace.getAll({ name: value, isOcean: true }).subscribe((res: any) => {
        this.basicPolPortList = res.items;
        this.basicPodPortList = res.items;
        this.deliveryList = res.items;
      });
    }
  }

  async getPortList(type, ids) {
    switch (type) {
      case 'pol':
        this.pubPlace.getByPlacesIds(ids).subscribe((res: any) => {
          this.basicPolPortList = res.items;
        });
        break;
      case 'pod':
        this.pubPlace.getByPlacesIds(ids).subscribe((res: any) => {
          this.basicPodPortList = res.items;
        });
        break;
      case 'delivery':
        this.pubPlace.getByPlacesIds(ids).subscribe((res: any) => {
          this.deliveryList = res.items;
        });
        break;
      default:
        break;
    }
  }

  // GET Carrier
  getCRMCarrierList(data) {
    this.crmCustomer.getCustomerByType(data).subscribe((res: any) => {
      this.carriers = res.items;
    });
  }

  getAllShipLine() {
    this.ShippingLine.getAll({}).subscribe((res: any) => {
      this.shippings = res.items;
    });
  }

  onCheckValid() {
    let contr = (this.form.controls.routeList as FormArray).controls;
    for (const i in contr) {
      const control = contr[i];
      control.markAsDirty();
      control.updateValueAndValidity();
      if (control instanceof FormGroup || control instanceof FormArray) {
        for (const i in control.controls) {
          const control1 = control.controls[i];
          control1.markAsDirty();
          control1.updateValueAndValidity();
        }
      }
    }
    return this.form.valid;
  }

  polNames = [];
  polIdChange(e, item) {
    e = e.filter((c) => c != undefined);
    this.polNames = e.map((c) => c.nameLocalization);
    item.controls.polName.setValue(this.polNames);
  }

  podNames = [];
  podIdChange(e, item: FormGroup) {
    e = e.filter((c) => c != undefined);
    if (item.value.podId?.length > 0) {
      item.controls.placeOfDeliveryId.clearValidators();
    } else if (item.value.podId?.length <= 0 && item.value.placeOfDeliveryId?.length <= 0) {
      item.controls.podId.setValidators(Validators.required);
      item.controls.placeOfDeliveryId.setValidators(Validators.required);
    }
    for (const key in item.controls) {
      item.controls[key].markAsDirty();
      item.controls[key].updateValueAndValidity();
    }
    this.podNames = e.map((c) => c.nameLocalization);
    item.controls.podName.setValue(this.podNames);
  }

  deliveryNames = [];
  deliveryIdChange(e, item) {
    e = e.filter((c) => c != undefined);
    if (item.value.placeOfDeliveryId?.length > 0) {
      item.controls.podId.clearValidators();
    } else if (item.value.podId?.length <= 0 && item.value.placeOfDeliveryId?.length <= 0) {
      item.controls.podId.setValidators(Validators.required);
      item.controls.placeOfDeliveryId.setValidators(Validators.required);
    }
    for (const key in item.controls) {
      item.controls[key].markAsDirty();
      item.controls[key].updateValueAndValidity();
    }
    // this.onCheckValid();
    this.deliveryNames = e.map((c) => c.nameLocalization);
    item.controls.placeOfDeliveryName.setValue(this.deliveryNames);
  }

  addLine() {
    const routeList = this.form.controls.routeList as FormArray;
    routeList.push(this.buildRouteForm());
  }

  deleteRoute(index) {
    const routeList = this.form.controls.routeList as FormArray;
    routeList.removeAt(index);
  }

  onAllDetele() {
    const ids = this.form.value.routeList.map((c) => c.id);
    this.ratesRouteNoteService.deleteAsync({ id: ids }).subscribe((res) => {
      (this.form.controls.routeList as FormArray).clear();
      this.onSubmitted.emit(true);
      this.sideDrawer.close();
    });
  }
  onSave() {
    if (!this.onCheckValid()) {
      return;
    }
    //处理数据
    this.form.value.routeList.forEach((element) => {
      if (!element.name) {
        const podName = element.podName.length > 0 ? element.podName[0] : element.placeOfDeliveryName[0];
        const name = `${element.polName[0]}-${podName}`;
        element.name = name;
      }
    });
    this.ratesRouteNoteService.createOrUpdate(this.form.value.routeList).subscribe((res) => {
      this.msg.info(this.translate.instant('保存成功') + '!');
      this.onSubmitted.emit(true);
      this.sideDrawer.close();
    });
  }
}
