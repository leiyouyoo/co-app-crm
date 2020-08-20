import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'crm-relation-contact',
  templateUrl: './relation-contact.component.html',
  styleUrls: ['./relation-contact.component.less'],
})
export class RelationContactComponent implements OnInit {
  @Input() contacts;
  @Input() locationId: number;
  @Output() datas = new EventEmitter<any>();
  constructor(private customerService: CustomerService) {}

  ngOnInit() {}

  onDeleteLocation(contact) {
    //删除操作
    this.contacts = this.contacts.filter((local) => local.id !== contact.id);
    this.customerService
      .unbindUserLocation({
        locationId: this.locationId,
        contactId: contact.id,
      })
      .subscribe((res) => {
        this.datas.emit();
      });
  }
}
