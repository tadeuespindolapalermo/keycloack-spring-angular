import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { MessageService } from './services/message.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'keycloack-frontend';

  username: string | undefined;
  isLogged: boolean | undefined;
  isAdmin: boolean | undefined;

  constructor(
    private oauthService: OAuthService, 
    private messageService: MessageService,
    private loginService: LoginService
  ) 
  {
    this.configure();
  }

  authConfig: AuthConfig = {    
    issuer: 'http://localhost:8082/auth/realms/tutorial',   
    redirectUri: window.location.origin,   
    clientId: 'tutorial-frontend',   
    responseType: 'code',   
    scope: 'openid profile email offline_access',
    showDebugInformation: true
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument()
      .then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.getIdentityClaims()) {
          this.isLogged = this.loginService.getIsLogged();
          this.isAdmin = this.loginService.getIsAdmin();
          this.username = this.loginService.getUsername();
          this.messageService.sendMessage(this.loginService.getUsername());
        }
      });
  }
 
}
