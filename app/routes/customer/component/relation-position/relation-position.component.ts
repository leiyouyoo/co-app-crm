import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'crm-relation-position',
  templateUrl: './relation-position.component.html',
  styleUrls: ['./relation-position.component.less'],
})
export class RelationPositionComponent implements OnInit {
  @Input() locations;
  @Input() contactId: number;
  @Output() datas = new EventEmitter<any>();
  constructor(private customerService: CustomerService) {}

  ngOnInit() {}

  onDeleteLocation(location) {
    //删除操作
    this.locations = this.locations.filter((local) => local.id !== location.id);
    this.customerService
      .unbindUserLocation({
        locationId: location.id,
        contactId: this.contactId,
      })
      .subscribe((res) => {
        this.datas.emit();
      });
  }
}
