import { Component, Input, Injector, Output, EventEmitter } from '@angular/core';
import { NzMessageService, NzDrawerService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

import { CoPageBase } from '@co/core';
import { PlatformJobDto } from '@co/cds';

import { debounce } from '../../../shared/utils/debounce';
import { JobService } from '../../../services/demo/demo.service';

/**
 * 样例明细页
 */
@Component({
  selector: 'crm-demo-detail',
  templateUrl: './demo-detail.component.html',
  styleUrls: ['./demo-detail.component.less'],
})
export class DemoDetailComponent extends CoPageBase {
  //#region 私有变量

  isEnglish: boolean = true;
  isSubmit: boolean = false;

  //#endregion

  //#region  输入输出参数

  /**
   *
   */
  @Input() jobDto: any = {
    name: null,
    displayName: null,
    displayNameLocalization: null,
    jobTypeId: null,
    jobTypeName: null,
    desc: null,
    id: null,
  };

  /**
   *
   */
  @Input() title: string;

  /**
   *
   */
  @Output() readonly onSubmitted = new EventEmitter<boolean>();

  //#endregion

  //#region 页面生命周期

  constructor(injector: Injector, private jobService: JobService, private message: NzMessageService) {
    super(injector);
  }

  coOnInit(): void {}

  //#endregion

  //#region 事件处理

  /**
   * 创建或更新职务
   * @param params
   */
  onCreate(params: PlatformJobDto) {
    //验证
    if (!this.jobDto.displayNameLocalization || !this.jobDto.name) {
      this.isSubmit = true;
      return false;
    }

    if (!this.isEnglish) {
      return false;
    }

    this.checkedRepeat(params.name, this.jobDto.displayNameLocalization, params.id).subscribe((res) => {
      if (res) {
        this.message.error(this.$L('Job title') + this.$L('Repeat'));
        return false;
      } else {
        if (params.id) {
          this.jobService.update(params).subscribe(
            (res) => {
              this.message.info(this.$L('Edited successfully!'));
              this.onSubmitted.emit(true);
            },
            (error) => {},
          );
        } else {
          this.jobService.create(params).subscribe(
            (res) => {
              this.message.info(this.$L('Add successfully!'));
              this.onSubmitted.emit(true);
            },
            (error) => {},
          );
        }
      }
    });
  }

  /**
   * 保存
   */
  onSave() {
    this.onCreate(this.jobDto);
  }

  /**
   * 检查名称
   * @param event
   */
  @debounce(200)
  onCheckName(event) {
    let phoneReg = /[a-zA-Z]/;
    // let joblg = /^.{20}$/;
    if (!event) {
      this.isEnglish = true;
      return;
    }
    if (phoneReg.test(event)) {
      this.isEnglish = true;
    } else {
      this.isEnglish = false;
    }
  }

  //#endregion

  //#region 私有方法

  /**
   * 检查名称是否存在重复
   * @param name
   * @param nameLocalization
   * @param id
   */
  private checkedRepeat(name, nameLocalization, id) {
    return new Observable((ob) => {
      this.jobService.CheckedRepeat(name, nameLocalization, id).subscribe((res) => {
        ob.next(res);
        ob.complete();
      });
    });
  }

  //#endregion
}
