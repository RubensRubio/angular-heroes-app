import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(private loginService: AuthService,
    private router: Router
  ) {

  }

  onLogin(): void {
    this.loginService.login('rubens', '1234')
      .subscribe(user => {

        this.router.navigate(['/heroes'])

      })
  }
}
