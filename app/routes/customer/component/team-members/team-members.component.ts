import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CRMCustomerAccessAllowOutput, CRMCustomerAccessAllowService } from 'apps/crm/app/services/crm';
// tslint:disable-next-line:import-blacklist
import { NzModalService } from 'ng-zorro-antd';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AddTeamMembersModalComponent } from '../add-team-members-modal/add-team-members-modal.component';

@Component({
  selector: 'crm-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMembersComponent implements OnInit {
  @Input() customerId: string;
  selected = new SelectionModel<string>(true);
  keyword = new FormControl('');
  members: Observable<CRMCustomerAccessAllowOutput[]>;
  reload$ = new Subject<void>();

  constructor(
    private crmCustomerAccessAllowService: CRMCustomerAccessAllowService,
    private nzModalService: NzModalService
  ) {
    this.members = merge(
      of(null),
      this.keyword.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.reload$
    ).pipe(
      switchMap((value: string | undefined | null) => this.crmCustomerAccessAllowService.getAll({
        customerId: this.customerId,
        name: value
      })),
      map(result => result.items),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  ngOnInit(): void {
  }

  openRemoveModal(): void{
    this.nzModalService.confirm({
      nzTitle: '确认删除?',
      nzOnOk: () => this.crmCustomerAccessAllowService.delete({
        customerId: this.customerId,
        accessAllowUserIds: this.selected.selected
      }).pipe(tap(() => this.reload$.next())).toPromise()
    });
  }

  openAddTeamMembersModal(items: CRMCustomerAccessAllowOutput[]): void{
    const modal = this.nzModalService.create<AddTeamMembersModalComponent, boolean | undefined | null>({
      nzTitle: '添加成员',
      nzContent: AddTeamMembersModalComponent,
      nzComponentParams: {
        customerId: this.customerId,
        users: items
      },
      nzWidth: 800,
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result){
        this.reload$.next();
      }
    });
  }
}
