import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { _HttpClient } from '@co/common';
import { CRMContactService, CRMEmailService, CRMGetAllSalesAndContactsOutput } from 'apps/crm/app/services/crm';
import { STORAGEFileService } from 'apps/crm/app/services/storage';
import { CKEditor4 } from 'ckeditor4-angular';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, EMPTY, from, merge, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  mergeAll, retry,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
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

export interface SelectedFile {
  index: number;
  data: File;
}

export interface FileInfo {
  fileId: string;
  url: string;
  fileName: string;
  extensionName: string;
}

export interface InitData{
  customerId: string;
  sender: UserDetail;
  ccModel: boolean;
  bccModel: boolean;
  cc: string[];
  bcc: string[];
  subject: string;
  value: string;
  fileList: FileInfo[];
}

@Component({
  selector: 'crm-customer-email',
  templateUrl: './customer-email.component.html',
  styleUrls: ['./customer-email.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerEmailComponent implements OnInit, OnDestroy {
  @Input() customerId: string | undefined;
  @Input() init: InitData | undefined;
  @Input() fullScreenMode = false;

  user: Observable<UserDetail>;
  sender: Observable<UserDetail>;
  receivesList: Observable<CRMGetAllSalesAndContactsOutput[]>;
  receivesKeyword = new Subject<string>();
  receivesSearchLoading = new BehaviorSubject<boolean>(false);
  ccModel = new BehaviorSubject<boolean>(false);
  bccModel = new BehaviorSubject<boolean>(false);
  cc: string[] = [];
  bcc: string[] = [];
  receives: string[] = [];
  password: string | undefined = undefined;
  sending = new BehaviorSubject<boolean>(false);
  form = new FormGroup({
    subject: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  });

  selectedFile = new BehaviorSubject<SelectedFile[]>([]);
  fileList = new BehaviorSubject<FileInfo[]>([]);

  readonly editorConfig: CKEditor4.Config = {};

  private unsubscribe = new Subject<void>();

  constructor(
    private http: _HttpClient,
    private crmContactService: CRMContactService,
    private crmEmailService: CRMEmailService,
    private nzModalService: NzModalService,
    private storageFileService: STORAGEFileService,
    private nzMessageService: NzMessageService,
  ) {
    this.user = this.http.get<UserDetail>('/SSO/User/GetUserDetail').pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true,
      }),
    );

    this.sender = of(this.init?.sender).pipe(
      switchMap(initSender => {
        if (initSender) {
          return of(initSender);
        } else {
          return this.user;
        }
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.receivesList = this.receivesKeyword.pipe(
      distinctUntilChanged(),
      debounceTime(600),
      switchMap((value: string | undefined | null) => {
        if (value && value.length > 0){
          this.receivesSearchLoading.next(true);
          return this.crmContactService.getAllSalesAndContacts({
            customerId: this.customerId,
            searchText: value ? value : undefined,
            maxResultCount: 100
          }).pipe(map(result => result.items));
        }else {
          return of([]);
        }
      }),
      tap(() => this.receivesSearchLoading.next(false)),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );
  }

  ngOnInit(): void {
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

    if (this.init){
      this.cc = this.init.cc;
      this.bcc = this.init.bcc;
      this.form.patchValue({
        subject: this.init.subject,
        value: this.init.value
      });
      this.fileList.next(this.init.fileList);
      this.ccModel.next(this.init.ccModel);
      this.bccModel.next(this.init.bccModel);
    }
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

  uploadFile(event: Event): void{
    const input = (event.target as HTMLInputElement);
    const arr: SelectedFile[] = [];

    for (let index = 0; index < input.files.length; index++){
      const file = input.files.item(index);
      if (file){
        arr.push({
          index,
          data: file,
        });
      }
    }

    input.value = null;
    this.selectedFile.next(arr);

    from(arr).pipe(
      map(item => {
        return this.storageFileService.upload({
          file: item.data
        }).pipe(
          retry(2),
          tap(() => {
            const local = this.selectedFile.getValue();
            const index = local.findIndex(i => item.index === i.index);
            local.splice(index, 1);
            this.selectedFile.next(local);
          })
        );
      }),
      mergeAll(2),
    ).subscribe({
      next: result => {
        this.fileList.next([...this.fileList.getValue(), {
          fileId: result.fileId,
          url: result.url,
          fileName: result.fileName,
          extensionName: result.extensionName
        }]);
      }
    });
  }

  openFullScreen(): void{
    this.sender.pipe(
      switchMap(sender => {
        const modal = this.nzModalService.create<CustomerEmailComponent, InitData>({
          nzTitle: '邮件',
          nzWidth: '90vw',
          nzFooter: null,
          nzContent: CustomerEmailComponent,
          nzComponentParams: {
            fullScreenMode: true,
            init: {
              customerId: this.customerId,
              sender,
              ccModel: this.ccModel.getValue(),
              bccModel: this.bccModel.getValue(),
              cc: this.cc,
              bcc: this.bcc,
              subject: this.form.value.subject,
              value: this.form.value.value,
              fileList: this.fileList.getValue()
            }
          },
          nzOnCancel: instance => {
            modal.afterClose.next({
              customerId: instance.customerId,
              sender,
              ccModel: instance.ccModel.getValue(),
              bccModel: instance.bccModel.getValue(),
              cc: instance.cc,
              bcc: instance.bcc,
              subject: instance.form.value.subject,
              value: instance.form.value.value,
              fileList: instance.fileList.getValue()
            });
          }
        });

        return modal.afterClose;
      })
    ).subscribe(result => {
      this.ccModel.next(result.ccModel);
      this.bccModel.next(result.bccModel);
      this.cc = result.cc;
      this.bcc = result.bcc;
      this.form.patchValue({
        subject: result.subject,
        value: result.value
      });
      this.fileList.next(result.fileList);
    });
  }

  openEmailPasswordInputModals(title?: string): Observable<string | undefined | null>{
    return this.nzModalService.create<EmailPasswordInputModalComponent, string | undefined | null>({
      nzTitle: title || '请输入密码',
      nzContent: EmailPasswordInputModalComponent,
      nzFooter: null
    }).afterClose;
  }

  getReceivesLabel(item: CRMGetAllSalesAndContactsOutput): string{
    return `${ item.fullName }<${ item.email }>`;
  }

  removeFile(index: number): void{
    const arr = this.fileList.getValue();
    arr.splice(index, 1);
    this.fileList.next(arr);
  }

  submit(): void{
    /** 检查有没有文件在上传中，等文件上传完成 */
    if (this.selectedFile.getValue().length > 0){
      this.nzMessageService.error('请等待文件上传完成', {
        nzDuration: 1000
      });
    }

    this.sending.next(true);
    this.sender.pipe(
      switchMap(sender => of(this.hasPassword()).pipe(
        switchMap(password => {
          /** 如果有密码那就直接发送邮件，不用带密码 */
          if (password){
            return this.crmEmailService.seed({
              customerId: this.customerId,
              from: sender.emailAddress,
              fromUserId: sender.id,
              to: this.receives,
              subject: this.form.value.subject,
              body: this.form.value.value,
              cc: this.cc,
              bcc: this.bcc,
              attachments: this.fileList.getValue().map(i => i.fileId)
            });
          }else {
            /** 打开输入密码的弹窗 */
            return this.openEmailPasswordInputModals().pipe(
              switchMap(result => {
                /** 如果填了密码，那就发送请求 */
                if (result){
                  return this.crmEmailService.seed({
                    customerId: this.customerId,
                    from: sender.emailAddress,
                    fromUserId: sender.id,
                    to: this.receives,
                    subject: this.form.value.subject,
                    body: this.form.value.value,
                    cc: this.cc,
                    bcc: this.bcc,
                    fromPassword: result,
                    attachments: this.fileList.getValue().map(i => i.fileId)
                  });
                }else {
                  /** 没有的话那就直接完成这个observable结束操作 */
                  return EMPTY;
                }
              })
            );
          }
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse){
            console.error(err.error.error.code);
            if (err.error?.error?.code === 401){
              /** code = 401 为密码错误，重新打开输入密码modal，重发请求 */
              return this.openEmailPasswordInputModals('密码错误，请重新输入').pipe(
                switchMap(result => {
                  /** 如果填了密码，那就发送请求 */
                  if (result){
                    return this.crmEmailService.seed({
                      customerId: this.customerId,
                      from: sender.emailAddress,
                      fromUserId: sender.id,
                      to: this.receives,
                      subject: this.form.value.subject,
                      body: this.form.value.value,
                      cc: this.cc,
                      bcc: this.bcc,
                      fromPassword: result,
                      attachments: this.fileList.getValue().map(i => i.fileId)
                    });
                  }else {
                    /** 没有的话那就直接完成这个observable结束操作 */
                    return EMPTY;
                  }
                })
              );
            }
          }
        })
      ))
    ).subscribe({
      next: v => {
        console.log(v);
      },
      error: err => {
        console.error(err);
        this.sending.next(false);
      },
      complete: () => {
        this.sending.next(false);
      }
    });
  }
}
