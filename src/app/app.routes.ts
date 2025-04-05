import { LoginComponent } from './components/auth/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { RecoveryPasswordComponent } from './components/auth/recovery-password/recovery-password.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recovery-password', component: RecoveryPasswordComponent},
];
