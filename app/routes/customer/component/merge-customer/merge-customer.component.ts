import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { STColumn, STData } from '@co/cbc';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CRMCustomerService, CRMEsQueryService } from '../../../../services/crm';
import { CoPageBase, debounce } from '@co/core';
import { uniqBy } from 'lodash';
import { customerType } from '../../models/enum';

@Component({
  selector: 'crm-merge-customer',
  templateUrl: './merge-customer.component.html',
  styleUrls: ['./merge-customer.component.less'],
})

export class MergeCustomerComponent extends CoPageBase implements OnInit {
  @Output() readonly onSubmitted = new EventEmitter<boolean>();

  @Input() set customerSelected(value) {
    this.customerList = value.map(e => {
      return { ...e, checked: false };
    });
  }

  customerList = [];
  searchKey = '';
  loading: boolean;
  stLoading: boolean;
  list = [
    { label: '联系人）', value: '1', checked: true },
    { label: 'CSP账号', value: '2', checked: true },
    { label: '位置', value: '2', checked: true },
    { label: '发票抬头', value: '2', checked: true },
    { label: '合作伙伴', value: '2', checked: true },
    { label: '文档', value: '2', checked: true },
    { label: '询价', value: '2', checked: true },
    { label: '运单', value: '2', checked: true },
    { label: '订单', value: '2', checked: true },
    { label: '审批流程', value: '2', checked: true },
    { label: '组织架构', value: '2', checked: true },
    { label: '团队成员', value: '2', checked: true },
  ];
  params = {
    isLoading: true,
    maxResultCount: 20,
    skipCount: 0,
    searchText: null,
  };
  listOfCustomer = [];
  listOfSelectedValue = [];
  customerColumns: STColumn[] = [
    {
      title: '',
      type: 'radio',
      width: 50,
    },
    {
      title: 'Code',
      index: 'code',
      width: 100,
    },
    {
      title: 'Approval Status',
      index: 'examineState',
      render: 'examineState',
      width: 100,
    },
    {
      title: 'Full name (local language)',
      index: 'name',
      width: 200,
    },
    {
      title: 'Full name(english)',
      index: 'localizationName',
      width: 200,
    },
    {
      title: 'Abbreviation(local language)',
      index: 'localizationShortName',
      width: 100,
    },
    {
      title: 'Abbreviation(english)',
      index: 'shortName',
      width: 100,
    },
    {
      title: 'TEL',
      index: 'tel',
      width: 100,
    },
    {
      title: 'FAX',
      index: 'fax',
      width: 100,
    },
    {
      title: 'Country',
      index: 'country',
      width: 100,
    },
    {
      title: 'Customer owned',
      index: 'owner',
      width: 70,
    },
    {
      title: 'CreateUser',
      index: 'creator',
      width: 70,
    },
    {
      title: 'Customer Type',
      index: 'customerType',
      width: 70,
    },
    {
      title: 'Creation Time',
      index: 'creationTime',
      width: 70,
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
    },
    {
      title: 'Update Time',
      index: 'lastModificationTime',
      width: 70,
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
    },
    {
      title: 'Approval Time',
      index: 'auditedDate',
      width: 70,
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
    },
    {
      title: 'Approver',
      index: 'auditor',
      width: 70,
    },
    {
      title: 'Dangerous customer',
      index: 'isDangerFlag',
      render: 'isDangerFlag',
      width: 70,
    },
    {
      title: 'Data Status',
      index: 'isDeleted',
      render: 'isDeleted',
      width: 70,
    },
    {
      title: 'Cooperation State',
      index: 'cooperationState',
      render: 'cooperationState',
      width: 70,
    },
    {
      title: 'Customer Status',
      index: 'owner',
      render: 'ownerState',
      width: 70,
    },
    {
      title: 'Is the CSP account open',
      index: 'isRegistered',
      render: 'isRegistered',
      width: 120,
    },
    {
      title: 'Action',
      type: 'action',
      width: 80,
      fixed: 'right',
      buttons: [
        {
          text: 'Remove',
          click: (item, _modal, comp) => {
            this.remove(item);
          },
          iif: () => this.customerList.length >= 3,
        },
      ],
    },
  ];
  selectedItem: any;
  checkData = [];
  isVisible = false;

