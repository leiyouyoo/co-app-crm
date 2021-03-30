import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CRMCustomerAccessAllowOutput, CRMCustomerAccessAllowService } from 'apps/crm/app/services/crm';
// tslint:disable-next-line:import-blacklist
import { NzModalService } from 'ng-zorro-antd';
import { merge, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';
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

  constructor(
    private crmCustomerAccessAllowService: CRMCustomerAccessAllowService,
    private nzModalService: NzModalService
  ) {
    this.members = merge(
      of(''),
      this.keyword.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
    ).pipe(
      switchMap((value: string) => this.crmCustomerAccessAllowService.getAll({
        customerId: this.customerId
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
    // this.nzModalService.confirm({
    //   nzTitle: '确认删除?',
    //   nzOnOk: () => this.crmCustomerAccessAllowService.delete({
    //     customerId: this.customerId,
    //     id: this.selected.selected
    //   }).toPromise()
    // });
  }

  openAddTeamMembersModal(): void{
    const modal = this.nzModalService.create<AddTeamMembersModalComponent, boolean | undefined | null>({
      nzTitle: '添加成员',
      nzContent: AddTeamMembersModalComponent,
      nzComponentParams: {

      },
      nzWidth: 800,
      nzFooter: null
    });

    modal.afterOpen.subscribe(result => {
      console.log('afterOpen');
    });

    modal.afterClose.subscribe(result => {
      console.log(result);
    });
  }
}
