import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { _HttpClient } from '@co/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface UserDetail {
  customerId: string;
  emailAddress: string | null;
  icpUserId: string;
  id: number;
  name: string;
  phoneNumber: string;
  profilePictureId: string;
  surname: string;
  tel: string;
  userName: string;
}

@Component({
  selector: 'crm-customer-email',
  templateUrl: './customer-email.component.html',
  styleUrls: ['./customer-email.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerEmailComponent implements OnInit {
  @Input() customerId: string;
  value = '';
  user: Observable<UserDetail>;
  sender: Observable<string[]>;

  constructor(
    private http: _HttpClient
  ) {
    this.user = this.http.get<UserDetail>('/SSO/User/GetUserDetail').pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

    this.sender = this.user.pipe(
      map(user => {
        const arr: string[] = [];

        if (user.emailAddress){
          arr.push(user.emailAddress);
        }

        return arr;
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  ngOnInit(): void {
  }

  updateMail(event: string): void{
    console.log(event);
  }
}
