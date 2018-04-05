import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { ParamsComponent } from './params/params.component';
import { TimersComponent } from './timers/timers.component';
import { ParamsService } from './params/params.service';
import { TimersService } from './timers/timers.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TimerComponent } from './timers/timer/timer.component';

import localeFR from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFR);

@NgModule({
  declarations: [
    AppComponent,
    ParamsComponent,
    TimersComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ParamsService,
    TimersService,
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
