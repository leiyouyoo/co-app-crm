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
import { filter, map, shareReplay, tap } from 'rxjs/operators';

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
  /** 传入已存在用户id */
  @Input() exists: number[];
  selected: number[] = [];
  userList: Observable<User[]>;
  userLoading = new BehaviorSubject<boolean>(true);
  saving = new BehaviorSubject<boolean>(false);

  constructor(
    private http: _HttpClient,
    private crmCustomerAccessAllowService: CRMCustomerAccessAllowService,
    private nzModalRef: NzModalRef<AddTeamMembersModalComponent, boolean>,
  ) {
    this.userList = this.http.get<User[]>('/SSO/User/GetAllActiveUserBySearch').pipe(
      map(items => items.filter(i => i.customerId !== this.customerId && !this.exists.includes(i.id))),
      tap(() => this.userLoading.next(false)),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  ngOnInit(): void {
  }

  close(): void{
    this.nzModalRef.close();
  }

  save(): void{
    this.saving.next(true);
    this.crmCustomerAccessAllowService.create(this.selected.map(item => {
      const data: CRMCreateOrUpdateAccessAllowInput = {
        customerId: this.customerId,
        allowUserId: item
      };

      return data;
    })).subscribe({
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
