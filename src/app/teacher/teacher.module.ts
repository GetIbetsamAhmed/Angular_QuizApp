import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { TeacherTemplateComponent } from './teacher-template/teacher-template.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { NavCommonModule } from '../common/nav-common.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [DashboardComponent, TeacherTemplateComponent],
  imports: [ CommonModule, TeacherRoutingModule, NavCommonModule,MatSidenavModule,MatListModule],
  exports: []
})
export class TeacherModule { }
