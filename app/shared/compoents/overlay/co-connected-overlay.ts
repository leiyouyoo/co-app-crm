/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Directive } from '@angular/core';

@Directive({
  selector: '[cdkConnectedOverlay][coConnectedOverlay]',
  exportAs: 'coConnectedOverlay'
})
export class CoConnectedOverlayDirective {
  constructor(private cdkConnectedOverlay: CdkConnectedOverlay) {
    this.cdkConnectedOverlay.backdropClass = 'nz-overlay-transparent-backdrop';
  }
}
