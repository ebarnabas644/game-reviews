import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { ForgotPasswordComponent } from './pages/login-page/components/forgot-password/forgot-password.component';
import { SignInComponent } from './pages/login-page/components/sign-in/sign-in.component';
import { SignUpComponent } from './pages/login-page/components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './pages/login-page/components/verify-email/verify-email.component';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { WishlistPageComponent } from './pages/wishlist-page/wishlist-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: { title: 'toolbar.trending' },
  },
  {
    path: 'search',
    component: SearchPageComponent,
    data: { title: 'toolbar.search' },
  },
  { path: 'search/:id', component: DetailPageComponent },
  {
    path: 'sign-in',
    component: SignInComponent,
    data: { title: 'toolbar.login' },
  },
  {
    path: 'register-user',
    component: SignUpComponent,
    data: { title: 'toolbar.register' },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'toolbar.forgot-password' },
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    data: { title: 'toolbar.verify-email' },
  },
  {
    path: 'wishlist',
    component: WishlistPageComponent,
    canActivate: [AuthGuard],
    data: { title: 'toolbar.wishlist' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
