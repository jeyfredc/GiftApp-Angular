import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* Es el servicio suministrado por angular para hacer peticiones a endpoint */
import {HttpClientModule} from '@angular/common/http'
import { GifsModule } from './gifs/gifs.module'

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GifsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
