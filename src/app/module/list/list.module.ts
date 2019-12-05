import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    SharedModuleModule
  ]
})
export class ListModule { }
