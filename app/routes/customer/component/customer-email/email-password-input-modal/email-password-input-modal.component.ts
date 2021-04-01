import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'crm-email-password-input-modal',
  templateUrl: './email-password-input-modal.component.html',
  styleUrls: ['./email-password-input-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailPasswordInputModalComponent implements OnInit {
  value = new FormControl(null, Validators.required);

  constructor(private nzModalRef: NzModalRef<EmailPasswordInputModalComponent, string | undefined | null>) { }

  ngOnInit(): void {
  }

  close(): void{
    this.nzModalRef.close();
  }

  save(): void{
    this.nzModalRef.close(this.value.value);
  }
}
