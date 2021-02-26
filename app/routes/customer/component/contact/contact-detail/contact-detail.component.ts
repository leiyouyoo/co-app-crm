import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'crm-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.less'],
})
export class ContactDetailComponent implements OnInit {
  validateForm: FormGroup;
  isShow = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      firatname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      position: [null, [Validators.required]],
      Reamrk: [null, [Validators.required]],
    });
  }
}
