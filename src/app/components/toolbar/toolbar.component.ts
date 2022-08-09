import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { DesktopModeService } from 'src/app/services/desktop-mode.service';
import { FilterDrawerService } from 'src/app/services/filter-drawer.service';
import { NavigationDrawerService } from 'src/app/services/navigation-drawer.service';
import { SearchService } from 'src/app/services/search.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@UntilDestroy()
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  desktopMode = true
  title!: String

  constructor(private navigationDrawerService: NavigationDrawerService, private filterDrawerService: FilterDrawerService, private router: Router, private desktopModeService: DesktopModeService, private toolbarService: ToolbarService, private tranlate: TranslateService, private searchService: SearchService) { }

  toggleNavigationDrawer(): void{
    this.navigationDrawerService.toggle()
  }

  toggleFilterDrawer(): void{
    this.filterDrawerService.toggle()
  }

  ngOnInit(): void {
    this.desktopModeService
      .getDesktopModeStatus()
      .pipe(untilDestroyed(this))
      .subscribe(mode => {
        this.desktopMode = mode
      })
      this.toolbarService.getTitle().pipe(untilDestroyed(this)).subscribe(title => this.title = title)
  }

  isHomeView() {
    return this.router.url.match('^/$');
  }

  isSearchView() {
    return this.router.url.match('^/search$');
  }

  isGameView(){
    return this.router.url.match('^/search/.*$');
  }

  isSignInView(){
    return this.router.url.match('^/sign-in$');
  }

  isSignUpView(){
    return this.router.url.match('^/register-user$');
  }

  isVerifyEmailView(){
    return this.router.url.match('^/verify-email-address$');
  }

  isForgotPasswordView(){
    return this.router.url.match('^/forgot-password$');
  }

  ngOnDestroy(): void {
  }

}
