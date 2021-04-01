import { Component } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, MicrosoftLoginProvider, SocialUser } from "angularx-social-login";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Auth-gate';

  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;
  loggedIn: boolean;
  userId: string;
  password: string;
  rawUser: boolean = false;
  sessionUserName: string;
  sessionUserEmail: string;
  sessionUserProvider: string;
  sessionView: boolean = false;

  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  login(): void {
    if (this.userId == "RV" && this.password == "pwd") {
      console.log("logged");
      this.rawUser = true;
    }
    this.storeInSession();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.storeInSession();
  }

  signInWithMicrosoft(): void {
    this.authService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
    this.storeInSession();
  }

  storeInSession(): void {
    if (this.user) {
      sessionStorage.setItem('loggedUserName', this.user.name);
      sessionStorage.setItem('loggedUserEmail', this.user.email);
      sessionStorage.setItem('loggedUserProvider', this.user.provider);
    }
    else if (this.rawUser) {
      sessionStorage.setItem('loggedUserName', 'RV');
      sessionStorage.setItem('loggedUserEmail', '');
      sessionStorage.setItem('loggedUserProvider', 'Shared');
    }
    this.sessionUserName = sessionStorage.getItem('loggedUserName');
    this.sessionUserEmail = sessionStorage.getItem('loggedUserEmail');
    this.sessionUserProvider = sessionStorage.getItem('loggedUserProvider');

  }

  fetchSession() {
    this.sessionView = true;

  }

  signOut(): void {
    this.authService.signOut();
    this.userId = "";
    this.password = "";
    this.sessionUserName = null;
    this.sessionUserEmail = null;
    this.sessionUserProvider = null;
    this.rawUser = false;
    sessionStorage.clear();
    this.sessionView = false;

  }
}
