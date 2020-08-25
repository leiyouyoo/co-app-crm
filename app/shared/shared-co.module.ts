import { CoCommonModule } from '@co/common';
import {
  CoNoticeIconModule,
  FullContentModule,
  PageHeaderModule,
  CoSTModule,
  CoDatetimeRangePickerModule,
  CustomerPickerModule,
  CommodityPickerModule,
  PortPickerModule,
  CoLayoutComponentsModule,
  CoNzSelectExtraModule,
} from '@co/cbc';
import { CoCmsModule, ReuseTabModule } from '@co/cms';

export const SHARED_CO_MODULES = [
  CoCommonModule,
  PageHeaderModule,
  CoNoticeIconModule,
  FullContentModule,
  ReuseTabModule,
  CoCmsModule,
  CoSTModule,
  CoDatetimeRangePickerModule,
  CustomerPickerModule,
  CommodityPickerModule,
  PortPickerModule,
  CoLayoutComponentsModule,
  CoNzSelectExtraModule,
  CoDatetimeRangePickerModule,
];
