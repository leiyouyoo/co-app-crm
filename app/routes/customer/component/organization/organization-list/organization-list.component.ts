import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { STColumn } from '@co/cbc';
import { CoPageBase } from '@co/core';
// tslint:disable-next-line:import-blacklist
import { NzMessageService } from 'ng-zorro-antd';
import { BehaviorSubject, interval, merge, Observable, of, Subject, timer } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { CRMCustomerListDto, CRMCustomerService, CRMQueryConnectionCustomerDto } from '../../../../../services/crm';

interface QueryParam {
  contactId?: string;
}

@Component({
  selector: 'crm-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationListComponent extends CoPageBase implements OnInit, OnDestroy {
  customers: Observable<CRMQueryConnectionCustomerDto[]>;
  connectionCustomers: Observable<CRMCustomerListDto[]>;
  selectCustomers: string[] = [];
  keyword = new Subject<string>();
  customerLoading = new BehaviorSubject<boolean>(false);
  connectionCustomersLoading = new BehaviorSubject<boolean>(true);
  private unsubscribe = new Subject<void>();
  queryParam: Observable<QueryParam>;
  readonly maxTotal: number = 20;
  private reloadConnectionCustomers$ = new Subject<void>();

  readonly columns: STColumn[] = [
    {
      title: '公司名称',
      render: 'name',
      width: 100
    },
    {
      title: '国家-省',
      render: 'location',
      width: 100
    },
    {
      title: '客户所有人',
      render: 'people',
      width: 100
    },
    {
      title: '号码',
      render: 'number',
      width: 100
    },
    {
      title: '首次出货时间',
      render: 'time',
      width: 100
    },
    {
      title: '操作',
      type: 'action',
      width: 100,
      buttons: [
        {
          text: '删除',
          type: 'delay',
          click: record => {
            return this.remove(record).then(() => ({
              action: 'delete'
            }));
          }
        }
      ]
    }
  ];

  constructor(
    injector: Injector,
    private crmCustomerService: CRMCustomerService,
    private activatedRoute: ActivatedRoute,
    private nzMessageService: NzMessageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(injector);
    this.queryParam = this.activatedRoute.queryParamMap.pipe(
      map(m => {
        const q: QueryParam = {};

        // if (m.has('contact_id')){
        //   q.contactId = m.get('contact_id');
        // }
        q.contactId = 'f6453048-deb0-4ae8-a4bc-d8ed72ee2b11';

        return q;
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

    this.customers = this.keyword.pipe(
      debounce(() => timer(400)),
      switchMap((value: string | undefined | null) => {
        if (value && value.length >= 3){
          this.customerLoading.next(true);
          return this.crmCustomerService.queryConnectionCustomer({ searchText: value });
        }else {
          return of([]);
        }
      }),
      tap(() => {
        this.customerLoading.next(false);
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

    this.connectionCustomers = this.queryParam.pipe(
      switchMap(query => merge(of(null), this.reloadConnectionCustomers$).pipe(
        switchMap(() => {
          this.connectionCustomersLoading.next(true);
          return this.crmCustomerService.getAllConnectionCustomers({
            sourceCustomerId: query.contactId,
            maxResultCount: this.maxTotal
          });
        })
      )),
      map(result => result.items),
      tap(() => {
        this.connectionCustomersLoading.next(false);
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  search(value): void{
    this.keyword.next(value);
  }

  add(): void{
    this.nzMessageService.loading('添加中');
    this.queryParam.pipe(
      take(1),
      switchMap(query => this.crmCustomerService.relationCustomer({
        mainCustomerId: query.contactId,
        relationCustomerIds: this.selectCustomers
      }))
    ).subscribe(() => {
      this.selectCustomers = [];
      this.changeDetectorRef.detectChanges();
      this.reloadConnectionCustomers$.next();
      this.nzMessageService.remove();
      this.nzMessageService.success('添加成功');
    });
  }

  remove(item: CRMCustomerListDto): Promise<any>{
    this.nzMessageService.loading('删除中');
    return this.queryParam.pipe(
      take(1),
      switchMap(query => this.crmCustomerService.deleteRelationCustomer({
        sourceCustomerId: query.contactId,
        deleteCustomerId: item.id
      })),
      tap(() => {
        this.nzMessageService.success('删除成功');
      })
    ).toPromise();
  }
}
