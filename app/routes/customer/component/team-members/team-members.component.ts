import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GlobalEventDispatcher } from '@co/cms';
import { CRMCustomerAccessAllowOutput, CRMCustomerAccessAllowService } from 'apps/crm/app/services/crm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AddTeamMembersModalComponent } from '../add-team-members-modal/add-team-members-modal.component';

@Component({
  selector: 'crm-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMembersComponent implements OnInit {
  @Input() customerId: string;
  selected = new SelectionModel<number>(true);
  keyword = new FormControl('');
  members: Observable<CRMCustomerAccessAllowOutput[]>;
  reload$ = new Subject<void>();
  isLoading = new BehaviorSubject<boolean>(true);

  constructor(
    private crmCustomerAccessAllowService: CRMCustomerAccessAllowService,
    private nzModalService: NzModalService,
    private globalEventDispatcher: GlobalEventDispatcher,
    private nzMessageService: NzMessageService,
  ) {
    this.members = merge(
      of(null),
      this.keyword.valueChanges.pipe(
        debounceTime(600),
        distinctUntilChanged(),
      ),
      this.reload$,
    ).pipe(
      switchMap((value: string | undefined | null) => {
        this.isLoading.next(true);

        return this.crmCustomerAccessAllowService.getAll({
          customerId: this.customerId,
          name: value,
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
        refCount: true,
      }),
    );
  }

  ngOnInit(): void {
  }

  remove(): void {
    this.isLoading.next(true);
    this.crmCustomerAccessAllowService.delete({
      customerId: this.customerId,
      accessAllowUserIds: this.selected.selected,
    }).subscribe(() => {
      this.reload$.next();
    });
  }

  openAddTeamMembersModal(items: CRMCustomerAccessAllowOutput[]): void {
    const modal = this.nzModalService.create<AddTeamMembersModalComponent, boolean | undefined | null>({
      nzTitle: '添加成员',
      nzContent: AddTeamMembersModalComponent,
      nzComponentParams: {
        customerId: this.customerId,
        exists: items.map(i => i.allowUserId),
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

  chat(items: CRMCustomerAccessAllowOutput[]) {
    const members: CRMCustomerAccessAllowOutput[] = [];

    for (const item of items) {
      if (this.selected.isSelected(item.allowUserId)) {
        members.push(item);
      }
    }

    if (members.length === 1) {
      this.globalEventDispatcher.dispatch('chatWithIM', {
        isC2C: true,
        personInfo: {
          name: members[0].allowUserName,
          id: members[0].allowUserId,
          isActive: true,
        },
      });
    } else {
      this.globalEventDispatcher.dispatch('chatWithIM', {
        isCreateGroup: true,
        name: members.map((e) => {
          return e.allowUserName || 'test';
        }).join(',').substring(0, 10),
        memberList: members.map(e => {
          return { userID: e.allowUserId.toString() };
        }),
      });
    }
  }
}
