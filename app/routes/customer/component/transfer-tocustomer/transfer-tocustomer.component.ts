import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlatformOrganizationUnitService } from '@co/cds';

@Component({
  selector: 'transfer-tocustomer',
  templateUrl: './transfer-tocustomer.component.html',
  styleUrls: ['./transfer-tocustomer.component.less'],
})
export class TransferTocustomerComponent implements OnInit {
  selectUserList: any;
  validateForm: FormGroup;
  region: any;
  company: any;
  department: any;

  constructor(private fb: FormBuilder, private platformOrganizationUnitService: PlatformOrganizationUnitService) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      region: [null],
      company: [null],
      department: [null],
      userId: [null, [Validators.required]],
    });

    this.getRegion();
    this.getCompany(null);
  }

  // 默认获取
  getRegion() {
    this.platformOrganizationUnitService
      .getAll({
        type: 8,
      })
      .subscribe((res: any) => {
        this.region = res.items;
      });
  }

  //
  getCompany(pid = null) {
    this.platformOrganizationUnitService
      .getAll({
        parentId: pid,
        type: 4,
      })
      .subscribe((res: any) => {
        this.company = res.items;
        this.validateForm.patchValue({
          company: null,
          department: null,
        });
      });
  }

  getDepartment(pid) {
    if (pid) {
      this.platformOrganizationUnitService
        .getAll({
          parentId: pid,
        })
        .subscribe((res: any) => {
          this.department = res.items;
          this.validateForm.patchValue({
            department: null,
          });
        });
    } else {
      this.onSearchUser();
    }
  }

  // getAllUserInfo(pid) {
  //   if (pid) {

  //     this.selectUserList = null;
  //     this.customerService
  //       .getUsersByOrganizationUnitId({
  //         organizationUnitId: pid,
  //       })
  //       .subscribe((res: any) => {
  //         this.selectUserList = res.items;
  //       });
  //   } else {
  //     // 获取全部客户
  //     this.customerService
  //       .getUsersByOrganizationUnitId({
  //         organizationUnitId: null,
  //       })
  //       .subscribe((res: any) => {
  //         this.selectUserList = res.items;
  //       });
  //   }
  // }

  onSearchUser(text = null) {
    if (text === '') {
      return;
    }

    this.validateForm.patchValue({
      userId: null,
    });

    let pid = null;

    if (this.validateForm.get('region').value) {
      pid = this.validateForm.get('region').value;
    }
    if (this.validateForm.get('company').value) {
      pid = this.validateForm.get('company').value;
    }

    if (this.validateForm.get('department').value) {
      pid = this.validateForm.get('department').value;
    }

    this.platformOrganizationUnitService
      .getUsersByOrganizationUnitId({
        searchText: text,
        organizationUnitId: pid,
      })
      .subscribe((res: any) => {
        this.selectUserList = res.items;
      });
  }

  formValid() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    return this.validateForm.valid;
  }
}
