import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { _HttpClient } from '@co/common';
import {
  CRMCreateOrUpdateAccessAllowInput,
  CRMCustomerAccessAllowOutput,
  CRMCustomerAccessAllowService,
} from 'apps/crm/app/services/crm';
// tslint:disable-next-line:import-blacklist
import { NzModalRef } from 'ng-zorro-antd';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

interface User {
  creationTime: string;
  creator: string;
  customerId: string;
  emailAddress: string;
  fullName: string;
  id: number;
  isActive: boolean;
  isEmailConfirmed: boolean;
  isValid: boolean;
  name: string;
  nameLocalization: string;
  phoneNumber: string;
  status: string;
  surname: string;
  surnameLocalization: string;
  tenantId: number;
  type: number;
  userName: string;
}

@Component({
  selector: 'crm-add-team-members-modal',
  templateUrl: './add-team-members-modal.component.html',
  styleUrls: ['./add-team-members-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTeamMembersModalComponent implements OnInit {
  @Input() customerId: string;
  @Input() users: CRMCustomerAccessAllowOutput[];
  selected: number[] = [];
  userList: Observable<User[]>;
  customersLoading = new BehaviorSubject<boolean>(true);
  saving = new BehaviorSubject<boolean>(false);

  constructor(
    private http: _HttpClient,
    private crmCustomerAccessAllowService: CRMCustomerAccessAllowService,
    private nzModalRef: NzModalRef<AddTeamMembersModalComponent, boolean>
  ) {
    this.userList = this.http.get<User[]>('/SSO/User/GetAllActiveUserBySearch').pipe(
      tap(() => this.customersLoading.next(false)),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  ngOnInit(): void {
    /** 复原勾选的id */
    this.selected = this.users.map(i => i.allowUserId);
  }

  close(): void{
    this.nzModalRef.close();
  }

  getDeleteUserId(): number[] {
    const arr: number[] = [];

    for (const item of this.users){
      if (!this.selected.includes(item.allowUserId)){
        arr.push(item.allowUserId);
      }
    }

    return arr;
  }

  getAddUserId(): number[] {
    const ids: number[] = this.users.map(i => i.allowUserId);
    const arr: number[] = [];

    for (const item of this.selected){
      if (!ids.includes(item)){
        arr.push(item);
      }
    }

    return arr;
  }

  /**
   * 保存说明
   * 1、根据users获得取消勾选的id
   * 2、根据users去除已在系统的数据
   * 3、获得新增的id
   * 4、使用forkJoin将删除和新增请求同时发送
   * 5、根据结果关闭弹窗
   */
  save(): void{
    const req: Observable<any>[] = [];
    const delData = this.getDeleteUserId();
    const addData = this.getAddUserId().map(item => {
      const data: CRMCreateOrUpdateAccessAllowInput = {
        customerId: this.customerId,
        allowUserId: item
      };

      return data;
    });

    if (delData.length > 0){
      req.push(this.crmCustomerAccessAllowService.delete({
        customerId: this.customerId,
        accessAllowUserIds: this.getDeleteUserId()
      }));
    }

    if (addData.length > 0){
      req.push(this.crmCustomerAccessAllowService.create(addData));
    }

    this.saving.next(true);

    forkJoin(req).subscribe({
      next: () => {
        this.nzModalRef.close(true);
        this.saving.next(false);
      },
      error: () => {
        this.saving.next(false);
      }
    });
  }
}
