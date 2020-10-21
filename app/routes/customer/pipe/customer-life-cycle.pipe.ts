import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'customerLifeCycle',
})
export class CustomerLifeCyclePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}
  customerLifeCycleStatusMap: { [key: number]: string } = {
    0: this.translate.instant('Customer created'),
    1: this.translate.instant('CSP account opened'),
    2: this.translate.instant('First issue (bill of lading issued to the customer)'),
    3: this.translate.instant('Transaction (bill of lading issued to the client)'),
    4: this.translate.instant('Turn into a potential customer'),
    5: this.translate.instant('Convert to shared client'),
    6: this.translate.instant('Convert to an unowned client'),
  };
  transform(value: number, ...args: any[]): any {
    if (value == 7) {
      return args[0] + this.translate.instant("'s partner'");
    } else {
      var res = this.customerLifeCycleStatusMap[value];
      return res;
    }
  }
}
