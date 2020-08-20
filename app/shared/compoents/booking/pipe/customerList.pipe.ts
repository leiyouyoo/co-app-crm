import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerList',
})
export class CustomerListPipe implements PipeTransform {
  transform(arr: any, value): any {
    if (value && arr.length > 0) {
      return arr.filter((item) => {
        if (item.partnerId) {
          //如果选择的是合作伙伴 显示为合作伙伴所属的客户
          return item.partnerCustomerId === value.partnerCustomerId;
        }
        if (!item.partnerId) {
          // 如果选择的是客户 显示客户下的合作伙伴
          return item.partnerCustomerId === value.customerId;
        }
      });
    } else if (!value) {
      return arr;
    }
  }
}
