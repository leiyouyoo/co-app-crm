import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-customer-inspection',
  templateUrl: './customer-inspection.component.html',
  styleUrls: ['./customer-inspection.component.less'],
})

export class CustomerInspectionComponent implements OnInit {
  config = [
    {
      list: [
        {
          label: '客户详情',
          type: 'checkbox',
          id: '11111',
          allChecked:false,
          indeterminate:false,
          list: [
            { label: '客户全称（英文）', value: '1', checked: true },
            { label: '客户全称（本地语言）', value: '2', checked: false },
            { label: '纳税人识别号', value: '3', checked: false },
            { label: '曾用名', value: '4', checked: false },
            { label: '号码', value: '5', checked: false },
            { label: '客户简称（英文）', value: '6', checked: false },
            { label: '客户简称（本地语言）', value: '7', checked: false },
            { label: '邮箱', value: '8', checked: false },
            { label: '地址（英文）', value: '9', checked: false },
            { label: '地址（本地语言）', value: '10', checked: false },
          ],
        },
        {
          label: '客户相关联系人',
          type: 'checkbox',
          allChecked:false,
          indeterminate:false,
          list: [
            { label: '邮箱', value: '1', id: '1-1', checked: false },
            { label: '号码', value: '2', id: '1-2', checked: false },
          ],
        },
        {
          label: '客户相关位置',
          type: 'checkbox',
          allChecked:false,
          indeterminate:false,
          list: [
            { label: '地址', value: '1', checked: true },
          ],
        },
        {
          label: '查验方式：',
          type: 'checkbox',
          isMethod: true,
          allChecked:false,
          indeterminate:false,
          list: [
            { label: '精准查询', value: '1', checked: true, disabled: true },
          ],
        },
        {
          label: '新增时客户信息重复处理方式：',
          type: 'radio',
          value: '1',
          list: [
            { label: '提示重复，禁止新增', id: '3-1', value: '1', checked: true },
            { label: '提示重复，允许新增', id: '3-2', value: '2', checked: false },
          ],
        },
      ],
      label: '重复客户定义',
      hidden:false
    },
    {
      list: [
        {
          label: '客户详情',
          type: 'checkbox',
          id: '11111',
          allChecked:false,
          indeterminate:false,
          list: [
            { label: '客户全称（英文）', value: '1', checked: true },
            { label: '客户全称（本地语言）', value: '2', checked: false },
            { label: '纳税人识别号', value: '3', checked: false },
            { label: '曾用名', value: '4', checked: false },
            { label: '号码', value: '5', checked: false },
            { label: '客户简称（英文）', value: '6', checked: false },
            { label: '客户简称（本地语言）', value: '7', checked: false },
            { label: '邮箱', value: '8', checked: false },
            { label: '地址（英文）', value: '9', checked: false },
            { label: '地址（本地语言）', value: '10', checked: false },
          ],
        },
        {
          label: '客户相关联系人',
          type: 'checkbox',
          allChecked:false,
          indeterminate:false,
          list: [
            { label: '邮箱', value: '1', id: '1-1', checked: false },
            { label: '号码', value: '2', id: '1-2', checked: false },
          ],
        },
        {
          label: '客户相关位置',
          type: 'checkbox',
          allChecked:false,
          indeterminate:false,
          list: [
            { label: '地址', value: '1', checked: false },
          ],
        },
        {
          label: '查验方式：',
          type: 'checkbox',
          allChecked:false,
          indeterminate:false,
          isMethod: true,
          list: [
            { label: '精准查询', value: '1', checked: true, disabled: true },
          ],
        },
        {
          label: '新增时客户信息重复处理方式：',
          type: 'radio',
          list: [
            { label: '显示相似客户列表，允许新增', id: '3-1', value: '1', checked: true },
            { label: '显示相似客户列表，禁止新增', id: '3-2', value: '2', checked: false },
          ],
        },
      ],
      label: '相似客户定义',
      hidden:false
    },
  ];


  constructor() {
  }

  ngOnInit() {
    this.setValue(true);
  }

  setValue(initValue = false) {
    this.config.forEach(element => {
      element.list.forEach(e => {
        this.updateSingleChecked(e);
        if (e.type === 'radio') {
          initValue ? e.value = e.list.filter(ele => ele.checked)[0].value : null;
          e.list.forEach(ele => {
            ele.checked = false;
            ele.value === e.value ? ele.checked = true : null;
          });
        }
      });
    });
    console.log(this.config);
  }

  updateSingleChecked(item): void {
    if (item.list.every(item => !item.checked)) {
      item.allChecked = false;
      item.indeterminate = false;
    } else if (item.list.every(item => item.checked)) {
      item.allChecked = true;
      item.indeterminate = false;
    } else {
      item.indeterminate = true;
    }
  }

  updateAllChecked(item): void {
    item.indeterminate = false;
    if (item.allChecked) {
      item.list = item.list.map(item => {
        return {
          ...item,
          checked: true,
        };
      });
    } else {
      item.list = item.list.map(item => {
        return {
          ...item,
          checked: false,
        };
      });
    }
  }
}
