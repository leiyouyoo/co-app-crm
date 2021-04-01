import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { _HttpClient } from '@co/common';
import { CRMContactService, CRMEmailService, CRMGetAllSalesAndContactsOutput } from 'apps/crm/app/services/crm';
import { CKEditor4 } from 'ckeditor4-angular';
// tslint:disable-next-line:import-blacklist
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject, EMPTY, merge, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { EmailPasswordInputModalComponent } from './email-password-input-modal/email-password-input-modal.component';

interface UserDetail {
  customerId: string;
  emailAddress: string | null;
  icpUserId: string;
  id: number;
  name: string;
  phoneNumber: string;
  profilePictureId: string;
  surname: string;
  tel: string;
  userName: string;
}

@Component({
  selector: 'crm-customer-email',
  templateUrl: './customer-email.component.html',
  styleUrls: ['./customer-email.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerEmailComponent implements OnInit, OnDestroy {
  @Input() customerId: string;
  @Input() private initSender: string;

  value = '';
  user: Observable<UserDetail>;
  sender: Observable<string>;
  receivesList: Observable<CRMGetAllSalesAndContactsOutput[]>;
  receivesKeyword = new Subject<string>();
  receivesSearchLoading = new BehaviorSubject<boolean>(false);
  ccModel = new BehaviorSubject<boolean>(false);
  bccModel = new BehaviorSubject<boolean>(false);
  cc: string[] = [];
  bcc: string[] = [];
  receives: string[] = [];
  password: string | undefined = undefined;

  form = new FormGroup({
    sender: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  });

  readonly editorConfig: CKEditor4.Config = {};

  private unsubscribe = new Subject<void>();

  constructor(
    private http: _HttpClient,
    private crmContactService: CRMContactService,
    private crmEmailService: CRMEmailService,
    private nzModalService: NzModalService
  ) {
    this.user = this.http.get<UserDetail>('/SSO/User/GetUserDetail').pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true,
      }),
    );

    this.sender = of(this.initSender).pipe(
      switchMap(initSender => {
        if (initSender) {
          return of(initSender);
        } else {
          return this.user.pipe(
            map(user => {
              let value = '';

              if (user.emailAddress) {
                value = user.emailAddress;
              }

              return value;
            }),
          );
        }
      })
    );

    this.receivesList = merge(
      of(null),
      this.receivesKeyword.pipe(
        distinctUntilChanged(),
        debounceTime(600)
      )
    ).pipe(
      switchMap((value: string | undefined | null) => {
        this.receivesSearchLoading.next(true);
        return this.crmContactService.getAllSalesAndContacts({
          customerId: this.customerId,
          searchText: value ? value : undefined
        });
      }),
      map(result => result.items),
      tap(() => this.receivesSearchLoading.next(false)),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );
  }

  ngOnInit(): void {
    this.form.controls.sender.disable({emitEvent: false});

    this.ccModel
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(value => {
        if (!value) {
          this.cc = [];
        }
      });

    this.bccModel
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(value => {
        if (!value) {
          this.bcc = [];
        }
      });

    this.sender.pipe(take(1)).subscribe(v => this.form.patchValue({
      sender: v
    }));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  hasPassword(): boolean{
    const data: any = JSON.parse(window.localStorage.getItem('co.session'));
    return data?.session?.user?.hasEmailPassword === true;
  }

  updateMail(event: string): void {
    console.log(event);
  }

  searchReceives(event: string): void{
    this.receivesKeyword.next(event);
  }

  openEmailPasswordInputModal(): void{
    const modal = this.nzModalService.create<EmailPasswordInputModalComponent, string | undefined | null>({
      nzTitle: '请输入密码',
      nzContent: EmailPasswordInputModalComponent,
      nzFooter: null
    });

    modal.afterClose.subscribe(v => {
      this.password = v;
    });
  }

  openEmailPasswordInputModals(): Observable<string | undefined | null>{
    return this.nzModalService.create<EmailPasswordInputModalComponent, string | undefined | null>({
      nzTitle: '请输入密码',
      nzContent: EmailPasswordInputModalComponent,
      nzFooter: null
    }).afterClose;
  }

  getReceivesLabel(item: CRMGetAllSalesAndContactsOutput): string{
    return `${ item.fullName }<${ item.email }>`;
  }

  submit(): void{
    of(this.hasPassword()).pipe(
      switchMap(value => {
        /** 如果有密码那就直接发送邮件，不用带密码 */
        if (value){
          return this.crmEmailService.seed({
            from: this.form.controls.sender.value,
            to: this.receives,
            subject: this.form.value.subject,
            body: this.form.value.value,
            cc: this.cc,
            bcc: this.bcc,
          });
        }else {
          /** 打开输入密码的弹窗 */
          return this.openEmailPasswordInputModals().pipe(
            switchMap(result => {
              /** 如果填了密码，那就发送请求 */
              if (result){
                return this.crmEmailService.seed({
                  from: this.form.controls.sender.value,
                  to: this.receives,
                  subject: this.form.value.subject,
                  body: this.form.value.value,
                  cc: this.cc,
                  bcc: this.bcc,
                  fromPassword: result
                });
              }else {
                /** 没有的话那就直接完成这个observable结束操作 */
                return EMPTY;
              }
            })
          );
        }
      })
    ).subscribe({
      next: v => {
        console.log(v);
      },
      error: e => {
        console.error(e);
      }
    });
  }
}
