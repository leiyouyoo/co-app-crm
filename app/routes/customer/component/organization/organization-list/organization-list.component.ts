import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { STColumn } from '@co/cbc';
import { STChange } from '@co/cbc/web/st/st.interfaces';
import { CoPageBase } from '@co/core';
// tslint:disable-next-line:import-blacklist
import { NzMessageService } from 'ng-zorro-antd';
import { BehaviorSubject, interval, merge, Observable, of, Subject, timer } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { CRMCustomerListDto, CRMCustomerService, CRMQueryConnectionCustomerDto } from '../../../../../services/crm';

interface QueryParam {
  customerId?: string;
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
  total = new BehaviorSubject<number>(0);
  pageIndex = new BehaviorSubject<number>(0);
  pageSize = new BehaviorSubject<number>(2);
  private unsubscribe = new Subject<void>();
  queryParam: Observable<QueryParam>;
  private reloadConnectionCustomers$ = new Subject<void>();

  readonly columns: STColumn[] = [
    {
      title: this.$L('CompanyName'),
      render: 'name',
      width: 100
    },
    {
      title: this.$L('Location name'),
      render: 'location',
      width: 100
    },
    {
      title: this.$L('Owner'),
      render: 'people',
      width: 100
    },
    {
      title: this.$L('Phone'),
      render: 'number',
      width: 100
    },
    {
      title: this.$L('First shipment time'),
      render: 'time',
      width: 100
    },
    {
      title: this.$L('Operating'),
      type: 'action',
      width: 100,
      buttons: [
        {
          text: this.$L('Delete'),
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
    this.queryParam = this.activatedRoute.paramMap.pipe(
      map(m => {
        const q: QueryParam = {};

        if (m.has('customer_id')){
          q.customerId = m.get('customer_id');
        }

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
          return this.crmCustomerService.queryConnectionCustomer({
            searchText: value
          });
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
            sourceCustomerId: query.customerId,
            maxResultCount: this.pageSize.getValue(),
            skipCount: this.pageIndex.getValue() * this.pageSize.getValue()
          });
        })
      )),
      map(result => {
        this.total.next(result.totalCount);
        return result.items;
      }),
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
    this.nzMessageService.loading(this.$L('Processing'));
    this.queryParam.pipe(
      take(1),
      switchMap(query => this.crmCustomerService.relationCustomer({
        mainCustomerId: query.customerId,
        relationCustomerIds: this.selectCustomers
      }))
    ).subscribe(() => {
      this.selectCustomers = [];
      this.changeDetectorRef.detectChanges();
      this.reloadConnectionCustomers$.next();
      this.nzMessageService.remove();
      this.nzMessageService.success(this.$L('New success'));
    });
  }

  remove(item: CRMCustomerListDto): Promise<any>{
    this.nzMessageService.loading(this.$L('Processing'));
    return this.queryParam.pipe(
      take(1),
      switchMap(query => this.crmCustomerService.deleteRelationCustomer({
        sourceCustomerId: query.customerId,
        deleteCustomerId: item.id
      })),
      tap(() => {
        this.nzMessageService.success(this.$L('Delete success'));
      })
    ).toPromise();
  }

  changeTable(event: STChange): void{
    switch (event.type) {
      case 'pi':
        this.pageIndex.next(event.pi - 1);
        this.reloadConnectionCustomers$.next();
        break;
      case 'ps':
        this.pageIndex.next(0);
        this.pageSize.next(event.ps);
        /** 修改index的时候会触发change，会重复调用，所以在这里触发reload，以上面为准 */
        // this.reloadConnectionCustomers$.next();
        break;
    }
  }
}
