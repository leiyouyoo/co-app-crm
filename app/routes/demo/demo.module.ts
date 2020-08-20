import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared';
import { DemoListComponent } from './demo-list.component';
import { DemoDetailComponent } from './demo-detail/demo-detail.component';

const COMPONENTS = [DemoListComponent, DemoDetailComponent];
const COMPONENTS_NOROUNT = [];

/**
 * 示例路由配置
 */
const routes: Routes = [{ path: '', component: DemoListComponent, data: { reuse: true } }];

/**
 * 示例特性模块
 */
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class DemoModule {}
