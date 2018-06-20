import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {Base64UploadComponent, KeysPipe} from './base64-upload/base64-upload.component';
import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";
import {ApiServiceComponent} from './services/api-service/api-service.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import { HttpClientModule } from "@angular/common/http";
import {DocumentService} from './services/api-service/document-service.component';
import { AppRoutingModule } from './app-routing.module';
import { DownloadComponent } from './download/download.component';


@NgModule({
  declarations: [
    AppComponent,
    Base64UploadComponent,
    KeysPipe,
    DownloadComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule, HttpClientModule, AppRoutingModule
  ],
  providers: [ApiServiceComponent, DocumentService, HttpClientModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
