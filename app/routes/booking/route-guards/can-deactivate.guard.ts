import { Injectable, Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { CreateBookingComponent } from 'apps/crm/app/shared/compoents/booking/create-booking/create-booking.component';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanActivate, CanDeactivate<CreateBookingComponent> {
  isContanin: boolean = false;
  isVisible: boolean = false;
  constructor(private modalService: NzModalService, private translateService: TranslateService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: CreateBookingComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.cannotDeactivate) {
      return this.showModal(component);
      // return new Observable(observer => {
      //   let result;
      //   // 弹窗结果处理
      //   this.showModal();
      //   if (!result) console.log('Route Guard: canDeactivate false');
      //   observer.next(result);
      //   observer.complete();
      // })
    }
    return true;
  }

  showModal(component: any) {
    return new Observable<boolean>((ob) => {
      this.translateService.get(['Discard all changed', 'Discard', 'Keep editing']).subscribe((keyMap) => {
        this.modalService.confirm({
          nzTitle: `<i>${keyMap['Discard all changed']}?</i>`,
          // nzContent: '<b></b>',
          nzCancelText: keyMap['Discard'],
          nzIconType: 'info-circle',
          nzOkType: 'primary',
          nzOkText: keyMap['Keep editing'],
          nzOnCancel: () => {
            ob.next(true);
            if (component.isEdit == 'false') {
            } //缓存数据
            ob.complete();
          },
          nzOnOk: () => {
            ob.next(false);
            ob.complete();
          },
        });
      });
    });
  }
  // localStorage.setItem("bookingSession", JSON.stringify(component.bookingObj))
  //确定保存编辑状态
  handOk() {
    this.isContanin = false;
    return true;
  }

  //取消
  handCancel() {
    this.isContanin = true;
    return true;
  }
}
