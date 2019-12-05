import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AlertComponent } from './alert/alert.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { Service } from '../service/service';
import { AuthGuard } from '../service/auth-guard';
import { UrlConfig } from '../service/url-config';

@NgModule({
  declarations: [AlertComponent, SpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [Service, AuthGuard, UrlConfig],
  exports: [ FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    SpinnerComponent ]
})
export class SharedModuleModule { }
