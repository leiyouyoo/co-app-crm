import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CRMCustomerAccessAllowOutput, CRMCustomerAccessAllowService } from 'apps/crm/app/services/crm';
// tslint:disable-next-line:import-blacklist
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap, catchError } from 'rxjs/operators';
import { AddTeamMembersModalComponent } from '../add-team-members-modal/add-team-members-modal.component';
import { GlobalEventDispatcher } from '@co/cms';

@Component({
  selector: 'crm-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMembersComponent implements OnInit {
  @Input() customerId: string;
  selected = new SelectionModel<any>(true);
  keyword = new FormControl('');
  members: Observable<CRMCustomerAccessAllowOutput[]>;
  reload$ = new Subject<void>();
  isLoading = new BehaviorSubject<boolean>(true);

  constructor(
    private crmCustomerAccessAllowService: CRMCustomerAccessAllowService,
    private nzModalService: NzModalService,
    private globalEventDispatcher: GlobalEventDispatcher,
  ) {
    this.members = merge(
      of(null),
      this.keyword.valueChanges.pipe(
        debounceTime(600),
        distinctUntilChanged()
      ),
      this.reload$
    ).pipe(
      switchMap((value: string | undefined | null) => {
        this.isLoading.next(true);

        return this.crmCustomerAccessAllowService.getAll({
          customerId: this.customerId,
          name: value
        }).pipe(
          map(result => result.items),
          catchError(() => of([])),
        );
      }),
      tap(() => {
        this.isLoading.next(false);
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  ngOnInit(): void {
  }

  openRemoveModal(): void {
    this.nzModalService.confirm({
      nzTitle: '确认删除?',
      nzOnOk: () => this.crmCustomerAccessAllowService.delete({
        customerId: this.customerId,
        accessAllowUserIds: this.selected.selected.map(e => e.allowUserId),
      }).pipe(tap(() => this.reload$.next())).toPromise(),
    });
  }

  openAddTeamMembersModal(items: CRMCustomerAccessAllowOutput[]): void {
    const modal = this.nzModalService.create<AddTeamMembersModalComponent, boolean | undefined | null>({
      nzTitle: '添加成员',
      nzContent: AddTeamMembersModalComponent,
      nzComponentParams: {
        customerId: this.customerId,
        users: items,
      },
      nzWidth: 800,
      nzFooter: null,
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.reload$.next();
      }
    });
  }

  chat() {
    const membersList = this.selected.selected;
    if (membersList.length === 1) {
      this.globalEventDispatcher.dispatch('chatWithIM', {
        isC2C: true,
        personInfo: {
          name: membersList[0].allowUserName,
          id: membersList[0].allowUserId,
        },
      });
    } else {
      this.globalEventDispatcher.dispatch('chatWithIM', {
        isCreateGroup: true,
        name: membersList.map((e) => {
          return e.allowUserName || 'test';
        }).join(',').substring(0, 10),
        memberList: this.selected.selected.map(e => {
          return { userID: e.allowUserId.toString() };
        }),
      });
    }
  }
}
