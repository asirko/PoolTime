import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { ParamsComponent } from './params/params.component';
import { TimersComponent } from './timers/timers.component';
import { ParamsService } from './params/params.service';
import { TimersService } from './timers/timers.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ParamsComponent,
    TimersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule
  ],
  providers: [
    ParamsService,
    TimersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
