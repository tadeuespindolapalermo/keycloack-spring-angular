import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { MessageService } from './services/message.service';

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
    private messageService: MessageService
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
          let identityClaims = { preferred_username: '', ...this.oauthService.getIdentityClaims() }
          this.isLogged = this.getIsLogged();
          this.isAdmin = this.getIsAdmin();
          this.username = identityClaims.preferred_username;
          //this.username = this.oauthService.getIdentityClaims()[`preferred_username`];
          this.messageService.sendMessage(identityClaims.preferred_username);
          console.log(identityClaims);
        }
      });
  }

  public getIsLogged(): boolean {
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

  public getIsAdmin(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = window.atob(payload); // atob deprecated
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    //console.log(payloadDecoded);
    return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
  }
 
}
