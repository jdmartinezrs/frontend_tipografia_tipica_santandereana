import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthNavbar } from './auth-navbar/auth-navbar';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, AuthNavbar],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
