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
  { path: '', component: MainPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'search/:id', component: DetailPageComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'wishlist', component: WishlistPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
