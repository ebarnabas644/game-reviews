import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.scss'],
})
export class ProfilePanelComponent implements OnInit, OnDestroy {
  darkMode: boolean = false;
  imageError: boolean = false;

  constructor(
    public authService: AuthService,
    public translate: TranslateService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService
      .getDarkMode()
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.darkMode = value;
      });
  }

  imageErrorHandler(event: any) {
    this.imageError = true;
    event.target.src = '../../../assets/icons/default_profile.png';
  }

  ngOnDestroy(): void {}
}
