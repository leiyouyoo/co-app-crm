import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerLifeCycle',
})
export class CustomerLifeCyclePipe implements PipeTransform {
  customerLifeCycleStatusMap: { [key: number]: string } = {
    0: '客户创建',
    1: 'CSP账号开通 ',
    2: '首次出单（提单签发给该客户）',
    3: '成交（提单签发给改客户）',
    4: '转为潜在客户',
    5: '转为共享客户',
    6: '转为无主客户',
  };
  transform(value: number, ...args: any[]): any {
    if (value == 7) {
      return '客户被' + args[0] + '引用为合作伙伴';
    } else {
      var res = this.customerLifeCycleStatusMap[value];
      return res;
    }
  }
}
