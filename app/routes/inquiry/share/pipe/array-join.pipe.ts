import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayJoin'
})
export class ArrayJoinPipe implements PipeTransform {

  transform(value: any[], separator: string = ', '): any {
    const notEmptyArr = value.filter(o => o);
    return notEmptyArr.join(separator);
  }

}
