import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { TeacherTemplateComponent } from './teacher-template/teacher-template.component';


const teacherRoutes: Routes = [
  {
    path: '', component: TeacherTemplateComponent,
    children: [
                  {path: '' , component: DashboardComponent}, 
              ]              
 }
];
@NgModule({
  imports: [RouterModule.forChild(teacherRoutes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { 
  constructor(){  
  }
}
