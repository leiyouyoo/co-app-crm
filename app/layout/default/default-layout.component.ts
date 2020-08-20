import { Component } from '@angular/core';

/**
 * 默认布局组件
 */
@Component({
  selector: 'default-layout',
  templateUrl: './default-layout.component.html',
  host: {
    '[class.default-layout]': 'true',
  },
})
export class DefaultLayoutComponent {}
