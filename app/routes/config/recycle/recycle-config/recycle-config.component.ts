import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NzTreeNodeOptions } from 'ng-zorro-antd';
import { pendingOrDone } from '../../../../../../platform/app/shared';
import { map } from 'rxjs/operators';
import { PlatformOrganizationUnitDto } from '@co/cds';
import { CoPageBase, debounce } from '@co/core';
import { CRMContactIMService, CRMCustomerHighSeasPondSettingDto, CRMCustomerService } from '../../../../services/crm';
import { _HttpClient } from '@co/common';

@Component({
  selector: 'crm-recycle-config',
  templateUrl: './recycle-config.component.html',
  styleUrls: ['./recycle-config.component.less'],
})
export class RecycleConfigComponent extends CoPageBase implements OnInit {
  @ViewChild('recycleForm', { static: true }) recycleForm: NgForm;
  loading = false;
  editing = false;
  showBasicInfo = true;
  showRecycle = true;
  validateForm: CRMCustomerHighSeasPondSettingDto = {
    personLiableList: [], //负责人集合
    personLiableDeptCount: null,//部门数量
    personLiableCount: null,//负责人数量
    highSeasPondType: '0',//设置公海类型
    highSeasPondType_RandomAllocationNumber: null,//设置公海类型
    highSeasPondType_RandomAllocationUnit: null,//设置公海单位
    highSeasPondUsers: [],//公海用户成员
    highSeasPondDeptCount: null,//公海成员部门数量
    highSeasPondUserCount: null,//公海成员数量
    customerCapitalNum: null,//客资领取单位上限
    customerCapitalUnit: null,//客资领取单位
    customerCapitalTotal: null,//客资可领取总数量
    dayLimit: null,//连续领取天数限定
    recovery_Potential_NotFollowedDays: null,//回收潜在客户未跟进天数
    recovery_Potential_NotDealDays: null,//回收潜在客户未成交天数
    recovery_Obtain_NotFollowedDays: null,//回收成交客户获取后未跟进天数
    recovery_Obtain_NotDealDays: null,//回收成交客户获取后未成交天数
    recovery_Deal_NotFollowedDays: null,//成交后未再跟进天数
    recovery_Deal_NotDealDays: null,//成交后未再成交天数
    settingClaimRules: [],//设置领取规则
    setingDealDefinition: null,//设置成交定义
    recallReminderDays: null,//回收提醒天数
    returnTimesFreeze: null,//退回冻结次数
    id: null,
  };
  claimRules = {
    potential: false,
    obtain: false,
  };
  userListParams = {
    isLoading: true,
    maxResultCount: 20,
    skipCount: 0,
    name: null,
  };
  userList = [];
  personList: NzTreeNodeOptions[] = [];

  constructor(private fb: FormBuilder, injector: Injector,
              private cdr: ChangeDetectorRef, private _httpClient: _HttpClient, private crmCustomerService: CRMCustomerService) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadPerson();
    this.getSetting();
  }

  getSetting() {
    this.loading = true;
    this.crmCustomerService.getHighSeasPondSetting({}).subscribe(r => {
        this.loading = false;
        this.validateForm = r;
        this.validateForm.settingClaimRules?.forEach(e => {
          if (e == 0) {
            this.claimRules.potential = true;
          }
          if (e == 1) {
            this.claimRules.obtain = true;
          }
        });
      }, () => this.loading = false,
    );
  }

  validate() {
    // tslint:disable-next-line: forin
    for (const i in this.recycleForm.controls) {
      this.recycleForm.controls[i].markAsDirty();
      this.recycleForm.controls[i].updateValueAndValidity();
    }
    return this.recycleForm.valid;
  }

  updateSetting() {
    if (!this.validate()) {
      return;
    }
    this.loading = true;
    this.crmCustomerService.saveHighSeasPondSetting(this.validateForm).subscribe((res) => {
      this.$message.success(this.$L('Save successfully'));
      this.loading = false;
      this.editing = false;
    }, () => this.loading = false);
  }

  // 获取公司内部组织架构员工
  getUsersAndOrganizationUnit(input?) {
    const param: any = {};
    if (input) param.inpupt = input;
    const url = `/Platform/OrganizationUnit/GetUsersAndOrganizationUnit`;
    return this._httpClient.get(url, param);
  }

  // 返回之前已经请求过的数据
  getPersonTreeNode({ disableCheckbox = false, onlyValid = false } = {}) {
    return this.getUsersAndOrganizationUnit().pipe(
      map((v) => {
        const value = JSON.parse(JSON.stringify(v)); // 克隆数据，避免引用对象共享使用
        // 将数据转换成适合组件的结构
        // rootNodes是根节点集合，flattenNodes是摊平后的所有节点集合
        const result = { rootNodes: [], flattenNodes: [] };
        const conventPersonUnitToTreeNode = (unit: PlatformOrganizationUnitDto, parent): NzTreeNodeOptions => {
          const nzTreeNode: NzTreeNodeOptions = {
            title: unit.name || unit.companyName,
            key: unit.userId,
            level: unit.level,
            selectable: false,
            disableCheckbox: disableCheckbox ? true : unit.level == 1,
            expanded: unit.level == 1,
            parent,
            ...unit,
          };
          nzTreeNode.children = (unit.children ?? []).map((item) => conventPersonUnitToTreeNode(item, nzTreeNode));
          nzTreeNode.isLeaf = nzTreeNode.children.length < 1;
          result.flattenNodes.unshift(nzTreeNode); // 这里用unshift而不是push，确保父部门排在子部门前面
          return nzTreeNode;
        };
        result.rootNodes = value.items.map((item) => conventPersonUnitToTreeNode(item, null));
        return result;
      }),
    );
  }

  private onFetching = (pending: boolean) => {
    this.loading = pending;
    this.markDirty();
  };

  private markDirty() {
    this.cdr.markForCheck();
  }

  private loadPerson() {
    this.getPersonTreeNode({ onlyValid: true })
      .pipe(pendingOrDone(this.onFetching))
      .subscribe((v) => {
        this.personList = v.rootNodes;
        v.flattenNodes.forEach(node => {
          node.selectable = true;
        });
      });
  }

  chang(e, type) {
    this.validateForm.settingClaimRules = this.validateForm.settingClaimRules?.filter(ele => {
      return ele == type && e;
    });
  }

  /**
   * 获取客户所有人数据
   * @param name
   * @param loadMore
   */
  @debounce(1000)
  getCityOceanUsers(name, loadMore = false) {
    this.userListParams.isLoading = true;
    this.userListParams.maxResultCount = 20;
    if (!loadMore) {
      this.userListParams.skipCount = 0;
      this.userListParams.name = name;
      this.userList = [];
    }
    this._httpClient.get('/SSO/User/GetAllActiveUserBySearch', { searchText: name }).subscribe((r: any) => {
      this.userListParams.isLoading = false;
      if (loadMore) {
        this.userList = [...this.userList, ...r];
      } else {
        this.userList = r;
      }
      this.cdr.detectChanges();
    }, e => this.userListParams.isLoading = false);
  }
}
