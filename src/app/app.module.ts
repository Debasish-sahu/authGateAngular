import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, MicrosoftLoginProvider } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '347147643972-skpi4ubl6ahvtm4414nf505a3sm2uvu8.apps.googleusercontent.com'
          ),
        },
        {
          id: MicrosoftLoginProvider.PROVIDER_ID,
          provider: new MicrosoftLoginProvider('a8466515-83aa-4306-9104-b58a7b0c9d83'),
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
