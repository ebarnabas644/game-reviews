import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {}

  checkLogin(email: string, pass: string, again: string) {
    if (pass == again) {
      this.authService.SignUp(email, pass);
    } else {
      let label = this.translate.instant('password-not-match');
      window.alert(label);
    }
  }
}
