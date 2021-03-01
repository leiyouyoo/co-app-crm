/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type CozCascaderExpandTrigger = 'click' | 'hover';
export type CozCascaderTriggerType = 'click' | 'hover';
export type CoCascaderSize = 'small' | 'large' | 'default';

export type CoCascaderFilter = (searchValue: string, path: CoCascaderOption[]) => boolean;
export type NzCascaderSorter = (a: CoCascaderOption[], b: CoCascaderOption[], inputValue: string) => number;

/**
 * @deprecated Use the prefixed version.
 */
export interface CascaderOption {
  value?: NzSafeAny;
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  parent?: CoCascaderOption;
  children?: CoCascaderOption[];

  [key: string]: NzSafeAny;
}

export type CoCascaderOption = CascaderOption;

/**
 * @deprecated Use the prefixed version.
 */
export interface CascaderSearchOption extends CoCascaderOption {
  path: CoCascaderOption[];
}

export type CoCascaderSearchOption = CascaderSearchOption;

export interface CoShowSearchOptions {
  filter?: CoCascaderFilter;
  sorter?: NzCascaderSorter;
}

export function isShowSearchObject(options: CoShowSearchOptions | boolean): options is CoShowSearchOptions {
  return typeof options !== 'boolean';
}

/**
 * To avoid circular dependency, provide an interface of `NzCascaderComponent`
 * for `NzCascaderService`.
 */
export interface CoCascaderComponentAsSource {
  inputValue: string;
  nzShowSearch: CoShowSearchOptions | boolean;
  nzLabelProperty: string;
  nzValueProperty: string;
  nzChangeOnSelect: boolean;

  nzChangeOn?(option: CoCascaderOption, level: number): boolean;

  nzLoadData?(node: CoCascaderOption, index: number): PromiseLike<NzSafeAny>;
}
