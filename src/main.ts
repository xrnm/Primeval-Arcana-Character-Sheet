import {enableProdMode, importProvidersFrom} from '@angular/core';

import {environment} from './environments/environment';
import {MatNativeDateModule} from '@angular/material/core';
import {Title, BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {AppRoutingModule} from './app/app-routing.module';
import {provideAnimations} from '@angular/platform-browser/animations';
import {AppComponent} from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, MatNativeDateModule),
        Title,
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
