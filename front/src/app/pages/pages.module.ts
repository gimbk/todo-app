import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskComponent } from './task/task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddTaskComponent } from './add-task/add-task.component';


@NgModule({
  declarations: [
    PagesComponent,
    UsersComponent,
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    TaskComponent,
    EditTaskComponent,
    ViewTaskComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ]
})
export class PagesModule { }
