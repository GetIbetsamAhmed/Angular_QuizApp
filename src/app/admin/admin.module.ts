import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { PersonalDevelopmentAreasComponent } from './personal-development-areas/personal-development-areas.component';
import { QuestionsComponent } from './questions/questions.component';
import { NavCommonModule } from '../common/nav-common.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialTableComponent } from '../common/material-table/material-table.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SchoolsListComponent } from './schools-list/schools-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TeachersListComponent } from './teachers-list/teachers-list.component'; 
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [AdminDashboardComponent, PersonalDevelopmentAreasComponent, QuestionsComponent, AdminTemplateComponent, SchoolsListComponent, TeachersListComponent],
  imports: [CommonModule, AdminRoutingModule, NavCommonModule,MatExpansionModule,
    MatSidenavModule, MatIconModule, MatTableModule, MatListModule, MatToolbarModule, MatMenuModule, MatDialogModule, MatInputModule, MatButtonModule, FormsModule, MatPaginatorModule,
    MatSnackBarModule, NgApexchartsModule, ModalModule.forRoot(), FormsModule, ReactiveFormsModule],
  exports: [],
  bootstrap: [],
})
export class AdminModule { }
