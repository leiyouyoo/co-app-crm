import { Component, Input, OnInit } from '@angular/core';
import { _HttpClient } from '@co/common';
import { CRMContactService } from 'apps/crm/app/services/crm';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';

export interface Receives {
  name: string;
  email: string;
}

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

enum DataSource {
  /** 当前客户关联的.联系人.邮箱地址 */
  Contact = 1,
  /** 鹏城海员工.邮箱列表 */
  User
}

@Component({
  selector: 'crm-select-receives-modal',
  templateUrl: './select-receives-modal.component.html',
  styleUrls: ['./select-receives-modal.component.less']
})
export class SelectReceivesModalComponent implements OnInit {
  @Input() customerId: string | undefined;

  selected: Receives[] = [];
  user: Observable<Receives[]>;
  contact: Observable<Receives[]>;

  keyword = new ReplaySubject<string>(1);
  searchLoading = new BehaviorSubject<boolean>(false);
  userLoading = new BehaviorSubject<boolean>(false);
  contactLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private http: _HttpClient,
    private crmContactService: CRMContactService,
  ) {
    this.user = this.keyword.pipe(
      distinctUntilChanged(),
      debounceTime(600),
      switchMap((value: string | undefined | null) => {
        if (value && value.length > 0){
          this.userLoading.next(true);
          return this.http.get<User[]>('/SSO/User/GetAllActiveUserBySearch', {
            SearchText: value
          }).pipe(map(items => {
            const arr: Receives[] = [];

            for (const item of items){
              arr.push({
                name: item.fullName,
                email: item.emailAddress
              });
            }

            return arr;
          }));
        }else {
          return of([]);
        }
      }),
      tap(() => this.userLoading.next(false)),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

    this.contact = this.keyword.pipe(
      distinctUntilChanged(),
      debounceTime(600),
      switchMap((value: string | undefined | null) => {
        if (value && value.length > 0){
          this.contactLoading.next(true);
          return this.crmContactService.getAllSalesAndContacts({
            customerId: this.customerId,
            searchText: value,
            maxResultCount: 500
          }).pipe(map(result => {
            const arr: Receives[] = [];

            for (const item of result.items){
              arr.push({
                name: item.fullName,
                email: item.email
              });
            }

            return arr;
          }));
        }else {
          return of([]);
        }
      }),
      tap(() => this.contactLoading.next(false)),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  ngOnInit(): void {
  }

  miao(event: any){
    console.log(event);
  }
}
