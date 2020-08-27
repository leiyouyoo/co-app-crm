import { NgModule } from '@angular/core';
import { QuoteSimpleInfoComponent } from './component/quote-simple-info/quote-simple-info.component';
import { SharedModule } from '../../shared';

const component = [];

@NgModule({
  declarations: [...component],
  imports: [SharedModule],
  exports: [...component],
})
export class QuoteCommmonModule {}
