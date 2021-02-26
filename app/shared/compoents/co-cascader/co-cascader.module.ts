/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';

import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { CoCascaderOptionComponent } from './co-cascader-li.component';
import { CoCascaderComponent } from './co-cascader.component';
import { CoOverlayModule } from '../overlay';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    NzOutletModule,
    NzEmptyModule,
    NzHighlightModule,
    NzIconModule,
    NzInputModule,
    NzNoAnimationModule,
    CoOverlayModule,
  ],
  declarations: [CoCascaderComponent, CoCascaderOptionComponent],
  exports: [CoCascaderComponent],
})
export class CoCascaderModule {}
