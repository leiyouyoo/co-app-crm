import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@co/common';
import { CRMCustomerAccessAllowService } from 'apps/crm/app/services/crm';
// tslint:disable-next-line:import-blacklist
import { NzModalRef } from 'ng-zorro-antd';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

interface Customer {
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
  selected: string[] = [];
  customers: Observable<Customer[]>;
  customersLoading = new BehaviorSubject<boolean>(true);
  adding = new BehaviorSubject<boolean>(false);

  constructor(
    private http: _HttpClient,
    private crmCustomerAccessAllowService: CRMCustomerAccessAllowService,
    private nzModalRef: NzModalRef<AddTeamMembersModalComponent, boolean>
  ) {
    this.customers = this.http.get<Customer[]>('/SSO/User/GetAllActiveUserBySearch').pipe(
      tap(() => this.customersLoading.next(false)),
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
    this.crmCustomerAccessAllowService.create({}).subscribe(() => {
      this.nzModalRef.close(true);
    });
  }
}
