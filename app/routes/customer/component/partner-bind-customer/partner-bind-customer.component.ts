import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ComponentFactoryResolver, Injector,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { STColumn } from '@co/cbc';
import { CooperationState, CustomerStatus, CustomerType } from '../../models/enum';
import { CRMCreateOrUpdatePartnerDto, CRMCustomerService, CRMPartnerService } from '../../../../services/crm';
import { CoPageBase } from '@co/core';


@Component({
  selector: 'partner-bind-customer',
  templateUrl: './partner-bind-customer.component.html',
  styleUrls: ['./partner-bind-customer.component.less'],
})
export class PartnerBindCustomerComponent extends CoPageBase implements OnInit {
  validateForm: FormGroup;
  listOfData: any = {};
  loading = false;
  showSearch = true;
  cusLoading = false;
  com: any;
  @Input() modalName: string;
  @Input() customerId: any;
  @Output() outData = new EventEmitter<any>();
  parentId: any;
  tableMaxResultCount = 7; //页大小
  tableSkipCount = 1; //跳过指定条数

  a = this.translate.instant('Cooperating customers');
  b = this.translate.instant('Potential customers');
  c = this.translate.instant('Unowned customers');
  d = this.translate.instant('Share customers');

  readonly CustomerType = CustomerType;
  columns: STColumn[] = [
    {
      title: 'Code',
      index: 'code',
      width: 100,
    },
    {
      title: 'Name-Chinese',
      index: 'localizationName',
      width: 200,
    },
    {
      title: 'Name-English',
      index: 'localizationName',
      width: 200,
    },
    {
      title: 'Abbreviation-Chinese',
      index: 'localizationShortName',
      width: 100,
    },
    {
      title: 'Abbreviation-English',
      index: 'shortName',
      width: 100,
    },
    {
      title: 'Owner',
      index: 'owner',
      width: 100,
    },

    {
      title: 'Is the CSP account open',
      index: 'isRegistered',
      render: 'isRegistered',
      width: 200,
    },
    {
      title: 'Country',
      index: 'country',
      width: 100,
    },
    {
      title: 'Cooperation State',
      index: 'cooperationState',
      render: 'cooperationState',
      width: 100,
    },
    {
      title: '客户状态',
      index: 'country',
      width: 100,
    },
    {
      title: 'Customer Type',
      index: 'customerType',
      render: 'customerType',
      width: 100,
    },
    {
      title: 'Creation Time',
      index: 'creationTime',
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
      width: 100,
      sort: 'creationTime',
    },
    {
      title: 'Dangerous customer',
      index: 'isDangerFlag',
      render: 'isDangerFlag',
      width: 80,
    },
    {
      title: 'Action',
      type: 'action',
      width: 100,
      buttons: [
        {
          text: 'Bind',
          iif: (item) => item.owner,
          click: (e) => {
            this.bindCustomer(0, e.id, false);
          },
        },
        {
          text: 'Bind and claim',
          iif: (item) => !item.owner,
          click: (e) => {
            this.bindCustomer(0, e.id, true);
          },
        },
      ],
    },
  ];

  constructor(
    private fb: FormBuilder,
    injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private crmCustomerService: CRMCustomerService,
    private crmPartnerService: CRMPartnerService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.tableMaxResultCount = 7; //页大小
    this.tableSkipCount = 1; //跳过指定条数
    this.listOfData = {};
    this.validateForm = this.fb.group({
      name: [null],
    });
  }

//table操作方法
  onTableChange(e) {
    switch (e.type) {
      case 'click': {
        break;
      }
    }
  }

  search(parentId?: any) {
    if (parentId) {
      this.parentId = parentId;
    } else {
      this.parentId = null;
    }

    let name = this.validateForm.value.name;
    this.getCustomersByNameOrCode(name);
  }

  getCustomersByNameOrCode(name: string, parentId?: any) {
    if (parentId) {
      this.parentId = parentId;
    }
    let num = this.tableSkipCount - 1;
    this.loading = true;
    this.crmCustomerService
      .getCustomersByNameOrCode({
        searchText: name,
      })
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.listOfData = res;
          this.listOfData.items = res.items.filter((item) => item.id !== this.customerId);
        },
        (err) => {
          this.loading = false;
        },
      );
  }

  tablePageIndexChange(event) {
    this.tableSkipCount = event;
    this.search();
  }

  bindCustomer(type: number, id: any, isGetCustomer: boolean) {
    this.crmPartnerService.bindCustomer({
      partnerId: this.parentId,
      customerId: this.customerId,
      bindCustomerId: id,
      isGetCustomer: isGetCustomer,
    }).subscribe((res) => {
      this.parentId = null;
      let message = '';
      if (isGetCustomer) {
        message = this.translate.instant('Bind and claim success');
      } else {
        message = this.translate.instant('New success');
      }
      this.$message.success(this.$L(message));
    });
  }
}