  constructor(private crmCustomerService: CRMCustomerService,
              private crmEsQueryService: CRMEsQueryService,
              injector: Injector, private modal: NzModalRef) {
    super(injector);
  }

  ngOnInit(): void {

  }

  continueMerge() {
    let hasSelected = true;
    const data = [];
    this.checkData.forEach(e => {
      e.items.forEach(ele => {
        if (!ele.value) {
          hasSelected = false;
        } else {
          ele.forEach(c => {
            c.isKeep = c.id === ele.value;
          });
        }
        data.push({ type: e.type, items: [...ele] });
      });
    });
    if (!hasSelected) {
      this.$message.success(this.$L('请先选择要保留的数据'));
      return;
    }
    this.merge(data);
  }


  merge(data?) {
    if (this.customerList.length < 2) {
      return;
    }
    this.loading = true;
    const param = {
      keepCustomerId: this.selectedItem.id,
      customerIds: this.excludeSelectedItem(),
      data: null,
    };
    if (data) {
      param.data = data;
    }
    this.crmCustomerService.mergeCustomer(param).subscribe(r => {
      console.log(r);
      this.handleResult(r);
    }, e => this.loading = false);
  }

  handleResult(r) {
    if (r?.data?.length) {
      const contact = [];
      const location = [];
      const partner = [];
      const customerTitle = [];
      const document = [];
      r.data.forEach(e => {
        switch (e.type) {
          case 1: {
            contact.push(e.items);
            break;
          }
          case 2: {
            location.push(e.items);
            break;
          }
          case 3: {
            partner.push(e.items);
            break;
          }
          case 4: {
            customerTitle.push(e.items);
            break;
          }
          case 5: {
            document.push(e.items);
            break;
          }
        }
      });
      contact.length && this.checkData.push({
        type: 1,
        value: null,
        items: contact,
      });
      location.length && this.checkData.push({
        type: 2,
        value: null,
        items: location,
      });
      partner.length && this.checkData.push({
        type: 3,
        value: null,
        items: partner,
      });
      customerTitle.length && this.checkData.push({
        type: 4,
        value: null,
        items: customerTitle,
      });
      document.length && this.checkData.push({
        type: 5,
        value: null,
        items: document,
      });

      console.log(this.checkData);
      this.$message.success(this.$L('存在重复数据，请处理后继续合并'));
      this.loading = false;
      this.showModal();
    } else {
      this.checkData = [];
      this.loading = false;
      this.$message.success(this.$L('Operates successfully'));
      this.onSubmitted.emit(true);
      this.cancel();
    }
  }

  excludeSelectedItem() {
    return this.customerList.filter(e => {
      return e.id != this.selectedItem.id;
    }).map(e => e.id);
  }

  remove(item) {
    this.selectedItem = null;
    this.customerList = this.customerList.filter(e => e.id !== item.id);
  }

  add() {
    this.customerList = uniqBy([...this.customerList, ...this.listOfSelectedValue], 'id');
  }

  cancel() {
    this.modal.destroy();
  }

  loadMore() {
    this.params.skipCount++;
    this.searchCustomer(null, true);
  }

  @debounce(200)
  searchCustomer(searchText, loadMore?) {
    if (!searchText) {
      return;
    }
    this.params.isLoading = true;
    this.params.maxResultCount = 20;
    if (!loadMore) {
      this.params.skipCount = 0;
      this.params.searchText = searchText;
      this.listOfCustomer = [];
    }
    this.crmCustomerService.getAllList({
      searchText: this.params.searchText,
      maxResultCount: this.params.maxResultCount,
      skipCount: this.params.maxResultCount * this.params.skipCount,
    }).subscribe((r: any) => {
      this.params.isLoading = false;
      if (loadMore) {
        this.listOfCustomer = [...this.listOfCustomer, ...r.items];
      } else {
        this.listOfCustomer = r.items;
      }
    }, e => this.params.isLoading = false);
    ;
  }

  onTableChange(e) {
    switch (e.type) {
      case 'radio': {
        this.selectedItem = e.radio;
      }
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
