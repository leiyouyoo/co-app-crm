import { Component, Injector, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CoPageBase } from '@co/core';
import { CRMCustomerSolutionService } from 'apps/crm/app/services/crm';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
/**
 * 样例明细页
 */
@Component({
  selector: 'app-answerModal',
  templateUrl: './answer-modal.component.html',
  styleUrls: ['./answer-modal.component.less'],
})
export class AnswerModalComponent extends CoPageBase {
  //#region 私有变量

  isEnglish: boolean = true;
  isSubmit: boolean = false;
  loading: boolean = false;
  data: any = {};
  isPass: boolean = true;
  customerId: any = null;
  remark: any = null;
  id: any;
  countryId: any;
  customerFilter: any = {}
  AgentTypePipi: any = {
    '0': '普通',
    '1': '第三方代理',
    '2': '需要对收款有特殊要求的代理'
  }

  //#endregion


  //#region  输入输出参数

  //#endregion


  //#region 页面生命周期

  constructor(injector: Injector,
    private message: NzMessageService,
    public modalRef: NzModalRef,
    private fb: FormBuilder,
    private customerSolutionService: CRMCustomerSolutionService
  ) {
    super(injector);
  }

  coOnInit(): void {
    setTimeout(() => {
      this.modalRef.updateConfig({
        nzTitle: '回复'
      })
    })

    this.customerFilter = {
      countryId: this.countryId,
      CustomerType: 3,
    }

  }

  coOnActived(): void { }

  coOnDeactived(): void { }

  coOnChanges(changes: SimpleChanges): void { }

  coAfterViewInit(): void { }

  coOnDestroy(): void { }

  //#endregion


  //#region 事件处理
  handleOk() {

    this.customerSolutionService.auditApplyInfo({
      isPass: this.isPass,
      customerId: this.customerId,
      replyRemark: this.remark,
      ids: this.id
    }).subscribe(res => {
      this.message.success(this.$L('Success'))
      this.modalRef.close(true)
    })
  }

  //#endregion


  //#region 公共方法

  //#endregion


  //#region 私有方法

  //#endregion

}
